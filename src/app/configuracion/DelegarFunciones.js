import React,{useState,useEffect} from 'react';
import { NavLink } from "react-router-dom";
import Functions from "../../helpers/Functions";
import Selector from "../../components/selector_horizzontal";
import Table from "../../screens/table_pagadores";

const App=()=>{

  const [filter, setFilter] = useState({estatus:2});

  let tds       =   [
    {
      label:"Nombre del funcionario",
      value:"nombres",
      className:"text-left"
    },
    {
      label:"Email",
      value:"email",
      className:"text-center col-cropper"
    },
    {
      label:"Número",
      value:"celular",
      className:"text-center"
    },
    {
      label:"Estado",
      value:"estatus_string",
      className:"text-center"
    },
    {
      label:"Acciones",
      value:"events",
      icons:[
              {
                label:"Detalle perfil",
                icon: <i className = "icon-ver-normal text-primary mr-1"/>,
                NavLink:NavLink,
                url:'/Configuracion/DelegarFuncionesEdit/',
              },
            ]
    },


  ]

  return  <div className="Contenido-Home">
            <div className="d-none d-lg-block d-sm-none">
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="title-home mb-4">Delegar funciones</div>
                </div>
                <div className="col-12 col-md-6 text-center text-md-right mb-2">
                  <NavLink className="btn btn-primary" to="/Configuracion/DelegarFuncionesEdit/0">
                    <i className="icon-agregar mr-1"/>Delegar
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 listados">
                <div className="card">
                  <div className="card-header pb-0">
                    <div  className="col text-title text-rosa cursor-pointer pb-2 pl-5">
                      <i className="icon-lista-divisas ml-4"></i> Lista de Delegados.
                    </div>
                  </div>
                  <div className="card-body">
                    <Table
                      td={tds}
                      modelo="Configuracion"
                      metodo="getDelegarFunciones"
                      limit="8"
                      estatus={filter}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="d-block d-sm-none">
              <div className="row">
                <div className="col-12 col-md-6 text-center text-md-right mb-2">
                  <NavLink className="btn btn-primary" to="/Configuracion/DelegarFuncionesEdit/0">
                    Inscribir Asistentes
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
}
export default App
