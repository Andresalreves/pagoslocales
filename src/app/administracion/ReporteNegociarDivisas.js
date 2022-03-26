import React,{useState,useEffect} from 'react';
import { NavLink } from "react-router-dom";
import Functions from "../../helpers/Functions";
import HeaderHorizontal from "../../components/header_horizzontal";
import Table from "../../screens/tableReporteNegociarDivisas";
import Store from "../../helpers/Store";
import Config from "../../helpers/Config";
import  { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import  { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const test      = true
const opciones  = [ {label:"Cuentas bancarias activas",value:1},
                    {label:"Cuentas bancarias inactivas",value:0}]


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
            </div>
            <div className="row">
              <div className="col-12 listados">
                <div className="card">
                  <div className="card-header pb-0">
                    <div className="row border-bottom-rosa-x3">
                      <div  className="col-12 col-md-6 text-title text-rosa cursor-pointer  pb-2 pl-5">
                        <i className="icon-listado-cuentas-internacionales text-rosa"/>
                        <span className="text-white ml-2">Divisas</span>
                      </div>
                      <div className="col-6 text-right text-white">
                        <div className="row text-bold">
                          <div className="col-12 text-right ">
                            <FontAwesomeIcon  icon={faFileExcel}
                                              className=" icon-comentarios cursor-pointer text-white"
                                              onClick={()=>CallExcel()}/>
                          </div>
                        </div>
                      </div>
                    </div>

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
