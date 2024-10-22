import { selectUserState, User } from "@/store/features/user";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { Outlet, useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import { getBusinesses } from "@/store/features/business";

const RootLayout = () => {
  const [userL] = useLocalStorage<User | null>("user", null);

  const user = useAppSelector(selectUserState);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (JSON.stringify(userL) !== JSON.stringify(user)) {
      // navigate(0);
    }
  }, [navigate, user, userL]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "user") {
        console.log("LocalStorage data has changed!");
        if (user) dispatch(getBusinesses({ userId: user?.id }));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch, navigate, user]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default RootLayout;
