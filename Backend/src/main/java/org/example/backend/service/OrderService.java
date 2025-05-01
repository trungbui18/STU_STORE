package org.example.backend.service;

import jakarta.transaction.Transactional;
import org.example.backend.model.*;
import org.example.backend.model.DTO.*;
import org.example.backend.model.mapper.OrderDetailMapper;
import org.example.backend.model.mapper.OrderMapper;
import org.example.backend.repository.*;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final OrderMapper orderMapper;
    private final OrderDetailRepository orderDetailRepository;
    private final ProductRepository productRepository;
    private final ProductSizeRepository productSizeRepository;
    private final OrderDetailMapper orderDetailMapper;
    private final CartRepository cartRepository;
    private final CouponRepository couponRepository;

    public OrderService(
            OrderRepository orderRepository,
            CustomerRepository customerRepository,
            OrderMapper orderMapper,
            OrderDetailRepository orderDetailRepository,
            ProductRepository productRepository,
            ProductSizeRepository productSizeRepository,
            OrderDetailMapper orderDetailMapper,
            CartRepository cartRepository,
            CouponRepository couponRepository) {
        this.orderRepository = orderRepository;
        this.customerRepository = customerRepository;
        this.orderMapper = orderMapper;
        this.orderDetailRepository = orderDetailRepository;
        this.productRepository = productRepository;
        this.productSizeRepository = productSizeRepository;
        this.orderDetailMapper = orderDetailMapper;
        this.cartRepository = cartRepository;
        this.couponRepository = couponRepository;
    }

    public List<AllOrderDTO> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        List<AllOrderDTO> allOrders = orders.stream().map(order -> orderMapper.orderToAllOrderDTO(order)).toList();
        return allOrders;
    }

    public Order orderUpdate(int idOrder,String status) {
        Order order=orderRepository.findById(idOrder).orElseThrow(()->new RuntimeException("Order not found"));
        order.setStatus(status);
        orderRepository.save(order);
        return order;
    }

    public OrderResponseDTO getAllOrderDetailByOrderId(int idOrder) {
        // Lấy đơn hàng từ idOrder
        Order order = orderRepository.findById(idOrder)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng với ID: " + idOrder));

        // Lấy danh sách OrderDetail theo đơn hàng
        List<OrderDetail> orderDetails = orderDetailRepository.getAllByOrder_IdOrder(idOrder);

        // Map chi tiết đơn hàng sang DTO
        List<AllOrderDetailDTO> detailDTOList = orderDetails.stream()
                .map(orderDetailMapper::mapOrderDetailToAllOrderDetailDTO)
                .collect(Collectors.toList());

        // Tạo OrderResponseDTO
        OrderResponseDTO responseDTO = new OrderResponseDTO();
        responseDTO.setIdCustomer(order.getProfile().getIdProfile());
        responseDTO.setStatus(order.getStatus());
        responseDTO.setTotalPrice(order.getTotalPrice());
        responseDTO.setFullNameCustomer(order.getFullNameCustomer());
        responseDTO.setAddress(order.getProfile().getAddress());
        responseDTO.setNumberPhone(order.getProfile().getNumberPhone());
        responseDTO.setStatusPayment(order.getStatusPayment());
        responseDTO.setOrderDetails(detailDTOList);

        return responseDTO;
    }

    public List<RevenueInDayDTO> getRevenueByHour(LocalDate start, LocalDate end) {
        List<RevenueInDayDTO> list = orderRepository.getRevenueByHourBetweenDates(start, end);
        return list != null ? list : new ArrayList<>();
    }

    public List<RevenueInDayDTO> getRevenueOneDay(LocalDate date) {
        List<RevenueInDayDTO> list = orderRepository.getRevenueByHourForDate(date);
        return list != null ? list : new ArrayList<>();
    }




    @Transactional
    public Order createOrderWithDetails(OrderRequestDTO request) {
        // 1. Tạo đơn hàng từ OrderDTO
        OrderDTO orderDTO = request.getOrder();
        Order order = orderMapper.mapOrderDtoToOrder(orderDTO);
        Profile customer = customerRepository.findById(orderDTO.getIdCustomer())
                .orElseThrow(() -> new RuntimeException("Customer not found with id: " + orderDTO.getIdCustomer()));
        order.setProfile(customer);
        Order savedOrder = orderRepository.save(order); // Lưu đơn hàng vào DB

        // 2. Tạo và lưu danh sách chi tiết đơn hàng
        List<OrderDetailDTO> orderDetailDTOs = request.getOrderDetails();
        if (orderDetailDTOs != null && !orderDetailDTOs.isEmpty()) {
            for (OrderDetailDTO detailDTO : orderDetailDTOs) {
                Product product = productRepository.findById(detailDTO.getIdProduct())
                        .orElseThrow(() -> new RuntimeException("Product not found with id: " + detailDTO.getIdProduct()));

                OrderDetail orderDetail = orderDetailMapper.mapOrderDetail(detailDTO);
                orderDetail.setProduct(product);
                orderDetail.setOrder(savedOrder); // Liên kết với đơn hàng vừa tạo
                orderDetail.setSize(detailDTO.getSize());

                ProductSize productSize = productSizeRepository.findByProduct_IdProductAndSize(product.getIdProduct(), detailDTO.getSize())
                        .orElseThrow(() -> new RuntimeException("Product size not found for product " + product.getIdProduct() + " and size " + detailDTO.getSize()));
                if (productSize.getQuantity() < orderDetail.getQuantity()) {
                    throw new RuntimeException("Not enough stock for product " + product.getIdProduct() + " size " + detailDTO.getSize());
                }
                productSize.setQuantity(productSize.getQuantity() - orderDetail.getQuantity());
                productSizeRepository.save(productSize);

                orderDetailRepository.save(orderDetail);
            }
        }



        // 4. Tạo Cart mới
        Cart cart = new Cart();
        cart.setProfile(customer);
        cart.setQuantity(0);
        cartRepository.save(cart);

        return savedOrder;
    }}
