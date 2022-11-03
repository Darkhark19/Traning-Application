import styles from "./styles.module.scss";
import Button from "react-bootstrap/button";
import { api } from "../../services/api";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import { response } from "express";

type Course = {
  id: String;
  subject: string;
  name: string;
  ownerId: String;
};

type Student = {
  id: String;
  name: String;
  email: String;
  class: String;
}


export function Students() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [turma, setTurma] = useState("");
  const [firstRun, setFirstRun] = useState(true);
  const navigate = useNavigate();
  const navigateToLobby = () => {navigate("/lobby")};

  const [courses, setCourses] = useState<Course[]>([]);
  const [checkedCourses, setCheckedCourse] = useState([]);
  const [student, setStudent] = useState<Student>({id: '', name:"", email:"",class:""});

  const handleToggleCourses = (value: number) => () => {
    const currentIndex = checkedCourses.indexOf(value);
    const newChecked = [...checkedCourses];
    if(currentIndex === -1 ){
      newChecked.push(value);
    } else{
      newChecked.splice(currentIndex, 1);
    }
    setCheckedCourse(newChecked);
  };

  function getCourse() {
    api
      .get<Course[]>("courses")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status == 401) {
          alert("Sem cookie");
        }
      });
  }

  if (firstRun) {
    getCourse();
    setFirstRun(false);
  }
  async function handleRegister(event: FormEvent) {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !turma.trim()) {
      return;
    }

   /* if (class !== passwordConfirmation) {
      alert("Passwords don't match");
    }*/
     
    await api.post<Student>("create-student", { name, email, classNumber: turma })
      .catch((response) => console.log(response))
      .then((response) => {
        setStudent(response.data);
        handleNewStudentCourse(response.data.id);
      });
    
  }

  async function handleNewStudentCourse(studentId: String) {
    for(var index of checkedCourses){
        var courseId = courses[index].id;
        await api.post("create-courseStudent",{courseId,studentId});
      }
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
            <fieldset>
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              {courses.map((value,index) => {
                const labelId = "checkbox-list-label- { " + value.name + "}";
                return(
                  <ListItemButton role={undefined} onClick={handleToggleCourses(index)} dense>
                    <ListItemIcon>
                      <Checkbox edge="start" checked={checkedCourses.indexOf(index) !== -1}
                        tabIndex={-1} disableRipple inputProps={{ 'aria-labelledby': labelId }} />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={ value.name} />
                  </ListItemButton>);
              })}
            </List>
          </fieldset>
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
