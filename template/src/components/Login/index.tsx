import styles from "./styles.module.scss";
import logo from "../../assets/Genealogika_logo.png";
import Button from "react-bootstrap/button";
import { useNavigate } from "react-router-dom";
import { useState, FormEvent } from "react";
import { api } from "../../services/api";

export function Login() {
  const navigate = useNavigate();

  const navigateRegister = () => {
    navigate("/register");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    await api.post(
      "login",
      {
        email,
        password,
      }
      /*  {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }*/
    );
    navigate("/");
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
              Email
              <br />
              <input
                type="text"
                id="email"
                name="email"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
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
            <div className={styles.buttonGroup}>
              <Button
                style={{ float: "left", paddingLeft: "0px" }}
                type="button"
                variant="link"
                className={styles.buttonsubmit}
                onClick={navigateRegister}
              >
                Don't have an account? Register.
              </Button>

              <Button
                type="submit"
                variant="success"
                className={styles.buttonsubmit}
              >
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
