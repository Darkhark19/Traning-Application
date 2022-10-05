import { Button, ButtonGroup } from "react-bootstrap";
import { api } from "../../services/api";
import styles from "./styles.module.scss";
import logo from "../../assets/dnaanalysis.png";
import { useNavigate } from "react-router-dom";
import { useState ,FormEvent} from "react";

export function LoginStudent() {
  const navigate = useNavigate();
  const [temas, setTemas] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  function goHome() {
    navigate("/");
  }
  type Course = {
    id: string;
    name: string;
    subject: string;
    password: string;
  };

  
/*
  const subject = "DNA Analysis";

  

  async function handleDnaAnalysis(event: FormEvent) {
    event.preventDefault();

    let response = await api.post("id-from-token", {});

    response = await api.post<User>("users", { user: response.data });
    console.log(response.data);
    const email = response.data.email;
    const body = `Hello ${response.data.name},\n We have received your order!In a few days you will receive a package in your home with everything you need to find yourself\n Hope you enjoy it!\n\n\n Best Regards,\n Genealogika`;

    await api.post("email", {
      receiverEmail: email,
      subject,
      body,
    });
  }*/
  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    await api.post(
      "aluno-login",
      {
        id,
        password,
      }
      /*  {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }*/
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
                className={styles.btnHome}
                onClick={goHome}
                
              >
                Página Principal
              </Button>
              <Button
                type="submit"
                variant="success"
                className={styles.btnHome}
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
