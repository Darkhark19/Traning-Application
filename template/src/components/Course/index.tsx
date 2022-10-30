import { api } from "../../services/api";
import { Button, Form, SSRProvider } from "react-bootstrap";
import styles from "./styles.module.scss";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';

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
  enail: String;
  class: String;
}

export function Course() {
  const navigate = useNavigate();
  const [firstRun, setFirstRun] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);
  const [checkedStudents, setCheckedStudents] = useState([]);

  const navigateTemas = () => {navigate("/temas");};
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [user,setUser] = useState<User>();
  const [course,setCourse] = useState<Course>();
  

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
    api
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

  if(firstRun){
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
    response = await api.post<User>("users",{id});
    setUser(response.data);
    var input = {title,subject,id};
    await api.post<Course>("create-course", input)
    .then((response) => {setCourse(response.data)})
    .catch((response) => console.log(response));
    
    var idCourse = course.id;
    await api.post("update-course",{idCourse,checkedStudents})
    navigateTemas();
  }

  return (
    <div className={styles.wrapper}>
      <Form>
        <Form.Group className={styles.formInput} controlId="formBasicFavColor">
          <Form.Label>Criar curso</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Title"
            onChange={(event) => setTitle(event.target.value)}
            value={title}
          />
          <Form.Control
            as="textarea"
            placeholder="Subject"
            onChange={(event) => setSubject(event.target.value)}
            value={subject}
          />
          {
            //<Form.Text className="text-muted">
            //We'll never share your email with anyone else.
            //</Form.Text>
          }
        </Form.Group>
          <fieldset>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {students.map((value,index) => {
            const labelId = "checkbox-list-label- { " + value.name + "}";
            return(
              <ListItemButton role={undefined} onClick={handleToggleStudents(index)} dense>
                <ListItemIcon>
                  <Checkbox edge="start" checked={checkedStudents.indexOf(index) !== -1}
                    tabIndex={-1} disableRipple inputProps={{ 'aria-labelledby': labelId }} />
                </ListItemIcon>
                <ListItemText id={labelId} primary={ value.name} />
              </ListItemButton>);
          })}
        </List>
          </fieldset>
        <Button
          variant="primary"
          type="submit"
          className={styles.formButton}
          onClick={handleNewCourse}
        >
          Submit
        </Button>
        <Button
          variant="secondary"
          type="button"
          onClick={navigateTemas}
          className={styles.formButton}
        >
          Close
        </Button>
      </Form>
    </div>
  );
}
