import { createBrowserRouter } from "react-router";
import { Root } from "./layout/Root";
import Home from "./pages/Home";
import About from "./pages/About";
import Agenda from "./pages/Agenda";
import Speakers from "./pages/Speakers";
import Venue from "./pages/Venue";
import Resources from "./pages/Resources";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "agenda", Component: Agenda },
      { path: "speakers", Component: Speakers },
      { path: "venue", Component: Venue },
      { path: "resources", Component: Resources },
      { path: "sign-in", Component: SignIn },
      { path: "*", Component: NotFound },
    ],
  },
]);
