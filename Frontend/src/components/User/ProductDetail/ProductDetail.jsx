import ProductImages from "./ProductImages ";
import ProductInfo from "./ProductInfo";
import { useParams } from "react-router-dom";
import hinh1 from "../../../assets/hinh1.avif";
import hinh2 from "../../../assets/hinh2.avif";
import hinh4 from "../../../assets/hinh3.avif";
import hinh3 from "../../../assets/hinh4.avif";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/product/getProduct/${id}`
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
    <div className="min-h-screen flex flex-col lg:flex-row bg-white-100">
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
  );
}
