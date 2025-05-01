package org.example.backend.model.DTO;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RevenueInDayDTO {
    Integer hour;
    BigDecimal revenue;
    Date date;
}
