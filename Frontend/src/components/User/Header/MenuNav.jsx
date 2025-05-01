import React from "react";
import { useNavigate } from "react-router-dom";
export default function MenuNav() {
  const navigate = useNavigate();
  const navigation = (item) => {
    switch (item) {
      case "HOME":
        navigate("/");
        break;
      case "GOODS":
        navigate("/product");
        break;
      case "ABOUT":
        navigate("/about");
        break;
      case "CONTACT":
        navigate("/contact");
        break;
      default:
        navigate("/");
    }
  };
  return (
    <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex space-x-6 font-semibold text-black">
      {["HOME", "GOODS", "ABOUT", "CONTACT"].map((item) => (
        <a
          key={item}
          href=""
          className="relative group px-2 py-1"
          onClick={() => navigation(item)}
        >
          {item}
          <span className="absolute left-0 bottom-0 w-full h-0.5 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
        </a>
      ))}
    </nav>
  );
}
