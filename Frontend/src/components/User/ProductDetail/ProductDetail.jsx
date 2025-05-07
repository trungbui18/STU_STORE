import ProductImages from "./ProductImages ";
import ProductInfo from "./ProductInfo";
import { useParams } from "react-router-dom";

import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import API_BASE_URL from "../../../config/apiConfig";
import RecommendProduct from "./RecommendProduct";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/product/getProduct/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết sản phẩm", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;
  return (
    <div className="min-h-screen flex flex-col bg-white-100">
      <div className="flex flex-col lg:flex-row border border-black border-b-1">
        {!product ? (
          <p className="text-center">Đang tải...</p>
        ) : (
          <>
            {product?.images?.length > 0 ? (
              <ProductImages images={product.images} />
            ) : (
              <p className="text-center">Không có hình ảnh</p>
            )}
            <ProductInfo product={product} />
          </>
        )}
      </div>

      {/* Gợi ý nằm dưới cùng */}
      <div className="mt-8 w-full text-center text-lg font-semibold text-gray-700">
        <RecommendProduct idProduct={id} />{" "}
      </div>
    </div>
  );
}
