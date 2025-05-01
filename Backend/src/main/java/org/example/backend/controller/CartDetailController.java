package org.example.backend.controller;

import org.example.backend.model.CartDetail;
import org.example.backend.model.DTO.CartDetailDTO;
import org.example.backend.model.DTO.CartDetailRequestDTO;
import org.example.backend.model.DTO.CartDetailUpdateDTO;
import org.example.backend.model.DTO.CheckProductQuantityDTO;
import org.example.backend.service.CartDetailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart-detail")
public class CartDetailController {
    CartDetailService cartDetailService;

    public CartDetailController(CartDetailService cartDetailService) {
        this.cartDetailService = cartDetailService;
    }
    @PostMapping("/create")
    public ResponseEntity<?> craeteCartDetail(@RequestBody CartDetailRequestDTO cartDetailRequestDTO) {
        try {
            CartDetail cartDetail = cartDetailService.createCartDetail(cartDetailRequestDTO);
            return ResponseEntity.ok(cartDetail);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Dữ liệu không hợp lệ: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi hệ thống: " + e.getMessage());
        }
    }

    @GetMapping("/getAll-ByCartId/{cartId}")
    public ResponseEntity<?> getAllByCartId(@PathVariable("cartId") int cartId) {
        try {
            return ResponseEntity.ok(cartDetailService.getAll_CartDetail_ByCartId(cartId));
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/delete/{idCartDetail}")
    public ResponseEntity<?> deleteCartDetail(@PathVariable("idCartDetail") int idCartDetail) {
        CartDetailDTO cartDetailDTO=cartDetailService.deleteCartDetail(idCartDetail);
        return ResponseEntity.ok(cartDetailDTO);
    }

    @PutMapping("/update/{idCartDetail}")
    public ResponseEntity<?> updateCartDetail(@PathVariable("idCartDetail") int idCartDetail,
                                              @RequestBody CartDetailUpdateDTO cartDetailUpdateDTO) {
        CartDetailDTO cartDetailDTO=cartDetailService.updateCartDetail(idCartDetail,cartDetailUpdateDTO);
        return ResponseEntity.ok(cartDetailDTO);
    }

    @PostMapping("/check-quantity")
    public ResponseEntity<CheckProductQuantityDTO> checkQuantityInSize(
            @RequestBody CheckProductQuantityDTO productCheck) {
        CheckProductQuantityDTO result = cartDetailService.checkQuantityInSize(productCheck);
        return ResponseEntity.ok(result);
    }
}
