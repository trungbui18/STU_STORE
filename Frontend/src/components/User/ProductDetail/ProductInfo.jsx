import { useState, useEffect } from "react";
import sizeGuide from "../../../assets/size_guide.png";
import { ChevronDown } from "lucide-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddToCartSection from "./AddToCartSection";
import { useNavigate } from "react-router-dom"; // Thêm nếu dùng react-router-dom
import API_BASE_URL from "../../../config/apiConfig";

export default function ProductInfo({ product }) {
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [idCart, setIdCart] = useState(
    sessionStorage.getItem("idCart") || null
  );
  const idCustomer = sessionStorage.getItem("idUser");
  const navigate = useNavigate();
  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleAddToCart = async (idProduct, selectedSize, quantity) => {
    if (!idCustomer) {
      setIsLoginModalOpen(true);
      return;
    }
    let currentIdCart = idCart;
    if (!idCart || idCart === "" || idCart === "null") {
      console.log("Tạo giỏ hàng mới");
      console.log("ID khách hàng:", idCustomer);
      const cart = {
        quantity: 1,
        idProfile: idCustomer,
      };
      try {
        const response = await axios.post(`${API_BASE_URL}/cart/create`, cart, {
          headers: { "Content-Type": "application/json" },
        });
        currentIdCart = response.data.idCart;
        setIdCart(currentIdCart);
        sessionStorage.setItem("idCart", currentIdCart); // Lưu idCart vào sessionStorage
        console.log("Tạo giỏ hàng thành công, idCart:", currentIdCart);
      } catch (error) {
        console.error("Lỗi tạo giỏ hàng: ", error);
        toast.error("Lỗi khi tạo giỏ hàng", { position: "top-right" });
        return;
      }
    }

    const cartDetail = {
      idProduct: idProduct,
      idCart: currentIdCart,
      quantity: quantity,
      size: selectedSize,
    };

    try {
      await axios.post(`${API_BASE_URL}/cart-detail/create`, cartDetail, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success("Thêm vào giỏ hàng thành công", {
        position: "top-right",
        autoClose: 1000,
      });
    } catch (error) {
      console.error("Lỗi tạo chi tiết giỏ hàng: ", error);
      toast.error("Lỗi khi thêm vào giỏ hàng", { position: "top-right" });
    }
  };

  const handleLoginRedirect = () => {
    setIsLoginModalOpen(false);
    navigate("/user/login");
  };

  const sections = [
    { title: "Description", content: "aos dep vc " },
    {
      title: "Product Care",
      content:
        "Wash max 30°C, wash separately, do not bleach, do not tumble dry, line dry in the shade, iron at max 110°C without steam, do not iron the print, do not dry clean.",
    },
    {
      title: "Return Policy",
      content:
        "We want you to be completely satisfied with your purchase. If you are not happy with your item, you may return it within 30 days of receipt for a full refund or exchange. Items must be unused, in their original condition, and with all tags attached. Return shipping costs may apply unless the item is defective or incorrect. For more details, please contact our customer support.",
    },
  ];

  return (
    <div className="w-full sm:w-full md:w-full lg:w-[40%] bg-white p-4 sm:p-8 mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold">{product.name}</h1>
      <p className="text-lg sm:text-xl font-semibold mt-2">
        {product.price.toLocaleString()} VND
      </p>

      <AddToCartSection product={product} onAddToCart={handleAddToCart} />

      <div className="mt-8 sm:mt-12">
        {sections.map((section) => (
          <div key={section.title} className="border-t border-black py-3">
            <button
              className="w-full flex justify-between items-center text-black text-sm sm:text-base"
              onClick={() => toggleSection(section.title)}
            >
              {section.title}
              <ChevronDown
                className={`transition-transform ${
                  openSection === section.title ? "rotate-180" : ""
                }`}
              />
            </button>
            {openSection === section.title && (
              <p className="mt-2 text-black text-xs sm:text-sm">
                {section.content}
              </p>
            )}
          </div>
        ))}
      </div>

      {isSizeGuideOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white w-full sm:w-3/4 rounded-lg shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-lg sm:text-xl font-bold"
              onClick={() => setIsSizeGuideOpen(false)}
            >
              ✖
            </button>
            <img src={sizeGuide} alt="Size Guide" className="w-full h-auto" />
          </div>
        </div>
      )}

      {isLoginModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white w-full sm:w-1/2 md:w-1/3 rounded-lg shadow-lg p-6 relative">
            <button
              className="absolute top-2 right-2 text-lg font-bold"
              onClick={() => setIsLoginModalOpen(false)}
            >
              ✖
            </button>
            <h2 className="text-lg sm:text-xl font-bold mb-4">
              Yêu cầu đăng nhập
            </h2>
            <p className="text-sm sm:text-base mb-6">
              Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.
            </p>
            <button
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
              onClick={handleLoginRedirect}
            >
              Đi đến trang đăng nhập
            </button>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
