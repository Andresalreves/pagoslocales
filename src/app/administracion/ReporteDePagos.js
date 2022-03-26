import React,{useState,useEffect} from 'react';
//import Selector from "../../components/selector_horizzontal";
import { NavLink, useParams } from "react-router-dom";
import Table from "../../screens/tableReportePago";
import parse from 'html-react-parser';
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Store from "../../helpers/Store";
import Config from "../../helpers/Config";

const test        = true

const App=(props)=>{
  const params            =   useParams();
  const [filter, setFilter] = useState({estatus:1});
  const CallExcel = () =>{
    let send = {};
    send.token  = Store.get("user").token
    window.open(Config.ConfigApirest+'Excel/Resumen/getReportesPago/filter:'+filter.filter+'/token:'+send.token);
  }

  const icons       = [
                        {
                          label:"Verificar",
                          NavLink:NavLink,
                          icon: <i className="icon-ver-normal text-primary mr-1 cursor-pointer"/>,
                          url:"/Administracion/VerDetalleReportePago/"
                        },
                        {
                          label:"Recibir divisas",
                          NavLink:NavLink,
                          icon: <i className="icon-check text-success mr-1 cursor-pointer"/>,
                          url:"/Administracion/AprobarReportePago/"
                        },

                        {
                          label:"Denegar Reporte",
                          icon: <i className=" icon-anular-rechazar text-danger mr-1 cursor-pointer"/>,
                          event:"DenegarCuenta"
                        },
                      ]




  let tds       =   [
    {
      label:"Estado",
      value:"estatus_string",
      className:"text-center estatus"
    },
    {
      label:"Fecha",
      value:"fecha_string",
      className:"text-center "
    },
    {
      label:"Cuenta",
      value:"usuario",
      className:"text-center "
    },
    {
      label:"Pagador",
      value:"pagador",
      className:"text-center "
    },
    {
      label:"Moneda",
      value:"moneda_pago_string",
      className:"text-center "
    },
    {
      label:"Valor",
      value:"valor_string",
      className:"text-right "
    },
    {
      label:"Acciones",
      value:"events",
      icons:icons
    },
  ]

  // useEffect(() => {
  //
  // },[filter])

  return  <div className="Contenido-Home">
            <div className="row">
              <div className="col-12 col-md-12">
                <div className="title-home mb-4">Reportes de pagos</div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 listados">
                <div className="card">
                  <div className="card-header pb-0">

                    <div className="row border-bottom-rosa-x3">
                      <div  className="col-12 col-md text-title text-rosa cursor-pointer  pb-2 pl-sm-5">
                        <i className="icon-billetera-movil ml-sm-4 "></i>
                        Reportes de pago.
                      </div>
                      <div className="col-12 col-sm-2 text-right text-white">
                        <FontAwesomeIcon  icon={faFileExcel}
                                          className="descargar-usuarios-excel icon-comentarios"
                                          onClick={()=>CallExcel()}/>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <Table
                      td={tds}
                      modelo="Administracion"
                      metodo="getReportesPago"
                      limit="10"
                      filter={filter}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
}
export default App
