package org.example.backend.model.DTO;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AllOrderDTO {
    int idOrder;
    String status;
    int totalPrice;
    LocalDate createAt;
    String statusPayment;
}
