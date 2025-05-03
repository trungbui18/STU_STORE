import React from "react";
import API_BASE_URL from "../../../config/apiConfig";

const ReviewOrder = ({ cartItems = [] }) => {
  return (
    <div className="p-4  bg-white">
      <h2 className="text-xl font-semibold mb-4">Review Your Order</h2>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.idCartDetail}
            className="flex gap-4 border-b pb-4 items-center"
          >
            {/* Ảnh bên trái */}
            <div className="w-20 h-20 flex-shrink-0">
              <img
                src={`${API_BASE_URL}/assets/${item.urlImage}`}
                alt={item.productName}
                className="w-full h-full object-cover rounded"
              />
            </div>

            {/* Thông tin bên phải */}
            <div className="flex flex-col">
              <span className="font-medium">{item.productName}</span>
              <span className="text-sm text-gray-500">Size: {item.size}</span>
              <span className="text-sm text-gray-500">
                Quantity: {item.quantity}
              </span>
              <span className="text-sm text-gray-800 font-semibold">
                {(item.price * item.quantity).toLocaleString()} ₫
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewOrder;
