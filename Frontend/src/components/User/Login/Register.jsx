import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    numberPhone: "",
    birthday: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Đăng ký thất bại");
        return;
      }

      alert("Đăng ký thành công");
      navigate("/user/login");
    } catch (err) {
      setError("Lỗi máy chủ. Vui lòng thử lại sau.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Đăng ký tài khoản
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleRegister}>
          {[
            { label: "Họ và tên", name: "name", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Mật khẩu", name: "password", type: "password" },
            { label: "Địa chỉ", name: "address", type: "text" },
            { label: "Số điện thoại", name: "numberPhone", type: "text" },
            { label: "Ngày sinh", name: "birthday", type: "date" },
          ].map(({ label, name, type }) => (
            <div className="mb-4" key={name}>
              <label className="block text-gray-700">{label}</label>
              <input
                type={type}
                name={name}
                className="w-full p-2 border rounded mt-1"
                value={formData[name]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Đăng ký
          </button>
        </form>
        <p className="text-center mt-4">
          Đã có tài khoản?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/user/login")}
          >
            Đăng nhập
          </span>
        </p>
      </div>
    </div>
  );
}
