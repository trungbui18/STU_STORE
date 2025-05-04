import { Menu, Search, Bell, UserCircle, LogOut, Cookie } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // ✅ đúng thư viện thao tác cookie
import axios from "axios";
import API_BASE_URL from "../../../config/apiConfig";

export default function Navbar({ onToggleSidebar }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post(
        `${API_BASE_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      localStorage.clear();
      sessionStorage.clear();
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Lỗi khi logout:", error);
    }
  };

  return (
    <div className="bg-white shadow-md p-4 flex items-center justify-between">
      {/* Nút mở sidebar trên mobile */}
      <button className="md:hidden text-gray-600" onClick={onToggleSidebar}>
        <Menu className="w-6 h-6" />
      </button>

      {/* Tiêu đề hoặc thanh tìm kiếm */}
      <div className="hidden md:flex items-center bg-gray-100 px-3 py-1 rounded-lg">
        <Search className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent focus:outline-none ml-2"
        />
      </div>

      {/* Thông báo & Hồ sơ admin */}
      <div className="flex items-center gap-4">
        {/* Icon Thông báo */}
        <div className="relative cursor-pointer">
          <Bell className="w-6 h-6 text-gray-600" />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-full">
            3
          </span>
        </div>

        {/* Hồ sơ Admin */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2"
          >
            <UserCircle className="w-8 h-8 text-gray-600" />
            <span className="hidden md:block">Admin</span>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 bg-white shadow-md rounded-lg p-2 w-40">
              <a href="#" className="block p-2 hover:bg-gray-100">
                Profile
              </a>
              <a href="#" className="block p-2 hover:bg-gray-100">
                Settings
              </a>
              <button
                className="flex items-center w-full p-2 text-red-600 hover:bg-gray-100"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5 mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
