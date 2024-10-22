import { useAppDispatch } from "@/utils/hooks";
import { setSwitching } from "../features/business";

export function PropagateActiveBusiness() {
  const dispatch = useAppDispatch();

  dispatch(setSwitching(true));

  setTimeout(() => {
    dispatch(setSwitching(false));
  }, 5000);
}
