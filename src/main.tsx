
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { store } from "./Redux/store.ts";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { setupInterceptors } from "./API/studentAPI.ts";
setupInterceptors(store);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <Toaster richColors position="top-right" />

    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </>
);
