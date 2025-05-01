package org.example.backend.model.mapper;

import org.example.backend.model.DTO.ProductSizeDTO;
import org.example.backend.model.Product;
import org.example.backend.model.ProductSize;
import org.mapstruct.AfterMapping;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ProductSizeMapper {
    ProductSizeDTO toProductSizeDTO(ProductSize size);
    ProductSize toProductSizeEntity(ProductSizeDTO dto);
//    ProductSize toProductSize();
}
