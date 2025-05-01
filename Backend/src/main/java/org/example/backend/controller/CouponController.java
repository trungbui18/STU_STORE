package org.example.backend.controller;

import org.example.backend.model.Coupon;
import org.example.backend.model.DTO.AllCouponDTO;
import org.example.backend.model.DTO.CouponCheckDTO;
import org.example.backend.model.DTO.CouponDTO;
import org.example.backend.model.DTO.CouponResponseDTO;
import org.example.backend.service.CouponService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/coupon")
public class CouponController {
    CouponService couponService;
    public CouponController(CouponService couponService) {
        this.couponService = couponService;
    }
    @GetMapping("/exists/{code}")
    public ResponseEntity<CouponCheckDTO> checkCouponExists(@PathVariable("code") int code) {
        try {
            CouponCheckDTO exists = couponService.checkCouponByCode(code);
            return ResponseEntity.ok(exists);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/getById/{idCoupon}")
    public ResponseEntity<CouponResponseDTO> getCouponById(@PathVariable("idCoupon") int idCoupon) {
        CouponResponseDTO coupon = couponService.getCouponById(idCoupon);
        return ResponseEntity.ok(coupon);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createCoupon(@RequestBody CouponDTO couponDTO) {
        try {
            CouponResponseDTO couponResponseDTO = couponService.createCoupon(couponDTO);
            return ResponseEntity.ok(couponResponseDTO);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAllCoupons() {
        List<AllCouponDTO> response = couponService.getAllCoupons();
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/{idCoupon}")
    public ResponseEntity<?> deleteCoupon(@PathVariable int idCoupon) {
        try {
            CouponResponseDTO response = couponService.deleteCoupon(idCoupon);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @PutMapping("/update/{idCoupon}")
    public ResponseEntity<?> updateCoupon(@PathVariable int idCoupon,@RequestBody CouponDTO couponDTO) {
        try {
            CouponResponseDTO response = couponService.updateCoupon(idCoupon, couponDTO);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
