import React,{useState,useEffect} from 'react';
import { NavLink , useParams } from "react-router-dom";
import Selector from "../../components/selector_andres";
import Table from "../../screens/table_verificar_cuentas_bancarias_reporte";
import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);


const opciones  = [ {icon:<i className="icon-verificados-seleccionado"/>,label:"Activo",value:2},
                    {icon:<i className="icon-verificados-seleccionado"/>,label:"Verificados",value:4},
                    {icon:<i className="icon-verificar"/>,label:"Inactivos",value:9},
                    {icon:<i className=" icon-inactivos"/>,label:"Rechazados",value:9000}]

const App=()=>{
  const parametros          =   useParams();
  const [filter, setFilter] =   useState({estatus:(queryStringParams.select!==undefined)?parseInt(queryStringParams.select):2});

  let tds       =   [
    {
      label:"Estado",
      value:"estatus_string",
      className:"text-center estatus",
    },
    {
      label:"Titular",
      value:"titular",
      className:"col-cropper text-left",
    },
    {
      label:"Usuario",
      value:"celular",
      className:"col-cropper text-left",
    },
    // {
    //   label:"Tipo de identificación",
    //   value:"tipo_identificacion_string",
    //   className:"text-center",
    //   classNameTD:"50%",
    // },
    {
      label:"Numero de identificación",
      value:"nro_identificacion",
      className:"text-center",
    },
    {
      label:"Acciones",
      value:"events",
      icons:[
              {
                label:"Aprobar",
                icon: <i className = "icon-ver-normal mr-1"/>,
                NavLink:NavLink,
                url:'VerificarDatosCuentaAprobar/',
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

  useEffect(() => {
    setFilter({estatus:(parametros.id!==undefined)?parseInt(parametros.id):2})
  },[parametros.id])

  return  <div className="Contenido-Home">
            <div className="row">
              <div className="col-12 col-md-12">
                <div className="title-home mb-4">Cuentas Nacionales</div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 listados">
                <div className="card">
                  <div className="card-header pb-0">
                    <Selector opciones={opciones} setFilter={setFilter} filter={filter}/>
                  </div>
                  <div className="card-body">
                    <Table
                      td={tds}
                      modelo="Administracion"
                      metodo="getCuentasBancariasTransferencias"
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
