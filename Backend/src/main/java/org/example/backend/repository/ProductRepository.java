package org.example.backend.repository;

import org.example.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByNameContainingIgnoreCase(String name);
    Optional<List<Product>> findByCartDetails_Cart_IdCart(int idCart);
    @Query("SELECT p FROM Product p WHERE p.idProduct IN :ids")
    List<Product> findProductsByIds(@Param("ids") List<Integer> ids);}
