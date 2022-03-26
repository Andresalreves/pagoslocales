import React,{useState,useEffect} from 'react';
//import Selector from "../../components/selector_horizzontal";
import { NavLink } from "react-router-dom";
import Table from "../../screens/tableReportePagoAll";
import parse from 'html-react-parser';

const test        = true

const App=(props)=>{
  const [filter, setFilter] = useState({estatus:(props.any===undefined)?1:"any"});

  let tds       =   [
    {
      label:"Usuario",
      value:"usuario",
      className:"text-center"
    },
    {
      label:"Billetera EUR",
      value:"saldo_eur_string",
      className:"text-right ",
      NavLink:NavLink,
      to:'/Administracion/Movimientos/USDDetalleBilletera/',
      current:"EUR"
    },
    {
      label:"Billetera USD",
      value:"saldo_usd_string",
      className:"text-right ",
      NavLink:NavLink,
      to:'/Administracion/Movimientos/USDDetalleBilletera/',
      current:"USD"
    },
    {
      label:"Billetera COP",
      value:"saldo_cop_string",
      className:"text-right ",
      NavLink:NavLink,
      to:'/Administracion/Movimientos/DetalleBilletera/',
      current:"COP"
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
                    <div className="row">
                      <div  className="col text-title text-rosa cursor-pointer border-bottom-rosa-x3 pb-2 pl-5">
                        <i className="icon-lista-divisas ml-4"></i> Reportes de pagos.
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <Table
                      td={tds}
                      modelo="Administracion"
                      metodo="getEstadosCuenta"
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
