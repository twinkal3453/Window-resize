import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Menu from "./Menu.jsx";
import TextFieldFile from "./TextFieldFile.jsx";
import Counter from "./Counter.jsx";

createRoot(document.getElementById("root")).render(
  <>
    {/* <App /> */}
    {/* <Menu /> */}
    {/* <TextFieldFile /> */}
    <Counter />
  </>
);
