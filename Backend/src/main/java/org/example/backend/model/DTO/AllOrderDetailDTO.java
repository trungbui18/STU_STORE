package org.example.backend.model.DTO;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.backend.model.SizeType;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AllOrderDetailDTO {
    int price;
    int quantity;
    int total;
    int idOrder;
    int idProduct;
    String productName;
    @Enumerated(EnumType.STRING)
    @Column(length = 10, nullable = false)
    SizeType size;
    String urlImage;
}
