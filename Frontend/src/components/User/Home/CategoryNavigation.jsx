import React from "react";
import bannerNam from "../../../assets/bannerNam.avif";
import bannerNu from "../../../assets/bannerNu.avif";
import { useNavigate } from "react-router-dom";
export default function CategoryNavigation() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row gap-4 mt-5 px-4">
      {/* Danh mục Nam */}
      <div className="relative group w-full lg:w-1/2">
        <img
          src={bannerNam}
          className="w-full h-auto object-contain transition-opacity duration-300 group-hover:opacity-50"
          alt="Nam"
        />
        <button
          className="absolute inset-0 flex items-center justify-center 
        opacity-0 group-hover:opacity-100 transition-opacity duration-300
         bg-black/50 text-white uppercase font-bold py-3 px-6"
          onClick={() => {
            navigate("/product");
          }}
        >
          Nam <span className="ml-2">→</span>
        </button>
      </div>

      {/* Danh mục Nữ */}
      <div className="relative group w-full lg:w-1/2">
        <img
          src={bannerNu}
          className="w-full h-auto object-contain transition-opacity duration-300 
          group-hover:opacity-50"
          alt="Nữ"
        />
        <button
          className="absolute inset-0 flex items-center justify-center opacity-0 
        group-hover:opacity-100 transition-opacity duration-300 bg-black/50
         text-white uppercase font-bold py-3 px-6"
          onClick={() => {
            navigate("/product");
          }}
        >
          Nữ <span className="ml-2">→</span>
        </button>
      </div>
    </div>
  );
}
