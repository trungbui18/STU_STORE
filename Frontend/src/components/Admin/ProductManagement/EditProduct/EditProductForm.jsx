import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OldImages from "./OldImages";
import NewImagesUploader from "./NewImagesUploader";

export default function EditProductForm() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [sizes, setSizes] = useState([]);
  const [images, setImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const { id } = useParams();
  const idStaff = sessionStorage.getItem("idStaff");
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/product/getProduct/${id}`
        );
        const data = response.data;
        setProduct(data);
        setSizes(data.sizes || []);
        setName(data.name);
        setPrice(data.price);
      } catch (error) {
        console.log("fail:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleQuantityChange = (id, newQuantity) => {
    setSizes((prevSizes) =>
      prevSizes.map((size) =>
        size.idProductSize === id ? { ...size, quantity: newQuantity } : size
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (price <= 0) {
      alert("Giá sản phẩm phải lớn hơn 0");
      return;
    }

    const hasNegativeQuantity = sizes.some((size) => size.quantity < 0);
    if (hasNegativeQuantity) {
      alert("Số lượng không được nhỏ hơn 0");
      return;
    }

    const updatedProduct = JSON.stringify({
      name: name,
      price: price,
      sizes: sizes,
      idStaff: idStaff,
    });

    console.log("Updated Product: ", updatedProduct);
    console.log("imagesUpload", images);
    console.log("imagesDeleted", imagesToDelete);

    formData.append("product", updatedProduct);

    images.forEach((image) => {
      formData.append("imagesUploaded", image.file);
    });

    formData.append("imagesDeleted", imagesToDelete);

    try {
      await axios.put(`http://localhost:8080/product/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Cập nhật thành công!");
      navigate("/admin/product");
    } catch (error) {
      console.log("Lỗi khi cập nhật:", error);
    }
  };

  if (!product) return <p>Đang tải...</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full h-full">
      <div className=" flex justify-between items-center mb-3">
        <h1 className="font-medium text-2xl">Edit Product</h1>
        <button
          className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 
        text-white font-medium shadow-md 
        hover:bg-blue-600 transition-all duration-300"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5" />
          BACK
        </button>
      </div>{" "}
      <form onSubmit={handleSubmit}>
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

        <div className="mb-8">
          <label className="block font-semibold text-lg mb-2">Size</label>
          <div className="grid grid-cols-3 lg:grid-cols-5 gap-3">
            {sizes.map((size) => (
              <div
                key={size.idProductSize}
                className="flex flex-flex gap-2 items-center px-4 py-2 shadow-sm"
              >
                <span className="font-medium text-gray-700">{size.size}</span>
                <input
                  type="number"
                  name="size"
                  value={size.quantity}
                  onChange={(e) =>
                    handleQuantityChange(size.idProductSize, e.target.value)
                  }
                  className="w-16 border py-2 rounded bg-gray-200 text-center"
                  required
                />
              </div>
            ))}
          </div>
        </div>

        {/* Component hiển thị hình ảnh cũ có tính năng xóa */}
        <OldImages
          images={product.images}
          imagesToDelete={imagesToDelete}
          setImagesToDelete={setImagesToDelete}
        />

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
