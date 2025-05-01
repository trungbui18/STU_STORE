package org.example.backend.model.mapper;

import org.example.backend.model.CartDetail;
import org.example.backend.model.DTO.CartDetailDTO;

import org.example.backend.model.DTO.CartDetailUpdateDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")

public interface CartDetailMapper {
    @Mapping(target = "idCartDetail", source = "idCartDetail") // Rõ ràng ánh xạ
    @Mapping(target = "productName", source = "product.name")
    @Mapping(target = "urlImage", source = "cartDetail", qualifiedByName = "mapFirstImageUrl")
    @Mapping(target = "price", source = "product.price")
    @Mapping(target = "idProduct", source = "product.idProduct")
    CartDetailDTO toCartDetailsDTO(CartDetail cartDetail);

    @Named("mapFirstImageUrl")
    default String mapFirstImageUrl(CartDetail cartDetail) {
        return cartDetail.getProduct().getImages().isEmpty() ? null : cartDetail.getProduct().getImages().get(0).getUrlImage();
    }

    CartDetail cartDetailUpdateDTOToCartDetail(CartDetailUpdateDTO cartDetailUpdateDTO);

}
