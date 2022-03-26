import React,{useState,useEffect} from 'react';
import { NavLink } from "react-router-dom";
import Functions from "../../helpers/Functions";
import Selector from "../../components/selector_horizzontal";
import Table from "../../screens/tableDivisasOperaciones";
import Store from "../../helpers/Store";
import Config from "../../helpers/Config";

import  { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import  { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const test      = true
const opciones  = [ {label:"Listado de funcionarios activos",value:1},
                    {label:"Listado de funcionarios inactivos",value:0}]


const App=()=>{

  const [filter, setFilter] = useState({estatus:1});
  const CallExcel = () =>{
    /*console.log(graficos);
    var image = graficos.ctx.toDataURL();
    document.getElementById('base64').value = image;*/
    window.open(Config.ConfigApirest+'Excel/Divisas/Operaciones/token:'+Store.get("user").token);
  }
  let tds       =   [
    {
      label:"Estado",
      value:"estatus_cop_string",
      className:"text-center estatus",
    },
    {
      label:"Fecha",
      value:"fecha_solicitud_string",
      className:"text-center ",
    },
    {
      label:"Moneda",
      value:"tipo_moneda",
      className:"text-center ",
    },
    {
      label:"Total",
      value:"valor_usd_string",
      className:"text-right ",
    },
    {
      label:"Tasa",
      value:"tasa_string",
      className:"text-right ",
    },
    {
      label:"COP Total",
      value:"total_abona_string",
      className:"text-right ",
    },{
        label:"Acciones",
        value:"events",
        icons:[
            {
              label:"Resumen",
              //icon:"icon-legal"
              NavLink:NavLink,
              icon: <i className="icon-ver-normal mr-1"/>,
              url:"/Divisas/VerDetalleOperacion/"
            }]
    }
  ]

  return  <div className="Contenido-Home">
            <div className="row">
              <div className="col-12 col-md-12">
                <div className="title-home mb-4">Operaciones</div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 listados">
                <div className="card">
                  <div className="card-header pb-0">
                    <div  className="col text-title text-rosa cursor-pointer border-bottom-rosa-x3 pb-2 pl-5">
                      <div className="row">
                        <div className="col">
                          <i className="icon-lista-divisas ml-4"></i> Listado de operaciones.
                        </div>
                        <div className="col-1 text-right">
                          <FontAwesomeIcon  icon={faFileExcel}
                                            className=" icon-comentarios cursor-pointer text-white"
                                            onClick={()=>CallExcel()}/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <Table
                      td={tds}
                      modelo="Divisas"
                      metodo="Operaciones"
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
