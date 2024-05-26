import HomePage from "../Pages/HomePage";
import ContactPage from "../Pages/ContactUs";
import PropertyList from "../Pages/PropertyList";
import VerifyProperty from "../Pages/Verification";
import { createBrowserRouter } from "react-router-dom";
import AreaGuides from "../Pages/AreaGuides";
import Dealers from "../Pages/Dealers";
import _3DModels from "../Pages/3DModels";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/contact-us",
    element: <ContactPage />,
  },
  {
    path: "/property-list",
    element: <PropertyList />,
  },
  {
    path: "/area-guides",
    element: <AreaGuides />,
  },
  {
    path: "/verification/:plot_no",
    element: <VerifyProperty />,
  },
  {
    path: "/dealers",
    element: <Dealers />,
  },
]);

export default router;
