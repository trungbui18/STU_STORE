package org.example.backend.model.mapper;

import org.example.backend.model.CartDetail;
import org.example.backend.model.DTO.AllOrderDetailDTO;
import org.example.backend.model.DTO.OrderDetailDTO;
import org.example.backend.model.Order;
import org.example.backend.model.OrderDetail;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface OrderDetailMapper {

    @Mapping(source = "idProduct", target = "product.idProduct")
    @Mapping(source = "idOrder", target = "order.idOrder")
    OrderDetail mapOrderDetail(OrderDetailDTO dto);

    @Mapping(source = "product.idProduct", target = "idProduct")
    @Mapping(source = "order.idOrder", target = "idOrder")
    OrderDetailDTO mapOrderDetailDTO(OrderDetail orderDetail);

    @Mapping(source = "order.idOrder", target = "idOrder")
    @Mapping(source = "product.idProduct", target = "idProduct")
    @Mapping(source = "product.name", target = "productName")
    @Mapping(source = "orderDetail", target = "urlImage", qualifiedByName = "mapFirstImageUrl")
    AllOrderDetailDTO mapOrderDetailToAllOrderDetailDTO(OrderDetail orderDetail);
    @Named("mapFirstImageUrl")
    default String mapFirstImageUrl(OrderDetail orderDetail) {
        return orderDetail.getProduct().getImages().isEmpty() ? null : orderDetail.getProduct().getImages().get(0).getUrlImage();
    }

}

