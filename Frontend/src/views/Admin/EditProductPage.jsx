import React from "react";
import AdminLayout from "./AdminLayout";
import EditProductForm from "../../components/Admin/ProductManagement/EditProduct/EditProductForm";
export default function EditProductPage() {
  return (
    <AdminLayout>
      <EditProductForm />
    </AdminLayout>
  );
}
