import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import axios from "axios";

const Cart = () => {
  const [listCartDetails, setListCartDetails] = useState([]);
  const idCart = localStorage.getItem("idCart");

  useEffect(() => {
    const fetchAllCartDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/cart-detail/getAll-ByCartId/${idCart}`
        );
        setListCartDetails(response.data);
      } catch (error) {
        console.log("Fail Loading: ", error);
      }
    };
    fetchAllCartDetails();
  }, [idCart]);

  const updateQuantity = async (idCartDetail, quantity, size) => {
    try {
      const updateDTO = {
        quantity: quantity,
        size: size,
      };
      const response = await axios.put(
        `http://localhost:8080/cart-detail/update/${idCartDetail}`,
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
      await axios.delete(
        `http://localhost:8080/cart-detail/delete/${idCartDetail}`
      );
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
      <div className="w-1/3">
        <CartSummary cart={listCartDetails} />
      </div>
    </div>
  );
};

export default Cart;
