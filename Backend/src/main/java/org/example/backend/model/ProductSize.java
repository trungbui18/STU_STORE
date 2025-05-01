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
@Table(name = "product_size")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductSize {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int idProductSize;

    @Enumerated(EnumType.STRING)
    @Column(length = 10, nullable = false)
    SizeType size;

    @Column(nullable = false)
    int quantity;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    @JsonBackReference
    Product product;


}
