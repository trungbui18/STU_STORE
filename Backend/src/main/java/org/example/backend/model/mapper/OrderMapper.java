package org.example.backend.model.mapper;

import org.example.backend.model.DTO.AllOrderDTO;
import org.example.backend.model.DTO.OrderDTO;
import org.example.backend.model.DTO.OrderResponseDTO;
import org.example.backend.model.Order;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    Order mapOrderDtoToOrder(OrderDTO orderDTO);
    AllOrderDTO orderToAllOrderDTO(Order order);
    OrderResponseDTO toOrderResponseDTO(Order order);

}
