import { NavLink } from "react-router-dom";
import {
  Home,
  ShoppingBag,
  ClipboardList,
  Users,
  BarChart2,
  TicketPercent,
} from "lucide-react";

export default function Sidebar({ isOpen }) {
  return (
    <div
      className={`sidebar w-64 bg-white shadow-md h-screen fixed top-0 left-0 z-20 transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-64 md:translate-x-0"}`}
    >
      <h1 className="text-xl font-bold text-center mb-1 p-4">
        Admin Dashboard
      </h1>
      <ul>
        <NavItem to="/admin/dashboard" icon={<Home />} label="Dashboard" />
        <NavItem to="/admin/product" icon={<ShoppingBag />} label="Product" />
        <NavItem to="/admin/order" icon={<ClipboardList />} label="Orders" />
        <NavItem
          to="/admin/promotion"
          icon={<TicketPercent />}
          label="Promotion"
        />
        <NavItem
          to="/admin/reports"
          icon={<BarChart2 />}
          label="Revenue Report"
        />
      </ul>
    </div>
  );
}

function NavItem({ to, icon, label }) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `p-3 flex items-center gap-2 hover:bg-gray-200 cursor-pointer ${
            isActive ? "bg-gray-300 font-bold" : ""
          }`
        }
      >
        {icon}
        {label}
      </NavLink>
    </li>
  );
}
