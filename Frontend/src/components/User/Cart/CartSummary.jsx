import React, { useState, useEffect } from "react";
import { MoveRight, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../../config/apiConfig";

const CartSummary = ({ cart }) => {
  const navigate = useNavigate();
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [promoCode, setPromoCode] = useState(""); // Mã coupon đang nhập
  const [promoCodes, setPromoCodes] = useState([]); // Danh sách mã coupon đã áp dụng
  const [promoError, setPromoError] = useState("");

  const originalTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const [total, setTotal] = useState(originalTotal); // Total thay đổi khi áp dụng coupon

  // Cập nhật total khi cart thay đổi
  useEffect(() => {
    const newTotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(newTotal);
    setPromoCodes([]);
    localStorage.setItem("couponCodes", JSON.stringify([])); // Reset localStorage
  }, [cart]);

  const handlePayment = () => {
    sessionStorage.setItem("quantity", cart.length);
    sessionStorage.setItem("total", total);
    localStorage.setItem("couponCodes", JSON.stringify(promoCodes)); // Lưu danh sách mã vào localStorage
    navigate("/checkout");
  };

  const handleCheckPromoCode = async () => {
    if (!promoCode) {
      setPromoError("Vui lòng nhập mã coupon!");
      return;
    }

    try {
      const response = await axios.get(
        `${API_BASE_URL}/coupon/exists/${promoCode}`
      );
      const { check, code, percentDiscount, message } = response.data;

      if (check) {
        if (promoCodes.includes(code)) {
          setPromoError("Mã coupon này đã được áp dụng!");
          return;
        }

        // Thêm mã vào danh sách
        setPromoCodes((prev) => [...prev, code]);
        setPromoError("");
        const discountedTotal = (total * (100 - percentDiscount)) / 100;
        setTotal(discountedTotal);
        setPromoCode("");
        alert("Đã thêm mã khuyến mãi!");
      } else {
        setPromoError(message);
      }
    } catch (error) {
      console.error("Failed to check promo code:", error);
      setPromoError("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  return (
    <div className="pl-4 px-10 rounded-lg sticky top-8">
      <h1 className="text-xl font-bold mb-4">REVIEW YOUR CART</h1>
      <div className="flex justify-between mb-2">
        <span className="text-gray-600 text-lg">Quantity:</span>
        <span className="text-gray-600 text-lg">{cart.length}</span>
      </div>
      <div className="flex justify-between mb-4">
        <span className="text-gray-600 text-lg">Ship:</span>
        <span className="text-gray-600 text-lg">Free</span>
      </div>
      <div className="flex justify-between mb-4">
        <span className="text-black text-lg font-semibold">Total:</span>
        <div>
          {total !== originalTotal && (
            <span className="line-through text-gray-500 mr-2">
              {originalTotal.toLocaleString()}₫
            </span>
          )}
          <span className="font-semibold text-lg">
            {total.toLocaleString()}₫
          </span>
        </div>
      </div>

      {/* Hiển thị danh sách mã đã áp dụng */}
      {promoCodes.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-600">Mã đã áp dụng:</p>
          <ul className="list-disc pl-5">
            {promoCodes.map((code, index) => (
              <li key={index} className="text-sm text-green-600">
                {code}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Phần promotion */}
      <div className="mb-8 mt-8 gap-4">
        {!showPromoInput && (
          <div
            className="flex items-center space-x-1 cursor-pointer"
            onClick={() => setShowPromoInput(true)}
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold text-black border border-black">
              %
            </span>
            <p className="font-semibold text-black underline px-4 bg-white hover:text-white hover:bg-black">
              Redeem Promotion
            </p>
          </div>
        )}

        {showPromoInput && (
          <div className="mt-2">
            <div className="flex items-center border border-gray-500 focus-within:border-black">
              <input
                type="text"
                name="promoCode"
                id="promoCode"
                placeholder="Enter promo code"
                className="flex-1 pl-3 py-3 outline-none"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button
                type="button"
                onClick={handleCheckPromoCode}
                className="px-3 flex items-center justify-center hover:text-black text-gray-500"
              >
                <Plus size={20} />
              </button>
            </div>
            <p className="text-gray-500 text-sm mt-1">
              Bạn có thể áp dụng nhiều mã giảm giá bằng cách nhập vào ô trên lần
              lượt từng mã
            </p>
            {promoError && (
              <p className="text-red-500 text-sm mt-1">{promoError}</p>
            )}
          </div>
        )}
      </div>

      <button
        className="relative bg-black text-white w-full font-bold px-6 py-3 text-sm flex items-center justify-between group hover:text-gray-500"
        onClick={handlePayment}
      >
        <span>PAYMENT</span>
        <MoveRight className="w-10 h-5" />
        <span className="absolute bottom-[-4px] right-[-4px] w-full h-full border-b-2 border-r-2 border-black"></span>
      </button>
    </div>
  );
};

export default CartSummary;
