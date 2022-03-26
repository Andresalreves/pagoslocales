import React from 'react';
import { NavLink } from "react-router-dom";
//import Selector from "../../components/selector_horizzontal";
import Table from "../../screens/tableRelacionPagos";

const App=()=>{

  let tds       =   [
    // {
    //   label:"Fecha",
    //   value:"fecha_solicitud",
    // },
    {
      label:"Estado",
      value:"estatus_string",
      className:"estatus",
    },
    {
      label:"Receptor",
      value:"titular",
      className:"text-left"
    },
    {
      label:"Entidad Bancaria",
      value:"entidad_bancaria",
      className:"text-left"
    },
    {
      label:"Tipo de cuenta",
      value:"tipo_cuenta_string",
      className:"text-center"
    },
    {
      label:"Nro Cuenta",
      value:"nro_cuenta",
      className:"text-right"
    },

    {
      label:"Acciones",
      value:"events",
      icons:[
              {
                label:"Detalle movimiento",
                icon: <i className = "icon-ver-normal text-primary mr-1"/>,
                NavLink:NavLink,
                url:'/Transferir/VerTransferencia/1111/',
              },
            ]
    },
  ]


  return  <div className="Contenido-Home">
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="title-home mb-4">Relación pagos</div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 listados">
                <div className="card">
                  <div className="card-header pb-0">
                    <div className="row">
                      <div  className="col text-title text-rosa cursor-pointer border-bottom-rosa-x3 pb-2 pl-5">
                        <i className="icon-lista-divisas ml-4"></i> <span className="text-white">Relación pagos</span>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <Table
                      td={tds}
                      modelo="Reportes"
                      metodo="getRelacionPagos"
                      limit="8"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
}
export default App
