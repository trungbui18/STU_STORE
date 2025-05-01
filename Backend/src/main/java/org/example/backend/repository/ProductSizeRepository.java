package org.example.backend.repository;

import jakarta.transaction.Transactional;
import org.example.backend.model.Product;
import org.example.backend.model.ProductSize;
import org.example.backend.model.SizeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ProductSizeRepository extends JpaRepository<ProductSize, Integer> {
    @Transactional
    @Modifying
    @Query("DELETE FROM ProductSize ps WHERE ps.product = :product")
    void deleteByProduct(@Param("product") Product product);

    Optional<ProductSize> findByProduct_IdProductAndSize(Integer product, SizeType size);

}
