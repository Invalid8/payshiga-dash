import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";

import Home from "@/page/Home";
import Contact from "@/page/Contact";
import Root from "@/routes/root";
import ErrorPage from "@/page/ErrorPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
      <Route index element={<Home />} />
      <Route path="contacts" element={<Contact />} />
    </Route>
  )
);

export default router;
