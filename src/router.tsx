import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";

import Home from "@/page/Home";
import ErrorPage from "@/page/ErrorPage";
import DashboardLayout from "@/layout/DashboardLayout";
import Dashboard from "@/page/dashboard";
import RootLayout from "./layout/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<ErrorPage />} element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="transactions" element={<Dashboard />}></Route>
        <Route path="refunds" element={<Dashboard />}></Route>
        <Route path="payments" element={<Dashboard />}></Route>
        <Route path="cards" element={<Dashboard />}></Route>
        <Route path="accounts" element={<Dashboard />}></Route>
        <Route path="bills" element={<Dashboard />}></Route>
        <Route path="ecommerce" element={<Dashboard />}></Route>
        <Route path="settings" element={<Dashboard />}></Route>
        <Route path="contact" element={<Dashboard />}></Route>
      </Route>
    </Route>
  )
);

export default router;
