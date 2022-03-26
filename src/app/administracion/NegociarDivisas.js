import React,{useState,useEffect} from 'react';
import { NavLink } from "react-router-dom";
import Functions from "../../helpers/Functions";
import HeaderHorizontal from "../../components/header_horizzontal";
import Table from "../../screens/tableNegociarDivisas";
import StateContext from '../../helpers/ContextState'

const test      = true
const opciones  = [ {label:"Cuentas bancarias activas",value:1},
                    {label:"Cuentas bancarias inactivas",value:0}]


const App=()=>{
  
  const [filter, setFilter] = useState({estatus:1});

  let tds       =   [
    {
      label:"Cliente",
      value:"cliente_string",
    },
    {
      label:"Consecutivo",
      value:"consecutivo",
      className:"text-center",
    },
    {
      label:"Moneda",
      value:"tipo_moneda",
      className:"text-center",
    },
    {
      label:"Valor",
      value:"valor_usd",
      className:"text-right",
    },
    {
      label:"Valor COP",
      value:"total_abona_string",
      className:"text-right",
    },
    {
      label:"Soportes",
      value:"porcentaje",
      className:"text-right",
    },
    {
      label:"Acciones",
      value:"events",
      icons:[
              {
                label:"Resumen",
                //icon:"icon-legal"
                NavLink:NavLink,
                icon: <i className="icon-ver-normal text-primary mr-1"/>,
                url:"NegociacionDivisas/"
              },
            ]
    },
  ]

  return  <div className="Contenido-Home">
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="title-home mb-4">Negociar divisas</div>
              </div>
              <div className="col-12 col-md-6 text-center text-sm-right mb-3 mb-sm-0">
                <NavLink className="btn btn-primary" to="/Administracion/createNegociacionDivisas">
                  <i className="icon-agregar mr-1"/>Crear negociación
                </NavLink>
              </div>
            </div>
            <div className="row">
              <div className="col-12 listados">
                <div className="card">
                  <div className="card-header pb-0">
                    <HeaderHorizontal title="Divisas"/>
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
