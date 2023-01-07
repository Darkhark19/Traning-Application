import { api } from "../../services/api";
import styles from "./styles.module.scss";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectTemplate, Table, TableStudents } from "./Project";
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";



type Course = {
  id: string;
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
type Session = {
  id: String;
  students: Student;
  created_at: Date;
  ended_at: Date;
  stModules: SessionsModules[];
};

export type SessionsModules = {
  session: Session;
  module: Module;
}
type StudentCourses = {
  student: StudentResult;
  course: CourseResult;
}

type Module = {
  id: string;
  content: String;
  course: Course;
  stModules: SessionsModules[];
}
type Student = {
  id: String;
  name: String;
  class: String;
  email: String;
}

type CourseResult = {
  id: String;
  subject: String;
  name: String;
  owner: User;
  modelus: Module[];
}

type CourseList = {
  id: String;
  subject: String;
  name: String;
  moduleContent: String;
  studentName: String;
  emailStudent: String;
  created_at: Date;
  ended_at: Date;

}

type StudentResult = {
  id: string;
  name: String;
  class: String;
  email: String;
  stCourse: StudentCourses;
  Session: Session[];
}

type StudentTable = {
  id: String;
  name: String;
  class: String;
  email: String;
  course: String;
  time: String;
}

export type ProjectTable = {
  id: string;
  name: String;
  closed: Boolean;
  content: String;
  created_at: Date;
  ended_at: Date;
  consumables : string;
  SessionsModules: SessionsModules[]
}
export function Report() {
  const navigate = useNavigate();



  const navigateHome = () => {
    navigate("/");
  };

  const [courses, setCourses] = useState<Course[]>([]);
  const [checkedCourse, setCheckedCourse] = useState<Course[]>([]);
  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);
  const [showTable, setShowTable] = useState(false);
  const [show, setShow] = useState(false);

  const [students, setStudents] = useState<StudentResult[]>([]);
  const [checkedStudents, setCheckedStudents] = useState([]);
  const [showStudents, setShowStudents] = useState(false);
  const handleOpenStudents = () => setShowStudents(true);
  const handleCloseStudents = () => setShowStudents(false);
  const [showTableStudent, setShowTableStudent] = useState(false);

  // const [resultCourses, setResultCourses] = useState<CourseResult[]>([]);
  const [tableCourse, setTableCourse] = useState<CourseList[]>([]);
  const [tableStudent, setTableStudent] = useState<StudentTable[]>([]);
  const [showForm, setShowForm] = useState(false);
  const handleShowFormClose = () => setShowForm(false);
  const handleShowFormOpen = () => setShowForm(true);

  const [projects, setProjects] = useState<ProjectTable[]>([]);
  const [checkedProject, setCheckedProject] = useState<ProjectTable>();
  const onProjectChange = (e:{value: ProjectTable}) => { setCheckedProject(e.value); }
  const [showProject, setShowProject] = useState(false);
  const handleCloseProject = () => setShowProject(false);
  const handleOpenProject = () => setShowProject(true);

  async function handleCourse(event: FormEvent) {
    event.preventDefault();
    let response = await api.post("id-from-token", {});
    api
      .post<Course[]>("getCoursesOfUser", { user: response.data })
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status == 401) {
          alert("Sem cookie");
        }
      });
    handleOpen();
  }
  async function handleStudent(event: FormEvent) {
    event.preventDefault();
    await api.post("id-from-token", {}).then((response) => {
      var result = [];
      checkedStudents.forEach((student) => result.push(student.id));
      api.post<StudentResult[]>("getStudentsByUser", { userId: response.data })
        .then((response) => {
          setStudents(response.data);
        }).catch((error) => {
          console.log(error.response.status);
          if (error.response.status == 401) {
            alert("Sem cookie");
          }
        });
    });
    handleOpenStudents();
  }

  async function handleProject(event: FormEvent) {
    event.preventDefault();
    await api.post("id-from-token", {}).then((response) => { 
      api.post<ProjectTable[]>("getProjectByUser", { userId: response.data }).then((response) => {
        setProjects(response.data);
      }).catch((error) => {
        console.log(error.response.status);
        if (error.response.status == 401) {
          alert("Sem cookie");
        }
      });
    });
    setShowTableStudent(false);
    setShowTable(false);
    handleOpenProject();
  };

  const newCourses = ({ value }: { value: CourseResult }): (CourseList[]) => {
    var result: CourseList[] = [];
    for (var module of value.modelus) {
      for (var sModule of module.stModules) {
        const session = sModule.session;
        const student = session.students;
        var obj: CourseList = {
          id: value.id,
          subject: value.subject,
          name: value.name,
          moduleContent: module.content,
          studentName: student.name,
          emailStudent: student.email,
          created_at: new Date(session.created_at),
          ended_at: new Date(session.ended_at)
        };
        result.push(obj);
      }
    }
    return result;

  };

  async function handleCourses(event: FormEvent) {
    event.preventDefault();
    var courses : string[] = checkedCourse.map((course) => course.id);
    await api.post<CourseResult[]>("getReportFromCourse", { courses })
      .then((response) => {
        var tableC = [] as CourseList[];
        response.data.forEach((value) => tableC.push(...newCourses({ value })));
  
        setTableCourse(tableC);
        handleClose();
        setShowTableStudent(false);
        setShowTable(true);
        handleShowFormClose();
      });
  };


  function handleStudents(event: FormEvent) {
    event.preventDefault();
    //var st: StudentResult[] = [];

   // checkedStudents.forEach((index) => st.push(students[index]));
    var result: StudentTable[] = [];
    for (var student of checkedStudents) {
      let map = new Map<String, number>(); //course, time
      for (var sessions of student.Session) {
        for (var module of sessions.stModules) {
          var id = module.module.course.name;
          var obj = map.get(id);
          var eventStartTime = new Date(sessions.created_at);
          var eventEndTime = new Date(sessions.ended_at);
          var duration = eventEndTime.valueOf() - eventStartTime.valueOf();
          if (obj == null) {
            map.set(id, duration);
          } else {
            map.set(id, obj + duration);
          }
        }

      }
      for (var [course, courseTime] of map.entries()) {
        var t = new Date(courseTime).toLocaleTimeString();
        var row: StudentTable = {
          id: student.id,
          class: student.class,
          course: course,
          email: student.email,
          name: student.name,
          time: t,
        }
        result.push(row);
      }
    }
    setTableStudent(result);
    handleCloseStudents();
    setShowTableStudent(true);
    setShowTable(false);
    handleCloseProject();
    handleShowFormClose();
  };

  const footer = (
    <div>
      <Button label="Confirmar" icon="pi pi-check" onClick={handleCourses} />
      <Button label="Cancelar" icon="pi pi-times" onClick={handleClose} />
    </div>
  );
  const footerAlunos = (
    <div>
      <Button label="Confirmar" icon="pi pi-check" onClick={handleStudents} />
      <Button label="Cancelar" icon="pi pi-times" onClick={handleCloseStudents} />
    </div>
  );

  const footerProject =(<div>
    <Button label="Confirmar" icon="pi pi-check" onClick={ () => {handleCloseProject(),handleShowFormOpen() }} />
    <Button label="Cancelar" icon="pi pi-times" onClick={handleCloseProject} />
  </div>) ;

  const CreateCourses = () => {
    const handleToggleCourses = (e:{value: Course,checked:boolean}) => {
      let _checkedCourses = [...checkedCourse];

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
            checked={checkedCourse.some((item) => item.id === course.id)} />
            <label htmlFor={course.id}>{course.name}{' '}{course.id}</label>
          </div>)})}
        </div>
    const empty = <div><h2>Não existe cursos</h2></div>
    return courses.length == 0 ? empty : notEmpyt;
  }

  const CreateStudents = () => {
    const handleToggleStudents = (e:{value: StudentResult,checked:boolean}) => {
      let _checkedStudents = [...checkedStudents];

        if (e.checked) {
            _checkedStudents.push(e.value);
        }
        else {
            for (let i = 0; i < _checkedStudents.length; i++) {
                const selectedCategory = _checkedStudents[i];

                if (selectedCategory.id === e.value.id) {
                    _checkedStudents.splice(i, 1);
                    break;
                }
            }
        }
        setCheckedStudents(_checkedStudents);
    }
    const notEmpyt = <div className="card">
        {students.map((students, index) => {
          return(<div key={index} className="field-checkbox">
            <Checkbox inputId={students.id} name="students" value={students} onChange={handleToggleStudents} 
            checked={checkedStudents.some((item) => item.id === students.id)} />
            <label htmlFor={students.id}>{students.name}{' '}{students.id}</label>
          </div>)})}
        </div>
    const empty = <div><h2>Não existe alunos</h2></div>
    return students.length == 0 ? empty : notEmpyt;
  }

  const CreateProjects = () => {
 
    const notEmpyt = <div className="card">
        <Dropdown value={checkedProject} options={projects} onChange={onProjectChange} optionLabel="name" filter showClear filterBy="name" placeholder="Select a Project" />
        </div>
    const empty = <div><h2>Não existe Projetos</h2></div>
    return projects.length == 0 ? empty : notEmpyt;
  }
  return (
    <div className="App">
      <div className={styles.navbar}>
        <a href="/lobby">Página inicial</a>
        <a onClick={handleCourse}>Curso</a>
        <a onClick={handleStudent}>Alunos</a>
        <a onClick={handleProject}>Projetos</a>
      </div>
      <div>
        <ProjectTemplate show={showForm} project={checkedProject} onHide = {handleShowFormClose}/>
        <TableStudents show={showTableStudent} students={tableStudent}/>
        <Table show={showTable} course={tableCourse} />
      </div>
      <div>
        <Dialog header="Cursos" visible={show} style={{ width: '50vw' }} footer={footer} onHide={handleClose}>
      <CreateCourses/>
      </Dialog>
      </div>
      <div>
        <Dialog header="Alunos" visible={showStudents} style={{ width: '50vw' }} footer={footerAlunos} onHide={handleCloseStudents}>
      <CreateStudents/>
      </Dialog>
      <div>
      <Dialog header="Projetos" visible={showProject} style={{ width: '50vw' }} footer={footerProject} onHide={handleCloseProject}>
        <CreateProjects/>
      </Dialog>
      </div>
      </div>
    </div>
  );
}

