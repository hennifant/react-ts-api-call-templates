import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTemplate from "./components/AddTemplate";
import Template from "./components/Template";
import TemplatesList from "./components/TemplatesList";

const App: React.FC = () => {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/templates" className="navbar-brand">
          Hennifant
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/templates"} className="nav-link">
              Templates
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<TemplatesList />} />
          <Route path="/templates" element={<TemplatesList />} />
          <Route path="/add" element={<AddTemplate />} />
          <Route path="/templates/:id" element={<Template />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
