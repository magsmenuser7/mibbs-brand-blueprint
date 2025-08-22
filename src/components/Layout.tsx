import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  const location = useLocation();

  // Pages where footer should be hidden
  const noFooterPages = ["/enterprises"];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-[5.5rem]">
        <Outlet />
      </main>

      {/* Show footer only if not in noFooterPages */}
      {!noFooterPages.includes(location.pathname) && <Footer />}
    </div>
  );
};

export default Layout;
