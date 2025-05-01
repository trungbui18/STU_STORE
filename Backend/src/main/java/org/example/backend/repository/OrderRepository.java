package org.example.backend.repository;

import jakarta.websocket.server.PathParam;
import org.example.backend.model.DTO.RevenueInDayDTO;
import org.example.backend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {

    @Query(value = "SELECT HOUR(o.create_at) AS hour, SUM(o.total_price) AS revenue, DATE(o.create_at) AS date " +
            "FROM orders o " +
            "WHERE DATE(o.create_at) BETWEEN :startDate AND :endDate " +
            "GROUP BY HOUR(o.create_at), DATE(o.create_at) " +
            "ORDER BY hour", nativeQuery = true)
    List<RevenueInDayDTO> getRevenueByHourBetweenDates(
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );


    @Query(value = "SELECT HOUR(o.create_at) AS hour, SUM(o.total_price) AS revenue, DATE(o.create_at) AS date " +
            "FROM orders o " +
            "WHERE DATE(o.create_at) = :date " +
            "GROUP BY HOUR(o.create_at) " +
            "ORDER BY hour", nativeQuery = true)
    List<RevenueInDayDTO> getRevenueByHourForDate(@Param("date") LocalDate date);

}

