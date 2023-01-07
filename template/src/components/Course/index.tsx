import { api } from "../../services/api";
import styles from "./styles.module.scss";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { MultiSelect } from 'primereact/multiselect';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons

type Course = {
  id: String;
  subject: string;
  name: string;
  ownerId: String;
};

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

type Student = {
  id: String;
  name: String;
  email: String;
  class: String;
}

export function Course() {
  const navigate = useNavigate();
  const [firstRun, setFirstRun] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);
  const [checkedStudents, setCheckedStudents] = useState([]);

  const navigateLobby = () => { navigate("/lobby"); };
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [user, setUser] = useState<User>();
  const [course, setCourse] = useState<Course>({ id: "", subject: "", name: "", ownerId: "" });


  const handleToggleStudents = (value: number) => () => {
    const currentIndex = checkedStudents.indexOf(value);
    const newChecked = [...checkedStudents];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setCheckedStudents(newChecked);
  };



  async function getStudents() {
    await api
      .get<Student[]>("students")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status == 401) {
          alert("Sem cookie");
        }
      });
  }

  async function getId() {
    await api.post("id-from-token", {}).then((response) => {
      setUser(response.data);
    });
  }

  if (firstRun) {
    getStudents();
    getId();
    setFirstRun(false);
  }
  // response = await api.post<User>("users", response.data);

  /*const email = response.data.email;
  const body = `Help.\n\nAsk: ${content}\n From:\n ${email} \n`;*/

  async function handleNewCourse(event: FormEvent) {
    event.preventDefault();
    let response = await api.post("id-from-token", {});
    var id = response.data;
    response = await api.post<User>("users", { id });
    setUser(response.data);
    var input = { title, subject, id };
    await api.post<Course>("create-course", input)
      .then((response) => {
        setCourse(response.data);
        handleNewStudentCourse();
      })

  }

  async function handleNewStudentCourse() {
    var courseId = course.id;
    for (var student of checkedStudents) {
      var studentId = student.id;
      await api.post("create-courseStudent", { courseId, studentId });
    }
    navigateLobby();
  }

  return (
    <div className={styles.wrapper}>
      <h1>Novo Curso</h1>
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
        <div className="field col-12 md:col-4">
          <span className="p-float-label">
            <MultiSelect inputId="multiselect" value={checkedStudents} options={students} onChange={(e) => setCheckedStudents(e.value)} optionLabel="name" />
            <label htmlFor="multiselect">Alunos</label>
          </span>
        </div>
      </div>
      <Button label="Submit" icon="pi pi-check" onClick={handleNewCourse} />
      <Button className="p-button-secondary" label="Close" icon="pi pi-times" onClick={navigateLobby} />
    </div>
    //     <FormGroup className={styles.formInput} controlId="formBasicFavColor">
    //       <FormControlLabel>Criar curso</Form.Label>
    //       <Form.Control
    //         as="textarea"
    //         placeholder="Title"
    //         onChange={(event) => setTitle(event.target.value)}
    //         value={title}
    //       />
    //       <Form.Control
    //         as="textarea"
    //         placeholder="Subject"
    //         onChange={(event) => setSubject(event.target.value)}
    //         value={subject}
    //       />
    //       {
    //         //<Form.Text className="text-muted">
    //         //We'll never share your email with anyone else.
    //         //</Form.Text>
    //       }
    //     </Form.Group>
    //       <fieldset>
    //       <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
    //       {students.map((value,index) => {
    //         const labelId = "checkbox-list-label- { " + value.name + "}";
    //         return(
    //           <ListItemButton role={undefined} onClick={handleToggleStudents(index)} dense>
    //             <ListItemIcon>
    //               <Checkbox edge="start" checked={checkedStudents.indexOf(index) !== -1}
    //                 tabIndex={-1} disableRipple inputProps={{ 'aria-labelledby': labelId }} />
    //             </ListItemIcon>
    //             <ListItemText id={labelId} primary={ value.name} />
    //           </ListItemButton>);
    //       })}
    //     </List>
    //     <Button label="Submit" icon="pi pi-check" onClick={handleNewCourse}/>
    //     <Button className="p-button-secondary" label="Close" icon="pi pi-times" onClick={navigateLobby}/>

    //   </Form>
    // </div>
  );
}
