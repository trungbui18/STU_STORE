import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import API_BASE_URL from "../../../config/apiConfig";

const UpdatePromotion = () => {
  const { idCoupon } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    couponName: "",
    discount_percent: "",
    startDate: "",
    endDate: "",
    code: "",
  });

  useEffect(() => {
    const fetchPromotion = async () => {
      await axios
        .get(`${API_BASE_URL}/coupon/getById/${idCoupon}`)
        .then((res) => {
          const data = res.data;
          setFormData({
            couponName: data.couponName || "",
            discount_percent: data.discount_percent || "",
            startDate: data.startDate || "",
            endDate: data.endDate || "",
            code: data.code || "",
          });
        })
        .catch((err) => console.error("Lỗi khi lấy dữ liệu:", err));
    };
    fetchPromotion();
  }, [idCoupon]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`${API_BASE_URL}/coupon/update/${idCoupon}`, formData)
      .then((res) => {
        alert("Cập nhật thành công!");
        navigate("/admin/promotion"); // quay lại danh sách
      })
      .catch((err) => {
        console.error("Lỗi khi cập nhật:", err);
        alert("Cập nhật thất bại!");
      });
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md">
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
          <label className="block font-medium mb-1">Tên Coupon</label>
          <input
            type="text"
            name="couponName"
            value={formData.couponName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Phần trăm giảm (%)</label>
          <input
            type="number"
            name="discount_percent"
            value={formData.discount_percent}
            onChange={handleChange}
            min={0}
            max={100}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Mã Code</label>
          <input
            type="text"
            name="code"
            value={formData.code}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Ngày bắt đầu</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Ngày kết thúc</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
};

export default UpdatePromotion;
