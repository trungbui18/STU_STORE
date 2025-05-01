import { useState } from "react";
import UserLayout from "./UserLayout";
import ProductDetail from "../../components/User/ProductDetail/ProductDetail";

export default function ProductDetailPage() {
  const [openSection, setOpenSection] = useState(null);
  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <UserLayout>
      <ProductDetail />
    </UserLayout>
  );
}
