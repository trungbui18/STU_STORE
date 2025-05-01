import React, { useState } from "react";
import logo_VNPAY from "../../../assets/VNPAY.jpg";
import logo_Ship_COD from "../../../assets/cod.png";

const BillingInfo = ({
  handlePayment,
  setAddress,
  setFullName,
  setPhoneNumber,
  handleCheckOut,
}) => {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    shippingAddress: "",
  });
  const [errors, setErrors] = useState({
    fullName: "",
    phoneNumber: "",
    shippingAddress: "",
  });

  const handleDivClick = (method) => {
    setSelectedMethod(method);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Cập nhật dữ liệu cho parent component
    if (id === "fullName") setFullName(value);
    if (id === "phoneNumber") setPhoneNumber(value);
    if (id === "shippingAddress") setAddress(value);

    // Kiểm tra lỗi khi nhập
    validateField(id, value);
  };

  const validateField = (field, value) => {
    let error = "";
    if (field === "fullName" && value.trim() === "") {
      error = "Full name cannot be empty";
    }
    if (field === "shippingAddress" && value.trim() === "") {
      error = "Shipping address cannot be empty";
    }
    if (field === "phoneNumber") {
      if (value.trim() === "") {
        error = "Phone number cannot be empty";
      } else if (!/^\d{10,11}$/.test(value)) {
        error = "Phone number must be 10 or 11 digits";
      }
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const validateForm = () => {
    const newErrors = {
      fullName:
        formData.fullName.trim() === "" ? "Full name cannot be empty" : "",
      shippingAddress:
        formData.shippingAddress.trim() === ""
          ? "Shipping address cannot be empty"
          : "",
      phoneNumber:
        formData.phoneNumber.trim() === ""
          ? "Phone number cannot be empty"
          : !/^\d{10,11}$/.test(formData.phoneNumber)
          ? "Phone number must be 10 or 11 digits"
          : "",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = (action) => {
    if (validateForm()) {
      action(); // Gọi handlePayment hoặc handleCheckOut nếu hợp lệ
    }
  };

  return (
    <div className="p-4 rounded-lg mb-6">
      <h3 className="text-lg font-bold">Billing Information</h3>
      <div className="mt-4">
        <label htmlFor="fullName" className="block">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          className={`w-full p-2 border mt-2 ${
            errors.fullName ? "border-red-500" : ""
          }`}
          value={formData.fullName}
          onChange={handleInputChange}
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
        )}
      </div>
      <div className="mt-4">
        <label htmlFor="phoneNumber" className="block">
          Phone Number
        </label>
        <input
          type="text"
          id="phoneNumber"
          className={`w-full p-2 border mt-2 ${
            errors.phoneNumber ? "border-red-500" : ""
          }`}
          value={formData.phoneNumber}
          onChange={handleInputChange}
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
        )}
      </div>
      <div className="mt-4">
        <label htmlFor="shippingAddress" className="block">
          Shipping Address
        </label>
        <input
          type="text"
          id="shippingAddress"
          className={`w-full p-2 border mt-2 ${
            errors.shippingAddress ? "border-red-500" : ""
          }`}
          value={formData.shippingAddress}
          onChange={handleInputChange}
        />
        {errors.shippingAddress && (
          <p className="text-red-500 text-sm mt-1">{errors.shippingAddress}</p>
        )}
      </div>
      <div className="mt-8 flex flex-col gap-4">
        <h3 className="text-lg font-bold">Payments Method</h3>
        <div
          className={`w-full border flex px-4 rounded-md items-center justify-between bg-white cursor-pointer transition-all ${
            selectedMethod === "VNPAY"
              ? "border-blue-500 border-4"
              : "border-gray-300"
          }`}
          onClick={() => handleDivClick("VNPAY")}
        >
          <div className="flex items-center space-x-3 py-4">
            <input
              type="radio"
              name="Payment_method"
              id="vnpay"
              value="VNPAY"
              checked={selectedMethod === "VNPAY"}
              onChange={() => setSelectedMethod("VNPAY")}
              className="cursor-pointer"
            />
            <label htmlFor="vnpay" className="text-gray-800 text-lg">
              VNPAY Gateway
            </label>
          </div>
          <img
            src={logo_VNPAY}
            alt="VNPAY Logo"
            className="h-[150px] w-auto object-contain"
          />
        </div>
        <div
          className={`w-full border flex px-4 rounded-md items-center justify-between bg-white cursor-pointer transition-all ${
            selectedMethod === "SHIP COD"
              ? "border-blue-500 border-4"
              : "border-gray-300"
          }`}
          onClick={() => handleDivClick("SHIP COD")}
        >
          <div className="flex items-center space-x-3 py-4">
            <input
              type="radio"
              name="Payment_method"
              id="shipcod"
              value="SHIP COD"
              checked={selectedMethod === "SHIP COD"}
              onChange={() => setSelectedMethod("SHIP COD")}
              className="cursor-pointer"
            />
            <label htmlFor="shipcod" className="text-gray-800 text-lg">
              Ship COD
            </label>
          </div>
          <img
            src={logo_Ship_COD}
            alt="Ship COD Logo"
            className="h-[150px] w-auto object-contain"
          />
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        {selectedMethod === "VNPAY" && (
          <button
            className="relative bg-black text-white uppercase font-bold 
            px-6 py-4 text-sm flex items-center justify-center group hover:text-gray-500"
            onClick={() => handleSubmit(handlePayment)}
          >
            PAYMENT
            <span className="ml-2">→</span>
            <span className="absolute bottom-[-4px] right-[-4px] w-full h-full border-b-2 border-r-2 border-black"></span>
          </button>
        )}
        {selectedMethod === "SHIP COD" && (
          <button
            className="relative bg-black text-white uppercase font-bold px-6 py-4 text-sm 
            flex items-center justify-center group hover:text-gray-500"
            onClick={() => handleSubmit(handleCheckOut)}
          >
            CHECK OUT
            <span className="ml-2">→</span>
            <span className="absolute bottom-[-4px] right-[-4px] w-full h-full border-b-2 border-r-2 border-black"></span>
          </button>
        )}
      </div>
    </div>
  );
};

export default BillingInfo;
