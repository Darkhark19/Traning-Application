import { useState } from "react";
import logo from "./assets/Screenshot_1.png";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from "./App.module.scss";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Home } from "./components/Home";
import { Lobby } from "./components/Lobby";
import { TreeHome } from "./components/Tree";
import { Module } from "./components/Module";
import { LoginStudent } from "./components/LoginAluno";
import { Course } from "./components/Course";
import { Students } from "./components/Students";

export function App() {
  return (
    <Router>
      <div className={styles.container}>
        <main className={styles.contentWrapper}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lobby" element={<Lobby />} />
            <Route path="/login" element={<Login />} />
            <Route path="/loginstudent" element={<LoginStudent />} />
            <Route path="/course" element={<Course />} />
            <Route path="/createstudent" element={<Students />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
