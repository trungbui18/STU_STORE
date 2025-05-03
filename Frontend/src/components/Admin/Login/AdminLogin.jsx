import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../../config/apiConfig";
import axios from "axios";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      email: username,
      password: password,
    };
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        data,
        { withCredentials: true } // giống credentials: "include" trong fetch
      );

      const resData = response.data;
      sessionStorage.setItem("token", resData.accessToken);
      sessionStorage.setItem("idStaff", resData.idUser);
      alert("Đăng nhập thành công");

      // Chuyển hướng nếu cần
      navigate("/admin/dashboard"); // ví dụ
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Đăng nhập thất bại");
      } else {
        setError("Lỗi máy chủ. Vui lòng thử lại sau.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Admin Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Tên đăng nhập</label>
            <input
              type="text"
              className="w-full p-2 border rounded mt-1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Mật khẩu</label>
            <input
              type="password"
              className="w-full p-2 border rounded mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}
