package org.example.backend.model.mapper;

import org.example.backend.model.Cart;
import org.example.backend.model.DTO.CartDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CartMapper {
    CartDTO toCartDTO(Cart cart);


}
