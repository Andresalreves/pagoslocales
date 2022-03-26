import React,{useState,useEffect} from 'react';
import { NavLink } from "react-router-dom";
import {CallPdf} from "../../helpers/NuevasFunciones";
import Functions from "../../helpers/Functions";
import Selector from "../../components/selector_horizzontal";
import Table from "../../screens/table_pagadores";

import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const App=()=>{

  const [filter, setFilter] = useState("");


  let tds       =   [
    {
      label:"Usuario",
      value:"usuario",
      className:"text-center"
    },
    {
      label:"Tercero",
      value:"pagador",
      className:"text-center"
    },
    {
      label:"Tipo",
      value:"tipo_pagador_string",
      className:"text-center"
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
    },
  ]

  return  <div className="Contenido-Home">
            <div className="d-none d-lg-block d-sm-none">
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="title-home mb-4">Pagadores</div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 listados">
                <div className="card">
                  <div className="card-header pb-0">
                    <div className="row">
                      <div  className="col text-title text-rosa cursor-pointer pb-2 pl-5">
                        <i className="icon-lista-divisas ml-4"></i> Lista de Pagadores.
                      </div>
                      <div  className="col-1 text-right text-white cursor-pointer ">
                        <FontAwesomeIcon  icon={faFileExcel}
                                          style={{width:"20px"}}
                                          className="cursor-pointer"
                                          onClick={()=>CallPdf('Excel/Resumen/Reporte_Pagadores/string:'+filter+'/token:')}/>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <Table
                      td={tds}
                      modelo="Divisas"
                      metodo="getPagadoresAll"
                      limit="50"
                      estatus={filter}
                      setFilter={setFilter}
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
