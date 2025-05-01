import React, { useState, useEffect } from "react";
import MenuNav from "./MenuNav";
import UserActions from "./UserActions";
import logo from "../../../assets/logo-moi-1200x1200.png";

export default function Header() {
  const [visible, setVisible] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setVisible(prevScrollY > currentScrollY || currentScrollY < 50);
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full border-b border-black bg-white shadow-md transition-transform duration-300 z-50 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between py-4 px-6">
        <img src={logo} className="h-16 w-16" alt="Logo" />
        <MenuNav />
        <UserActions />
      </div>
    </header>
  );
}
