import { Avatar, Typography } from "@material-tailwind/react";
import { useEffect } from "react";
import {
  selectActiveBusiness,
  selectSwitchState,
} from "@/store/features/business";
import { useAppSelector } from "@/utils/hooks";

const Switching = () => {
  const activeBusiness = useAppSelector(selectActiveBusiness);
  const switching = useAppSelector(selectSwitchState);

  useEffect(() => {
    console.log("switch", switching);
  }, [switching]);

  return switching ? (
    <div className="switching w-full h-[60svh] min-h-full min-w-full grid place-content-center">
      <div className="content flex flex-col gap-4 items-center justify-center text-center">
        <Avatar
          size="xxl"
          className="rounded-full bg-gray-200 overflow-hidden"
          src="https://via.placeholder.com/90"
        />
        {/* <div className="b-profile size-[100px] min-w-[100px] rounded-full bg-gray-200">
                </div> */}
        <Typography
          variant="h5"
          color="gray"
          className="font-OjahDisplaySemiBold"
        >
          Switching to{" "}
          <span className="capitalize">"{activeBusiness?.name}"</span>
        </Typography>
      </div>
    </div>
  ) : null;
};

export default Switching;
