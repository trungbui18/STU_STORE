import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Eye, Plus, Trash2 } from "lucide-react";
import API_BASE_URL from "../../../config/apiConfig";

const Promotion = () => {
  const [couponList, setCouponList] = useState([]);
  const navigate = useNavigate();

  const fetchCoupons = () => {
    axios
      .get(`${API_BASE_URL}/coupon/getAll`)
      .then((res) => setCouponList(res.data))
      .catch((err) => console.error("Lỗi khi load coupon:", err));
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleDelete = (id) => {
    const confirm = window.confirm("Bạn có chắc chắn muốn xóa mã này không?");
    if (!confirm) return;

    axios
      .delete(`${API_BASE_URL}/coupon/delete/${id}`)
      .then((res) => {
        fetchCoupons();
      })
      .catch((err) => {
        console.error("Lỗi khi xóa:", err);
        alert("Xóa thất bại!");
      });
  };

  const handleAdd = () => {
    navigate("/admin/promotion/create");
  };

  return (
    <div className="overflow-x-auto lg:p-4">
      <div className="flex justify-between items-center mb-3">
        <h1 className="font-medium text-2xl">Danh sách mã giảm giá</h1>
        <button
          className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 
          text-white font-medium shadow-md 
          hover:bg-blue-600 transition-all duration-300"
          onClick={handleAdd}
        >
          Thêm
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <table className="table-auto w-full border border-gray-500">
        <thead>
          <tr className="bg-white">
            <th className="border border-gray-300">Tên Coupon</th>
            <th className="border border-gray-300">% Giảm</th>
            <th className="border border-gray-300">Bắt đầu</th>
            <th className="border border-gray-300">Kết thúc</th>
            <th className="border border-gray-300">Mã</th>
            <th className="border border-gray-300">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {couponList.map((coupon) => (
            <tr key={coupon.idCoupon} className="bg-white">
              <td className="text-center border border-gray-300">
                {coupon.couponName}
              </td>
              <td className="text-center border border-gray-300">
                {coupon.discount_percent}%
              </td>
              <td className="text-center border border-gray-300">
                {coupon.startDate}
              </td>
              <td className="text-center border border-gray-300">
                {coupon.endDate}
              </td>
              <td className="text-center border border-gray-300">
                {coupon.code}
              </td>
              <td className="border border-gray-300 px-2 py-2">
                <div className="flex flex-col justify-center items-center sm:flex-row gap-2 sm:gap-4">
                  <Link to={`/admin/promotion/update/${coupon.idCoupon}`}>
                    <button className="flex gap-2 px-4 py-2 bg-green-500 text-white font-medium rounded-lg shadow-md hover:bg-green-600 transition-all duration-300">
                      <Eye size={20} className="mt-0.5" />
                      Detail
                    </button>
                  </Link>
                  <button
                    className="flex gap-2 px-4 py-2 bg-red-500 text-white font-medium rounded-lg shadow-md hover:bg-red-600 transition-all duration-300"
                    onClick={() => handleDelete(coupon.idCoupon)}
                  >
                    <Trash2 size={20} />
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Promotion;
