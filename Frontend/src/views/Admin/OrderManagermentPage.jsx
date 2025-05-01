import React from "react";
import AdminLayout from "./AdminLayout";
import OrderManagerment from "../../components/Admin/OrderManagerment/OrderManagerment";
export default function OrderManagermentPage() {
  return (
    <AdminLayout>
      <OrderManagerment />
    </AdminLayout>
  );
}
