import { useState } from "react";
import logo from "./assets/Screenshot_1.png";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from "./App.module.scss";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Home } from "./components/Home";
import { Forum } from "./components/Forum";
import { TreeHome } from "./components/Tree";
import { TimeCapsule } from "./components/TimeCapsule";
import { DnaAnalysis } from "./components/DnaAnalysis";
import { Help } from "./components/Help";

export function App() {
  return (
    <Router>
      <div className={styles.container}>
        <main className={styles.contentWrapper}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/tree" element={<TreeHome />} />
            <Route path="/timecapsule" element={<TimeCapsule />} />
            <Route path="/dnaanalysis" element={<DnaAnalysis />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
