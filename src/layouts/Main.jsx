import { Outlet } from "react-router-dom";
import Footer from "./shared/Footer";
import Navbar from "./shared/Navbar";

const Main = () => {
  return (
    <div>
      <Navbar />
      {/* navbar */}
      <div className="min-h-[calc(100vh-304px)]">
        <Outlet />
      </div>
      {/* footer */}
      <Footer />
    </div>
  );
};

export default Main;
