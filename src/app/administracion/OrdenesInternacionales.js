import React,{useState,useEffect} from 'react';
import { NavLink } from "react-router-dom";
//import Selector from "../../components/selector_horizzontal";
import Table from "../../screens/table";
import parse from 'html-react-parser';

const test      = true

const App=()=>{

  const [filter, setFilter] = useState({estatus:1});

  let tds       =   [
    {
      label:"Consecutivo",
      value:"nombre_completo",
    },
    {
      label:"Ordenante",
      value:"nombre_completo",
    },
    {
      label:"Entidad",
      value:"nombre_completo",
    },
    {
      label:"Valor",
      value:"nombre_completo",
    },
    {
      label:"Acciones",
      value:"events",
      icons:[
              {
                label:"Aprobar",
                icon: <i className = "icon-verificar-aprobar mr-1"/>,
                NavLink:NavLink,
                url:'CuentaVerificada/',
              },
              {
                label:"Aprobar",
                icon: <i className = "icon-verificar-aprobar mr-1"/>,
                NavLink:NavLink,
                url:'CuentaVerificada/',
              },
              {
                label:"Aprobar",
                icon: <i className = "icon-verificar-aprobar mr-1"/>,
                NavLink:NavLink,
                url:'CuentaVerificada/',
              },
            ]
    },
  ]

  useEffect(() => {

  },[filter])

  return  <div className="Contenido-Home">
            <div className="row">
              <div className="col-12 col-md-12">
                <div className="title-home mb-4">Órdenes internacionales</div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 listados">
                <div className="card">
                  <div className="card-header pb-0">
                    <div className="row">
                      <div  className="col text-title text-rosa cursor-pointer border-bottom-rosa-x3 pb-2 pl-5">
                        <i className="icon-lista-divisas ml-4"></i> Órdenes internacionales.
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <Table
                      td={tds}
                      modelo="Administracion"
                      metodo="getCuentas"
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
