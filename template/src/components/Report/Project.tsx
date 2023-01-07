import React, { useState,useRef, useEffect } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { ProjectTable, SessionsModules } from ".";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { api } from "../../services/api";
import { Toast } from 'primereact/toast';
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
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
type StudentTable = {
  id: String;
  name: String;
  class: String;
  email: String;
  course: String;
  time: String;
}

export const ProjectTemplate = (props: { show: boolean, project:ProjectTable ,onHide: () => void}): (JSX.Element) => {
  const { show, project,onHide } = props;
  const navigate = useNavigate();
  const toast = useRef(null);
  const [consumables, setConsumables] = useState("");
  const close = <div></div>;
  var ProjectForm = ( 
    <div>
      <h1>Formulário de projeto</h1>
    </div>
  );
  if(project != undefined && project != null){
    let map = new Map<string, number>();
    let modules = project.SessionsModules;
    if(modules != undefined){
      const showSuccess = () => {
        toast.current.show({severity:'success', summary: 'Success Message', detail:'Message Content', life: 3000});
      }
      const handleUpdateProject = async () => {
        await api.post("updateProject", {id: project.id, consumables: consumables});
        showSuccess();
        onHide();
      };

      const footerProject =(<div>
        <Button label="Confirmar" icon="pi pi-check" onClick={ handleUpdateProject } />
        <Button label="Cancelar" icon="pi pi-times" onClick={onHide} />
      </div>) ;
      modules.forEach((element: SessionsModules) => {
        if (map.has(element.module.id)) {
          map.set(element.module.id, map.get(element.module.id) + 1);
        } else {
          map.set(element.module.id, 1);
        }
      });
      var display = [];
      map.forEach((value, key) => {
        display.push({id: key, hours: value});
      });
      ProjectForm = (
        <>
        <Dialog header="Formulário" visible={show} onHide = {onHide} footer= {footerProject}>
        <Toast ref={toast} />
        
        <div  className="body">
          <h2>Título : {project.name}</h2>
          <h4>Conteúdo: {project.content}</h4>
          <DataTable value={display} responsiveLayout="scroll">
            <Column field="id" header="Modulo"></Column>
            <Column field="hours" header="horas"></Column>
          </DataTable>
        </div>
        <br></br>
        <div className="card">
          <h5>Consumíveis</h5>
           <InputTextarea id="textarea" value={consumables} onChange={(e) => setConsumables(e.target.value)} rows={5} cols={30} autoResize />
        </div>
        </Dialog>
        </>
        
      );
    }
    return show ? ProjectForm  : close;
  }else{
    return close;
  }
  

}
const NumberFilterTemplate = (options: any) => {
  return (
    <InputText
      value={options.value}
      onChange={(e: any) => {
        options.filterCallback(e.target.value, options.index);
        options.filterApplyCallback(e.target.value, options.index);
      }}
      type="number"
    />
  );
};
const StringFilterTemplate = (options: any) => {
  return (
    <InputText
      value={options.value}
      onChange={(e: any) => {
        options.filterCallback(e.target.value, options.index);
        options.filterApplyCallback(e.target.value, options.index);
      }}
      type="string"
    />
  );
};

export const Table = (props: { show: boolean, course: CourseList[] }) => {
  

  const dateFilterTemplate = (options: any) => {
    return (
      <Calendar
        value={options.value}
        onChange={(e: any) => {
          if (e.value) {
            options.filterCallback(new Date(e.value), options.index);
            options.filterApplyCallback(new Date(e.value), options.index);
          }
        }}
        dateFormat="dd/mm/yyThh:mm:ss.pppZ"
        placeholder="dd/mm/yyyyThh:mm:ss.pppZ"
        mask="99/99/9999T99:99:99.999Z"
      />
    );
  };
  const dateTemplate = (rowData: any, column: any) => {
    return rowData[column.field].toISOString();
  };
  const { show, course } = props;
  const v = <div></div>;
  const table =
    <div className="card">
      <h5>Cursos</h5>
      <DataTable value={course} paginator  showGridlines rows={10}
        dataKey="id" filterDisplay="menu" responsiveLayout="scroll">
        <Column field="id" header="Id" filter filterPlaceholder="Search by Id" filterElement={NumberFilterTemplate} style={{ minWidth: '12rem' }} />
        <Column header="Nome" field="name" style={{ minWidth: '12rem' }} filter filterElement={StringFilterTemplate} filterPlaceholder="Search by Name" />
        <Column header="Tema" field="subject" filter />
        <Column header="Modulo" field="moduleContent" style={{ minWidth: '10rem' }} filter filterElement={StringFilterTemplate} />
        <Column header="Aluno" field="studentName" filter filterElement={StringFilterTemplate} />
        <Column field="emailStudent" header="Email do Aluno" filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} filter filterElement={StringFilterTemplate} />
        <Column field="created_at" header="Criado" dataType="date" filter filterElement={dateFilterTemplate} body={dateTemplate} />
        <Column field="ended_at" header="Finalizado" dataType="date" filter filterElement={dateFilterTemplate} body={dateTemplate} />
      </DataTable>
    </div>;
  return show ? table : v;

}

export const TableStudents = (props: { show: boolean, students: StudentTable[] }) => {
  const { show, students } = props;
  const v = <div></div>;
  const table =
    <div className="card">
      <h5>Alunos</h5>
      <DataTable value={students} paginator  showGridlines rows={10}
        dataKey="id" filterDisplay="menu" responsiveLayout="scroll">
        <Column field="id" header="Id" filter filterPlaceholder="Search by Id" style={{ minWidth: '12rem' }} filterElement={NumberFilterTemplate} />
        <Column header="Nome" field="name" style={{ minWidth: '12rem' }} filter filterPlaceholder="Search by Name" filterElement={StringFilterTemplate}/>
        <Column header="Turma" field="class" filter />
        <Column header="Email" field="email" style={{ minWidth: '10rem' }} filter />
        <Column header="Curso" field="course" filter filterElement={StringFilterTemplate}/>
        <Column field="time" header="Tempo" filter />
      </DataTable>
    </div>;
  return show ? table : v;
}
