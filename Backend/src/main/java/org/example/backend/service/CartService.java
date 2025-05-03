package org.example.backend.service;

import org.example.backend.model.Cart;
import org.example.backend.model.DTO.CartCreateDTO;
import org.example.backend.model.DTO.CartDTO;
import org.example.backend.model.Profile;
import org.example.backend.model.mapper.CartMapper;
import org.example.backend.repository.CartRepository;
import org.example.backend.repository.ProfileRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartService {
    CartRepository cartRepository;
    ProfileRepository profileRepository;
    CartMapper cartMapper;

    public CartService(CartRepository cartRepository, ProfileRepository profileRepository, CartMapper cartMapper) {
        this.cartRepository = cartRepository;
        this.profileRepository = profileRepository;
        this.cartMapper = cartMapper;
    }

    public CartDTO CreateCart(CartCreateDTO cartDTO) {
        Profile customer = profileRepository.findById(cartDTO.getIdProfile()).orElseThrow(()->new RuntimeException("ko tim thay user"));
        Cart cart = new Cart();
        cart.setProfile(customer);
        cart.setQuantity(cartDTO.getQuantity());
        cartRepository.save(cart);
        return cartMapper.toCartDTO(cart);
    }

    public CartDTO GetCart(int idUser) {
        Optional<Cart> optionalCart = cartRepository.findByProfile_IdProfile(idUser);
        if (optionalCart.isEmpty()) {
            return new CartDTO(null, 0);
        }
        return cartMapper.toCartDTO(optionalCart.get());
    }


    public Cart updateCart(CartDTO cartDTO){
        Cart cart=cartRepository.findById(cartDTO.getIdCart()).orElseThrow(()->new RuntimeException("ko tim thay cart user"));
        cart.setQuantity(cartDTO.getQuantity());
        return cartRepository.save(cart);
    }
}
