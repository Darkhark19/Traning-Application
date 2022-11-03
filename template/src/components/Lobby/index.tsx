import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { Modal, Offcanvas, SplitButton ,CloseButton} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/button";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { api } from "../../services/api";
import { useState, FormEvent, useEffect } from "react";
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { response } from "express";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
//import io from "socket.io-client";

type Course = {
  id: String;
  subject: string;
  name: string;
  ownerId: String;
};

type Student = {
  id: String;
  name: String;
  enail: String;
  class: String;
}

type StudentCourse= {
  courseId: String;
  studentId: String;
}

type Session = {
  id: String;
  coordinatorId: String;
  couserId: String;
}
type Module = {
  id: String;
  content: String;
  courseId: String;
}

type SessionsModules = {
  sessionId: String;
  moduleId: String;
  courseId: String;
}


//const socket = io("http://localhost:4000");

//socket.on("new_ticket", (newTicket) => {
// console.log(newTicket);
//});

export function Lobby() {
  const navigate = useNavigate();
  const navigateToCourse = () => {navigate("/course")};
  const navigateToStudents = () => {navigate("/createstudent")};
  const navigateToLobby = () => {navigate("/lobby")};
  const [user, setUser] = useState("");
  const [firstRun, setFirstRun] = useState(true);
  const [subject, setSubject] = useState("");
  

  const [courses, setCourses] = useState<Course[]>([]);
  const [checkedCourse, setCheckedCourse] = useState(-1);
  const [show, setShow] = useState(false);
  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  const [students, setStudents] = useState<Student[]>([]);

  const [stCourse, setStCourse] = useState<Student[]>([]);
  const [checkedStCourse, setCheckedStCourse] = useState([]);
  const [showStudents, setShowStudents] = useState(false);
  const handleOpenStudent = () => setShowStudents(true);
  const handleCloseStudent = () => setShowStudents(false);

  const [modulos, setModulos] = useState<Module[]>([]);
  const [checkedModules, setCheckedModules] = useState([]);
  const [showModules, setShowModules] = useState(false);
  const handleModulesOpen = () => setShowModules(true);
  const handleModulesClose = () => setShowModules(false);
  const [showModulesCreation, setShowModulesCreation] = useState(false);
  const handleModulesCreationOpen = () => setShowModulesCreation(true);
  const handleModulesCreationClose = () => setShowModulesCreation(false);
  const [moduleTitle, setModuleTitle] = useState("");

  const [sessions,setSessions] = useState<Session[]>([]);

  const handleToggleStudents = (value: number) => () => {
    const currentIndex = checkedStCourse.indexOf(value);
    const newChecked = [...checkedStCourse];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setCheckedStCourse(newChecked);
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

  const handleToggleModules = (value: number) => () => {
    const currentIndex = checkedModules.indexOf(value);
    const newChecked = [...checkedModules];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setCheckedModules(newChecked);
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

  function openCreation(){
    handleModulesClose();
    handleModulesCreationOpen();
  }

  function getModules(){
    var course = courses[checkedCourse].id;
    api.post<Module[]>("modules",{courseId: course})
      .then((response) => {setModulos(response.data)})
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status == 401) {
          alert("Sem cookie");
        }
    });
  }
  
  function openModules(){
    getModules();
    handleModulesOpen();
  }

  async function getStudents(){
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

  async function getStudentsCourse(){
    var courseId = courses[checkedCourse].id;
    getStudents();
    await api.post<StudentCourse[]>("studentsCourse",{courseId}).then((response) => {
      var studentsCourse:StudentCourse[] =  response.data;
      var moduloSt : Student[] = [];
      for(var st of studentsCourse){
        var student = findStudentsById(st.studentId);
        moduloSt.push(student);
      }
      setStCourse(moduloSt);
      
    }).catch((error) => {
      console.log(error.response.status);
      if (error.response.status == 401) {
        alert("Sem cookie");
      }
    });

  }

  function findStudentsById(id: String){
    for(var student of students){
      if(student.id == id){
        return student;
      }
    }

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
    if(checkedStCourse.length == 0){
      alert("Selecione Algum aluno.")
    } else {
      for(var position of checkedStCourse){
        var studentId = students[position].id;
        await api.post<Session>("create-session",{
          coordinatorId: user,
          studentId: studentId
          }).then((response) => { setSessions(sessions => [...sessions,response.data])
          }).catch((error) => {
            console.log(error.response.status);
            if (error.response.status == 401) {
              alert("Sem cookie");
            }
        });

      }  
    for(var position of checkedModules){
        for(var sessionPosition of sessions){
          var moduleId = modulos[position].id;
          var courseId = modulos[position].courseId;
          var sessionId = sessionPosition.id;
          await api.post<SessionsModules>("create-ssModules",{
            courseId,
            moduleId,
            sessionId
            }).catch((error) => {
              console.log(error.response.status);
              if (error.response.status == 401) {
                alert("Sem cookie");
              }
          });
        }
      }
      handleCloseStudent();
      navigateToLobby();
    }
  }

  async function handleCourses(event: FormEvent) {
    if(checkedCourse === -1){
      alert("Selecione algum curso.")
    }else{
      //getId();
      handleClose();
      document.getElementById("curso").hidden = true;
      document.getElementById("modulos").hidden = false;
      getModules();
    }
    
  }

  async function handleModuloCreation(event: FormEvent) {
    var course = courses[checkedCourse].id;
    
    await api.post("create-module",{
      moduleTitle,
      course
    }).catch((error) => {
      console.log(error.response.status);
     
    });
    handleModulesCreationClose();
    document.getElementById("curso").hidden = true;
    document.getElementById("modulos").hidden = false;
    getModules();
    
  }
  async function handleModule(event: FormEvent) {
    document.getElementById("curso").hidden = true;
    document.getElementById("modulos").hidden = true;
    handleModulesClose();
    getStudentsCourse();
    document.getElementById("aluno").hidden = false;
  }

  async function handleStudentCreation(event:FormEvent){
    navigateToStudents();
  }

  return (
    <>
    <Modal show={showStudents} onHide={handleOpenStudent}>
        <Modal.Header>
          <Modal.Title>Alunos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {stCourse.map((value,index) => {
            const labelId = "checkbox-list-label- { " + value.name + "}";
            return(
              <ListItemButton role={undefined} onClick={handleToggleStudents(index)} dense>
                <ListItemIcon>
                  <Checkbox edge="start" checked={checkedStCourse.indexOf(index) !== -1}
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
             onClick={handleSelection}
            >
              Continuar
            </Button>
          </Form>
        
        </Container>
      </Navbar>

      <Modal show={show}  >
        <Modal.Header>
          <Modal.Title> Cursos
          </Modal.Title>
        </Modal.Header>
        <Modal.Body >
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
          <Button variant="outline-success" onClick={navigateToCourse} aria-label="First group" >Criar Curso</Button>{' '}
          <Button variant="secondary" onClick={handleClose} >Cancelar</Button>
          <Button variant="primary" onClick={handleCourses} type="submit">Submeter</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModules}  >
        <Modal.Header >
          <Offcanvas.Title>Módulos</Offcanvas.Title>
          <Button variant="primary"  onClick={openCreation}>Criar Módulo</Button>
        </Modal.Header>
        <Offcanvas.Body>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {modulos.map((value,index) => {
            const labelId = "checkbox-list-label- { " + value.content + "}";
            return(
              <ListItemButton role={undefined} onClick={handleToggleModules(index)} dense>
                <ListItemIcon>
                  <Checkbox edge="start" checked={checkedModules.indexOf(index) !== -1}
                    tabIndex={-1} disableRipple inputProps={{ 'aria-labelledby': labelId }} />
                </ListItemIcon>
                <ListItemText id={labelId} primary={ value.content} />
              </ListItemButton>);
          })}
        </List>
        </Offcanvas.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModulesClose} >Cancelar</Button>
          <Button variant="primary" onClick={handleModule} type="submit">Submeter</Button>
        </Modal.Footer>
      </Modal> 
      <Offcanvas show={showModulesCreation} onHide={handleModulesCreationOpen}>
        <Offcanvas.Header>
          <Offcanvas.Title>Criar Módulo</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
          <Row>
        <Form.Label column lg={2}>
            Título
        </Form.Label>
        <Col>
          <Form.Control type="text" placeholder="Normal text"  onChange= {(event) => setModuleTitle(event.target.value)}/>
        </Col>
        </Row>
            <Button variant="primary" type="submit" onClick={handleModuloCreation}>
              Criar
            </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
      <div >
        <Button variant="secondary"  onClick={handleStudentCreation}>Criar Alunos</Button>{' '}
        <Button variant="secondary" onClick={handleOpen} id="curso">Cursos</Button>{' '}
        <Button variant="secondary" id="modulos" hidden onClick={openModules}>Modulos</Button>{' '}
        <Button variant="secondary" onClick={handleOpenStudent} hidden id= "aluno">Alunos</Button>{' '}
      </div>
    </>
  );
  
}
