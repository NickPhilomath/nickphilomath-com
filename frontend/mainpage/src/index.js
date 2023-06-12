import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, HashRouter } from "react-router-dom";
import Home from "./js/components/Home";

import "bootstrap/dist/css/bootstrap.css";

import "./styles/index.scss";
import "./styles/Home.scss";
import "./styles/Navbar.scss";
import "./styles/Main.scss";
import "./styles/MeOnMedia.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </HashRouter>
  </React.StrictMode>
);
