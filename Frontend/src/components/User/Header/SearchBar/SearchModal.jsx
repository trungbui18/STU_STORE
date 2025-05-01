import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faSpinner,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SearchModal({ isSearchOpen, setIsSearchOpen }) {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState([]);
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 500);
    return () => clearTimeout(handler);
  }, [keyword]);

  useEffect(() => {
    if (!debouncedKeyword.trim()) {
      setProducts([]);
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8080/product/search",
          {
            params: { keyword: debouncedKeyword },
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Lỗi tìm kiếm:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [debouncedKeyword]);

  const handleClearSearch = () => {
    setKeyword("");
    setProducts([]);
    setIsSearchOpen(false);
  };

  return (
    <div
      className={`absolute top-full left-0 right-0 p-6 bg-white shadow-lg w-full z-40 
        transition-all duration-500 ease-[cubic-bezier(0.25, 1, 0.5, 1)] 
        ${
          isSearchOpen
            ? "translate-y-0 opacity-100 scale-100"
            : "-translate-y-5 opacity-0 scale-95 pointer-events-none"
        }
      `}
    >
      <div className="w-full max-w-4xl mx-auto flex flex-col relative">
        <div className="relative">
          <input
            type="text"
            placeholder="Nhập sản phẩm cần tìm..."
            className="w-full border border-gray-300 rounded-lg px-5 py-3 pr-14 text-lg"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg font-semibold uppercase hover:text-gray-800"
            onClick={() => setIsSearchOpen(false)}
          >
            CANCEL
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-4">
          <FontAwesomeIcon
            icon={faSpinner}
            className="text-gray-600 text-2xl animate-spin"
          />
        </div>
      )}

      <div className="mt-6">
        {products.length > 0 ? (
          <>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {products.map((product) => (
                <li
                  key={product.id}
                  className="p-4 border-b flex flex-col items-center"
                >
                  {product.images && product.images.length > 0 ? (
                    <div className="w-full max-w-[250px] h-[250px]">
                      <img
                        src={`http://localhost:8080/assets/${product.images[0].urlImage}`}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  ) : (
                    <p className="text-gray-500">Không có ảnh</p>
                  )}
                  <p className="text-lg font-semibold mt-2 text-center">
                    {product.name}
                  </p>
                  <p className="text-black font-bold text-center">
                    {product.price.toLocaleString()} VND
                  </p>
                </li>
              ))}
            </ul>

            <div className="flex justify-center mt-6 ">
              <button
                className="relative bg-black text-white uppercase font-bold px-6 py-3 
              text-sm flex items-center justify-center group hover:text-gray-500"
                onClick={() => {
                  navigate("/product");
                }}
              >
                View All
                <span className="ml-2">→</span>
                <span className="absolute bottom-[-4px] right-[-4px] w-full h-full border-b-2 border-r-2 border-black"></span>
              </button>
            </div>
          </>
        ) : (
          !loading && (
            <p className="text-gray-600 text-center py-4">
              Không có sản phẩm nào.
            </p>
          )
        )}
      </div>
    </div>
  );
}
