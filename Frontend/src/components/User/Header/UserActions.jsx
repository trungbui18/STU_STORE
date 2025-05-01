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

export default function UserActions() {
  const idUser = sessionStorage.getItem("idCustomer");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Trạng thái cho dropdown
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/cart/cart-by-idUser/${idUser}`
        );
        setCart(response.data);
        localStorage.setItem("idCart", response.data.idCart);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    };
    if (idUser) {
      fetchCart();
    }
  }, [idUser]);

  // Xử lý hiển thị/ẩn dropdown
  // Xử lý hiển thị/ẩn dropdown
  const toggleDropdown = () => {
    if (!idUser) {
      navigate("/user/login");
      return;
    }
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Xử lý đăng xuất
  const handleLogout = () => {
    // Xóa toàn bộ dữ liệu trong localStorage và sessionStorage
    localStorage.clear();
    sessionStorage.clear();

    // Đóng dropdown
    setIsDropdownOpen(false);

    // Điều hướng về trang chính hoặc trang đăng nhập
    navigate("/"); // Hoặc navigate("/user/login") nếu muốn về trang đăng nhập
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

        <div className="relative text-xl" onClick={() => navigate("/cart")}>
          <FontAwesomeIcon icon={faBookmark} />
        </div>
      </div>

      <SearchModal
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
      />
    </>
  );
}
