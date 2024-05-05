import { Outlet } from "react-router-dom";
import Footer from "./shared/Footer";
import Navbar from "./shared/Navbar";

const Main = () => {
  return (
    <div>
      <Navbar />
      {/* navbar */}
      <Outlet />
      {/* footer */}
      <Footer />
    </div>
  );
};

export default Main;
