import React, { useState } from "react";

import UserLayout from "./UserLayout";
import Cart from "../../components/User/Cart/Cart";
const CartPage = () => {
  return (
    <UserLayout>
      <Cart />
    </UserLayout>
  );
};

export default CartPage;
