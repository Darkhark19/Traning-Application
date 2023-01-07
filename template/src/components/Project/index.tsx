import { api } from "../../services/api";
import styles from "./styles.module.scss";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import { response } from "express";
type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};
export function Project() {
  const navigate = useNavigate();

  const navigateLobby = () => {
    navigate("/lobby");
  };
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  
  

  // response = await api.post<User>("users", response.data);

      /*const email = response.data.email;
      const body = `Help.\n\nAsk: ${content}\n From:\n ${email} \n`;*/

  async function handleNewProject(event: FormEvent) {
    event.preventDefault();
    let response = await api.post("id-from-token", {});
    var ownerId = response.data;
    await api.post("create-project",{name, content, ownerId} ).catch((response) => console.log(response));
    
    navigateLobby();
  }

  return (
    <div className={styles.wrapper}>
      <h1>Novo Projeto</h1>
      <div className="p-fluid grid">
        <div className="field col-12 md:col-4">
          <span className="p-float-label">
            <InputText id="inputtext" value={name} onChange={(e) => setName(e.target.value)} />
              <label htmlFor="inputtext">Nome</label>
          </span>
        </div>
        <div className="field col-12 md:col-4">
          <span className="p-float-label">
          <InputTextarea id="textarea" value={content} onChange={(e) => setContent(e.target.value)} rows={3} />
              <label htmlFor="textarea">Descripção</label>
            </span>
        </div>
      </div>
      <Button label="Submit" icon="pi pi-check" onClick={handleNewProject}/>
      <Button className="p-button-secondary" label="Close" icon="pi pi-times" onClick={navigateLobby}/>
    </div>
  );
}
