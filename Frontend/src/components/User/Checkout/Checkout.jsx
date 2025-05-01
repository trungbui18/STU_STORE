import React, { useEffect, useState } from "react";
import CartSummary from "./CartSummary";
import BillingInfo from "./BillingInfo";
import ReviewOrder from "./ReviewOrder";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useCartDetails = (idCart) => {
  const [listCartDetails, setListCartDetails] = useState([]);

  useEffect(() => {
    const fetchCartDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/cart-detail/getAll-ByCartId/${idCart}`
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

// Service để xử lý API calls
const apiService = {
  createPayment: async (total) => {
    const response = await axios.post(
      `http://localhost:8080/api/payment/create_payment?price=${total}`
    );
    return response.data;
  },
  createOrder: async (orderRequestDTO) => {
    const response = await axios.post(
      "http://localhost:8080/order/create",
      orderRequestDTO
    );
    return response.data;
  },
  createCart: async (cart) => {
    const response = await axios.post(
      "http://localhost:8080/cart/create",
      cart,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  },
};

// Component Checkout
const Checkout = () => {
  // State
  const [address, setAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Data từ localStorage/sessionStorage
  const idCart = localStorage.getItem("idCart");
  const total = parseInt(sessionStorage.getItem("total")) || 0;
  const quantity = parseInt(sessionStorage.getItem("quantity")) || 0;
  const idCustomer = parseInt(sessionStorage.getItem("idCustomer")) || 0;

  const listCartDetails = useCartDetails(idCart);
  const navigate = useNavigate();

  const buildOrderRequestDTO = (statusPayment) => ({
    order: {
      idCustomer,
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
      localStorage.setItem("orderRequest", JSON.stringify(orderRequestDTO));
      const paymentUrl = await apiService.createPayment(total);
      window.open(paymentUrl);
      navigate("/");
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  // Xử lý đặt hàng
  const handleCheckOut = async () => {
    try {
      const orderRequestDTO = buildOrderRequestDTO("Thanh Toán Khi Nhận Hàng");
      await apiService.createOrder(orderRequestDTO);
      localStorage.removeItem("orderRequest");

      const cart = { idCustomer, quantity: 0 };
      await apiService.createCart(cart);

      alert("Đặt hàng thành công!");
      navigate("/");
    } catch (error) {
      console.error("Failed to checkout:", error);
      alert("Có lỗi trong quá trình đặt hàng, vui lòng thử lại sau!");
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
