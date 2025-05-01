package org.example.backend.model.DTO;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderDTO {
    int idCustomer;
    String status;
    int totalPrice;
    String fullNameCustomer;
    String address;
    String numberPhone;
    String statusPayment;
}
