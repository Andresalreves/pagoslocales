import React,{useState,useEffect} from 'react';
import { NavLink , useParams } from "react-router-dom";
import Functions from "../../helpers/Functions";
import {CallPdf} from "../../helpers/NuevasFunciones";
import Store from "../../helpers/Store";
import Config from "../../helpers/Config";
import Selector from "../../components/selector_andres";
import Table from "../../screens/TableUsuariosAll";
import queryString from 'query-string';
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const queryStringParams = queryString.parse(window.location.search);


const test      = true
const opciones  = [ //{icon:<i className="icon-verificar"/>,label:"verificar",value:1},
                    {icon:<i className="icon-verificados-seleccionado"/>,label:"verificados",value:2},
                    {icon:<i className=" icon-inactivos"/>,label:"Inactivos",value:9}]


const App=()=>{
  const parametros          =   useParams();
  const [filter, setFilter] =   useState({estatus:(queryStringParams.select!==undefined)?parseInt(queryStringParams.select):2});
  let tds       =   [
    {
      label:"Titular",
      value:"nombre_completo",
      className:"text-justify"
    },
    {
      label:"Celular",
      value:"celular",
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
                url:"/Administracion/Reportes/VerUsuario/"
              },
              {
                label:"Comisiones",
                NavLink:NavLink,
                icon: <i className="icon-ahorro cursor-pointer text-warning"/>,
                url:"/Administracion/Comisiones/"
              },
              {
                label:"Activar cuenta",
                icon: <i className="icon-verificar-aprobar mr-1 cursor-pointer text-success"/>,
                event:"AprobarCuenta"
              },
              {
                label:"Inactivar cuenta",
                icon: <i className="icon-anular-rechazar mr-1 cursor-pointer text-danger"/>,
                event:"DenegarCuenta"
              },
            ]
    },
  ]

  const CallPdf = () =>{
    window.open(Config.ConfigApirest+'Excel/Resumen/Reporte_Usuarios/token:'+Store.get("user").token);
  }

  useEffect(() => {
    setFilter({estatus:(parametros.id!==undefined)?parseInt(parametros.id):2})
  },[parametros.id])


  return  <div className="Contenido-Home">
            <div className="row">
              <div className="col-md-12">
                <div className="title-home mb-4">Usuarios</div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 listados">
                <div className="card">
                  <div className="card-header pb-0 position-relative">
                    <Selector opciones={opciones} setFilter={setFilter} filter={filter}/>
                    <FontAwesomeIcon  icon={faFileExcel}
                                      className="descargar-usuarios-excel-solo"
                                      onClick={()=>CallPdf('PDF/Resumen/Reporte_Usuarios/token:')}/>
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
