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
type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};
export function Module() {
  const navigate = useNavigate();

  const navigateTemas = () => {
    navigate("/temas");
  };
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [user,setUser] = useState<User>();
  

  // response = await api.post<User>("users", response.data);

      /*const email = response.data.email;
      const body = `Help.\n\nAsk: ${content}\n From:\n ${email} \n`;*/

  async function handleNewCourse(event: FormEvent) {
    event.preventDefault();
    let response = await api.post("id-from-token", {});
    var id = response.data;
    await api.post("validate-token",{});
    response = await api.post<User>("users",{id});
    setUser(response.data);
    await api.post("create-course",{title, subject, user} ).catch((response) => console.log(response));
    navigateTemas();
  }

  return (
    <div className={styles.wrapper}>
      <h1>Novo Modulo</h1>
      <div className="p-fluid grid">
        <div className="field col-12 md:col-4">
          <span className="p-float-label">
            <InputText id="inputtext" value={title} onChange={(e) => setTitle(e.target.value)} />
              <label htmlFor="inputtext">Titulo</label>
          </span>
        </div>
        <div className="field col-12 md:col-4">
          <span className="p-float-label">
          <InputTextarea id="textarea" value={subject} onChange={(e) => setSubject(e.target.value)} rows={3} />
              <label htmlFor="textarea">Descripção</label>
            </span>
        </div>
      </div>
      <Button label="Submit" icon="pi pi-check" onClick={handleNewCourse}/>
      <Button className="p-button-secondary" label="Close" icon="pi pi-times" onClick={navigateTemas}/>
    </div>
  );
}
