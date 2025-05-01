package org.example.backend.service;

import org.example.backend.model.DTO.AllOrderDetailDTO;
import org.example.backend.model.DTO.OrderDetailDTO;
import org.example.backend.model.DTO.OrderResponseDTO;
import org.example.backend.model.Order;
import org.example.backend.model.OrderDetail;
import org.example.backend.model.Product;
import org.example.backend.model.ProductSize;
import org.example.backend.model.mapper.OrderDetailMapper;
import org.example.backend.model.mapper.OrderMapper;
import org.example.backend.repository.OrderDetailRepository;
import org.example.backend.repository.OrderRepository;
import org.example.backend.repository.ProductRepository;
import org.example.backend.repository.ProductSizeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderDetailService {
    OrderDetailRepository orderDetailRepository;
    ProductRepository productRepository;
    OrderRepository orderRepository;
    ProductSizeRepository productSizeRepository;
    OrderDetailMapper orderDetailMapper;

    public OrderDetailService(OrderDetailRepository orderDetailRepository, ProductRepository productRepository, OrderRepository orderRepository, ProductSizeRepository productSizeRepository, OrderDetailMapper orderDetailMapper) {
        this.orderDetailRepository = orderDetailRepository;
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.productSizeRepository = productSizeRepository;
        this.orderDetailMapper = orderDetailMapper;
    }


    public OrderDetailDTO createOrderDetail(OrderDetailDTO orderDetailDTO) {
        Product product=productRepository.findById(orderDetailDTO.getIdProduct()).orElseThrow(()->new RuntimeException("Product not found"));
        Order order=orderRepository.findById(orderDetailDTO.getIdOrder()).orElseThrow(()->new RuntimeException("Order not found"));

        OrderDetail orderDetail= orderDetailMapper.mapOrderDetail(orderDetailDTO);
        orderDetail.setProduct(product);
        orderDetail.setOrder(order);
        orderDetail.setSize(orderDetailDTO.getSize());

        ProductSize productSize=productSizeRepository.findByProduct_IdProductAndSize(product.getIdProduct(),orderDetailDTO.getSize()).orElseThrow(()->new RuntimeException("Product size not found"));
        productSize.setQuantity(productSize.getQuantity()-orderDetail.getQuantity());
        productSizeRepository.save(productSize);
        orderDetailRepository.save(orderDetail);
        return orderDetailMapper.mapOrderDetailDTO(orderDetail);
    }

    public OrderDetailDTO deleteOrderDetail(int idOrderDetail){
        OrderDetail orderDetail= orderDetailRepository.findById(idOrderDetail).orElseThrow(()->new RuntimeException("OrderDetail not found"));
        ProductSize productSize=productSizeRepository.findByProduct_IdProductAndSize(orderDetail.getProduct().getIdProduct(),orderDetail.getSize()).orElseThrow(()->new RuntimeException("Product size not found"));
        productSize.setQuantity(productSize.getQuantity()+orderDetail.getQuantity());
        productSizeRepository.save(productSize);
        orderDetailRepository.delete(orderDetail);
        return orderDetailMapper.mapOrderDetailDTO(orderDetail);
    }


}
