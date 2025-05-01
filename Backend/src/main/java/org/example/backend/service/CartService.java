package org.example.backend.service;

import org.example.backend.model.Cart;
import org.example.backend.model.DTO.CartCreateDTO;
import org.example.backend.model.DTO.CartDTO;
import org.example.backend.model.Profile;
import org.example.backend.model.mapper.CartMapper;
import org.example.backend.repository.CartRepository;
import org.example.backend.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartService {
    CartRepository cartRepository;
    CustomerRepository customerRepository;
    CartMapper cartMapper;

    public CartService(CartRepository cartRepository, CustomerRepository customerRepository, CartMapper cartMapper) {
        this.cartRepository = cartRepository;
        this.customerRepository = customerRepository;
        this.cartMapper = cartMapper;
    }

    public Cart CreateCart(CartCreateDTO cartDTO) {
        Profile customer = customerRepository.findById(cartDTO.getIdCustomer()).orElseThrow(()->new RuntimeException("ko tim thay user"));
        Cart cart = new Cart();
        cart.setProfile(customer);
        cart.setQuantity(cartDTO.getQuantity());
        return cartRepository.save(cart);
    }

    public CartDTO GetCart(int idUser) {
        Cart cart=cartRepository.findByProfile_IdProfile(idUser).orElseThrow(()->new RuntimeException("ko tim thay user"));
        if(cart==null){
            return new CartDTO(0,0,idUser);
        }
        return cartMapper.toCartDTO(cart);
    }

    public Cart updateCart(CartDTO cartDTO){
        Cart cart=cartRepository.findById(cartDTO.getIdCart()).orElseThrow(()->new RuntimeException("ko tim thay cart user"));
        cart.setQuantity(cartDTO.getQuantity());
        return cartRepository.save(cart);
    }
}
