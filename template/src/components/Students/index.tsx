import styles from "./styles.module.scss";
import Button from "react-bootstrap/button";
import { api } from "../../services/api";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export function Students() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [turma, setTurma] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const navigate = useNavigate();
  const navigateToLobby = () => {navigate("/lobby")};

  async function handleRegister(event: FormEvent) {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !turma.trim()) {
      return;
    }

   /* if (class !== passwordConfirmation) {
      alert("Passwords don't match");
    }*/
     
    await api.post("create-student", { name, email, classNumber: turma });

    navigateToLobby();
  }

  return (
    <div className={styles.background}>
      <div className={styles.formdiv}>
        <div>
          <form className={styles.container}>
            <div className={styles.label}>
              Nome
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
              Turma
              <br />
              <input
                type="text"
                id="class"
                name="class"
                onChange={(event) => setTurma(event.target.value)}
                value={turma}
                className={styles.input}
              />
            </div>
            <div className={styles.buttonGroup}>
              <Button
                type="button"
                variant="secondary"
                className={styles.buttonsubmit}
                onClick={navigateToLobby}
              >
                Voltar
              </Button>
              <Button
                type="submit"
                variant="success"
                className={styles.buttonsubmit}
                onClick ={handleRegister}
              >
                Registar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
