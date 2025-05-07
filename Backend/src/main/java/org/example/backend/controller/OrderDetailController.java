package org.example.backend.controller;

import org.example.backend.model.DTO.OrderDetailDTO;
import org.example.backend.model.DTO.OrderResponseDTO;
import org.example.backend.model.OrderDetail;
import org.example.backend.service.OrderDetailService;
import org.example.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/order-detail")
public class OrderDetailController {
    private final OrderService orderService;
    private final OrderDetailService orderDetailService;

    public OrderDetailController(OrderDetailService orderDetailService, OrderService orderService) {
        this.orderDetailService = orderDetailService;
        this.orderService = orderService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createOrderDetail(@RequestBody OrderDetailDTO orderDetailDTO) {
        try {
            OrderDetailDTO orderDetail = orderDetailService.createOrderDetail(orderDetailDTO);
            return ResponseEntity.ok(orderDetail);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/delete/{idOrderDetail}")
    public ResponseEntity<?> deleteOrderDetail(@PathVariable int idOrderDetail) {
        try {
            OrderDetailDTO orderDetailDTO = orderDetailService.deleteOrderDetail(idOrderDetail);
            return ResponseEntity.ok(orderDetailDTO);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/getOrderDetail_ByOrderId/{idOrder}")
    public ResponseEntity<?> getOrderDetailByOrderId(@PathVariable int idOrder) {
        OrderResponseDTO orderResponseDTO=orderService.getAllOrderDetailByOrderId(idOrder);
        return ResponseEntity.ok(orderResponseDTO);
    }
}
