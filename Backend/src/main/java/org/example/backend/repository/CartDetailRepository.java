package org.example.backend.repository;

import org.example.backend.model.Cart;
import org.example.backend.model.CartDetail;
import org.example.backend.model.Product;
import org.example.backend.model.SizeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartDetailRepository extends JpaRepository<CartDetail, Integer> {
    Optional<CartDetail> findByCartAndProductAndSize(Cart cart, Product product, SizeType size);
    Optional<List<CartDetail>> findByCart_IdCart(int idCart);
    Optional<CartDetail> findByCart_IdCartAndProduct_IdProductAndSize(int idCart, int idProduct, SizeType size);

}
