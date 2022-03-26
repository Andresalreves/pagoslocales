import React from 'react';
import { NavLink } from "react-router-dom";
//import Selector from "../../components/selector_horizzontal";
import Table from "../../screens/table";

const App=()=>{


  let tds       =   [
    {
      label:"Titular",
      value:"nombre_completo",
    },
    {
      label:"Tipo de identificación",
      value:"tipo_identificacion",
    },
    {
      label:"Numero de identificación",
      value:"nro_identificacion",
    },
    {
      label:"Acciones",
      value:"events",
      icons:[
              {
                label:"Aprobar",
                icon: <i className = "icon-verificar-aprobar mr-1"/>,
                NavLink:NavLink,
                url:'CuentaVerificada/',
              },
            ]
    },
  ]

  return  <div className="Contenido-Home">
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="title-home mb-4">Movimientos</div>
              </div>
              <div className="col-12 col-md-6 text-right">
                <NavLink className="btn btn-primary" to="/Movimientos">
                  <i className="icon-agregar mr-1"/>Ver nuevo movimiento
                </NavLink>
              </div>
            </div>
            <div className="row">
              <div className="col-12 listados">
                <div className="card">
                  <div className="card-header pb-0">
                    <div className="row">
                      <div  className="col text-title text-rosa cursor-pointer border-bottom-rosa-x3 pb-2 pl-5">
                        <i className="icon-lista-divisas ml-4"></i> <span className="text-white">Billetera móvil 01-314-885-8994</span>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <Table
                      td={tds}
                      modelo="Administracion"
                      metodo="getCuentas"
                      limit="8"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
}
export default App
