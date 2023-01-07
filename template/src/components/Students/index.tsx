import styles from "./styles.module.scss";
import { api } from "../../services/api";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from 'primereact/button';
import { MultiSelect } from 'primereact/multiselect';
import './styles.module.scss';
import { Checkbox } from "primereact/checkbox";

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons

type Course = {
  id: string;
  subject: string;
  name: string;
  ownerId: String;
};

type Student = {
  id: string;
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
  const [checkedCourses, setCheckedCourse] = useState<Course[]>([]);

 

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
      .then(function(response) {
        handleNewStudentCourse(response.data.id);
      });
    
  }

  const CreateCourses = () => {
    const handleToggleCourses = (e:{value: Course,checked:boolean}) => {
      let _checkedCourses = [...checkedCourses];

        if (e.checked) {
            _checkedCourses.push(e.value);
        }
        else {
            for (let i = 0; i < _checkedCourses.length; i++) {
                const selectedCategory = _checkedCourses[i];

                if (selectedCategory.id === e.value.id) {
                    _checkedCourses.splice(i, 1);
                    break;
                }
            }
        }
        setCheckedCourse(_checkedCourses);
    }
    const notEmpyt = <div className="card">
        {courses.map((course, index) => {
          return(<div key={index} className="field-checkbox">
            <Checkbox inputId={course.id} name="course" value={course} onChange={handleToggleCourses} 
            checked={checkedCourses.some((item) => item.id === course.id)} />
            <label htmlFor={course.id}>{course.name}{' '}{course.id}</label>
          </div>)})}
        </div>
    const empty = <div><h2>Não existe cursos</h2></div>
    return courses.length == 0 ? empty : notEmpyt;
  }

  async function handleNewStudentCourse(studentId: String) {
    for(var course of checkedCourses){
        var courseId = course.id;
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
            <br />
            <div>
            <CreateCourses/>
            </div>
            <span className="p-buttonset">
               <Button label= "Voltar"type="button" className="p-button-raised p-button-secondary" onClick={navigateToLobby}/>
               <Button
                 type="submit"
                 className="p-button-raised"
                 onClick ={handleRegister}
               >
                 Registar
               </Button>
             </span>
           </form>
         </div>
       </div>
     </div>
  );
}
