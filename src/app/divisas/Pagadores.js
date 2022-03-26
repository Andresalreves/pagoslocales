import React,{useState,useEffect} from 'react';
import { NavLink } from "react-router-dom";
import Functions from "../../helpers/Functions";
import Selector from "../../components/selector_horizzontal";
import Table from "../../screens/table_pagadores";


const App=()=>{

  const [filter, setFilter] = useState({estatus:2});

  let tds       =   [
    {
      label:"Tercero",
      value:"pagador",
      className:"text-center col-cropper_noooo"
    },
    {
      label:"Tipo",
      value:"tipo_pagador_string",
      className:"text-center col-cropper_noooo"
    },
    {
      label:"Moneda",
      value:"moneda_pago_string",
      className:"text-center"
    },
    {
      label:"Nombre de cuenta",
      value:"nombre_cuenta",
      className:"text-center"
    },{
        label:"Acciones",
        value:"events",
        icons:[
            {
              label:"Resumen",
              //icon:"icon-legal"
              NavLink:NavLink,
              icon: <i className="icon-ver-normal mr-1"/>,
              url:"/Divisas/PagadorInscrito/"
            }]
    }
  ]

  return  <div className="Contenido-Home">
            <div className="d-none d-lg-block d-sm-none">
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="title-home mb-4">Pagadores</div>
                </div>
                <div className="col-12 col-md-6 text-center text-md-right mb-2">
                  <NavLink className="btn btn-primary" to="/Divisas/InscribirPagadores">
                    <i className="icon-agregar mr-1"/>Inscribir Pagadores
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 listados">
                <div className="card">
                  <div className="card-header pb-0">
                    <div  className="col text-title text-rosa cursor-pointer pb-2 pl-5">
                      <i className="icon-lista-divisas ml-4"></i> Lista de Pagadores.
                    </div>
                  </div>
                  <div className="card-body">
                    <Table
                      td={tds}
                      modelo="Divisas"
                      metodo="getPagadores"
                      limit="50"
                      estatus={filter}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="d-block d-sm-none">
              <div className="row">
                <div className="col-12 col-md-6 text-center text-md-right mb-2">
                  <NavLink className="btn btn-primary" to="/Divisas/InscribirPagadores">
                    Inscribir Pagadores
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
}
export default App
