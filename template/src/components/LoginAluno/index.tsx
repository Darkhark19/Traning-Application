import { api } from "../../services/api";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { useState ,FormEvent} from "react";
import { VirtualScroller } from 'primereact/virtualscroller';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";    
import { ListBox } from 'primereact/listbox';                            //icons
type Course = {
  id: string;
  name: string;
  subject: string;
  ownerId: String;
};
type User = {
  id: String;
  name: String;
  email: String;
}
type StudentSession = {
  id: string;
  ended_at: Date;
  content: string;
  session: Session;
  student: Student;
};

type Session ={
  id: string;
  created_at: Date;
  ended_at: Date;
  coordinator: User;

};

type Module = {
  id: String;
  content: string;
  courseId: String;
}

type Student= {
  id: string;
  name: string;
  password: string;
  email: string;
  class: string;
}

type SessionsModules = {
  sessionId: String;
  session: Session;
  module: Module;
  moduleId: String;
  
}
export function LoginStudent() {
  const navigate = useNavigate();

  const [student, setStudent] = useState<Student>();
 
  const [show, setShow] = useState(false);
  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sessionsModules,setSessionsModules] = useState<SessionsModules[]>([]);
  const [tableModules, setTableModules] = useState([]);
  function goHome() {
    navigate("/");
  }

    
  async function getStSession(id:String){
    await api.post<SessionsModules[]>("sessionModules",{id})
      .then((response) => {
        var r = response.data;
        setSessionsModules(r);
        var modules = [];
        r.forEach((element) => {
          modules.push(element.module.content);
        });
        setTableModules(modules);
     });
  }

  async function handleLogout(event: FormEvent){
    event.preventDefault();
    if(sessionsModules.length != 0){
      var id = sessionsModules[0].sessionId;
      await api.put("update-session",{id});
    }
    navigate("/Loginstudent");
    handleClose();
  }
  
  async function handleLogin(event: FormEvent) {
      event.preventDefault();
      await api.post( "aluno-login", { 
          email,
          password
        }).then((response) => {
          setStudent(response.data);
          getStSession(response.data.id);
          handleOpen();
        }).catch((error) => {
          if(error.response.status == 401){
            alert("Password ou id errados");
          }else{
            console.log(error.response);
          }
        });
      
  }
  const footer = (
    <div>
        <Button label="LogOut" icon="pi pi-times" onClick={handleLogout} />
    </div>
);
  return (  
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
                id="id"
                name="id"
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
            <Button label="Página Principal" className="p-button-secondary"  onClick={goHome}/>
            <Button label="Login" type="submit"/>

          </form>
        </div>
        <Dialog header="Modulos" visible={show} footer={footer} style={{ width: '50vw' }} modal onHide={handleClose}>
          <ListBox options={tableModules} virtualScrollerOptions={{ itemSize: 38 }} style={{ width: '15rem' }} listStyle={{ height: '250px' }}/>
        </Dialog>
      </div>
  
  );
}
