import { Button, ButtonGroup } from "react-bootstrap";
import { api } from "../../services/api";
import styles from "./styles.module.scss";
import logo from "../../assets/dnaanalysis.png";
import { useNavigate } from "react-router-dom";
import { useState ,FormEvent} from "react";
import { Modal } from "react-bootstrap";
import { Student, User } from "@prisma/client";

type Course = {
  id: string;
  name: string;
  subject: string;
  password: string;
};

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
  coordinator: User;
  course: Course;
};

type Student = {
  id: string;
  name: string;
  password: string;
  email: string;
  class: string;
}

export function LoginStudent() {
  const navigate = useNavigate();

  const [student, setStudent] = useState<Student>();
  const [studentId, setStudentId] = useState("");
  const [temas, setTemas] = useState([]);
  const [show, setShow] = useState(false);
  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [stSessions,setStSessions] = useState<StudentSession[]>([]);
  const [session,setSession] = useState<Session>();
  const [course,setCourse] = useState<Course>();


  function goHome() {
    navigate("/");
  }
  
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
  async function getId() {
    await api.post("id-from-token", {}).then((response) => {
      setStudentId(response.data);
      //nao funciona
    });
  }
    
  async function getStSession(){
    //navigate("/temas");
    //getId();
    
    //while(stSessions.length == 0){
    const id = student.id;
    while(stSessions.length  == 0){
      await api.post<StudentSession[]>("student-session",{id})
        .then((response) => {
          setStSessions(response.data);
          console.log(response.data);
        });
        
    }
    
    navigate("/");
  }
  
  
  async function handleLogin(event: FormEvent) {
      event.preventDefault();
      await api.post( "aluno-login", { 
          id, 
          password
        }).then((response) => {setStudent(response.data);
        }).catch((error) => {
          if(error.response.status == 401){
            alert("Password ou id errados");
          }else{
            console.log(error.response);
          }
        });
      if(student) {
        handleOpen(); 
        getStSession();
      }
      
  }



  return (  
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
        <Modal show={show} onHide={handleOpen} >
        <Modal.Body >Waiting...</Modal.Body>
        </Modal>
      </div>
  
  );
}
