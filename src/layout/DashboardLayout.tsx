import { Outlet } from "react-router-dom";
import Sidebar from "@/components/custom/Sidebar";
import Header from "@/components/custom/Header";
import AddBusinessDrawer from "@/components/custom/business/add-business";
import { useEffect, useState } from "react";
import LoginCard from "@/components/custom/auth/login";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { Avatar, Typography } from "@material-tailwind/react";
import { getBusinesses } from "@/store/business";
import { showNotification } from "@/utils/showNotification";
import useLocalStorage from "use-local-storage";
import { cn } from "@/utils/common";

const DashboardLayout = () => {
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [isSidebarOpen, setSidebarOpen] = useLocalStorage<boolean>(
    "sidebar",
    false
  );

  const isAuth = useSelector((state: RootState) => state.user.user);
  const switching = useSelector((state: RootState) => state.business.switching);

  useEffect(() => {
    function loadData() {
      if (!isAuth) {
        setLoginOpen(true);
      } else {
        try {
          dispatch(getBusinesses({ userId: isAuth.id }));
        } catch (error) {
          if (error instanceof Error)
            showNotification("error", "top-right", undefined, {
              message: error.message ?? "Something happened.",
            });
        }
      }
    }

    loadData();

    console.log(switching, console.log(switching));
  }, [dispatch, isAuth, switching]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col relative">
        <Header />
        <main className="flex-1 p-6 bg-white">
          {!loginOpen && <Outlet />}
          {switching && (
            <div className="switching w-full h-full min-h-full min-w-full grid place-content-center">
              <div className="content flex flex-col gap-4 items-center justify-center text-center">
                <Avatar
                  size="xxl"
                  className="rounded-full"
                  src="https://via.placeholder.com/90"
                />
                {/* <div className="b-profile size-[100px] min-w-[100px] rounded-full bg-gray-200">
                </div> */}
                <Typography
                  variant="h5"
                  color="gray"
                  className="font-OjahDisplaySemiBold"
                >
                  Switching to "{"Dummy Name"}"
                </Typography>
              </div>
            </div>
          )}
        </main>
        <div
          className={cn(
            "vail w-full h-full z-30 absolute top-0 left-0 right-0 bottom-0 bg-black/60 md:hidden",
            !isSidebarOpen && "hidden",
            "transition-all duration-500 ease-in-out"
          )}
          onClick={() => setSidebarOpen(false)}
        ></div>
      </div>
      {loginOpen && (
        <div className="flex items-center justify-center h-screen fixed z-20 top-0 left-0 right-0 bottom-0 bg-black/60 blur-0">
          <LoginCard />
        </div>
      )}
      {!loginOpen && <AddBusinessDrawer />}
    </div>
  );
};

export default DashboardLayout;
