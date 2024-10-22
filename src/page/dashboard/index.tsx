import Switching from "@/components/reusables/Switching";
import {
  selectActiveBusiness,
  selectSwitchState,
} from "@/store/features/business";
import { selectUserState } from "@/store/features/user";

import { useAppSelector } from "@/utils/hooks";

const Dashboard = () => {
  const user = useAppSelector(selectUserState);
  const activeBusiness = useAppSelector(selectActiveBusiness);
  const switching = useAppSelector(selectSwitchState);

  const date = new Date();

  const formatDate = (date: Date) =>
    new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);

  return (
    <div className="w-fill md:p-6 md:py-6 p-4 space-y-6">
      <div className="header flex justify-between flex-wrap gap-1 items-end">
        <h1 className="font-OjahDisplaySemiBold text-3xl font-semibold">
          Good {date.getHours() >= 12 ? "Afternoon" : "Morning"},{" "}
          <span className="capitalize">
            {activeBusiness?.name ?? user?.name}
          </span>
        </h1>
        {!switching ? (
          <p className="text-gray-400">{formatDate(date)}</p>
        ) : (
          <div className="flex items-center gap-3 animate-pulse">
            <span className="h-4 w-48 bg-gray-300 rounded"></span>
          </div>
        )}
      </div>
      <hr className="text-gray-400" />
      <Switching />
    </div>
  );
};

export default Dashboard;
