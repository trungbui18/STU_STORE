import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../../config/apiConfig";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Đăng nhập thất bại");
        return;
      }
      sessionStorage.setItem("token", data.accessToken);
      sessionStorage.setItem("idUser", data.idUser);
      alert("Đăng nhập thành công");
      navigate(-1);
    } catch (err) {
      setError("Lỗi máy chủ. Vui lòng thử lại sau.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Đăng nhập người dùng
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
        <p className="text-center mt-4">
          Chưa có tài khoản?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/user/register")}
          >
            Đăng ký
          </span>
        </p>
      </div>
    </div>
  );
}
