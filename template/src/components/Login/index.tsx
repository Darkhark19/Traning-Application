import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { useState, FormEvent } from "react";
import { api } from "../../services/api";
import { Button } from 'primereact/button';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
export function Login() {
  const navigate = useNavigate();


  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  function goHome() {
    navigate("/");
  }
  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    
    const response = await api.post(
      "login",  
      {
        id,
        password,
      }
    ).catch((error) => {
      if(error.response.status == 401){
        alert("Password ou id errados");
      }else{
        console.log(error.response);
      }
        
    });
    if(response) {navigate("/lobby");}
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
            <div >
            <Button label="Página Principal"  className="p-button-secondary"  onClick={goHome}/>
            <Button label="Login" type="submit"/>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
