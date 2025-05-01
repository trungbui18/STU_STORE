import React from "react";
import AdminLayout from "./AdminLayout";
import ProductManagement from "../../components/Admin/ProductManagement/ProductManagement";
export default function ProductManagementPage() {
  return (
    <AdminLayout>
      <ProductManagement />
    </AdminLayout>
  );
}
