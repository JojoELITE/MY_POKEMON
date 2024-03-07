import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App";
import DetailsPoke from "./DetailsPoke";

const Navigation = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/pokemon/:id" element={<DetailsPoke />} />
    </Routes>
  </Router>
);

export default Navigation;
