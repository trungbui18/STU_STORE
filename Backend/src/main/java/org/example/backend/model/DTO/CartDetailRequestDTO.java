package org.example.backend.model.DTO;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.backend.model.SizeType;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@ToString
public class CartDetailRequestDTO {
    int idProduct;
    int idCart;
    int quantity;
    @Enumerated(EnumType.STRING)
    @Column(length = 10, nullable = false)
    SizeType size;
}
