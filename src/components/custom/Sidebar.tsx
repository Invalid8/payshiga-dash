import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { cn } from "@/utils/common";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { openBusForm, setActiveBusiness, setSwitching } from "@/store/business";
import { showNotification } from "@/utils/showNotification";
import useLocalStorage from "use-local-storage";

const Sidebar = () => {
  const [isProfilesOpen, setIsProfilesOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>(0);

  const [hide, setHide] = useState<boolean>(true);
  const dispatch = useDispatch();

  const isAuth = useSelector((state: RootState) => state.user.user);
  const { businesses, activeBusiness } = useSelector(
    (state: RootState) => state.business
  );

  const [isSidebarOpen, setSidebarOpen] = useLocalStorage<boolean>(
    "sidebar",
    false
  );

  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    setHide(!isAuth || businesses.length === 0);
  }, [businesses, isAuth]);

  function closeBar() {
    setSidebarOpen(false);
  }

  return (
    <div
      className={cn(
        "bg-[#FAFAFA] text-primary h-full border-r border-[#F5F5F5] min-h-screen flex-col p-2 py-4 transition-width duration-300 justify-between",
        "w-[250px] max-w-[250px] md:relative absolute top-0 bottom-0 md:z-auto md:translate-x-0",
        isSidebarOpen && "translate-x-0 z-50",
        !isSidebarOpen && "translate-x-[-100%]"
      )}
    >
      <div className="grid gap-5 lg:gap-12">
        <div className="profiles w-full border bg-white border-[#E2E3E5] rounded-xl grid h-fit">
          {hide ? (
            <div className="p-h grid grid-cols-[42px_130px_10px] gap-2 items-center p-3 animate-pulse">
              <span className="business-icon rounded-lg size-[42px] min-w-[43px] bg-gray-300"></span>

              <div className="business-info text-start grid gris-rows-2">
                <div className="business-name h-4 bg-gray-300 rounded-md w-[120px] mb-1"></div>
                <div className="business-id h-3 bg-gray-300 rounded-md w-[90px]"></div>
              </div>

              <span className="h-4 w-4 bg-gray-300 rounded-full"></span>
            </div>
          ) : (
            <button
              className="p-h grid grid-cols-[42px_130px_10px] gap-2 items-center p-3 first-step"
              onClick={() => {
                setIsProfilesOpen(!isProfilesOpen);
              }}
            >
              <span className="business-icon rounded-lg size-[42px] min-w-[43px] overflow-hidden bg-gray-200">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              </span>
              <span className="business-info text-start grid gris-rows-2">
                <span className="business-name capitalize truncate text-[16px] font-medium">
                  {activeBusiness?.name}
                </span>
                <span className="business-id truncate text-xs text-subtext">
                  Business ID: {activeBusiness?.id}
                </span>
              </span>
              <span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.7101 5.18159L9.02846 2.5L6.34716 5.1813M11.648 12.8184L8.9664 15.5L6.2851 12.8187"
                    stroke="#6F6F6F"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          )}
          <div className="overflow-hidden relative max-h-[180px]">
            <div
              className={cn(
                "p-b",
                isProfilesOpen &&
                  "h-full max-h-[180px] overflow-y-auto p-3 border-t border-gray-50 animate-dropdown",
                !isProfilesOpen &&
                  "h-0 overflow-hidden transition-[height] dropdown-leave"
              )}
            >
              <ul className="grid gap-3">
                <li className="cols-span-1">
                  <button
                    className="p-h grid grid-cols-[42px_142px] items-center p-1.5 hover:bg-gray-50 rounded-lg second-step"
                    onClick={() => {
                      try {
                        dispatch(openBusForm());
                        setIsProfilesOpen(false);
                        closeBar();
                      } catch (error) {
                        if (error instanceof Error)
                          if (error instanceof Error)
                            showNotification("error", "top-right", undefined, {
                              message: error.message || "Something went wrong",
                            });
                      }
                    }}
                  >
                    <span className="business-icon text-start rounded-lg size-[42px] min-w-[43px] overflow-hidden bg-gray-100 grid place-content-center">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 4.87396V17.1259M4.87402 11H17.126"
                          stroke="#B4B4B4"
                          strokeWidth="2.8875"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                    <span className="text-[16px] font-medium">
                      Add a Business
                    </span>
                  </button>
                </li>
                {businesses &&
                  businesses.map(
                    (business, index) =>
                      index != selectedId && (
                        <li key={index}>
                          <button
                            className={cn(
                              "p-h grid grid-cols-[42px_142px] gap-2 items-center rounded-lg hover:bg-gray-50 p-1.5",
                              index == selectedId &&
                                "bg-primary text-white p-1.5"
                            )}
                            onClick={() => {
                              setSelectedId(index);
                              setIsProfilesOpen(false);
                              setSwitching(true);
                              dispatch(
                                setActiveBusiness({
                                  id: business.id,
                                  userId: isAuth?.id ?? "",
                                })
                              );
                              closeBar();
                              setSwitching(false);
                            }}
                          >
                            <span className="business-icon rounded-lg size-[42px] min-w-[43px] overflow-hidden bg-gray-200">
                              <img
                                src="https://via.placeholder.com/40"
                                alt="Profile"
                                className="object-cover w-full h-full"
                              />
                            </span>
                            <span className="business-info grid text-start">
                              <span className="business-name capitalize text-[14px] font-medium truncate">
                                {business.name}
                              </span>
                              <span className="business-id text-[11px] text-subtext truncate">
                                Business ID: {business.id}
                              </span>
                            </span>
                          </button>
                        </li>
                      )
                  )}
              </ul>
            </div>
          </div>
        </div>

        <div className="top-nav">
          <nav className="grid gap-6 px-6 py-2 h-full justify-between">
            {!hide ? (
              <Link
                key={"Home"}
                onClick={closeBar}
                to={"/dashboard"}
                className={cn("flex items-center gap-3")}
              >
                <span className="icon size-[24px] min-w-[24px] grid place-content-center">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.25 0H1.75C0.783502 0 0 0.783502 0 1.75V3.5H4.375H14V1.75C14 0.783502 13.2165 0 12.25 0Z"
                      fill={pathname == "/dashboard" ? "#5540EB" : "#E2E3E5"}
                    />
                    <path
                      d="M0 12.25C0 13.2165 0.783502 14 1.75 14H3.5V4.375H0V12.25Z"
                      fill={pathname == "/dashboard" ? "#5540EB" : "#E2E3E5"}
                    />
                    <path
                      d="M12.25 14C13.2165 14 14 13.2165 14 12.25V4.375H4.375V14H12.25Z"
                      fill={pathname == "/dashboard" ? "#CDCBFF" : "#E2E3E5"}
                    />
                  </svg>
                </span>
                <span
                  className={cn(
                    "text-[16px] capitalize hover:text-secondary",
                    pathname == "/dashboard" && "text-secondary",
                    pathname != "/dashboard" && "text-subtext"
                  )}
                >
                  Home
                </span>
              </Link>
            ) : (
              <div className="flex items-center gap-3 animate-pulse">
                <span className="icon size-[24px] min-w-[24px] grid place-content-center bg-gray-300 rounded"></span>
                <span className="h-4 w-24 bg-gray-300 rounded"></span>
              </div>
            )}
            {paths.map(({ name, path, Icon }, index) =>
              !hide ? (
                <Link
                  key={path}
                  onClick={closeBar}
                  to={path}
                  className={cn("flex items-center gap-3")}
                >
                  <span className="icon size-[24px] min-w-[24px] grid place-content-center">
                    {<Icon isSelected={pathname.startsWith(path)} />}
                  </span>
                  <span
                    className={cn(
                      "text-[16px] capitalize hover:text-secondary",
                      pathname.startsWith(path) && "text-secondary",
                      !pathname.startsWith(path) && "text-subtext"
                    )}
                  >
                    {name}
                  </span>
                </Link>
              ) : (
                <div
                  className="flex items-center gap-3 animate-pulse"
                  key={index}
                >
                  <span className="icon size-[24px] min-w-[24px] grid place-content-center bg-gray-300 rounded"></span>
                  <span className="h-4 w-24 bg-gray-300 rounded"></span>
                </div>
              )
            )}
          </nav>
        </div>
      </div>
      <div className="bottom-nav pb-4 pt-2">
        <nav className="grid gap-6 px-6 py-2 justify-between">
          {!hide && (
            <>
              <Link
                key={"Settings"}
                onClick={closeBar}
                to={"/dashboard/settings"}
                className={cn("flex items-center gap-3")}
              >
                <span className="icon size-[24px] min-w-[24px] grid place-content-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.84731 3.69442C1.2737 4.03897 0.924805 4.64593 0.924805 5.29928V10.5473C0.924805 11.1842 1.25648 11.7782 1.80698 12.1272L6.3957 15.0366C7.3701 15.6545 8.63026 15.6545 9.60466 15.0366L14.1934 12.1272C14.7439 11.7782 15.0756 11.1842 15.0756 10.5473V5.29928C15.0756 4.64593 14.7267 4.03897 14.153 3.69442L9.54416 0.926014C8.59851 0.357995 7.40184 0.357995 6.4562 0.926014L1.84731 3.69442ZM8.00018 11.3318C9.88661 11.3318 11.4159 9.85186 11.4159 8.02627C11.4159 6.20069 9.88661 4.72076 8.00018 4.72076C6.11374 4.72076 4.58448 6.20069 4.58448 8.02627C4.58448 9.85186 6.11374 11.3318 8.00018 11.3318Z"
                      fill={
                        pathname.startsWith("/dashboard/settings")
                          ? "#5540EB"
                          : "#99999C"
                      }
                    />
                  </svg>
                </span>
                <span
                  className={cn(
                    "text-[16px] capitalize hover:text-secondary",
                    pathname.startsWith("/dashboard/settings") &&
                      "text-secondary",
                    !pathname.startsWith("/dashboard/settings") &&
                      "text-subtext"
                  )}
                >
                  Settings
                </span>
              </Link>
              <Link
                key={"Contact"}
                onClick={closeBar}
                to={"/dashboard/contact"}
                className={cn("flex items-center gap-3")}
              >
                <span className="icon size-[24px] min-w-[24px] grid place-content-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.4939 7.22058C13.5294 6.25611 12.2213 5.71427 10.8573 5.71427C10.0835 5.71376 9.31955 5.88788 8.62236 6.22365C7.92519 6.55943 7.31277 7.0482 6.83074 7.65355C6.34871 8.25891 6.0095 8.96523 5.83839 9.71991C5.66728 10.4746 5.66866 11.2581 5.84247 12.0122C6.01626 12.7663 6.35798 13.4714 6.84216 14.075C7.32634 14.6786 7.9405 15.1652 8.63887 15.4985C9.33724 15.8318 10.1018 16.0032 10.8756 16C11.6495 15.9967 12.4126 15.8188 13.1081 15.4796L15.4075 15.8934C15.6691 15.9404 15.8824 15.6849 15.7894 15.4359L15.141 13.7008C15.7042 12.8596 16.0034 11.8695 16.0002 10.8571C16.0002 9.49316 15.4584 8.18505 14.4939 7.22058Z"
                      fill={
                        pathname.startsWith("/dashboard/contact")
                          ? "#CDCBFF"
                          : "#E2E3E5"
                      }
                    />
                    <path
                      d="M6.30309 -1.38846e-05C4.63142 -1.38846e-05 3.02821 0.664059 1.84615 1.84611C0.664101 3.02817 3.13657e-05 4.63137 3.13657e-05 6.30305C-0.00390503 7.54373 0.362754 8.75732 1.05301 9.78827L0.210821 12.042C0.117791 12.291 0.331129 12.5465 0.592697 12.4995L3.54457 11.9684C3.83774 12.1113 4.1407 12.231 4.45062 12.3265C4.34272 11.854 4.28573 11.3622 4.28573 10.8571C4.28573 7.22783 7.22785 4.2857 10.8572 4.2857C11.3644 4.2857 11.8582 4.34316 12.3323 4.45194C12.1011 3.69916 11.7304 2.995 11.2381 2.37676C10.6473 1.63484 9.89672 1.0358 9.04226 0.624281C8.18779 0.212758 7.25149 -0.000640079 6.30309 -1.38846e-05Z"
                      fill={
                        pathname.startsWith("/dashboard/contact")
                          ? "#5540EB"
                          : "#929292"
                      }
                    />
                  </svg>
                </span>
                <span
                  className={cn(
                    "text-[16px] capitalize hover:text-secondary",
                    pathname.startsWith("/dashboard/contact") &&
                      "text-secondary",
                    !pathname.startsWith("/dashboard/contact") && "text-subtext"
                  )}
                >
                  contact us
                </span>
              </Link>
            </>
          )}
          {hide &&
            [1, 2].map((_, index) => (
              <div
                className="flex items-center gap-3 animate-pulse"
                key={index}
              >
                <span className="icon size-[24px] min-w-[24px] grid place-content-center bg-gray-300 rounded"></span>
                <span className="h-4 w-24 bg-gray-300 rounded"></span>
              </div>
            ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

const paths = [
  {
    name: "Transactions",
    path: "/dashboard/transactions",
    Icon({ isSelected }: { isSelected: boolean }) {
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.92267 11.9061L9.18805 11.8967C9.59516 11.895 9.81636 11.4049 9.55561 11.0823L5.43967 5.99029C5.18186 5.67133 4.70634 5.67331 4.45103 5.99441L0.3751 11.1206C0.116891 11.4453 0.341923 11.9336 0.749025 11.9319L3.01441 11.9224C3.01747 12.7041 3.02303 13.8042 3.03973 15.0384C3.0432 15.2944 3.25192 15.5 3.50797 15.5H6.45659C6.71405 15.5 6.92337 15.2923 6.92474 15.0348C6.93133 13.7973 6.92574 12.6903 6.92267 11.9061Z"
            fill={isSelected ? "#5540EB" : "#E2E3E5"}
          />
          <path
            d="M9.07575 4.11469L6.81036 4.12413C6.40326 4.12583 6.18206 4.61592 6.4428 4.9385L10.5587 10.0305C10.8166 10.3495 11.2921 10.3475 11.5474 10.0264L15.6233 4.90023C15.8815 4.57549 15.6565 4.08725 15.2494 4.08895L12.984 4.0984C12.9819 3.56531 12.9787 2.03922 12.9715 0.963982C12.9698 0.706823 12.7607 0.5 12.5035 0.5H9.53899C9.28041 0.5 9.07067 0.709027 9.07062 0.967614C9.07038 2.04804 9.07365 3.57903 9.07575 4.11469Z"
            fill={isSelected ? "#CDCBFF" : "#99999C"}
          />
        </svg>
      );
    },
  },
  {
    name: "Refunds",
    path: "/dashboard/refunds",
    Icon({ isSelected }: { isSelected: boolean }) {
      return (
        <svg
          width="14"
          height="16"
          viewBox="0 0 14 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.0999756 11.7L4.89998 15.5V12.7C4.89998 12.1477 4.45226 11.7 3.89998 11.7H0.0999756Z"
            fill={isSelected ? "#CDCBFF" : "#E2E3E5"}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.9 14.5V1.5C13.9 0.947715 13.4523 0.5 12.9 0.5H1.09998C0.547691 0.5 0.0999756 0.947715 0.0999756 1.5V11.7H3.89998C4.45226 11.7 4.89998 12.1477 4.89998 12.7V15.5H12.9C13.4523 15.5 13.9 15.0523 13.9 14.5ZM3.4989 7.49961C3.4989 5.48377 5.13305 3.84961 7.1489 3.84961C8.30773 3.84961 9.33988 4.38937 10.0084 5.2311L10.1386 4.87584C10.2622 4.5388 10.6356 4.36576 10.9727 4.48934C11.3097 4.61293 11.4828 4.98634 11.3592 5.32338L10.6992 7.12338C10.5911 7.41811 10.2878 7.5935 9.97845 7.54016L8.23846 7.24016C7.8847 7.17916 7.64736 6.84293 7.70835 6.48917C7.76935 6.1354 8.10558 5.89807 8.45934 5.95906L9.00068 6.0524C8.57038 5.5028 7.90056 5.14961 7.1489 5.14961C5.85102 5.14961 4.7989 6.20174 4.7989 7.49961C4.7989 8.79747 5.85103 9.84961 7.1489 9.84961C7.72929 9.84961 8.25904 9.64007 8.66913 9.29168C8.94272 9.05925 9.35292 9.09262 9.58535 9.36621C9.81777 9.6398 9.7844 10.05 9.51081 10.2824C8.87451 10.823 8.049 11.1496 7.1489 11.1496C5.13305 11.1496 3.4989 9.51543 3.4989 7.49961Z"
            fill={isSelected ? "#5540EB" : "#99999C"}
          />
        </svg>
      );
    },
  },
  {
    name: "Payments",
    path: "/dashboard/payments",
    Icon({ isSelected }: { isSelected: boolean }) {
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.5 11.4223C15.0523 11.4223 15.5 10.9746 15.5 10.4223V1.5C15.5 0.947715 15.0523 0.5 14.5 0.5H6.45146C5.89917 0.5 5.45146 0.947715 5.45146 1.5V4.14078V8.65534H7.9466C8.49889 8.65534 8.9466 9.10306 8.9466 9.65534V11.4223H10.5485H14.5ZM10.5397 8.65534C10.8614 8.65534 11.1222 8.39454 11.1222 8.07282V4.45184L12.0378 5.29697C12.2742 5.51519 12.6427 5.50045 12.8609 5.26405C13.0792 5.02765 13.0644 4.65911 12.828 4.44089L10.9348 2.69332C10.7117 2.48734 10.3677 2.48734 10.1446 2.69332L8.25137 4.44089C8.01497 4.65911 8.00023 5.02765 8.21845 5.26405C8.43666 5.50045 8.8052 5.51519 9.0416 5.29697L9.95717 4.45184V8.07282C9.95717 8.39454 10.218 8.65534 10.5397 8.65534Z"
            fill={isSelected ? "#5540EB" : "#E2E3E5"}
          />
          <path
            d="M8.9466 11.4223L5.45146 8.65534V4.14078H1.5C0.947714 4.14078 0.5 4.58849 0.5 5.14078V12.0994C0.5 12.6861 0.757645 13.2433 1.2047 13.6233L2.85248 15.0239C3.21408 15.3312 3.6732 15.5 4.14778 15.5H9.54854C10.1008 15.5 10.5485 15.0523 10.5485 14.5V11.4223H8.9466Z"
            fill={isSelected ? "#CDCBFF" : "#99999C"}
          />
        </svg>
      );
    },
  },
  {
    name: "Cards",
    path: "/dashboard/cards",
    Icon({ isSelected }: { isSelected: boolean }) {
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_615_598)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.5 6.32851V12.0179C0.5 12.9054 1.21954 13.625 2.10714 13.625H13.8929C14.7804 13.625 15.5 12.9054 15.5 12.0179V6.32851H0.5ZM10.0089 10.4107C10.0089 10.0409 10.3087 9.74107 10.6786 9.74107H12.2857C12.6556 9.74107 12.9554 10.0409 12.9554 10.4107C12.9554 10.7806 12.6556 11.0804 12.2857 11.0804H10.6786C10.3087 11.0804 10.0089 10.7806 10.0089 10.4107Z"
              fill={isSelected ? "#5540EB" : "#99999C"}
            />
            <path
              d="M2.10714 2.375C1.21954 2.375 0.5 3.09454 0.5 3.98214V4.98922H15.5V3.98214C15.5 3.09454 14.7804 2.375 13.8929 2.375H2.10714Z"
              fill={isSelected ? "#CDCBFF" : "#E2E3E5"}
            />
          </g>
          <defs>
            <clipPath id="clip0_615_598">
              <rect
                width="15"
                height="15"
                fill="white"
                transform="translate(0.5 0.5)"
              />
            </clipPath>
          </defs>
        </svg>
      );
    },
  },
  {
    name: "Accounts",
    path: "/dashboard/accounts",
    Icon({ isSelected }: { isSelected: boolean }) {
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.2982 5.90172L8.51922 0.68197C8.21607 0.439343 7.78393 0.439343 7.48078 0.68197L0.70183 5.90172C0.306091 6.21846 0.531319 6.85391 1.03932 6.85391H2.20343H3.8596H5.51577H7.17194H8.8281H10.4843H12.1404H13.7966H14.9607C15.4687 6.85391 15.6939 6.21846 15.2982 5.90172Z"
            fill={isSelected ? "#5540EB" : "#99999C"}
          />
          <path
            d="M10.4843 12.8238V6.85391H8.8281V12.8238H10.4843Z"
            fill={isSelected ? "#CDCBFF" : "#E2E3E5"}
          />
          <path
            d="M5.51577 6.85391V12.8238H7.17194V6.85391H5.51577Z"
            fill={isSelected ? "#CDCBFF" : "#E2E3E5"}
          />
          <path
            d="M2.20343 6.85391V12.8238H3.8596V6.85391H2.20343Z"
            fill={isSelected ? "#CDCBFF" : "#E2E3E5"}
          />
          <path
            d="M13.7966 12.8238V6.85391H12.1404V12.8238H13.7966Z"
            fill={isSelected ? "#CDCBFF" : "#E2E3E5"}
          />
          <path
            d="M2.20343 12.8238H1.8674C1.41007 12.8238 1.03932 13.1925 1.03932 13.6473V15.0883C1.03932 15.3157 1.22469 15.5 1.45336 15.5H14.5466C14.7753 15.5 14.9607 15.3157 14.9607 15.0883V13.6473C14.9607 13.1925 14.5899 12.8238 14.1326 12.8238H13.7966H12.1404H10.4843H8.8281H7.17194H5.51577H3.8596H2.20343Z"
            fill={isSelected ? "#5540EB" : "#99999C"}
          />
        </svg>
      );
    },
  },
  {
    name: "manage bills",
    path: "/dashboard/bills",
    Icon({ isSelected }: { isSelected: boolean }) {
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.5 2.75C0.5 1.64543 1.39543 0.75 2.5 0.75H13.5C14.6046 0.75 15.5 1.64543 15.5 2.75V13.25C15.5 14.3546 14.6046 15.25 13.5 15.25H2.5C1.39543 15.25 0.5 14.3546 0.5 13.25V2.75ZM13.1563 2.5625H2.84375C2.41228 2.5625 2.0625 2.90062 2.0625 3.31771V8.15104C2.0625 8.56813 2.41228 8.90625 2.84375 8.90625H5.15625C5.43239 8.90625 5.65625 9.12265 5.65625 9.38958V10.5677C5.65625 10.9848 6.00603 11.3229 6.4375 11.3229H9.5625C9.99397 11.3229 10.3438 10.9848 10.3438 10.5677V9.38958C10.3438 9.12265 10.5676 8.90625 10.8438 8.90625H13.1563C13.5877 8.90625 13.9375 8.56813 13.9375 8.15104V3.31771C13.9375 2.90062 13.5877 2.5625 13.1563 2.5625Z"
            fill={isSelected ? "#5540EB" : "#99999C"}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.84375 2.5625H13.1563C13.5877 2.5625 13.9375 2.90062 13.9375 3.31771V8.15104C13.9375 8.56813 13.5877 8.90625 13.1563 8.90625H10.8438C10.5676 8.90625 10.3438 9.12265 10.3438 9.38958V10.5677C10.3438 10.9848 9.99397 11.3229 9.5625 11.3229H6.4375C6.00603 11.3229 5.65625 10.9848 5.65625 10.5677V9.38958C5.65625 9.12265 5.43239 8.90625 5.15625 8.90625H2.84375C2.41228 8.90625 2.0625 8.56813 2.0625 8.15104V3.31771C2.0625 2.90062 2.41228 2.5625 2.84375 2.5625ZM11.5 4.375H4.5C4.36193 4.375 4.25 4.4832 4.25 4.61667V5.34167C4.25 5.47514 4.36193 5.58333 4.5 5.58333H11.5C11.6381 5.58333 11.75 5.47514 11.75 5.34167V4.61667C11.75 4.4832 11.6381 4.375 11.5 4.375Z"
            fill={isSelected ? "#CDCBFF" : "#E2E3E5"}
          />
        </svg>
      );
    },
  },
  {
    name: "ecommerce",
    path: "/dashboard/ecommerce",
    Icon({ isSelected }: { isSelected: boolean }) {
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.80655 5.13745V9.05948C3.80655 9.13413 3.84816 9.20257 3.91443 9.23693L6.21314 10.4289C6.3462 10.4978 6.50504 10.4013 6.50504 10.2514V6.38257L11.9996 3.48409L9.30348 2.08499L3.80655 5.13745Z"
            fill={isSelected ? "#CDCBFF" : "#F0F0F0"}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.5 4.40692V11.6297C0.5 11.7751 0.578889 11.909 0.706029 11.9794L7.52188 15.7653C7.76016 15.8973 8.04925 15.899 8.28899 15.7696L15.29 11.9927C15.4194 11.923 15.5 11.7879 15.5 11.6409V4.31784C15.5 4.17332 15.422 4.04005 15.296 3.96928L8.40162 0.185949C8.28158 0.118527 8.13529 0.117621 8.01442 0.183549L0.708343 4.05596C0.57991 4.12601 0.5 4.26062 0.5 4.40692ZM3.80655 9.05948V5.13745L9.30348 2.08499L11.9996 3.48409L6.50504 6.38257V10.2514C6.50504 10.4013 6.3462 10.4978 6.21314 10.4289L3.91443 9.23693C3.84816 9.20257 3.80655 9.13413 3.80655 9.05948Z"
            fill={isSelected ? "#5540EB" : "#99999C"}
          />
        </svg>
      );
    },
  },
];
