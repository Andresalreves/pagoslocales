import React,{useState,useEffect} from 'react';
import { NavLink } from "react-router-dom";
import Functions from "../../helpers/Functions";
import Selector from "../../components/selector_horizzontal";
import Table from "../../screens/TableUsuarios";


const App=()=>{
  const [filter, setFilter] =   useState({estatus:1});
  let tds       =   [
    {
      label:"Titular",
      value:"nombre_completo",
      className:"text-justify"
    },
    {
      label:"Tipo de identificación",
      value:"tipo_identificacion",
      className:"text-center"
    },
    {
      label:"Número de identificación",
      value:"nro_identificacion",
      className:"text-center"
    },
    {
      label:"Acciones",
      value:"events",
      icons:[
              {
                label:"Resumen",
                NavLink:NavLink,
                icon: <i className="icon-ver-normal mr-1"/>,
                url:"VerUsuario/"
              },
              {
                label:"Aprobar cuenta",
                icon: <i className="icon-verificar-aprobar mr-1 cursor-pointer text-success"/>,
                event:"AprobarCuenta"
              },
              {
                label:"Denegar cuenta",
                icon: <i className="icon-anular-rechazar mr-1 cursor-pointer text-danger"/>,
                event:"DenegarCuenta"
              },
            ]
    },
  ]

  return  <div className="Contenido-Home">
            <div className="row">
              <div className="col-md-12">
                <div className="title-home mb-4">Usuarios</div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 listados">
                <div className="card">
                  <div className="card-header pb-0">
                    <div className="row">
                      <div  className="col text-title text-rosa cursor-pointer border-bottom-rosa-x3 pb-2 pl-5">
                        <i className="icon-lista-divisas ml-4"></i> Usuarios Registrados
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
