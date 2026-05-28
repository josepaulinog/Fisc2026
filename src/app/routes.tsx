import { createBrowserRouter } from "react-router";
import { Root } from "./layout/Root";
import Home from "./pages/Home";
import About from "./pages/About";
import Agenda from "./pages/Agenda";
import AgendaSession from "./pages/AgendaSession";
import Speakers from "./pages/Speakers";
import SpeakerDetail from "./pages/SpeakerDetail";
import Venue from "./pages/Venue";
import Resources from "./pages/Resources";
import Attendees from "./pages/Attendees";
import Materials from "./pages/Materials";
import DelegateGuide from "./pages/DelegateGuide";
import Gallery from "./pages/Gallery";
import Videos from "./pages/Videos";
import MediaCoverage from "./pages/MediaCoverage";
import GetTheApp from "./pages/GetTheApp";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  // Auth pages render full-bleed, without the global Header/Footer chrome.
  { path: "/sign-in", Component: SignIn },
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "agenda", Component: Agenda },
      { path: "agenda/:daySlug/:sessionIdx", Component: AgendaSession },
      { path: "speakers", Component: Speakers },
      { path: "speakers/:slug", Component: SpeakerDetail },
      { path: "venue", Component: Venue },
      { path: "resources", Component: Resources },
      { path: "attendees", Component: Attendees },
      { path: "materials", Component: Materials },
      { path: "delegate-guide", Component: DelegateGuide },
      { path: "gallery", Component: Gallery },
      { path: "videos", Component: Videos },
      { path: "media-coverage", Component: MediaCoverage },
      { path: "get-the-app", Component: GetTheApp },
      { path: "profile", Component: Profile },
      { path: "*", Component: NotFound },
    ],
  },
]);
