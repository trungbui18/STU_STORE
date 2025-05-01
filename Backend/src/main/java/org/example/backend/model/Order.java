package org.example.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "orders")
@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int idOrder;
    String status;
    int totalPrice;

    String fullNameCustomer;
    String address;
    String numberPhone;
    String statusPayment;

    @Column(name = "create_at")
    LocalDateTime createAt;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name="coupon_id")
    Coupon coupon;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "profile_id" ,nullable = false )
    Profile profile;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    List<OrderDetail> orderDetails;

    @PrePersist
    public void prePersist()
    {
        this.createAt = LocalDateTime.now();
        this.orderDetails=new ArrayList<OrderDetail>();
    }
}
