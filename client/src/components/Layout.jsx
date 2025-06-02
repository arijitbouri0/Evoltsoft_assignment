import { Outlet } from "react-router-dom";
import Navbar from "./shared/Navbar";


const Layout= () => {
  return (
    <div className="relative">
      <Navbar/>
      <div className="w-full h-[calc(100vh-64px)] bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;