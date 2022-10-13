import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
;
import { Modal, SplitButton } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/button";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { api } from "../../services/api";
import { useState, FormEvent, useEffect } from "react";
import Checkbox from '@mui/material/Checkbox';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { response } from "express";
//import io from "socket.io-client";

type Course = {
  id: number;
  subject: string;
  name: string;
};

type Student = {
  id: String;
  name: String;
  enail: String;
  class: String;
}

type Session = {
  id: number;
  coordinatorId: String;
  couserId: String;
}

//const socket = io("http://localhost:4000");

//socket.on("new_ticket", (newTicket) => {
// console.log(newTicket);
//});

export function Temas() {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);
  const [showStudents, setShowStudents] = useState(false);
  const handleOpenStudent = () => setShowStudents(true);
  const handleCloseStudent = () => setShowStudents(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [subject, setSubject] = useState("");
  const [user, setUser] = useState("");
  const [firstRun, setFirstRun] = useState(true);
  const [checkedStudents, setCheckedStudents] = useState([]);
  const [checkedCourse, setCheckedCourse] = useState(-1);
  const [session,setSession] = useState<Session>();

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
  
  const handleToggleCourses = (value: number) => () => {
    
    if(checkedCourse !== -1){
      alert("Selecione apenas um curso.");
    } else if(value == checkedCourse ){
      setCheckedCourse(-1);
    } else{
      setCheckedCourse(value);
    }
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
  
  function getStudents() {
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

  if (firstRun) {
    getCourse();
    getStudents();
    setFirstRun(false);
  }

  async function getId() {
    await api.post("id-from-token", {}).then((response) => {
      setUser(response.data);
    });
  }

  async function handleSearch(event: FormEvent) {
    event.preventDefault();
    if (!subject.trim()) getCourse();
    else {
      /*await api.post("courses-by-subject", { subject }).then((response) => {
        setCourses(response.data);
      });*/

      return;
    }
  }
  getId();
  async function handleSelection(event: FormEvent){
    if(checkedStudents.length == 0){
      alert("Selecione Algum aluno.")
    } else {
      //getId();
     // await api.post("create-session",{user,});
      var sessionId = session.id;
      for(var position of checkedStudents){
        var studentId = students[position].id;
        await api.post("link-student-course",{sessionId,studentId});
      }
      handleCloseStudent();
      
    }
    
  }
  async function handleCourses(event: FormEvent) {
    if(checkedCourse === -1){
      alert("Selecione algum curso.")
    }else{
      //getId();
      var course = courses[checkedCourse].id;
      await api.post("create-session",{
        coordinatorId: user,
        courseId: course
        }).then((response) => {setSession(response.data)
        }).catch((error) => {
          console.log(error.response.status);
          if (error.response.status == 401) {
            alert("Sem cookie");
          }
      });
      handleClose();
      document.getElementById("curso").hidden = true;
    }
    
  }
 

  return (
    <div>
      <Modal show={show} onHide={handleOpen}>
        <Modal.Header>
          <Modal.Title>Cursos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {courses.map((value,index) => {
            const labelId = "checkbox-list-label- { " + value.name + "}";
            return(
              <ListItemButton role={undefined} onClick={handleToggleCourses(index)} dense>
                <ListItemIcon>
                  <Checkbox edge="start" checked={checkedCourse === index}
                    tabIndex={-1} disableRipple inputProps={{ 'aria-labelledby': labelId }} />
                </ListItemIcon>
                <ListItemText id={labelId} primary={ value.name} />
              </ListItemButton>);
          })}
        </List>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleCourses}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showStudents} onHide={handleOpenStudent}>
        <Modal.Header>
          <Modal.Title>Alunos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseStudent}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleSelection}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">Página inicial</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />

          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Pesquisar"
              className="me-2"
              aria-label="Search"
              onSubmit={handleSearch}
              onChange={(event) => setSubject(event.target.value)}
              value={subject}
            />
            <Button
              type="button"
              variant="success"
              className={styles.btn}
              onClick={handleSearch}
            >
              Pesquisar
            </Button>
            <Button 
             type = "button"
             onClick={handleSelection}>
              Continuar
            </Button>
          </Form>
        
        </Container>
      </Navbar>
      
      <div >
      
      <Button variant="secondary" onClick={handleOpen} id="curso">Cursos</Button>{' '}
      <Button variant="secondary" onClick={handleOpenStudent} id= "aluno">Alunos</Button>{' '}
      </div>
    </div>
  );
   
}
