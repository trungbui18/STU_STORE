package org.example.backend.controller;

import org.example.backend.model.DTO.AllOrderDTO;
import org.example.backend.model.DTO.OrderDTO;
import org.example.backend.model.DTO.OrderRequestDTO;
import org.example.backend.model.Order;
import org.example.backend.service.OrderService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/order")
public class OrderController {
    OrderService orderService;
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<AllOrderDTO>> getAll() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @PostMapping("/create")
    public ResponseEntity<?> createOrder(@RequestBody OrderRequestDTO orderRequestDTO) {
        try {
            Order createdOrder = orderService.createOrderWithDetails(orderRequestDTO);
            return ResponseEntity.ok(createdOrder);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/revenue")
    public ResponseEntity<?> getRevenueBetweenDates(
            @RequestParam("startDate") String startDate,
            @RequestParam("endDate") String endDate
    ) {
        try {
            LocalDate start = LocalDate.parse(startDate);
            LocalDate end = LocalDate.parse(endDate);
            System.out.println(start);
            System.out.println(end);
            return ResponseEntity.ok(orderService.getRevenueByHour(start, end));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid date format. Expected format is yyyy-MM-dd.");
        }
    }

    @GetMapping("/revenue/oneday")
    public ResponseEntity<?> getRevenueOneDate(
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
    ) {
        try {
            return ResponseEntity.ok(orderService.getRevenueOneDay(date));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid date format. Expected format is yyyy-MM-dd.");
        }
    }



    @PutMapping("/update-status/{idOrder}")
    public ResponseEntity<Map<String, String>> updateOrder(
            @PathVariable int idOrder,
            @RequestParam String status) {
        try {
            Order order = orderService.orderUpdate(idOrder, status);
            String statusUpdated = order.getStatus();
            return ResponseEntity.ok(Map.of(
                    "status", "success",
                    "message", "Đã chuyển trạng thái thành " + statusUpdated
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("status", "error", "message", "Cập nhật thất bại"));
        }
    }

}
