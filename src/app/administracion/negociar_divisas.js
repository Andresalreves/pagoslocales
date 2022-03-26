import React,{useState,useEffect} from 'react';
import { NavLink } from "react-router-dom";
import Functions from "../../helpers/Functions";
import Selector from "../../components/selector_horizzontal";
import Table from "../../screens/tableCuentasBancarias";

const test      = true
const opciones  = [ {label:"Cuentas bancarias activas",value:1},
                    {label:"Cuentas bancarias inactivas",value:0}]


const App=()=>{

  const [filter, setFilter] = useState({estatus:1});

  let tds       =   [
    {
      label:"Titular",
      value:"titular",
    },
    {
      label:"moneda",
      value:"moneda",
    },
    {
      label:"Tipo de cuenta",
      value:"tipo_de_cuenta_string",
    },
    {
      label:"Número de cuenta",
      value:"numero_cuenta",
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
                url:"CuentaBancaria?id="
              },
              {
                label:"Eliminar",
                NavLink:NavLink,
                estatus:9,
                icon: filter.estatus===1?<i className=" icon-eliminar text-primary mr-1"/>:false,
                event:"changeEstatus",
              },
              {
                label:filter.estatus===1?"Inactivar":"Activar",
                //icon:filter.estatus===1?"icon-legal text-green":"icon-legal text-red"
                NavLink:NavLink,
                icon: filter.estatus===0?<i className="icon-inactivo-off text-red"/>:<i className="icon-inactivo-off text-green"/>,
                event:"changeEstatus",
              },
            ]
    },
  ]

  return  <div className="Contenido-Home">
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="title-home mb-4">Cuentas bancarias</div>
              </div>
              <div className="col-12 col-md-6 text-right">
                <NavLink className="btn btn-primary" to="/createCuentasBancarias">
                  <i className="icon-agregar mr-1"/>Agregar cuenta bancaria
                </NavLink>
              </div>
            </div>
            <div className="row">
              <div className="col-12 listados">
                <div className="card">
                  <div className="card-header pb-0">
                    <Selector opciones={opciones} setFilter={setFilter}/>
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
