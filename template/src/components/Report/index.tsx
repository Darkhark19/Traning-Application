import { api } from "../../services/api";
import { Button, Modal } from "react-bootstrap";
import styles from "./styles.module.scss";
import { FormEvent, MouseEventHandler, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";



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
type Session = {
  id:String;
  students: Student;
  created_at: Date;
  ended_at: Date;
  stModules:SessionsModules[];
};

type SessionsModules ={
  session:Session;
  module:Module;
}
type StudentCourses = {
  student:StudentResult;
  course:CourseResult;
}

type Module = {
  id:String;
  content:String;
  course: Course;
  stModules: SessionsModules[];
}
type Student = {
  id:String;
  name:String;
  class:String;
  email:String;
}

type CourseResult = {
  id:String;
  subject:String;
  name:String;
  owner: User;
  modelus: Module[];
}

type CourseList = {
  id: String;
  subject: String;
  name: String;
  moduleContent: String;
  studentName: String;
  emailStudent:String;
  created_at: Date;
  ended_at: Date;

}

type StudentResult = {
  id:String;
  name:String;
  class:String;
  email:String;
  stCourse : StudentCourses;
  Session: Session[];
}

type StudentTable = {
  id:String;
  name:String;
  class:String;
  email:String;
  course: String;
  time: String;
}
export function Report() {
  const navigate = useNavigate();



  const navigateHome = () => {
    navigate("/");
  };

  const [courses, setCourses] = useState<Course[]>([]);
  const [checkedCourse, setCheckedCourse] = useState([]);
  const [show, setShow] = useState(false);
  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);
  const [showTable,setShowTable] = useState(false);

  const [students, setStudents] = useState<StudentResult[]>([]);
  const [checkedStudents, setCheckedStudents] = useState([]);
  const [showStudents, setShowStudents] = useState(false);
  const handleOpenStudents = () => setShowStudents(true);
  const handleCloseStudents = () => setShowStudents(false);
  const [showTableStudent, setShowTableStudent] = useState(false);

 // const [resultCourses, setResultCourses] = useState<CourseResult[]>([]);
  const [tableCourse, setTableCourse] = useState<CourseList[]>([]);
  const [tableStudent, setTableStudent] = useState<StudentTable[]>([]);
  

  const TableStudents = (props) => {
    const {show} = props;
    const v = <div></div>
    type Data = typeof tableStudent;
    type SortKeys = keyof StudentTable;
    type SortOrder = "ascn" | "desc";

    function sortData({
      tableData,
      sortKey,
      reverse,
    }: {
      tableData: Data;
      sortKey: SortKeys;
      reverse: boolean;
    }) {
      if (!sortKey) return tableData;

      const sortedData = tableStudent.sort((a, b) => {
        return a[sortKey] > b[sortKey] ? 1 : -1;
      });

      if (reverse) {
        return sortedData.reverse();
      }

      return sortedData;
    }

    function SortButton({
      sortOrder,
      columnKey,
      sortKey,
      onClick,
    }: {
      sortOrder: SortOrder;
      columnKey: SortKeys;
      sortKey: SortKeys;
      onClick: MouseEventHandler<HTMLButtonElement>;
    }) {
      return (
        <button
          onClick={onClick}
          className={`${
            sortKey === columnKey && sortOrder === "desc"
              ? "sort-button sort-reverse"
              : "sort-button"
          }`}
        >
          ▲
        </button>
      );
    }
      const [sortKey, setSortKey] = useState<SortKeys>("id");
      const [sortOrder, setSortOrder] = useState<SortOrder>("ascn");
      const headers: { key: SortKeys; label: string }[] = [
        { key: "id", label: "ID" },
        { key: "name", label: "Aluno" },
        { key: "class", label: "Turma" },
        { key: "email", label: "Email" },
        { key: "course", label: "Curso" },
        { key: "time", label: "Tempo em Curso " },
      ];

      const sortedData = useCallback(
        () => sortData({ tableData: tableStudent, sortKey, reverse: sortOrder === "desc" }),
        [tableStudent, sortKey, sortOrder]
      );
      const table = (
        <table>
        <thead>
          <tr>
            {headers.map((row) => {
              return (
                <td key={row.key}>
                  {row.label}{" "}
                  <SortButton
                    columnKey={row.key}
                    onClick={() => changeSort(row.key)}
                    {...{
                      sortOrder,
                      sortKey,
                    }}
                  />
                </td>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {sortedData().map((student,i) => {
         
            return (
              <tr key={i}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.class}</td>
                <td>{student.email}</td>
                <td>{student.course}</td>
                <td>{student.time}</td>
              </tr>
            );
          })} 
        </tbody>
      </table>
      );

      function changeSort(key: SortKeys) {
        setSortOrder(sortOrder === "ascn" ? "desc" : "ascn");

        setSortKey(key);
      }

      return show ? table : v;
  }
  const Table = (props) => {
    const {show} = props;
    const v = <div></div>
    type Data = typeof tableCourse;
    type SortKeys = keyof CourseList;
    type SortOrder = "ascn" | "desc";

    function sortData({
      tableData,
      sortKey,
      reverse,
    }: {
      tableData: Data;
      sortKey: SortKeys;
      reverse: boolean;
    }) {
      if (!sortKey) return tableData;

      const sortedData = tableCourse.sort((a, b) => {
        return a[sortKey] > b[sortKey] ? 1 : -1;
      });

      if (reverse) {
        return sortedData.reverse();
      }

      return sortedData;
    }

    function SortButton({
      sortOrder,
      columnKey,
      sortKey,
      onClick,
    }: {
      sortOrder: SortOrder;
      columnKey: SortKeys;
      sortKey: SortKeys;
      onClick: MouseEventHandler<HTMLButtonElement>;
    }) {
      return (
        <button
          onClick={onClick}
          className={`${
            sortKey === columnKey && sortOrder === "desc"
              ? "sort-button sort-reverse"
              : "sort-button"
          }`}
        >
          ▲
        </button>
      );
    }
      const [sortKey, setSortKey] = useState<SortKeys>("id");
      const [sortOrder, setSortOrder] = useState<SortOrder>("ascn");

      const headers: { key: SortKeys; label: string }[] = [
        { key: "id", label: "ID" },
        { key: "subject", label: "Tema" },
        { key: "name", label: "Coordenador" },
        { key: "moduleContent", label: "Módulo" },
        { key: "studentName", label: "Nome do Aluno" },
       // { key: "emailStudent", label: "Email" },
        { key: "created_at", label: "Criado" },
        { key: "ended_at", label: "Terminado" },
      ];

      const sortedData = useCallback(
        () => sortData({ tableData: tableCourse, sortKey, reverse: sortOrder === "desc" }),
        [tableCourse, sortKey, sortOrder]
      );
      const table = (
        <table >
        <thead>
          <tr>
            {headers.map((row) => {
              return (
                <td key={row.key}>
                  {row.label}{" "}
                  <SortButton
                    columnKey={row.key}
                    onClick={() => changeSort(row.key)}
                    {...{
                      sortOrder,
                      sortKey,
                    }}
                  />
                </td>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {sortedData().map((course,i) => {
            var end = new Date(course.ended_at).toLocaleTimeString();
            var created = new Date(course.created_at).toLocaleTimeString();
            return (
              <tr key={i} >
                <td>{course.id}</td>
                <td>{course.name}</td>
                <td>{course.subject}</td>
                <td>{course.moduleContent}</td>
                <td>{course.studentName}</td>
               {/* <td >{course.emailStudent}</td> */}
                <td>{created}</td>
                <td>{end}</td>
              </tr>
            );
          })} 
        </tbody>
      </table>
      );

      function changeSort(key: SortKeys) {
        setSortOrder(sortOrder === "ascn" ? "desc" : "ascn");

        setSortKey(key);
      }

      return show ? table : v;
 
  }
  
  const handleToggleCourses = (value: number) => () => {
    const currentIndex = checkedCourse.indexOf(value);
    const newChecked = [...checkedCourse];
    if(currentIndex === -1){
      newChecked.push(value);
    } else{
      newChecked.splice(currentIndex,1);
    }
    setCheckedCourse(newChecked);
  }
  const handleToggleStudents = (value: number) => () => {
    const currentIndex = checkedStudents.indexOf(value);
    const newChecked = [...checkedStudents];
    if(currentIndex === -1){
      newChecked.push(value);
    } else{
      newChecked.splice(currentIndex,1);
    }
    setCheckedStudents(newChecked);
  }

  async function handleCourse(event:FormEvent){
    event.preventDefault();
    let response = await api.post("id-from-token", {});
    api
    .post<Course[]>("getCoursesOfUser",{user: response.data})
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
  async function handleStudent(event:FormEvent){
    event.preventDefault();
    let response = await api.post("id-from-token", {});
    var result = [];
    checkedStudents.forEach((index) => result.push(students[index].id));
    await api.post<StudentResult[]>("getStudentsByUser",{userId: response.data})
      .then((response) => {
        setStudents(response.data);
      }).catch((error) => {
        console.log(error.response.status);
        if (error.response.status == 401) {
          alert("Sem cookie");
        }
      });
      handleOpenStudents();
  }

  const newCourses= ({value}: {value : CourseResult}) : (CourseList[]) => {
    var result : CourseList[] = [];
    for(var module of value.modelus){
      for(var sModule of module.stModules){
        const session = sModule.session;
        const student = session.students;
        var obj : CourseList = {
          id: value.id,
          subject: value.subject,
          name: value.name,
          moduleContent: module.content,
          studentName: student.name,
          emailStudent: student.email,
          created_at: session.created_at,
          ended_at:session.ended_at
        };
        result.push(obj);
      }
    }
    return result;
    
  }

  async function handleCourses(event: FormEvent) {
      event.preventDefault();
      var result = [];
      checkedCourse.forEach( (index) => result.push(courses[index].id));
      await api.post<CourseResult[]>("getReportFromCourse",{courses:result })
      .then((response) => {
        var tableC = [] as CourseList[];
        response.data.forEach((value) =>  newCourses({value}).forEach((o) => tableC.push(o)));
        setTableCourse(tableC);
        handleClose();
        setShowTableStudent(false);
        setShowTable(true);
      });
  }
  

  function handleStudents(event:FormEvent){
    event.preventDefault();
    var st : StudentResult[] = [];
    
    checkedStudents.forEach( (index) => st.push(students[index]));
    var result: StudentTable[] = [];
    for(var student of st){
      let map = new Map<String,number>(); //course, time
      for( var sessions of student.Session){
        for(var module of sessions.stModules){
          var id = module.module.course.id;
          var obj = map.get(id);
          var eventStartTime = new Date(sessions.created_at);
          var eventEndTime = new Date(sessions.ended_at);
          var duration = eventEndTime.valueOf() - eventStartTime.valueOf();
          if(obj == null){
            map.set(id,duration );
          }else{
            map.set(id, obj + duration);
          }
        }
        
      }
      for(var [course, courseTime] of map.entries()){
        var t = new Date(courseTime).toLocaleTimeString();
        var row : StudentTable = {
          id : student.id,
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
  }

  
  const ModalStudent = () => {

    return(
    <Modal show={showStudents}  >
          <Modal.Header>
            <Modal.Title> Alunos </Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              {students.map((value,index) => {
                const labelId = "checkbox-list-label- { " + value.name + "}";
                return(
                  <ListItemButton key = {index} role={undefined} onClick={handleToggleStudents(index)} dense>
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
            <Button variant="secondary" onClick={handleCloseStudents} >Cancelar</Button>
            <Button variant="primary" onClick={handleStudents} type="submit">Submeter</Button>
          </Modal.Footer>
    </Modal>);
  }

  return (
    <div className="App">
    <div className={styles.navbar}>
      <a href="/">Página inicial</a>
      <a onClick={handleCourse}>Curso</a>
      <a onClick={handleStudent}>Alunos</a>
      </div> 
      <div>
          <TableStudents show = {showTableStudent} />
          <Table show = {showTable} /> 
      </div>
      <ModalStudent />
      <Modal show={show}  >
          <Modal.Header>
            <Modal.Title> Cursos </Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              {courses.map((value,index) => {
                const labelId = "checkbox-list-label- { " + value.name + "}";
                return(
                  <ListItemButton key = {index} role={undefined} onClick={handleToggleCourses(index)} dense>
                    <ListItemIcon>
                      <Checkbox edge="start" checked={checkedCourse.indexOf(index) !== -1}
                        tabIndex={-1} disableRipple inputProps={{ 'aria-labelledby': labelId }} />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={ value.name} />
                  </ListItemButton>);
              })}
              </List>
          </Modal.Body>
          <Modal.Footer>  
            <Button variant="secondary" onClick={handleClose} >Cancelar</Button>
            <Button variant="primary" onClick={handleCourses} type="submit">Submeter</Button>
          </Modal.Footer>
        </Modal>
    </div>
  );
}


