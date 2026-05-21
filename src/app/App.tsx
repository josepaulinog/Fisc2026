import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AuthProvider } from "./auth";
import { ToastProvider } from "./components/ui/Toast";

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ToastProvider>
  );
}
