package org.example.backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int idProfile;
    String name;
    String address;
    String numberPhone;
    Date birthday;

    @OneToOne
    @JoinColumn(name = "account_id" , unique = true )
    Account account;

    @OneToOne(mappedBy = "profile",cascade = CascadeType.ALL,orphanRemoval = true)
    Cart cart;

    @OneToMany(mappedBy = "profile",cascade = CascadeType.ALL,orphanRemoval = true)
    @JsonManagedReference
    List<Order> orders;

}
