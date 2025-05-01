import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Eye, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function ProductManagement() {
  const [listProduct, setListProduct] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const FetchProduct = async () => {
      await axios
        .get(`http://localhost:8080/product/getAll`)
        .then((response) => {
          setListProduct(response.data);
        })
        .catch((error) => {
          console.log("Loi khi load san pham", error);
        });
    };
    FetchProduct();
  }, [listProduct]);

  const handleDelete = async (idProduct) => {
    const confirm = window.confirm(
      "Bạn có chắc chắn muốn xóa sản phẩm này không?"
    );
    if (!confirm) return;
    try {
      await axios.delete(`http://localhost:8080/product/delete/${idProduct}`);
      console.log("Xóa thành công sản phẩm có ID:", idProduct);

      setListProduct((prevProducts) =>
        prevProducts.filter((product) => product.idProduct !== idProduct)
      );
    } catch (error) {
      console.log("Xóa thất bại:", error);
      alert(error.response.data);
    }
  };

  const handleAdd = () => {
    navigate("/admin/product/create");
  };

  return (
    <div className=" overflow-x-auto lg:p-4">
      <div className=" flex justify-between items-center mb-3">
        <h1 className="font-medium text-2xl">List Product</h1>
        <button
          className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 
        text-white font-medium shadow-md 
        hover:bg-blue-600 transition-all duration-300"
          onClick={handleAdd}
        >
          ADD
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <table className="table-auto w-full border border-gray-500">
        <thead>
          <tr className="bg-white">
            <th className="border border-gray-300">ID</th>
            <th className="border border-gray-300">Image</th>
            <th className="border border-gray-300">Name</th>
            <th className="border border-gray-300">Price</th>
            <th className="border border-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {listProduct.map((product) => (
            <tr key={product.idProduct} className="bg-white ">
              <td className="text-center border border-gray-300 ">
                {product.idProduct}
              </td>
              <td className="text-center border border-gray-300 w-20 h-20 relative">
                <div
                  className="w-full h-full relative group cursor-pointer"
                  onClick={() =>
                    setSelectedImage(
                      `http://localhost:8080/assets/${product.images[0].urlImage}`
                    )
                  }
                >
                  {product.images?.length > 0 && (
                    <img
                      src={`http://localhost:8080/assets/${product.images[0].urlImage}`}
                      className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-50"
                      alt="Product"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white font-semibold">
                    Xem chi tiết
                  </div>
                </div>
              </td>

              <td className="text-center border border-gray-300">
                {product.name}
              </td>
              <td className="text-center border border-gray-300">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(product.price)}
              </td>

              <td className="border border-gray-300 w-full sm:w-80 px-4 py-2">
                <div className="flex flex-col justify-center items-center sm:flex-row gap-2 sm:gap-4 ">
                  <Link to={`/admin/product/update/${product.idProduct}`}>
                    <button
                      className="flex w-full sm:w-1/2 md:w-1/3 lg:w-auto gap-2 px-4 py-2 
                  bg-green-500 text-white font-medium rounded-lg shadow-md 
                  hover:bg-green-600 transition-all duration-300"
                    >
                      <Eye size={20} className="mt-0.5" /> Detail
                    </button>
                  </Link>
                  <Link
                    to="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(product.idProduct);
                    }}
                  >
                    <button className="flex w-auto gap-2 px-4 py-2 bg-red-500 text-white font-medium rounded-lg shadow-md hover:bg-red-600 transition-all duration-300">
                      <Trash2 size={20} /> Delete
                    </button>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative">
            <img
              src={selectedImage}
              className="max-w-[80vw] max-h-[80vh] rounded shadow-lg"
            />
            <button
              className="absolute top-2 right-2 bg-gray-500 text-white px-3 py-1 rounded-full"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
