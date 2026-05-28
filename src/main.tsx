import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";

// Side-effect import: attaches the beforeinstallprompt listener at module
// load so the event isn't missed before any React component mounts.
import "./app/installPrompt";

// Body sans (Inter) + display serif (Cormorant Garamond) are loaded via
// the Google Fonts <link> in index.html — see index.html head for the
// exact weights bundled. Fonts.css below declares the family stacks that
// reference them.
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(<App />);

