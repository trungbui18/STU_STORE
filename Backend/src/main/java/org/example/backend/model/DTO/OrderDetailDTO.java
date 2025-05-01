package org.example.backend.model.DTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
public class OrderDetailDTO {
    int idProduct;
    int idOrder;
    int price;
    int quantity;
    @Enumerated(EnumType.STRING)
    @Column(length = 10, nullable = false)
    SizeType size;

}
