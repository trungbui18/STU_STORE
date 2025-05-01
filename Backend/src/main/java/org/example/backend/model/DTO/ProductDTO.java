package org.example.backend.model.DTO;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@ToString
public class ProductDTO {
    int idProduct;
    String name;
    double price;
    String description;
    List<ProductSizeDTO> sizes;
    private List<ProductImageDTO> images;
}
