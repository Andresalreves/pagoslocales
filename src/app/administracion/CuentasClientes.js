import React,{useState,useEffect} from 'react';
import { NavLink } from "react-router-dom";
//import Selector from "../../components/selector_horizzontal";
import Table from "../../screens/tableCuentasClientes";
import parse from 'html-react-parser';

const test      = true

const App=()=>{

  const [filter, setFilter] = useState({estatus:1});

  let tds       =   [
    {
      label:"Razón social",
      value:"razon_social",
      className:"text-center"
    },
    {
      label:"Entidad bancaria",
      value:"entidad_bancaria",
      className:"text-center"
    },
    {
      label:"Tipo de cuenta",
      value:"tipo_de_cuenta_string",
      className:"text-center"
    },
    {
      label:"País",
      value:"pais",
      className:"text-center"
    },
    {
      label:"Acciones",
      value:"events",
      icons:[
              {
                label:"Aprobar",
                icon: <i className = "icon-verificar-aprobar mr-1"/>,
                NavLink:NavLink,
                url:'/Administracion/CreateCuentasClientes/',
              },
            ]
    },
  ]

  useEffect(() => {

  },[filter])

  return  <div className="Contenido-Home">
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="title-home mb-4">Cuentas Int. Clientes</div>
              </div>
              <div className="col-12 col-md-6 text-sm-right text-center mb-3">
                <NavLink className="btn btn-primary" to="/Administracion/CreateCuentasClientes">
                  <i className="icon-agregar mr-1"/>Crear
                </NavLink>
              </div>
            </div>
            <div className="row">
              <div className="col-12 listados">
                <div className="card">
                  <div className="card-header pb-0">
                    <div className="row">
                      <div  className="col text-title text-rosa cursor-pointer border-bottom-rosa-x3 pb-2 pl-5">
                        <i className="icon-lista-divisas ml-4"></i> Cuentas Internacionales Clientes
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <Table
                      td={tds}
                      estatus="1"
                      modelo="Administracion"
                      metodo="GetCuentasClientes"
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
