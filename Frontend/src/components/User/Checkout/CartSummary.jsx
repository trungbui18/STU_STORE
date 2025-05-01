// components/Checkout/CartSummary.js
import React from "react";

const CartSummary = ({ total, quantity }) => {
  return (
    <div className="p-4 border-b border-gray-300 mb-4">
      <h3 className="text-lg font-bold">Cart Summary</h3>
      <ul className="mt-4 gap-4">
        <li className="flex items-center justify-between">
          <p>{quantity} items</p>
          <p>{Number(total).toLocaleString("vi-VN")} </p>
        </li>
        <li className="flex items-center justify-between">
          <p>Ship</p>
          <p>Free</p>
        </li>
      </ul>
      <div className="mt-4 font-bold flex items-center justify-between">
        <span>Total: </span>
        <span>{Number(total).toLocaleString("vi-VN")} VND</span>
      </div>
    </div>
  );
};

export default CartSummary;
