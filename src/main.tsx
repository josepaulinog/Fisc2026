import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";

// Body type face — Proxima Nova, self-hosted via the @voaii/proxima-nova
// package. Imported in JS (not CSS @import) so Vite can fingerprint and
// bundle the .woff2 assets. The package's index.css loads weight 400 + 700
// + italic variants in the Latin subset, which covers all surface copy.
import "@voaii/proxima-nova/index.css";

import "./styles/index.css";

createRoot(document.getElementById("root")!).render(<App />);
