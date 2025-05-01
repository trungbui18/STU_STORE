import React from "react";
import logo from "../../../assets/logo-moi-1200x1200.png";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6 space-y-6 md:space-y-0 md:space-x-10">
        <img src={logo} alt="STU Logo" className="h-40 md:h-60" />
        <div className="text-center md:text-left max-w-lg">
          <h2 className="text-lg font-semibold">
            Trường Đại học Công nghệ Sài Gòn - STU
          </h2>
          <p>180 Cao Lỗ, Phường 4, Quận 8, Tp. Hồ Chí Minh</p>
          <p>ĐT: (028) 38 505 520 | Fax: (84.8) 3850 6595</p>
          <p>
            Email:{" "}
            <a href="mailto:contact@stu.edu.vn" className="underline">
              contact@stu.edu.vn
            </a>
          </p>
          <p className="mt-2">
            BẢN QUYỀN THUỘC VỀ TRƯỜNG ĐẠI HỌC CÔNG NGHỆ SÀI GÒN
          </p>
          <p>Phòng Quản lý khoa học & Sau đại học thiết kế và thực hiện</p>
        </div>
        <div className="text-center md:text-right">
          <h3 className="text-lg font-semibold mb-3">Cộng đồng STU</h3>
          <div className="flex justify-center md:justify-end space-x-4">
            <img
              src="https://www.coolmate.me/images/footer/icon-instar.svg"
              alt="Instagram"
              className="h-10 w-10 hover:scale-110 transition-transform"
            />
            <img
              src="https://mcdn.coolmate.me/image/June2023/mceclip0_62.png"
              alt="TikTok"
              className="h-10 w-10 hover:scale-110 transition-transform"
            />
            <img
              src="https://mcdn.coolmate.me/image/June2023/mceclip1_43.png"
              alt="Facebook"
              className="h-10 w-10 hover:scale-110 transition-transform"
            />
            <img
              src="https://www.coolmate.me/images/footer/icon-youtube.svg"
              alt="YouTube"
              className="h-10 w-10 hover:scale-110 transition-transform"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
