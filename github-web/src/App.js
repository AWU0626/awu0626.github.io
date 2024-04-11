import React from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from './pages/HomePage';
import ProjectPage from './pages/ProjectPage';
import HistoryPage from "./pages/HistoryPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="project" element={<ProjectPage />}></Route>
        <Route path="history" element={<HistoryPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
