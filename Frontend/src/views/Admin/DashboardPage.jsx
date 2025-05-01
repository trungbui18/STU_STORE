import React from "react";
import AdminDashboard from "../../components/Admin/Dashboard/AdminDashboard";
import AdminLayout from "./AdminLayout";
export default function DashboardPage() {
  return (
    <AdminLayout>
      <AdminDashboard />
    </AdminLayout>
  );
}
