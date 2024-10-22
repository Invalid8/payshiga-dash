import { Outlet } from "react-router-dom";
import Sidebar from "@/components/custom/Sidebar";
import Header from "@/components/custom/Header";
import AddBusinessDrawer from "@/components/custom/business/add-business";
import { useEffect, useState } from "react";
import LoginCard from "@/components/custom/auth/login";

import { getBusinesses } from "@/store/features/business";
import { showNotification } from "@/utils/showNotification";
import useLocalStorage from "use-local-storage";
import { cn } from "@/utils/common";
import Joyride, { Step } from "react-joyride";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";

const DashboardLayout = () => {
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [tourIsDone, setTourIsDone] = useLocalStorage<boolean>(
    "completedTour",
    false
  );
  const [steps] = useState<Step[]>([
    {
      target: ".header",
      content:
        "Hello welcome to payshiga dashboard business test, here are some things you need to know",
      placement: "bottom",
    },
    {
      target: ".first-step",
      content: "Switch between businesses",
      placement: "bottom",
    },
    {
      target: ".second-step",
      content: "Add new business.",
      placement: "right",
    },
    {
      target: ".third-step",
      content: "Reset or Logout session",
      placement: "left",
    },
  ]);

  const [isSidebarOpen, setSidebarOpen] = useLocalStorage<boolean>(
    "sidebar",
    false
  );

  const isAuth = useAppSelector((state) => state.user.user);
  const busFormOpen = useAppSelector((state) => state.business.busFormOpen);

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
  }, [dispatch, isAuth]);

  const handleTourCallback = (data: { status: string }) => {
    const { status } = data;
    const finishedStatuses: string[] = ["finished", "skipped"];

    if (finishedStatuses.includes(status)) {
      setTourIsDone(true);
    }
  };

  return (
    <div className="flex h-screen">
      {loginOpen && (
        <div className="flex items-center justify-center h-screen fixed z-20 top-0 left-0 right-0 bottom-0 bg-black/60 blur-0">
          <LoginCard />
        </div>
      )}
      {!loginOpen && (
        <>
          <Sidebar />
          <div className="flex-1 flex flex-col relative">
            <Header />
            <main className="flex-1 p-6 bg-white h-full overflow-scroll">
              <Outlet />
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
        </>
      )}

      {!loginOpen && (
        <>
          <AddBusinessDrawer />
          {!busFormOpen && (
            <Joyride
              steps={steps}
              continuous={true}
              scrollToFirstStep={true}
              showProgress={true}
              showSkipButton={true}
              run={!tourIsDone}
              callback={handleTourCallback}
            />
          )}
        </>
      )}
    </div>
  );
};

export default DashboardLayout;
