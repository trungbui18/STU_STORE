package org.example.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CartDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int idCartDetail;
    int quantity;

    @Enumerated(EnumType.STRING)
    @Column(length = 10, nullable = false)
    SizeType size;

    @ManyToOne
    @JoinColumn(name = "cart_id",nullable = false)
    @JsonBackReference
    Cart cart;

    @ManyToOne
    @JoinColumn(name = "product_id",nullable = false)
    @JsonBackReference
    Product product;

}
