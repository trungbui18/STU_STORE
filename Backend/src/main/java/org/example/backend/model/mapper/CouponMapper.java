package org.example.backend.model.mapper;

import org.example.backend.model.Coupon;
import org.example.backend.model.DTO.AllCouponDTO;
import org.example.backend.model.DTO.CouponDTO;
import org.example.backend.model.DTO.CouponResponseDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CouponMapper {
    Coupon mapCouponDTOtoCoupon(CouponDTO couponDTO);
    CouponDTO mapCouponToCouponDTO(Coupon coupon);
    CouponResponseDTO mapCouponToCouponResponseDTO(Coupon coupon);
    @Mapping(source = "code", target = "code")
    AllCouponDTO mapCouponToAllCouponDTO(Coupon coupon);
}
