import { useState } from "react";
import logo from "./assets/Screenshot_1.png";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from "./App.module.scss";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Home } from "./components/Home";
import { Temas } from "./components/Temas";
import { TreeHome } from "./components/Tree";
import { TimeCapsule } from "./components/TimeCapsule";
import { LoginStudent } from "./components/LoginAluno";
import { Help } from "./components/Help";

export function App() {
  return (
    <Router>
      <div className={styles.container}>
        <main className={styles.contentWrapper}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/temas" element={<Temas />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/tree" element={<TreeHome />} />
            <Route path="/loginstudent" element={<LoginStudent />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
