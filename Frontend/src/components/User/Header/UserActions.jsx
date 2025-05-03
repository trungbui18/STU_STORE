import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBookmark,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import SearchModal from "./SearchBar/SearchModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../../config/apiConfig";

export default function UserActions() {
  const idUser = sessionStorage.getItem("idUser");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Trạng thái cho dropdown
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/cart/cart-by-idUser/${idUser}`
        );
        setCart(response.data);
        console.log("Giỏ hàng:", response.data);
        sessionStorage.setItem("idCart", response.data.idCart);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    };
    if (idUser) {
      fetchCart();
    }
  }, [idUser]);

  const toggleDropdown = () => {
    if (!idUser) {
      navigate("/user/login");
      return;
    }
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Xử lý đăng xuất
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setIsDropdownOpen(false);
    navigate("/");
  };

  return (
    <>
      <div className="flex items-center space-x-4 relative">
        <button
          className="text-xl"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>

        <div className="relative">
          <button className="text-xl" onClick={toggleDropdown}>
            <FontAwesomeIcon icon={faUser} />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <button
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={handleLogout}
              >
                Đăng xuất
              </button>
            </div>
          )}
        </div>

        <div
          className="relative text-xl cursor-pointer"
          onClick={() => navigate("/cart")}
        >
          <FontAwesomeIcon icon={faBookmark} />
          {cart?.quantity > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              {cart.quantity}
            </span>
          )}
        </div>
      </div>

      <SearchModal
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
      />
    </>
  );
}
