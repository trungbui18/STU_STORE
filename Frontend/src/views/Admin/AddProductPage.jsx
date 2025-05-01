import React from "react";
import AdminLayout from "./AdminLayout";
import AddProductForm from "../../components/Admin/ProductManagement/AddProduct/AddProductForm";
export default function AddProductPage() {
  return (
    <AdminLayout>
      <AddProductForm />
    </AdminLayout>
  );
}
