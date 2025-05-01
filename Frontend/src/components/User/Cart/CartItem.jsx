import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const CartItem = ({ item, listCartDetails, updateQuantity, removeItem }) => {
  const [tempQuantity, setTempQuantity] = useState(item.quantity);
  const [tempSize, setTempSize] = useState(item.size);
  const [error, setError] = useState(""); // Lưu thông báo lỗi nếu số lượng không đủ
  const prevQuantity = useRef(item.quantity); // Lưu trữ giá trị trước đó của số lượng

  const availableSizes = ["S", "M", "L", "XL", "XXL"];

  useEffect(() => {
    setTempQuantity(item.quantity);
    setTempSize(item.size);
    prevQuantity.current = item.quantity; // Cập nhật giá trị trước đó khi item thay đổi
  }, [item.quantity, item.size]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (tempQuantity !== item.quantity || tempSize !== item.size) {
        try {
          const response = await axios.post(
            "http://localhost:8080/cart-detail/check-quantity",
            {
              idProduct: item.idProduct,
              size: tempSize,
              quantity: tempQuantity,
            }
          );

          const { stockQuantity, message } = response.data;

          if (stockQuantity >= tempQuantity) {
            updateQuantity(item.idCartDetail, tempQuantity, tempSize);
            setError(""); // Xóa thông báo lỗi
          } else {
            setError(
              `Không đủ hàng. Tồn kho hiện tại: ${stockQuantity} sản phẩm.`
            );
            setTempQuantity(item.quantity); // Khôi phục số lượng
            setTempSize(item.size); // Khôi phục size nếu cần
          }
        } catch (error) {
          console.error("Lỗi khi kiểm tra số lượng: ", error);
        }
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [
    tempQuantity,
    tempSize,
    item.idProduct,
    item.idCartDetail,
    item.quantity,
    item.size,
  ]);

  const handleIncrease = () => {
    const newQuantity = tempQuantity + 1;
    setTempQuantity(newQuantity);
  };

  const handleDecrease = () => {
    if (tempQuantity > 1) {
      const newQuantity = tempQuantity - 1;
      setTempQuantity(newQuantity);
    }
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    const newQuantity = parseInt(value);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      setTempQuantity(newQuantity);
    } else if (value === "") {
      setTempQuantity("");
    }
  };

  const handleQuantityBlur = () => {
    if (tempQuantity === "" || isNaN(tempQuantity) || tempQuantity < 1) {
      setTempQuantity(item.quantity);
    }
  };

  const handleSizeChange = (e) => {
    const newSize = e.target.value;
    setTempSize(newSize);
  };

  const usedSizes = listCartDetails
    .filter(
      (cartItem) =>
        cartItem.idProduct === item.idProduct &&
        cartItem.idCartDetail !== item.idCartDetail
    )
    .map((cartItem) => cartItem.size);

  return (
    <div className="flex border p-4 rounded-lg mb-4">
      <img
        src={`http://localhost:8080/assets/${item.urlImage}`}
        alt={item.productName}
        className="w-32 h-32 object-cover"
      />
      <div className="ml-4 flex-1">
        <h2 className="font-bold">{item.productName}</h2>
        <p className="font-semibold">
          {(item.price * item.quantity).toLocaleString()}₫
        </p>
        <div className="flex items-center mt-2 gap-3">
          <select
            value={tempSize}
            onChange={handleSizeChange}
            className="border px-2 py-1 rounded"
          >
            {availableSizes.map((size) => (
              <option
                key={size}
                value={size}
                disabled={usedSizes.includes(size)}
              >
                {size}
              </option>
            ))}
          </select>

          <div className="flex border rounded">
            <button
              onClick={handleDecrease}
              className="px-3 py-1 border-r"
              disabled={tempQuantity <= 1}
            >
              −
            </button>
            <input
              type="text"
              value={tempQuantity}
              onChange={handleQuantityChange}
              onBlur={handleQuantityBlur}
              className="w-12 text-center border-none px-3 py-1 focus:outline-none"
            />
            <button onClick={handleIncrease} className="px-3 py-1 border-l">
              +
            </button>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button
            onClick={() => removeItem(item.idCartDetail)}
            className="ml-4 text-red-500"
          >
            ❌ Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
