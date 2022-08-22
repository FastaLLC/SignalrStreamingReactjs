import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EventStream from "./eventStream";

export default function Base() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<EventStream />} />
        </Routes>
      </div>
    </Router>
  );
}
