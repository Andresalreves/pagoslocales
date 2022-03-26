import React,{useState,useEffect} from 'react';
import { NavLink } from "react-router-dom";
import Functions from "../../helpers/Functions";
import Selector from "../../components/selector_horizzontal";
import Table from "../../screens/tableFuncionarios";

const test      = true
const opciones  = [ {label:"Listado de funcionarios activos",value:2},
                    {label:"Listado de funcionarios inactivos",value:1}]


const App=()=>{

  const [filter, setFilter] = useState({estatus:1});

  let tds       =   [
    {
      label:"Nombre de tercero",
      value:"nombre_completo",
    },
    {
      label:"Usuario",
      value:"nombre_usuario",
    },
    {
      label:"Datos de contacto",
      value:"celular",
    },
    {
      label:"Cargo",
      value:"cargo",
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
                url:"/Administracion/funcionario/"
              },
              {
                label:"Editar",
                NavLink:NavLink,
                icon: filter.estatus===1?<i className="icon-editar mr-1"/>:false,
                url:"/Administracion/createFuncionarios/"
              },
              {
                label:"Roles",
                //icon:"icon-solicitudes"
                NavLink:NavLink,
                icon: filter.estatus===1?<i className="icon-asignar-rol mr-1"/>:false,
                url:"/Administracion/Roles?id="
              },
              {
                label:filter.estatus===1?"Inactivar":"Activar",
                //icon:filter.estatus===1?"icon-legal text-green":"icon-legal text-red"
                NavLink:NavLink,
                icon: filter.estatus===1?<i className="icon-inactivo-off text-red"/>:<i className="icon-inactivo-off text-green"/>,
                event:"changeEstatus",
              },
            ]
    },
  ]

  return  <div className="Contenido-Home">
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="title-home mb-4">Funcionarios</div>
              </div>
              <div className="col-12 col-md-6 text-right">
                <NavLink className="btn btn-primary" to="/Administracion/createFuncionarios">
                  <i className="icon-agregar mr-1"/>Crear funcionario
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
                      metodo="getFuncionarios"
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
