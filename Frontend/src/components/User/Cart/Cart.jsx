import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import axios from "axios";
import API_BASE_URL from "../../../config/apiConfig";

const Cart = () => {
  const [listCartDetails, setListCartDetails] = useState([]);
  const idCart = sessionStorage.getItem("idCart");

  useEffect(() => {
    if (idCart) {
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
      fetchCartDetails();
    }
  }, [idCart]);

  const updateQuantity = async (idCartDetail, quantity, size) => {
    try {
      const updateDTO = {
        quantity: quantity,
        size: size,
      };
      const response = await axios.put(
        `${API_BASE_URL}/cart-detail/update/${idCartDetail}`,
        updateDTO
      );
      setListCartDetails((prev) =>
        prev.map((item) =>
          item.idCartDetail === idCartDetail ? response.data : item
        )
      );
    } catch (error) {
      console.log("Fail updating quantity or size: ", error);
    }
  };

  const removeItem = async (idCartDetail) => {
    const confirm = window.confirm("Bạn có chắc muốn xóa ko ? ");
    if (!confirm) return;
    try {
      await axios.delete(`${API_BASE_URL}/cart-detail/delete/${idCartDetail}`);
      setListCartDetails((prev) =>
        prev.filter((item) => item.idCartDetail !== idCartDetail)
      );
    } catch (error) {
      console.log("Fail removing item: ", error);
    }
  };

  return (
    <div className="container mx-auto mb-8 mt-8 flex gap-5">
      <div className="w-2/3">
        <h1 className="text-2xl font-bold mb-4">YOUR SHOPPING CART</h1>
        {listCartDetails.map((item) => (
          <CartItem
            key={item.idCartDetail}
            item={item}
            listCartDetails={listCartDetails}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
          />
        ))}
      </div>
      {listCartDetails.length > 0 && (
        <div className="w-1/3">
          <CartSummary cart={listCartDetails} />
        </div>
      )}
    </div>
  );
};

export default Cart;
