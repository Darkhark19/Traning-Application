import styles from "./styles.module.scss";
import logo from "../../assets/Genealogika_logo.png";
import {Button ,ButtonGroup} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, FormEvent } from "react";
import { api } from "../../services/api";

export function Login() {
  const navigate = useNavigate();

  const navigateRegister = () => {
    navigate("/register");
  };

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  function goHome() {
    navigate("/");
  }
  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    await api.post(
      "login",  
      {
        id,
        password,
      }
    );
    
    navigate("/temas");
  };

  return (
    <div className={styles.background}>
      <div className={styles.formdiv}>
        
        <div>
          <form
            className={styles.container}
            action="http://localhost:3000/"
            onSubmit={handleLogin}
          >
            <div className={styles.label}>
              Identificador
              <br />
              <input
                type="text"
                id="id"
                name="id"
                onChange={(event) => setId(event.target.value)}
                value={id}
                className={styles.input}
              />
            </div>
            <br></br>
            <div className={[styles.label, styles.passwordlabel].join(" ")}>
              Password
              <br />
              <input
                type="password"
                id="password"
                name="password"
                onChange={(event) => setPassword(event.target.value)}
                value={password}
                className={styles.input}
              />
            </div>
            <ButtonGroup className="me-2" aria-label="First group">
              <Button
                variant="secondary"
                type="button"
                className = {styles.btnHome}
                onClick={goHome}
              >
                Página Principal
              </Button>
              <Button
                type="submit"
                variant="success"
                className={styles.buttonsubmit}
                onClick = {handleLogin}
              >
                Login
              </Button>
              
            </ButtonGroup>
          </form>
        </div>
      </div>
    </div>
  );
}
