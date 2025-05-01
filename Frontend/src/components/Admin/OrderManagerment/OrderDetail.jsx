import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function OrderDetail() {
  const { idOrder } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/order-detail/getOrderDetail_ByOrderId/${idOrder}`
        );
        setOrder(response.data);
      } catch (error) {
        console.log("Lỗi khi lấy đơn hàng: ", error);
      }
    };

    fetchOrderDetail();
  }, [idOrder]);

  const getNextStatus = (status) => {
    switch (status) {
      case "PENDDING":
        return "PROCESSING";
      case "PROCESSING":
        return "SHIPPING";
      case "SHIPPING":
        return "COMPLETE";
      default:
        return null;
    }
  };

  const updateStatus = async (newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/order/update-status/${idOrder}`,
        null,
        { params: { status: newStatus } }
      );

      if (response.data.status === "success") {
        alert(response.data.message);
        setOrder((prev) => ({ ...prev, status: newStatus }));
      } else {
        alert("Không thể cập nhật trạng thái!");
      }
    } catch (error) {
      console.error("Lỗi cập nhật trạng thái:", error);
      alert("Lỗi khi cập nhật trạng thái!");
    }
  };

  const handleStatusChange = () => {
    const next = getNextStatus(order.status);
    if (next) {
      updateStatus(next);
    }
  };

  if (!order) {
    return <p className="text-center mt-8">Đang tải dữ liệu đơn hàng...</p>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Chi tiết đơn hàng #{idOrder}
      </h2>

      <div className="mb-6 text-gray-700 space-y-1">
        <p>
          <strong>Khách hàng:</strong> {order.fullNameCustomer}
        </p>
        <p>
          <strong>Địa chỉ:</strong> {order.address}
        </p>
        <p>
          <strong>Số điện thoại:</strong> {order.numberPhone}
        </p>
        <p>
          <strong>Trạng thái đơn hàng:</strong>{" "}
          <span className="text-blue-600 font-semibold">{order.status}</span>
        </p>
        <p>
          <strong>Thanh toán:</strong> {order.statusPayment}
        </p>
        <p>
          <strong>Tổng tiền:</strong> {order.totalPrice.toLocaleString()} đ
        </p>
      </div>

      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Sản phẩm trong đơn hàng
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {order.orderDetails?.map((item, index) => (
          <div
            key={index}
            className="flex border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            <img
              src={`http://localhost:8080/assets/${item.urlImage}`}
              alt={item.productName}
              className="w-24 h-24 object-cover rounded-md mr-4"
            />
            <div className="flex flex-col justify-between">
              <h4 className="font-semibold text-gray-800">
                {item.productName}
              </h4>
              <p>Size: {item.size}</p>
              <p>Số lượng: {item.quantity}</p>
              <p>Đơn giá: {item.price.toLocaleString()} đ</p>
              <p className="font-medium text-green-600">
                Tổng: {item.total.toLocaleString()} đ
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Nút xử lý trạng thái */}
      <div className="flex justify-end mt-6 space-x-4">
        {order.status !== "COMPLETE" && order.status !== "CANCEL" && (
          <>
            <button
              onClick={handleStatusChange}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full shadow-md transition"
            >
              Tiếp theo: {getNextStatus(order.status)}
            </button>

            <button
              onClick={() => updateStatus("CANCEL")}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full shadow-md transition"
            >
              Hủy đơn hàng
            </button>
          </>
        )}

        {order.status === "COMPLETE" && (
          <span className="text-green-600 font-bold text-lg">
            ✅ Đã hoàn tất
          </span>
        )}

        {order.status === "CANCEL" && (
          <span className="text-red-600 font-bold text-lg">❌ Đã hủy</span>
        )}
      </div>
    </div>
  );
}
