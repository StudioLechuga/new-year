import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FirebaseProvider } from "./hook/useFirebase";
import { ModalProvider } from "./hook/useModal";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ModalProvider>
      <FirebaseProvider>
        <App />
      </FirebaseProvider>
    </ModalProvider>
  </React.StrictMode>
);
