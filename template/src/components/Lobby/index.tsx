import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { Dialog } from 'primereact/dialog';
import { useState, FormEvent, useEffect } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Sidebar } from 'primereact/sidebar';
import { InputTextarea } from "primereact/inputtextarea";

import styles from "./styles.module.scss";

import { Dropdown } from 'primereact/dropdown';

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

type StudentCourse = {
  courseId: String;
  studentId: String;
}

type Session = {
  id: string;
  coordinatorId: String;
  couserId: String;
}
type Module = {
  id: string;
  content: String;
  courseId: string;
}

type SessionsModules = {
  sessionId: String;
  moduleId: String;
  courseId: String;
}

type Project = {
  id: String;
  name: String;
  content:String;
  closed: Boolean;
  ownerId: String;

}

//const socket = io("http://localhost:4000");

//socket.on("new_ticket", (newTicket) => {
// console.log(newTicket);
//});
export function Lobby() {


  const [checkedModules, setCheckedModules] = useState<Module[]>([]);
  const [showModules, setShowModules] = useState(false);
  const [modulos, setModulos] = useState<Module[]>([]);
  const navigate = useNavigate();
  const navigateToStudents = () => { navigate("/createstudent") };
  const navigateToProject = () => { navigate("/project") };
  const navigateToLobby = () => { navigate("/lobby") };
  const navigateToReport = () => { navigate("/report") };
  const navigateToCourse = () => { navigate("/course") };
  const [user, setUser] = useState("");
  const [firstRun, setFirstRun] = useState(true);

  const handleModulesOpen = () => setShowModules(true);
  const handleModulesClose = () => {setShowModules(false),navigateToLobby()};

  const [checkedStCourse, setCheckedStCourse] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [checkedCourse, setCheckedCourse] = useState<any>(null);
  const [show, setShow] = useState(false);
  const handleOpen = () => setShow(true);
  const handleClose = () => {setShow(false),navigateToLobby()};

  const [students, setStudents] = useState<Student[]>([]);

  const [stCourse, setStCourse] = useState<Student[]>([]);
  const [showStudents, setShowStudents] = useState(false);
  const handleOpenStudent = () => setShowStudents(true);
  const handleCloseStudent = () =>  {setShowStudents(false), navigateToLobby()};
  const [projects, setProjects] = useState<Project[]>([]);
  const [showProject,setShowProject] = useState(false);
  const handleOpenProject = () => setShowProject(true);
  const handleCloseProject = () => { setShowProject(false), navigateToLobby() ,
    document.getElementById("curso").hidden = false; document.getElementById("projeto").hidden = true; };

  const [checkedProject, setCheckedProject] = useState<Project[]>([]);

  const [sessions, setSessions] = useState<Session[]>([]);

  const [showModulesCreation, setShowModulesCreation] = useState(false);
  const handleModulesCreationOpen = () => setShowModulesCreation(true);
  const handleModulesCreationClose = () => setShowModulesCreation(false);
  const [moduleTitle, setModuleTitle] = useState("");


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


  function findStudentsById(id: String) {
    for (var student of students) {
      if (student.id == id) {
        return student;
      }
    }

  }
  async function getStudentsCourse() {

    var courseId = checkedCourse.id;
    getStudents();
    await api.post<StudentCourse[]>("studentsCourse", { courseId }).then((response) => {
      var studentsCourse: StudentCourse[] = response.data;
      var moduloSt: Student[] = [];
      for (var st of studentsCourse) {
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
  function handleModule(event: FormEvent) {
    document.getElementById("curso").hidden = true;
    document.getElementById("modulos").hidden = true;
    handleModulesClose();
    getStudentsCourse();
    document.getElementById("aluno").hidden = false;
    document.getElementById("projeto").hidden = false;
  }
  function handleSelection(event: FormEvent) {
    event.preventDefault();
    if (checkedStCourse.length == 0) {
      alert("Selecione algum aluno.")
    } else {
      
      handleCloseStudent();
      document.getElementById("aluno").hidden = true;
      document.getElementById("projeto").hidden = false;
    }
  }
  const DialogViewModule = () => {
   
    const handleToggleModules = (e: { value: any, checked: boolean }) => {
      let newChecked = [...checkedModules];
      if (e.checked) {
        newChecked.push(e.value);
      } else {
        for (let i = 0; i < newChecked.length; i++) {
          const selectedModul = newChecked[i];
          if (selectedModul.id === e.value.id) {
            newChecked.splice(i, 1);
            break;
          }

        }
      }
      setCheckedModules(newChecked);
    };
    const notEmpty = (
      
      <div className="card">
        {modulos.map((value, index) => {
          return (
            <div className="field-checkbox" key={index}>
              <Checkbox inputId={value.id.toString()} name="module" value={value} onChange={handleToggleModules}
                checked={checkedModules.some((item) => item.id === value.id)} />
              <label htmlFor={value.id.toString()}> {value.content}</label>
            </div>);
        })}
      </div>
  
    );
    const empty = <div><h2>Não existe Módulos</h2></div>
    return modulos.length > 0 ? notEmpty : empty;
  }
  const DialogViewStudents = () => {
   
    
    const toggleStudents = (e: { value: any, checked: boolean }) => {
      let newChecked = [...checkedStCourse];
      if (e.checked)
        newChecked.push(e.value);
      else {
        for (let i = 0; i < newChecked.length; i++) {
          const selected = newChecked[i];

          if (selected.id === e.value.id) {
            newChecked.splice(i, 1);
            break;
          }
        }
      }
      setCheckedStCourse(newChecked);
    }
    const empty = <div><h2>Não existe Alunos</h2></div>
    const notEmpty = (
      
      <div className="card">
        {stCourse.map((value, index) => {
          return (
            <div key={index} className="field-checkbox" >
              <Checkbox key={index} inputId={value.id.toString()} name="stCourse" value={value} onChange={toggleStudents}
                checked={checkedStCourse.some((item) => item.id === value.id)} />
              <label htmlFor={value.id.toString()}> {value.name}</label>
            </div>);
        })}
      </div>);
    return stCourse.length == 0 ? empty : notEmpty; 
  }
  const handleWithProject = async (courseId: string, moduleId:string,sessionId:string) => {
    for ( var project of checkedProject) {
      var projectId = project.id;
      await api.post<SessionsModules>("create-studentProject", {
        courseId,
        moduleId,
        sessionId,
        projectId
      }).catch((error) => {
        console.log(error.response.status);
        if (error.response.status == 401) {
          alert("Sem cookie");
        }
      }).then( () =>{
        document.getElementById("aluno").hidden = true;
        document.getElementById("projeto").hidden = true;
        document.getElementById("curso").hidden = false;
        handleCloseProject();
        setCheckedCourse([]);
        setCheckedModules([]);
        setCheckedStCourse([]);
        setCheckedProject([]);
        setSessions([]);}
      );
    }
  }
  const handleWithoutProject = async (courseId: string, moduleId: string, sessionId: string) => {
    await api.post<SessionsModules>("create-ssModules", {
      courseId,
      moduleId,
      sessionId
    }).catch((error) => {
      console.log(error.response.status);
      if (error.response.status == 401) {
        alert("Sem cookie");
      }
    }).then( () =>{
      document.getElementById("aluno").hidden = true;
      document.getElementById("projeto").hidden = true;
      document.getElementById("curso").hidden = false;
      handleCloseProject();
      setCheckedCourse([]);
      setCheckedModules([]);
      setCheckedStCourse([]);
      setCheckedProject([]);
      setSessions([]);}
    );
  }
  async function handleProjectSelection(event: FormEvent) {
    event.preventDefault();
   
      for (var student of checkedStCourse) {
        var studentId = student.id;
        await api.post<Session>("create-session", {
          coordinatorId: user,
          studentId: studentId
        }).then((response) => {
          setSessions(sessions => [...sessions, response.data]);
          for (var module of checkedModules) {
            for (var session of sessions) {
              var moduleId = module.id;
              var courseId = module.courseId;
              var sessionId = session.id;
              if (checkedProject.length == 0) 
                handleWithoutProject(courseId,moduleId,sessionId);
              else
                handleWithProject(courseId, moduleId, sessionId);
            }
          }
        }).catch((error) => {
          console.log(error.response.status);
          if (error.response.status == 401) {
            alert("Sem cookie");
          }
        });}
        
     
     // navigateToLobby();
    

  }
  const DialogViewProject = () => {
   
    const toggleProject = (e: { value: any, checked: boolean }) => {
      let newChecked = [...checkedProject];
      if (e.checked)
        newChecked.push(e.value);
      else {
        for (let i = 0; i < newChecked.length; i++) {
          const selected = newChecked[i];

          if (selected.id === e.value.id) {
            newChecked.splice(i, 1);
            break;
          }
        }
      }
      setCheckedProject(newChecked);
    }
    const empty = <div><h2>Não existe projetos</h2></div>
    const notEmpty = (
      
      <div className="card">
        {projects.map((value, index) => {
          return (
            <div key={index} className="field-checkbox" >
              <Checkbox key={index} inputId={value.id.toString()} name="projects" value={value} onChange={toggleProject}
                checked={checkedProject.some((item) => item.id === value.id)} />
              <label htmlFor={value.id.toString()}> {value.name}</label>
            </div>);
        })}
      </div>
    );
    return projects.length == 0 ? empty : notEmpty;
  }
  
  const getCourse = () => {
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


  function getModules() {
    var course = checkedCourse.id;
    api.post<Module[]>("modules", { courseId: course })
      .then((response) => { setModulos(response.data); })
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status == 401) {
          alert("Sem cookie");
        }
      });
  }

  function openModules() {
    getModules();
    handleModulesOpen();
  }
  async function handleModuloCreation(event: FormEvent) {
    var course = checkedCourse.id;
    await api.post("create-module", {
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

  const getProject = ()  => {
    api.post<Project[]>("getProjectNotClosedByUser", {
      userId: user
    }).catch((error) => {
      console.log(error.response.status);

    }).then((response) => {
      setProjects(response.data);
      handleOpenProject();
    });


  }

  if (firstRun) {
    //getCourse();
    getId();
    getStudents();
    setFirstRun(false);
  }
  useEffect(getCourse, [])

  async function getId() {
    await api.post("id-from-token", {}).then((response) => {
      setUser(response.data);
    });
  }




  async function handleCourses(event: FormEvent) {
    if (checkedCourse === -1 || checkedCourse === undefined || checkedCourse === null) {
      alert("Selecione algum curso.");
    } else {
      //getId();
      handleClose();
      document.getElementById("curso").hidden = true;
      document.getElementById("modulos").hidden = false;
      getModules();
    }

  }

  
  const footerModules = (
    <div>
      <Button label="Adicionar" icon="pi pi-plus" onClick={() => { handleModulesClose(); handleModulesCreationOpen() }} />
      <Button label="Confirmar" icon="pi pi-check" onClick={handleModule} />
      <Button label="Cancelar" icon="pi pi-times" onClick={handleModulesClose} />
    </div>
  );

  const footer = (
    <div>
      <Button label="Criar" icon="pi pi-plus" onClick={navigateToCourse} />
      <Button label="Confirmar" icon="pi pi-check" onClick={handleCourses} />
      <Button label="Cancelar" icon="pi pi-times" onClick={handleClose} />
    </div>
  );

  const footerProject = (
    <div>
      <Button label="Confirmar" icon="pi pi-check" onClick={handleProjectSelection} />
      <Button label="Cancelar" icon="pi pi-times" onClick={handleCloseProject} />
    </div>
  );
  const footerAlunos = (
    <div>
      <Button label="Confirmar" icon="pi pi-check" onClick={handleSelection} />
      <Button label="Cancelar" icon="pi pi-times" onClick={handleCloseStudent} />
    </div>
  );
  return (
    <>
    <Dialog header={"Projetos"} visible={showProject} footer={footerProject} style={{ width: '50vw' }} modal onHide={handleCloseProject}>
      <DialogViewProject />
    </Dialog>
    <Dialog header={"Alunos"} visible={showStudents} footer={footerAlunos} style={{ width: '50vw' }} modal onHide={handleCloseStudent}>
      <DialogViewStudents />
    </Dialog>
    <Dialog header={"Modulo"} visible={showModules} footer={footerModules} style={{ width: '50vw' }} modal onHide={handleModulesClose}>
      <DialogViewModule />
    </Dialog>
      <Dialog header="Cursos" visible={show} footer={footer} style={{ width: '50vw' }} modal onHide={handleClose}>
        <Dropdown value={checkedCourse} options={courses} onChange={(e) => setCheckedCourse(e.value)} optionLabel="name"
          filter showClear filterBy="name" placeholder="Selecione o curso" />
      </Dialog>
      <Sidebar visible={showModulesCreation} onHide={handleModulesCreationClose}>
        <h5 className="text-center">Criar Módulo</h5>
        <form className="p-fluid">
          <InputTextarea value={moduleTitle} onChange={(e) => setModuleTitle(e.target.value)} rows={5} cols={30} autoResize />
          <Button type="button" onClick={handleModuloCreation} label="Criar" className="mt-2" icon="pi pi-check" />
        </form>
      </Sidebar>
      <div className={styles.navbar}>
        <a href="/">Página inicial</a>
      </div>
      <span className="p-buttonset">
        <Button label="Relatórios" icon="pi pi-trash" onClick={navigateToReport} />
        <Button label="Criar Projetos" icon="pi pi-plus" onClick={navigateToProject} />
        <Button label="Criar Alunos" icon="pi pi-plus" onClick={navigateToStudents} />
        <Button label="Cursos" icon="pi pi-trash" onClick={handleOpen} id="curso" />
        <Button label="Modulos" icon="pi pi-times" onClick={openModules} hidden id="modulos" />
        <Button label="Alunos" icon="pi pi-times" onClick={handleOpenStudent} hidden id="aluno" />
        <Button label="Projetos" icon="pi pi-times" onClick={getProject} hidden id="projeto"/>
      </span>
    </>
  );

}
