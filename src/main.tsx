import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";

// Body sans (Inter) + display serif (Cormorant Garamond) are loaded via
// the Google Fonts <link> in index.html — see index.html head for the
// exact weights bundled. Fonts.css below declares the family stacks that
// reference them.
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(<App />);

