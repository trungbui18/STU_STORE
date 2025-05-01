import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/product/getAll")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu:", error);
      });
  }, []);

  return (
    <div className="w-full mx-auto   min-h-screen">
      <h2 className="py-8 text-3xl font-bold text-center mb-6">
        Women's ready-to-wear
      </h2>
      <div className=" border-black border-t border-b">
        <div className="grid grid-cols-2 lg:grid-cols-4  ">
          {products.map((product) => (
            <ProductCard key={product.idProduct} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
