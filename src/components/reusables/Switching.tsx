import { RootState } from "@/store";
import { Avatar, Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux";

const Switching = () => {
  const { switching, activeBusiness } = useSelector(
    (state: RootState) => state.business
  );

  if (!switching) return null;

  return (
    <div className="switching w-full h-[60svh] min-h-full min-w-full grid place-content-center">
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
          Switching to{" "}
          <span className="capitalize">"{activeBusiness?.name}"</span>
        </Typography>
      </div>
    </div>
  );
};

export default Switching;
