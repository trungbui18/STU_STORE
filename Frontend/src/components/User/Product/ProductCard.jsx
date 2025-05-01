import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link to={`/productDetail/${product.idProduct}`}>
      <div
        key={product.idProduct}
        className="bg-white border-b border-black border-r lg:border-b-0 pb-5"
      >
        <img
          src={`http://localhost:8080/assets/${product.images[0]?.urlImage}`}
          alt={product.name}
          className="w-full h-10/12 object-cover rounded-lg"
        />

        <h3 className="text-xs font-semibold mt-4 text-center">
          {product.name}
        </h3>
      </div>
    </Link>
  );
}
