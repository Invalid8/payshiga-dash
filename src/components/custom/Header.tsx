import { logout } from "@/store/features/user";
import { cn } from "@/utils/common";
import { Switch } from "@headlessui/react";
import {
  Avatar,
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { ArrowLeftCircle, LogOut, MenuIcon } from "lucide-react";
import { useState } from "react";
import { useAppDispatch } from "@/utils/hooks";
import useLocalStorage from "use-local-storage";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isLive, setIsLive] = useState<boolean>(false);
  const [isNotifications] = useState<boolean>(true);
  const [isSidebar, SetIsSidebar] = useLocalStorage<boolean>("sidebar", false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function showNotifications() {
    //TODO: view notification as modal or in a new page
  }

  return (
    <header className="bg-white shadow-md flex justify-between items-center p-4 px-6 border-b border-[#F5F5F5]">
      <div className="flex items-center gap-2">
        <button
          className="md:hidden block"
          onClick={() => SetIsSidebar(!isSidebar)}
        >
          <MenuIcon />
          <span className="sr-only">Menu</span>
        </button>
        <span className="md:block hidden">Dashboard</span>
      </div>
      <div className="flex items-center space-x-3">
        <div className="text-live flex gap-2 items-center pr-6 border-r-2 border-gray-200">
          <span
            className={cn(
              "font-OjahDisplaySemiBold font-[600]",
              !isLive && "text-red-500",
              isLive && "text-green-500"
            )}
          >
            {isLive ? "Live" : "Test"}
          </span>
          <Switch
            checked={isLive}
            onChange={setIsLive}
            className="group inline-flex h-6 items-center w-[38px] rounded-full bg-gray-200 data-[checked]:bg-green-600 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50"
          >
            <span className="size-[18px] min-w-[18px] translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-4" />
          </Switch>
        </div>
        <button
          className="p-2 rounded-full hover:bg-gray-200"
          onClick={() => showNotifications()}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.8742 16.9717C15.8742 18.9203 14.1509 20.5 12.0251 20.5C9.89933 20.5 8.17605 18.9203 8.17605 16.9717M15.8742 16.9717H18.1809C19.4766 16.9717 20.2008 15.4768 19.3977 14.46L18.2256 12.976V9.72821C18.2256 6.28847 15.4371 3.5 11.9974 3.5C8.53698 3.5 5.74004 6.32074 5.76936 9.781L5.79496 12.8019L4.58839 14.4112C3.79735 15.4663 4.5502 16.9717 5.8689 16.9717H8.17605M15.8742 16.9717H8.17605"
              stroke="#99999C"
              strokeWidth="1.8"
            />
            {isNotifications && (
              <rect x="14" y="2" width="8" height="8" rx="4" fill="#FF4E4E" />
            )}
            <rect
              x="14"
              y="2"
              width="8"
              height="8"
              rx="4"
              stroke="white"
              strokeWidth="1.4"
            />
          </svg>
        </button>
        <Popover placement="bottom">
          <PopoverHandler>
            <button className="p-0 m-0 third-step bg-gray-200 rounded-md overflow-hidden text-opacity-0">
              <Avatar
                src="https://via.placeholder.com/40"
                alt="avatar"
                variant="rounded"
              />
            </button>
          </PopoverHandler>
          <PopoverContent className="w-[200px]">
            <ul className="grid gap-2">
              <li>
                <span>Actions</span>
              </li>
              <li>
                <Button
                  className="flex items-center gap-2 w-full"
                  variant="outlined"
                  color="red"
                  onClick={() => {
                    if (
                      !confirm(
                        "Are sure you want to reset, you will lose all the local data on test"
                      )
                    )
                      return;
                    localStorage.removeItem("user");
                    localStorage.removeItem("users");
                    localStorage.removeItem("businesses");

                    navigate(0);
                  }}
                >
                  <ArrowLeftCircle />
                  <span>Reset Data</span>
                </Button>
              </li>
              <li>
                <Button
                  className="flex items-center gap-2 w-full"
                  color="red"
                  onClick={() => dispatch(logout())}
                >
                  <LogOut />
                  <span>Logout</span>
                </Button>
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};

export default Header;
