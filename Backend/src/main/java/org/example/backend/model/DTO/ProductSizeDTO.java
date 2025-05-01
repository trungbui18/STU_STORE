package org.example.backend.model.DTO;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.backend.model.SizeType;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@ToString
public class ProductSizeDTO {
     SizeType size;
     int quantity;
}
