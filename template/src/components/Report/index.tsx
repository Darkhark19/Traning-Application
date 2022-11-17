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
};

type SessionsModules ={
  session:Session;
  module:Module;
}

type Module = {
  id:String;
  content:String;
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
type CourseTable = {
  id: String;
  subject: String;
  name: String;
  moduleContent: String;
  studentName: String;
  emailStudent:String;
  time:String;
}
export function Report() {
  const navigate = useNavigate();
  const [showTable,setShowTable] = useState(false);
  const navigateHome = () => {
    navigate("/");
  };

  const [courses, setCourses] = useState<Course[]>([]);
  const [checkedCourse, setCheckedCourse] = useState([]);
  const [show, setShow] = useState(false);
  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

 // const [resultCourses, setResultCourses] = useState<CourseResult[]>([]);
  const [tableCourse, setTableCourse] = useState<CourseList[]>([]);
  
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
        { key: "name", label: "Owner" },
        { key: "moduleContent", label: "Módulo" },
        { key: "studentName", label: "Nome do Aluno" },
        { key: "emailStudent", label: "Email" },
        { key: "created_at", label: "Criado" },
        { key: "ended_at", label: "Terminado" },
      ];

      const sortedData = useCallback(
        () => sortData({ tableData: tableCourse, sortKey, reverse: sortOrder === "desc" }),
        [tableCourse, sortKey, sortOrder]
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
          {sortedData().map((course,i) => {
            var end = course.ended_at;
            var created = course.created_at;
            console.log(end)
            console.log(created);

            return (
              <tr key={i}>
                <td>{course.id}</td>
                <td>{course.name}</td>
                <td>{course.subject}</td>
                <td>{course.moduleContent}</td>
                <td>{course.studentName}</td>
                <td>{course.emailStudent}</td>
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
  function handleCourses(event: FormEvent) {
      event.preventDefault();
      var result = [];
      checkedCourse.forEach( (index) => result.push(courses[index].id));
      api.post<CourseResult[]>("getReportFromCourse",{courses:result })
      .then((response) => {
        var tableC = [] as CourseList[];
        response.data.forEach((value) =>  newCourses({value}).forEach((o) => tableC.push(o)));
        setTableCourse(tableC);
        handleClose();
        setShowTable(true);
      });
  }

  return (
    <div className="App">
    <div className={styles.navbar}>
      <a href="/">Página inicial</a>
      <a onClick={handleCourse}>Curso</a>
    </div> 
      <div>
          
          <Table show = {showTable}/> 
      
      </div>
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


