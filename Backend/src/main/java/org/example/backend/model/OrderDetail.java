package org.example.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int idOrderDetail;
    int price;
    int quantity;
    int total;


    @ManyToOne
    @JoinColumn(name = "order_id",nullable = false)
    @JsonBackReference
    Order order;

    @ManyToOne
    @JoinColumn(name = "product_id",nullable = false)
    @JsonBackReference
    Product product;

    @Enumerated(EnumType.STRING)
    @Column(length = 10, nullable = false)
    SizeType size;

    @PrePersist
    @PreUpdate
    public void prePersist() {
        this.total = this.price * this.quantity;
    }

}
