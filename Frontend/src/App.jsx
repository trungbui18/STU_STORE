import "./App.css";
import CartPage from "./views/User/CartPage";
import HomePage from "./views/User/HomePage";
import ProductDetailPage from "./views/User/ProductDetailPage";
import ProductPage from "./views/User/ProductPage";
import AdminLoginPage from "./views/Admin/AdminLoginPage";
import DashboardPage from "./views/Admin/DashboardPage";
import ProductManagementPage from "./views/Admin/ProductManagementPage";
import EditProductPage from "./views/Admin/EditProductPage";
import OrderManagermentPage from "./views/Admin/OrderManagermentPage";
import AddProductPage from "./views/Admin/AddProductPage";
import PromotionPage from "./views/Admin/PromotionPage";
import CheckoutPage from "./views/User/CheckoutPage";
import AddPromotionPage from "./views/Admin/AddPromotionPage";
import PaymentSuccessPage from "./views/User/PaymentSuccessPage";
import UpdatePromotionPage from "./views/Admin/UpdatePromotionPage";
import OrderDetailPage from "./views/Admin/OrderDetailPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminRoute from "./components/Admin/AdminRoute";
import UserLoginPage from "./views/User/UserLoginPage";
import UserRegisterPage from "./views/User/UserRegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/login" element={<UserLoginPage />} />
        <Route path="/user/register" element={<UserRegisterPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/productDetail/:id" element={<ProductDetailPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment-success" element={<PaymentSuccessPage />} />
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <DashboardPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/product"
          element={
            <AdminRoute>
              <ProductManagementPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/product/create"
          element={
            <AdminRoute>
              <AddProductPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/product/update/:id"
          element={
            <AdminRoute>
              <EditProductPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/order"
          element={
            <AdminRoute>
              <OrderManagermentPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/order/:idOrder"
          element={
            <AdminRoute>
              <OrderDetailPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/promotion"
          element={
            <AdminRoute>
              <PromotionPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/promotion/create"
          element={
            <AdminRoute>
              <AddPromotionPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/promotion/update/:idCoupon"
          element={
            <AdminRoute>
              <UpdatePromotionPage />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
