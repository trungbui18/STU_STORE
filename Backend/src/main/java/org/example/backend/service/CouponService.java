package org.example.backend.service;

import org.example.backend.model.Coupon;
import org.example.backend.model.DTO.AllCouponDTO;
import org.example.backend.model.DTO.CouponCheckDTO;
import org.example.backend.model.DTO.CouponDTO;
import org.example.backend.model.DTO.CouponResponseDTO;
import org.example.backend.model.Staff;
import org.example.backend.model.mapper.CouponMapper;
import org.example.backend.repository.CouponRepository;
import org.example.backend.repository.StaffRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class CouponService {
    CouponRepository couponRepository;
    CouponMapper couponMapper;
    StaffRepository staffRepository;
    private Random random = new Random();

    public CouponService(CouponRepository couponRepository, CouponMapper couponMapper, StaffRepository staffRepository) {
        this.couponRepository = couponRepository;
        this.couponMapper = couponMapper;
        this.staffRepository = staffRepository;
    }

    public List<AllCouponDTO> getAllCoupons() {
        List<Coupon> coupons = couponRepository.findAll();
        List<AllCouponDTO> listResponseDTO = coupons.stream().map(coupon -> couponMapper.mapCouponToAllCouponDTO(coupon)).collect(Collectors.toList());
        return listResponseDTO;
    }

    public CouponResponseDTO getCouponById(int id) {
        Coupon coupon = couponRepository.findById(id).orElseThrow(()->new RuntimeException("Coupon Not Found"));
        return couponMapper.mapCouponToCouponResponseDTO(coupon);
    }



    public CouponCheckDTO checkCouponByCode(int code) {
        Coupon coupon = couponRepository.findByCode(code).orElse(null);
        CouponCheckDTO couponCheckDTO = new CouponCheckDTO();

        if (coupon == null) {
            couponCheckDTO.setCheck(false);
            couponCheckDTO.setMessage("Coupon not found");
            return couponCheckDTO;
        }
        LocalDate now=LocalDate.now();
        if(now.isAfter(coupon.getEndDate())){
            couponCheckDTO.setCheck(false);
            couponCheckDTO.setMessage("Mã đã hết hạn");
            return couponCheckDTO;
        }
        if(now.isBefore(coupon.getStartDate())){
            couponCheckDTO.setCheck(false);
            couponCheckDTO.setMessage("Mã không hợp lệ");
            return couponCheckDTO;
        }
        couponCheckDTO.setCheck(true);
        couponCheckDTO.setPercentDiscount(coupon.getDiscount_percent());
        couponCheckDTO.setCode(code);
        couponCheckDTO.setMessage("Mã Hợp Lệ !");

        return couponCheckDTO;
    }

    public CouponResponseDTO createCoupon(CouponDTO couponDTO) {
        Coupon coupon=couponMapper.mapCouponDTOtoCoupon(couponDTO);
        coupon.setCode(generateUniqueCode());
        couponRepository.save(coupon);
        return couponMapper.mapCouponToCouponResponseDTO(coupon);
    }

    private int generateUniqueCode() {
        int maxAttempts = 10;
        for (int i = 0; i < maxAttempts; i++) {
            int newCode = 100000 + random.nextInt(900000);
            if (!couponRepository.existsByCode(newCode)) {
                return newCode;
            }
        }
        throw new RuntimeException("Unable to generate unique coupon code after " + maxAttempts + " attempts");
    }

    public CouponResponseDTO updateCoupon(int idCoupon, CouponDTO couponDTO) {
        Coupon coupon=couponRepository.findById(idCoupon).orElseThrow(()->new RuntimeException("Khong tim mấy mã giảm cần sửa "));
        coupon.setCouponName(couponDTO.getCouponName());
        coupon.setDiscount_percent(couponDTO.getDiscount_percent());
        coupon.setStartDate(couponDTO.getStartDate());
        coupon.setEndDate(couponDTO.getEndDate());
        couponRepository.save(coupon);
        return couponMapper.mapCouponToCouponResponseDTO(coupon);
    }

    public CouponResponseDTO deleteCoupon(int idCoupon) {
        Coupon coupon=couponRepository.findById(idCoupon).orElseThrow(()->new RuntimeException("khong tim thay ma giam gia"));
        couponRepository.delete(coupon);
        return couponMapper.mapCouponToCouponResponseDTO(coupon);

    }


}
