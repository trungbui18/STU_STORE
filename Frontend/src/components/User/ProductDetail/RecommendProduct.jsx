import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../../config/apiConfig";
import { Link } from "react-router-dom";

export default function RecommendProduct({ idProduct }) {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/recommend?id=${idProduct}`
        );
        setRecommendations(response.data);
      } catch (error) {
        console.error("Lỗi khi gọi API gợi ý sản phẩm", error);
      }
    };

    fetchRecommendations();
  }, [idProduct]);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4 text-center">Recommendation</h2>
      <div className="flex overflow-x-auto gap-4 p-4">
        {recommendations.map((product) => (
          <Link
            key={product.idProduct}
            to={`/productDetail/${product.idProduct}`}
            className="min-w-[200px] border rounded shadow hover:shadow-lg transition bg-white"
          >
            <img
              src={`${API_BASE_URL}/assets/${product.images[0]?.urlImage}`}
              alt={product.name}
              className="h-100 w-full object-cover rounded-t"
            />
            <div className="p-2">
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-red-600">
                {product.price.toLocaleString()} VND
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
