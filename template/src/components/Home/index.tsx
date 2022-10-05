import styles from "./styles.module.scss";
import logo from "../../assets/Genealogika_logo.png";
import Button from "react-bootstrap/button";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { useEffect, useState } from "react";
import { render } from "react-dom";
import { App } from "../../App";

export function Home() {
  const navigate = useNavigate();

  const [login, setLogin] = useState("");

  let teste = (event) => {
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };
  let state = {
    isLogin: false,
  };
  state.isLogin = false;
  /*useEffect(() => {
    let res = api
      .get("http://localhost:4000/validate-token")
      .then(() => {
        state.isLogin = true;
        console.log("login2: " + state.isLogin);
      })
      .catch(() => {
        state.isLogin = false;
      });
  });*/

  console.log(state.isLogin);

  return (
    /*<div className={styles.navbar}>
      <a href="/" className={styles.logo}>
        <img src={logo} alt="Genealogika" />
      </a>
      <a href="Tree">Tree</a>
      <a href="Forum">Forum</a>
      <a href="Help">Help</a>
      <a href="TimeCapsule">Time Capsule</a>
      <a href="DnaAnalysis">Dna Analysis</a>

      <a
        href="Login"
        className={styles.right}
        //style={state.isLogin ? { display: "none" } : {}}
      >
        Login
      </a>
      <a
        onClick={teste}
        className={styles.right}
        //style={!state.isLogin ? { display: "none" } : {}}
      >
        LOGOUT
      </a>
    </div>*/
    <body> 
      <header className={styles.header} >
      <h1 className="w3-margin w3-jumbo">Formação</h1>

      <a href="Login" className={styles.buttonsubmit}>Professor</a>
      <a href="LoginStudent" className={styles.buttonsubmit}>Aluno</a>
      </header>
    </body>
  );
}
