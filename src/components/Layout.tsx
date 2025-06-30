
import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col lg:max-w-screen-xl lg:mx-auto">
      <Navbar />
      <main className="flex-grow pt-16 md:pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
