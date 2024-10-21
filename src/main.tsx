import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import "react-toastify/ReactToastify.min.css";
import router from "./router";
import { Provider } from "react-redux";
import store from "./store";
import { ToastContainer } from "@/utils/showNotification";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
