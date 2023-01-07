import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";

 
export function Home() {
  const navigate = useNavigate();


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
