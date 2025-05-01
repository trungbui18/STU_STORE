package org.example.backend.controller;

import org.example.backend.model.Cart;
import org.example.backend.model.DTO.CartCreateDTO;
import org.example.backend.model.DTO.CartDTO;
import org.example.backend.service.CartService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/cart")
public class CartController {
    CartService cartService;
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/cart-by-idUser/{idUser}")
    public ResponseEntity<?> getCartById(@PathVariable int idUser) {
        try {
            return ResponseEntity.ok(cartService.GetCart(idUser));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi hệ thống cook : " + e.getMessage());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateCart(@RequestBody CartDTO cartDTO) {
        try {
            cartService.updateCart(cartDTO);
            return ResponseEntity.ok("Cập nhật thành công");
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getReason());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Dữ liệu không hợp lệ: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi hệ thống: " + e.getMessage());
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createCart(@RequestBody CartCreateDTO cartDTO) {
        try {
            Cart cart=cartService.CreateCart(cartDTO);
            return ResponseEntity.ok(cart);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Dữ liệu không hợp lệ: " + e.getMessage());
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi hệ thống: " + e.getMessage());
        }
    }

}
