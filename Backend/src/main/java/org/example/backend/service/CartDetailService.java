package org.example.backend.service;

import org.example.backend.model.Cart;
import org.example.backend.model.CartDetail;
import org.example.backend.model.DTO.CartDetailDTO;
import org.example.backend.model.DTO.CartDetailRequestDTO;
import org.example.backend.model.DTO.CartDetailUpdateDTO;
import org.example.backend.model.DTO.CheckProductQuantityDTO;
import org.example.backend.model.Product;
import org.example.backend.model.ProductSize;
import org.example.backend.model.mapper.CartDetailMapper;
import org.example.backend.model.mapper.ProductMapper;
import org.example.backend.repository.CartDetailRepository;
import org.example.backend.repository.CartRepository;
import org.example.backend.repository.CustomerRepository;
import org.example.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartDetailService {
    CartDetailRepository cartDetailRepository;
    ProductRepository productRepository;
    CartRepository cartRepository;
    CartDetailMapper cartDetailMapper;

    public CartDetailService(CartDetailRepository cartDetailRepository, ProductRepository productRepository, CartRepository cartRepository, CartDetailMapper cartDetailMapper) {
        this.cartDetailRepository = cartDetailRepository;
        this.productRepository = productRepository;
        this.cartRepository = cartRepository;
        this.cartDetailMapper = cartDetailMapper;
    }

    public CartDetail createCartDetail(CartDetailRequestDTO cartDetailRequestDTO) {
        Product product = productRepository.findById(cartDetailRequestDTO.getIdProduct())
                .orElseThrow(() -> new RuntimeException("Product not found"));
        Cart cart = cartRepository.findById(cartDetailRequestDTO.getIdCart())
                .orElseThrow(() -> new RuntimeException("Cart not found"));
        Optional<CartDetail> existingCartDetail = cartDetailRepository.findByCartAndProductAndSize(cart, product, cartDetailRequestDTO.getSize());

        if (existingCartDetail.isPresent()) {
            CartDetail cartDetail = existingCartDetail.get();
            cartDetail.setQuantity(cartDetail.getQuantity() + cartDetailRequestDTO.getQuantity());
            return cartDetailRepository.save(cartDetail);
        } else {
            CartDetail cartDetail = new CartDetail();
            cartDetail.setProduct(product);
            cartDetail.setCart(cart);
            cartDetail.setQuantity(cartDetailRequestDTO.getQuantity());
            cartDetail.setSize(cartDetailRequestDTO.getSize());
            return cartDetailRepository.save(cartDetail);
        }
    }



    public List<CartDetailDTO> getAll_CartDetail_ByCartId(int cartId) {
        List<CartDetail>cartDetails=cartDetailRepository.findByCart_IdCart(cartId).orElseThrow(() -> new RuntimeException("Cart not found"));
        return cartDetails.stream().map(cartdetail->cartDetailMapper.toCartDetailsDTO(cartdetail)).collect(Collectors.toList());
    }

    public CartDetailDTO updateCartDetail(int idCartDetail, CartDetailUpdateDTO cartDetailUpdate) {
        CartDetail cartDetail = cartDetailRepository.findById(idCartDetail)
                .orElseThrow(() -> new RuntimeException("Cart detail not found"));

        Optional<CartDetail> existingCartDetail = cartDetailRepository.findByCart_IdCartAndProduct_IdProductAndSize(
                cartDetail.getCart().getIdCart(),
                cartDetail.getProduct().getIdProduct(),
                cartDetailUpdate.getSize()
        );

        if (existingCartDetail.isPresent() && existingCartDetail.get().getIdCartDetail() != idCartDetail) {
            CartDetail target = existingCartDetail.get();
            target.setQuantity(target.getQuantity() + cartDetailUpdate.getQuantity());
            cartDetailRepository.save(target);
            cartDetailRepository.delete(cartDetail);
            return cartDetailMapper.toCartDetailsDTO(target);
        } else {
            cartDetail.setQuantity(cartDetailUpdate.getQuantity());
            cartDetail.setSize(cartDetailUpdate.getSize());
            cartDetailRepository.save(cartDetail);
            return cartDetailMapper.toCartDetailsDTO(cartDetail);
        }
    }

    public CartDetailDTO deleteCartDetail(int idCartDetail){
        CartDetail cartdetail=cartDetailRepository.findById(idCartDetail).orElseThrow(() -> new RuntimeException("CartDetails not found"));
        cartDetailRepository.delete(cartdetail);
        return cartDetailMapper.toCartDetailsDTO(cartdetail);
    }

    public CheckProductQuantityDTO checkQuantityInSize(CheckProductQuantityDTO productCheck) {
        Product product = productRepository.findById(productCheck.getIdProduct())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        List<ProductSize> productSizes = product.getSizes();
        for (ProductSize productSize : productSizes) {
            if (productSize.getSize().equals(productCheck.getSize())) {
                productCheck.setStockQuantity(productSize.getQuantity());
                if (productSize.getQuantity() < productCheck.getQuantity()) {
                    productCheck.setMessage(
                            "Hiện chỉ còn " + productSize.getQuantity() + " sản phẩm với kích thước " + productCheck.getSize()
                    );
                } else {
                    productCheck.setMessage("Số lượng đủ");
                }
                return productCheck;
            }
        }

        productCheck.setStockQuantity(0);
        productCheck.setMessage("Kích thước " + productCheck.getSize() + " không tồn tại cho sản phẩm này");
        return productCheck;
    }
}
