import { User } from "@/store/user";
import { useEffect } from "react";
import { useAppSelector } from "@/utils/hooks";
import { Outlet, useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";

const RootLayout = () => {
  const [userL] = useLocalStorage<User | null>("user", null);

  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (JSON.stringify(userL) !== JSON.stringify(user)) {
      navigate(0);
    }
  }, [navigate, user, userL]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "user") {
        console.log("LocalStorage data has changed!", event);
        navigate(0);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default RootLayout;
