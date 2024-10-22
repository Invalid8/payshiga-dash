import Switching from "@/components/reusables/Switching";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const activeBusiness = useSelector(
    (state: RootState) => state.business.activeBusiness
  );

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
        <p className="text-gray-400">{formatDate(date)}</p>
      </div>
      <hr className="text-gray-400" />
      <Switching />
    </div>
  );
};

export default Dashboard;
