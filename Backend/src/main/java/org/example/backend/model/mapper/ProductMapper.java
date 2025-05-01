package org.example.backend.model.mapper;

import org.example.backend.model.DTO.AllCartDetailsDTO;
import org.example.backend.model.DTO.CartDetailDTO;
import org.example.backend.model.DTO.ProductDTO;
import org.example.backend.model.DTO.ProductRequest;
import org.example.backend.model.Product;
import org.example.backend.model.ProductSize;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring", uses = {ProductSizeMapper.class, ProductImageMapper.class})
public interface ProductMapper {
    ProductDTO toProductDTO(Product product);
    Product toProduct(ProductRequest productRequest);
    List<ProductDTO> toListProductDTO(List<Product> products);
    @Named("mapFirstImageUrl")
    default String mapFirstImageUrl(Product product) {
        return product.getImages().isEmpty() ? null : product.getImages().get(0).getUrlImage();
    }
    @AfterMapping
    default void linkProductSizes(@MappingTarget Product product) {
        if (product.getSizes() != null) {
            for (ProductSize size : product.getSizes()) {
                size.setProduct(product); // 🔥 Gán ngược lại product cho từng size
            }
        }
    }

}
