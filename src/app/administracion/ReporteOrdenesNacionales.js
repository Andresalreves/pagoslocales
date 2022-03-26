import React,{useState,useEffect} from 'react';
import { NavLink } from "react-router-dom";
//import Selector from "../../components/selector_horizzontal";
import Table from "../../screens/tableReporteVerificarOrdenesNacionales";
import parse from 'html-react-parser';

const test      = true

const App=()=>{

  const [filter, setFilter] = useState({estatus:1});

  let tds       =   [
    {
      label:"Consecutivo",
      value:"consecutivo",
    },
    {
      label:"Ordenante",
      value:"ordenante",
    },
    {
      label:"Entidad",
      value:"entidad_bancaria_string",
    },
    {
      label:"Valor",
      value:"saldo_string",
    },
    {
      label:"Acciones",
      value:"events",
      icons:[
              {
                label:"Verificar",
                icon: <i className = "icon-ver-tabla mr-1 text-primary"/>,
                NavLink:NavLink,
                url:'/Administracion/VerificarOrdenesNacionales/',
              },
            ]
    },
  ]


  return  <div className="Contenido-Home">
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="title-home mb-4">Órdenes nacionales</div>
              </div>
              <div className="col-12 col-md-6 text-right">
                <NavLink className="btn btn-primary" to={"/Administracion/CreateLote"}>
                  <i className="icon-agregar mr-1"/>Crear lote
                </NavLink>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-12 listados">
                <div className="card">
                  <div className="card-header pb-0">
                    <div className="row">
                      <div  className="col text-title text-rosa cursor-pointer border-bottom-rosa-x3 pb-2 pl-5">
                        <i className="icon-lista-divisas ml-4"></i> Órdenes nacionales.
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <Table
                      td={tds}
                      modelo="Administracion"
                      metodo="getSolicitudTransferenciasNacionales"
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
