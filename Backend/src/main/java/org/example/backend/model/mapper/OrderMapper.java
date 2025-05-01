package org.example.backend.model.mapper;

import org.example.backend.model.DTO.AllOrderDTO;
import org.example.backend.model.DTO.OrderDTO;
import org.example.backend.model.Order;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface OrderMapper {
//    @Mapping(target = "idCustomer", source = "customer.idCustomer")
//@Mappings({
//        @Mapping(target = "fullNameCustomer", source = "fullNameCustomer"),
//        @Mapping(target = "address", source = "address"),
//        @Mapping(target = "numberPhone", source = "numberPhone"),
//        @Mapping(target = "statusPayment", source = "statusPayment"),
//})
    Order mapOrderDtoToOrder(OrderDTO orderDTO);
    AllOrderDTO orderToAllOrderDTO(Order order);
}
