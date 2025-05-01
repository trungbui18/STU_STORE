package org.example.backend.repository;

import org.example.backend.model.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CouponRepository extends JpaRepository<Coupon, Integer> {
    boolean existsByCode(int code);
    Optional<Coupon> findByCode(int code);
}
