import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import API_BASE_URL from "../../../config/apiConfig";

const AddPromotion = () => {
  const navigate = useNavigate();
  const idStaff = sessionStorage.getItem("idStaff") || 0;
  const [formData, setFormData] = useState({
    couponName: "",
    discount_percent: "",
    startDate: "",
    endDate: "",
    idStaff: idStaff,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const now = new Date();
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);

    if (start < now.setHours(0, 0, 0, 0)) {
      alert("Ngày bắt đầu không được nhỏ hơn ngày hôm nay.");
      return;
    }

    if (end < start) {
      alert("Ngày kết thúc phải sau hoặc bằng ngày bắt đầu.");
      return;
    }

    fetch(`${API_BASE_URL}/coupon/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.ok) {
          alert("Tạo mã khuyến mãi thành công!");
          navigate("/admin/promotion");
        } else {
          alert("Tạo mã khuyến mãi thất bại.");
        }
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border shadow rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className=" flex justify-between items-center mb-3">
          <h1 className="font-medium text-2xl">Cập nhật mã khuyến mãi</h1>
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 
        text-white font-medium shadow-md 
        hover:bg-blue-600 transition-all duration-300"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5" />
            BACK
          </button>
        </div>
        <div>
          <label className="block font-medium">Tên khuyến mãi</label>
          <input
            type="text"
            name="couponName"
            value={formData.couponName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">% Giảm giá</label>
          <input
            type="number"
            name="discount_percent"
            value={formData.discount_percent}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
            min="1"
            max="100"
          />
        </div>
        <div>
          <label className="block font-medium">Ngày bắt đầu</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Ngày kết thúc</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Tạo khuyến mãi
        </button>
      </form>
    </div>
  );
};

export default AddPromotion;
