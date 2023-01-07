import styles from "./styles.module.scss";
import { api } from "../../services/api";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from 'primereact/button';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const navigate = useNavigate();

  async function handleRegister(event: FormEvent) {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      return;
    }

    if (password !== passwordConfirmation) {
      alert("Passwords don't match");
    }
    await api.post("validate-token",{});
    await api.post("register", { name, email, password });

    navigate("/login");
  }

  return (
    <div className={styles.background}>
      <div className={styles.formdiv}>
        <div>
          <form onSubmit={handleRegister} className={styles.container}>
            <div className={styles.label}>
              Name
              <br />
              <input
                type="text"
                id="name"
                name="name"
                onChange={(event) => setName(event.target.value)}
                value={name}
                className={styles.input}
              />
            </div>
            <br />
            <div className={[styles.label, styles.passwordlabel].join(" ")}>
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
            <br></br>
            <div className={[styles.label, styles.passwordlabel].join(" ")}>
              Password Confirmation
              <br />
              <input
                type="password"
                id="passwordConfirmation"
                name="password"
                onChange={(event) =>
                  setPasswordConfirmation(event.target.value)
                }
                value={passwordConfirmation}
                className={styles.input}
              />
            </div>
              <Button type="submit" label="Register" className="mt-2" />
          </form>
        </div>
      </div>
    </div>
  );
}
