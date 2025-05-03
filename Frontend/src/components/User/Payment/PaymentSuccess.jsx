import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import API_BASE_URL from "../../../config/apiConfig";

// Service để xử lý API
const apiService = {
  createOrder: async (orderRequest) => {
    const response = await axios.post(
      `${API_BASE_URL}/order/create`,

      orderRequest
    );
    return response.data;
  },
  createCart: async (cart) => {
    const response = await axios.post(`${API_BASE_URL}/cart/create`, cart, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  },
};

const formatOrderInfo = (order) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`; // Kết quả: 13/04/2025
  };

  const getDateForOrderId = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`; // Kết quả: 20250413
  };

  return {
    orderId: order.idOrder
      ? `DH${order.idOrder}${getDateForOrderId(order.createAt)}`
      : "N/A",
    date: formatDate(order.createAt),
    total: order.totalPrice
      ? `${order.totalPrice.toLocaleString("vi-VN")}đ`
      : "N/A",
    paymentMethod: "VNPay",
    status: order.status || "N/A",
    fullNameCustomer: order.fullNameCustomer || "N/A",
    address: order.address || "N/A",
    numberPhone: order.numberPhone || "N/A",
  };
};

const PaymentSuccess = () => {
  const [orderSaved, setOrderSaved] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const vnpTransactionStatus = queryParams.get("vnp_TransactionStatus");

  const idCustomer = localStorage.getItem("id_customer");

  useEffect(() => {
    const handleOrderCreation = async () => {
      if (vnpTransactionStatus !== "00") {
        console.log("Payment not successful, status:", vnpTransactionStatus);
        setIsLoading(false);
        return;
      }

      const orderRequest = JSON.parse(localStorage.getItem("orderRequest"));
      if (!orderRequest) {
        console.warn("No order data found in localStorage");
        setIsLoading(false);
        return;
      }
      console.log("orderRequest:", orderRequest);

      try {
        const orderData = await apiService.createOrder(orderRequest);
        setOrderSaved(orderData);
        console.log("Order created successfully:", orderData);
        localStorage.removeItem("orderRequest");
      } catch (error) {
        console.error("Failed to create order:", error);
      } finally {
        setIsLoading(false);
      }

      if (!idCustomer) return;

      const cart = { idCustomer, quantity: 0 };
      try {
        await apiService.createCart(cart);
        console.log("Cart created successfully");
      } catch (error) {
        console.error("Failed to create cart:", error);
      }
    };

    handleOrderCreation();
  }, [vnpTransactionStatus]);

  const orderInfo = formatOrderInfo(orderSaved);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <p className="text-gray-600">Đang xử lý...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center py-12 px-4">
      <div className="text-center mb-8">
        <CheckCircle className="text-green-600 w-16 h-16 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-green-700">
          Thanh toán thành công!
        </h1>
        <p className="text-gray-600 mt-2">
          Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
          Thông tin đơn hàng
        </h2>
        <div className="grid grid-cols-1 gap-4 text-gray-700">
          <div className="flex justify-between">
            <span className="font-medium">Mã đơn hàng:</span>
            <span>{orderInfo.orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Ngày đặt:</span>
            <span>{orderInfo.date}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Tổng tiền:</span>
            <span className="text-green-600 font-semibold">
              {orderInfo.total}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Phương thức thanh toán:</span>
            <span>{orderInfo.paymentMethod}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Trạng thái đơn hàng:</span>
            <span className="text-blue-600">{orderInfo.status}</span>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4 border-b pb-2">
          Thông tin khách hàng
        </h2>
        <div className="grid grid-cols-1 gap-4 text-gray-700">
          <div className="flex justify-between">
            <span className="font-medium">Họ và tên:</span>
            <span>{orderInfo.fullNameCustomer}</span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="font-medium w-24">Địa chỉ:</span>
            <span className="break-words line-clamp-3 overflow-hidden">
              {orderInfo.address}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Số điện thoại:</span>
            <span>{orderInfo.numberPhone}</span>
          </div>
        </div>
      </div>

      <a
        href="/"
        className="mt-8 px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-300 shadow-md"
      >
        Quay lại trang chủ
      </a>
    </div>
  );
};

export default PaymentSuccess;
