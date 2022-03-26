import React,{useState,useEffect} from 'react';
import { NavLink } from "react-router-dom";
import Functions from "../../helpers/Functions";
import Selector from "../../components/selector_horizzontal";
import Table from "../../screens/tableReportarPago";
import Store from "../../helpers/Store";
import Config from "../../helpers/Config";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const test      = true
const opciones  = [ {label:"Listado de funcionarios activos",value:1},
                    {label:"Listado de funcionarios inactivos",value:0}]


const App=()=>{

  const [filter, setFilter] = useState({estatus:9001});
  const CallExcel = () =>{
    /*console.log(filter); return;
    var image = graficos.ctx.toDataURL();
    document.getElementById('base64').value = image;*/
    let send = {};
    send.token  = Store.get("user").token
    window.open(Config.ConfigApirest+'Excel/Resumen/Resumen_Reporte_Pagos/token:'+send.token);
  }

  let tds       =   [
    {
      label:"Estado",
      value:"estatus_string",
      extra:true,
      className:"text-center estatus"
    },
    {
      label:"Fecha",
      value:"fecha_string",
      className:"text-center"
    },
    {
      label:"Moneda",
      value:"moneda_pago_string",
      className:"text-center"
    },
    {
      label:"Valor reportado",
      value:"valor_string",
    },
    {
      label:"Valor recibido",
      value:"total_recibido_string",
      className:"text-right"
    },
    {
      label:"Comisión",
      value:"total_comision_string",
      className:"text-right"
    },
    {
      label:"Valor Abonado",
      value:"valor_abonado_string",
    },
    {
        label:"Acciones",
        value:"events",
        icons:[
            {
              label:"Resumen",
              //icon:"icon-legal"
              NavLink:NavLink,
              icon: <i className="icon-ver-normal mr-1"/>,
              url:"/Divisas/VerDetalleReportePago/"
            }]
    }
  ]

  return  <div className="Contenido-Home">
            <div className="d-none d-lg-block d-sm-none">
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="title-home mb-4">Reportar pago</div>
                </div>
                <div className="col-12 col-md-6 text-center text-md-right">
                  <NavLink className="btn btn-primary" to="/Divisas/CrearReportePago">
                    <i className="icon-agregar mr-1"/>Crear reporte de pago
                  </NavLink>
                </div>
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
                      modelo="Divisas"
                      metodo="getReportesPago"
                      limit="50"
                      filter={filter}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="d-block d-sm-none">
              <div className="row">
                <div className="col-12 col-md-6 text-center text-md-right mb-2">
                  <NavLink className="btn btn-primary" to="/Divisas/CrearReportePago">
                    Crear reporte de pago
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
}
export default App
