package org.example.backend.model.mapper;

import org.example.backend.model.DTO.ProductImageDTO;
import org.example.backend.model.ProductImage;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProductImageMapper {
    ProductImageDTO toProductImageDTO(ProductImage image);
    ProductImage toProductImageEntity(ProductImageDTO dto);
}
