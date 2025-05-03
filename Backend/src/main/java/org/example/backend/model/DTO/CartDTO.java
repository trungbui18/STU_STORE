package org.example.backend.model.DTO;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@ToString
public class CartDTO {
    Integer idCart;
    int quantity;

}
