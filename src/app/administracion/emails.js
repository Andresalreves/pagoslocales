import React,{useState,useEffect} from 'react';
import { NavLink } from "react-router-dom";
import Functions from "../../helpers/Functions";
import Selector from "../../components/selector_horizzontal";
import Table from "../../screens/tableEmails";

const test      = true
const opciones  = [ {label:"Correos disponibles",value:2},]


const App=()=>{

  const [filter, setFilter] = useState({estatus:2});

  let tds       =   [
    {
      label:"Título",
      value:"label",
      className:"text-center"
    },
    {
      label:"Módulo",
      value:"modulo",
      className:"text-center"
    },
    {
      label:"Método",
      value:"metodo",
      className:"text-center"
    },
    {
      label:"Contador",
      value:"contador",
      className:"text-center"
    },
    {
      label:"Acciones",
      value:"events",
      icons:[
              {
                label:"Resumen",
                //icon:"icon-legal"
                NavLink:NavLink,
                icon: <i className="icon-ver-normal mr-1"/>,
                url:"/Administracion/Email/"
              },
            ]
    },
  ]

  return  <div className="Contenido-Home">
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="title-home mb-4">Emails</div>
              </div>
              <div className="col-12 col-md-6 text-sm-right text-center mb-3">
                <NavLink className="btn btn-primary" to="/Administracion/createEmail">
                  <i className="icon-agregar mr-1"/>Crear email
                </NavLink>
              </div>
            </div>
            <div className="row">
              <div className="col-12 listados">
                <div className="card">
                  <div className="card-header pb-0">
                    <Selector opciones={opciones} setFilter={setFilter}/>
                  </div>
                  <div className="card-body">
                    <Table
                      td={tds}
                      modelo="Administracion"
                      metodo="getEmails"
                      limit="8"
                      filter={filter}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
}
export default App
