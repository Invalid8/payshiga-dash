import { Outlet } from "react-router-dom";
import Sidebar from "@/components/custom/Sidebar";
import Header from "@/components/custom/Header";
import AddBusinessDrawer from "@/components/custom/business/add-business";
import { useEffect, useState } from "react";
import { isAuth } from "@/store/user";
import LoginCard from "@/components/custom/auth/login";

const DashboardLayout = () => {
  const [isDrawOpen, setDrawOpen] = useState<boolean>(false);
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const auth = isAuth();

  useEffect(() => {
    if (!auth) {
      // prompt login
      setLoginOpen(true);
    } else {
      setDrawOpen(auth.businesses.length === 0);
    }
  }, [auth]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 bg-gray-100">
          {!loginOpen && <Outlet />}
        </main>
      </div>
      {loginOpen && (
        <div className="flex items-center justify-center h-screen fixed z-20 top-0 left-0 right-0 bottom-0 bg-black/60 blur-0">
          <LoginCard />
        </div>
      )}
      {!loginOpen && (
        <AddBusinessDrawer
          isOpen={isDrawOpen}
          onClose={() => {
            if (auth?.businesses.length === 0) return;
            setDrawOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
