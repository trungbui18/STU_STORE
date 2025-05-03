import { useState, useEffect } from "react";
import axios from "axios";
import { debounce } from "lodash";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_BASE_URL from "../../../config/apiConfig";

const AddToCartSection = ({ product, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [stockMessage, setStockMessage] = useState("");
  const [isStockSufficient, setIsStockSufficient] = useState(true);

  const checkStockQuantity = async (idProduct, size, quantity) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/cart-detail/check-quantity`,
        {
          idProduct: idProduct,
          size: size,
          quantity: quantity,
        }
      );
      const result = response.data;
      if (result.stockQuantity < quantity) {
        setStockMessage(result.message);
        setIsStockSufficient(false);
      } else {
        setStockMessage("");
        setIsStockSufficient(true);
      }
    } catch (error) {
      console.log("Fail checking stock quantity: ", error);
      setStockMessage("Đã có lỗi xảy ra khi kiểm tra số lượng");
      setIsStockSufficient(false);
      toast.error("Đã có lỗi xảy ra khi kiểm tra số lượng", {
        position: "top-right",
      });
    }
  };

  const debouncedCheckStock = debounce((idProduct, size, quantity) => {
    if (size) {
      checkStockQuantity(idProduct, size, quantity);
    }
  }, 100);

  useEffect(() => {
    debouncedCheckStock(product.idProduct, selectedSize, quantity);
  }, [quantity, selectedSize, product.idProduct]);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCartClick = () => {
    if (!selectedSize) {
      toast.error("Vui lòng chọn kích thước trước khi thêm vào giỏ hàng", {
        position: "top-right",
      });
      return;
    }
    if (!isStockSufficient) {
      toast.error("Số lượng không đủ để thêm vào giỏ hàng", {
        position: "top-right",
      });
      return;
    }
    onAddToCart(product.idProduct, selectedSize, quantity);
  };

  return (
    <div className="mt-4">
      <div className="flex items-center space-x-2 mb-3">
        <span className="font-semibold text-base sm:text-lg">Size</span>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
        {product.sizes.map((size) => (
          <button
            key={size.size}
            className={`p-2 sm:p-3 border text-sm sm:text-lg font-medium transition ${
              selectedSize === size.size
                ? "bg-black text-white border-black"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
            onClick={() => setSelectedSize(size.size)}
          >
            {size.size}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap mt-6 justify-between items-center gap-4">
        <div className="flex items-center space-x-3 sm:space-x-5 flex-1">
          <button
            className="relative bg-white border-2 border-black text-black uppercase font-bold px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm flex items-center justify-center group hover:text-gray-500"
            onClick={increaseQuantity}
          >
            <span className="text-xl sm:text-2xl font-bold">+</span>
          </button>
          <span className="text-sm sm:text-lg font-semibold">{quantity}</span>
          <button
            className="relative bg-white border-black border-2 text-black uppercase font-bold px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm flex items-center justify-center group hover:text-gray-500"
            onClick={decreaseQuantity}
          >
            <span className="text-xl sm:text-2xl font-bold">-</span>
          </button>
        </div>

        <button
          className={`relative w-full sm:w-auto uppercase font-bold px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm flex items-center justify-center group ${
            selectedSize && isStockSufficient
              ? "bg-black text-white hover:text-gray-500"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
          onClick={handleAddToCartClick}
          disabled={!selectedSize || !isStockSufficient}
        >
          Add to Shopping Cart
          <span className="ml-2 text-xl sm:text-2xl">→</span>
          <span
            className={`absolute bottom-[-4px] right-[-4px] w-full h-full border-b-2 border-r-2 ${
              selectedSize && isStockSufficient
                ? "border-black"
                : "border-gray-400"
            }`}
          ></span>
        </button>
      </div>

      {stockMessage && <p className="text-red-500 mt-2">{stockMessage}</p>}
    </div>
  );
};

export default AddToCartSection;
