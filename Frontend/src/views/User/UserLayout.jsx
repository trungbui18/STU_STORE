import React from "react";
import Header from "../../components/User/Header/Header";
import Footer from "../../components/User/Footer/Footer";

const UserLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-[6rem] ">{children}</main>
      <Footer />
    </div>
  );
};

export default UserLayout;
