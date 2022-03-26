import React from 'react';
import HeaderHorizontal from "../../components/header_horizzontal";
import Table from "../../screens/tableBandeja";
import { NavLink } from "react-router-dom";
const App=()=>{
  let tds       =   [
    {
      label:"Cliente",
      value:"nombres",
    },
    {
      label:"Mensaje",
      value:"body",
      className:"text-center",
    },
    {
      label:"Fecha",
      value:"fecha",
      className:"text-center col-2",
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
                 url:true
               },
             ]
    },
  ]
  return  <div className="Contenido-Home">
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="title-home mb-4">Bandeja de mensajes</div>
              </div>
              <div className="col-12 col-md-6 text-center text-sm-right mb-3 mb-sm-0">

              </div>
            </div>
            <div className="row">
              <div className="col-12 listados">
                <div className="card">
                  <div className="card-header pb-0">
                    <HeaderHorizontal title="Bandeja"/>
                  </div>
                  <div className="card-body">
                    <Table
                      td={tds}
                      modelo="Comentarios"
                      metodo="Bandeja"
                      limit="8"
                      filter={{}}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
}
export default App
