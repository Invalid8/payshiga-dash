import { toast, ToastContainer, Slide } from "react-toastify";
import "./notification.css";

type NotificationMessageType = {
  message: string;
};

const showNotification = (
  type: "info" | "success" | "warn" | "error",
  position:
    | "top-left"
    | "top-right"
    | "top-center"
    | "bottom-left"
    | "bottom-right"
    | "bottom-center",
  autoClose: number | false | undefined,
  options: NotificationMessageType
) => {
  toast.dismiss();

  toast[type](options.message, {
    toastId: `notification-${type}`,
    position: position,
    autoClose: autoClose !== undefined ? autoClose : 2500,
    transition: Slide,
    hideProgressBar: true,
    icon: false,
    theme: "colored",
  });
};

export { showNotification, ToastContainer, toast };