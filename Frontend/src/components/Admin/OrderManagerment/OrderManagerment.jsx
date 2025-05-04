import React, { useEffect, useState } from "react";
import axios from "axios";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../../config/apiConfig";
import axiosInstance from "../../../config/axiosInstance";

const OrderManagerment = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const token = sessionStorage.getItem("token") || null;
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get(`/order/getAll`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOrders(res.data);
        setFilteredOrders(res.data);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy danh sách đơn hàng:", err);
      });
  }, []);

  useEffect(() => {
    if (selectedStatus === "All") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(
        orders.filter((order) => order.status === selectedStatus)
      );
    }
  }, [selectedStatus, orders]);

  const handleDetail = (idOrder) => {
    navigate(`/admin/order/${idOrder}`);
  };

  return (
    <div className="p-6 w-full mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Danh sách đơn hàng</h2>

      {/* Combobox lọc theo status */}
      <div className="mb-4">
        <label className="mr-2 font-medium">Lọc theo trạng thái:</label>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md shadow-sm"
        >
          <option value="All">Tất cả</option>
          <option value="PENDDING">Đang chờ xử lý</option>
          <option value="PROCESSING">Đang chuẩn bị</option>
          <option value="SHIPPING">Đang giao hàng</option>
          <option value="COMPLETE">Đã hoàn thành</option>
          <option value="CANCEL">Đã huỷ</option>
        </select>
      </div>

      <table className="w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">ID</th>
            <th className="p-3 border">Trạng thái</th>
            <th className="p-3 border">Tổng tiền</th>
            <th className="p-3 border">Ngày tạo</th>
            <th className="p-3 border">Thanh toán</th>
            <th className="p-3 border text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center p-4">
                Không có đơn hàng nào.
              </td>
            </tr>
          ) : (
            filteredOrders
              .slice()
              .reverse()
              .map((order) => (
                <tr key={order.idOrder} className="border-b">
                  <td className="p-3 border text-center">{order.idOrder}</td>
                  <td className="p-3 border text-center">{order.status}</td>
                  <td className="p-3 border text-center">
                    {order.totalPrice.toLocaleString()} đ
                  </td>
                  <td className="p-3 border text-center">{order.createAt}</td>
                  <td className="p-3 border text-center">
                    {order.statusPayment}
                  </td>
                  <td className="p-3 border text-center">
                    <button
                      onClick={() => handleDetail(order.idOrder)}
                      className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition-all"
                    >
                      <Eye className="w-4 h-4" />
                      Xem chi tiết
                    </button>
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagerment;
