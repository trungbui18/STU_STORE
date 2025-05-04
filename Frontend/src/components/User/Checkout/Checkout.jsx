import React, { useEffect, useState } from "react";
import CartSummary from "./CartSummary";
import BillingInfo from "./BillingInfo";
import ReviewOrder from "./ReviewOrder";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../../config/apiConfig";
import axiosInstance from "../../../config/axiosInstance";
const useCartDetails = (idCart) => {
  const [listCartDetails, setListCartDetails] = useState([]);
  useEffect(() => {
    const fetchCartDetails = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/cart-detail/getAll-ByCartId/${idCart}`
        );
        setListCartDetails(response.data);
      } catch (error) {
        console.error("Failed to load cart details:", error);
      }
    };

    if (idCart) fetchCartDetails();
  }, [idCart]);

  return listCartDetails;
};

const getToken = () => sessionStorage.getItem("token");

const apiService = {
  createPayment: async (total) => {
    const token = getToken();
    console.log("token", token);
    const response = await axiosInstance.post(
      `/api/payment/create_payment?price=${total}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },

  createOrder: async (orderRequestDTO) => {
    const response = await axios.post(
      `${API_BASE_URL}/order/create`,
      orderRequestDTO
    );
    return response.data;
  },
};

const Checkout = () => {
  const [address, setAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const idCart = sessionStorage.getItem("idCart");
  const total = parseInt(sessionStorage.getItem("total")) || 0;
  const quantity = parseInt(sessionStorage.getItem("quantity")) || 0;
  const idCustomer = parseInt(sessionStorage.getItem("idUser")) || 0;

  const listCartDetails = useCartDetails(idCart);
  const navigate = useNavigate();

  const buildOrderRequestDTO = (statusPayment) => ({
    order: {
      idProfile: idCustomer,
      status: "PENDDING",
      totalPrice: total,
      fullNameCustomer: fullName,
      address,
      numberPhone: phoneNumber,
      statusPayment,
    },
    orderDetails: listCartDetails.map((item) => ({
      idProduct: item.idProduct || 26,
      price: item.price,
      quantity: item.quantity,
      size: item.size,
    })),
  });

  // Xử lý thanh toán
  const handlePayment = async () => {
    try {
      const orderRequestDTO = buildOrderRequestDTO("Thanh Toán Thành Công");
      sessionStorage.setItem("orderRequest", JSON.stringify(orderRequestDTO));
      const paymentUrl = await apiService.createPayment(total);
      window.open(paymentUrl);
      navigate("/");
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  // Xử lý đặt hàng
  const handleCheckOut = async () => {
    if (!listCartDetails || listCartDetails.length === 0) {
      alert("Chưa tải xong chi tiết giỏ hàng. Vui lòng đợi...");
      return;
    }

    try {
      const orderRequestDTO = buildOrderRequestDTO("Thanh Toán Khi Nhận Hàng");
      console.log("OrderRequestDTO:", orderRequestDTO);
      await apiService.createOrder(orderRequestDTO);
      alert("Đặt hàng thành công!");
      navigate("/");
    } catch (error) {
      console.error("Failed to checkout:", error);
      alert("Có lỗi trong quá trình đặt hàng!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 mb-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="flex gap-8">
        <div className="flex-1">
          <BillingInfo
            handlePayment={handlePayment}
            setAddress={setAddress}
            setFullName={setFullName}
            setPhoneNumber={setPhoneNumber}
            handleCheckOut={handleCheckOut}
          />
        </div>
        <div className="w-1/3">
          <CartSummary total={total} quantity={quantity} />
          <ReviewOrder cartItems={listCartDetails} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
