import Sidebar from "../../components/Admin/Sidebar/Sidebar";
import Navbar from "../../components/Admin/Navbar/Navbar";
import { useState } from "react";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Đóng sidebar khi nhấn ra ngoài (chỉ áp dụng cho mobile)
  const closeSidebar = (e) => {
    if (sidebarOpen && !e.target.closest(".sidebar")) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex bg-gray-100 h-screen overflow-hidden">
      {/* Overlay trên mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar cố định trên desktop, có thể mở trên mobile */}
      <Sidebar isOpen={sidebarOpen} />

      {/* Nội dung chính */}
      <div className="flex-1 flex flex-col md:ml-64 overflow-auto">
        <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="md:p-6">{children}</div>
      </div>
    </div>
  );
}
