import React from "react";
import Nav from "./notes/Nav";
import EditNote from "./notes/EditNote";
import CreateNote from "./notes/CreateNote";
import Home from "./notes/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function Notes({ setIsLogin }) {
  return (
    <BrowserRouter>
      <div className="notes-page">
        <Nav setIsLogin={setIsLogin} />
        <section>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateNote />} />
            <Route path="/edit/:id" element={<EditNote />} />
          </Routes>
        </section>
      </div>
    </BrowserRouter>
  );
}
