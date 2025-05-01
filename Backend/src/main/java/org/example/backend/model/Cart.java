package org.example.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int idCart;
    int quantity;

    @OneToOne
    @JoinColumn(name = "profile_id" ,nullable = false )
    Profile profile;

    @OneToMany(mappedBy = "cart",cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    List<CartDetail> cartDetails;

}
