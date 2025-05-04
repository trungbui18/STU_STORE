import React, { useState } from "react";
import NewImagesUploader from "./NewImagesUploader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axiosInstance from "../../../../config/axiosInstance";
export default function AddProductForm() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const size = ["S", "M", "L", "XL", "XXL"];
  const idStaff = sessionStorage.getItem("idStaff") || 0;
  const token = sessionStorage.getItem("token") || null;
  const [sizes, setSizes] = useState(
    size.map((s) => ({ size: s, quantity: 0 }))
  );

  const handleQuantityChange = (size, newQuantity) => {
    setSizes((prevSizes) =>
      prevSizes.map((item) =>
        item.size === size ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleCreate = (event) => {
    event.preventDefault();
    const hasNegativeQuantity = sizes.some((size) => size.quantity < 0);
    if (hasNegativeQuantity) {
      alert("Số lượng không được nhỏ hơn 0");
      return;
    }
    if (!images || images.length === 0) {
      alert("Vui lòng chọn ảnh!");
      return;
    }

    if (price < 0) {
      alert("Số tiền ko được bé hơn 0");
      return;
    }
    const hasValidSize = sizes.some((item) => item.quantity > 0);
    if (!hasValidSize) {
      alert("Vui lòng nhập ít nhất 1 size có số lượng > 0!");
      return;
    }

    const formData = new FormData();
    const product = {
      name: name,
      price: price,
      description: description,
      sizes: sizes,
    };

    formData.append("product", JSON.stringify(product));

    images.forEach((imageObj, index) => {
      console.log(`File ${index + 1}:`, imageObj.file);
      formData.append("file", imageObj.file);
    });

    axiosInstance
      .post("/product/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Thêm thành công", response.data);
        alert("Succesfully ! ");
        navigate("/admin/product");
      })
      .catch((error) => {
        console.log("Thêm thất bại:", error.response?.data || error.message);
      });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full h-full">
      <div className=" flex justify-between items-center mb-3">
        <h1 className="font-medium text-2xl">Add Product</h1>
        <button
          className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 
        text-white font-medium shadow-md 
        hover:bg-blue-600 transition-all duration-300"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5" />
          BACK
        </button>
      </div>
      <form onSubmit={handleCreate}>
        <div className="mb-3">
          <label className="block font-semibold">Tên sản phẩm</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="mb-3">
          <label className="block font-semibold">Giá</label>
          <input
            type="number"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div className="mb-3">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="description"
          >
            Mô tả sản phẩm
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="5"
            placeholder="Nhập mô tả sản phẩm..."
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="block font-semibold">Size & Số lượng</label>
          <div className="grid grid-cols-3 lg:grid-cols-5 gap-3 ">
            {sizes.map((size) => (
              <div
                key={size.size}
                className="flex flex-flex gap-2 items-center px-4 py-2 shadow-sm"
              >
                <span className="font-medium text-gray-700">{size.size}</span>
                <input
                  type="number"
                  name="size"
                  value={size.quantity}
                  onChange={(e) =>
                    handleQuantityChange(size.size, Number(e.target.value))
                  }
                  className="w-16 border py-2 rounded bg-gray-200 text-center"
                  required
                />
              </div>
            ))}
          </div>
        </div>

        {/* Component tải lên hình ảnh mới */}
        <NewImagesUploader images={images} setImages={setImages} />

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
}
