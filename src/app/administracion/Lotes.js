import React,{useState,useEffect} from 'react';
import { NavLink } from "react-router-dom";
import Functions from "../../helpers/Functions";
import Selector from "../../components/selector_horizzontal";
import Table from "../../screens/tableLotes";

const test      = true
const opciones  = [ {label:"En proceso",value:1},
                    {label:"Procesado",value:2}]


const App=()=>{

  const [filter, setFilter] = useState({estatus:1});

  useEffect(() => {

  },[filter])

  let tds       =   [
    {
      label:"Fecha",
      value:"fecha_solicitud_string",
      className:"text-center "
    },
    {
      label:"Nombre lote",
      value:"nombre_lote",
    },
    {
      label:"Total registros",
      value:"total_registros",
      className:"text-center "
    },
    {
      label:"Monto",
      value:"valor_transferir_string",
      className:"text-right "
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
                url:"VerificarLote/"
              },
              {
                label:"Aprobar",
                event:"DenegarCuenta",
                icon: filter.estatus===1?<i className=" icon-verificar-aprobar mr-1 cursor-pointer text-success"/>:false,
              },
              {
                label:"PDF",
                NavLink:NavLink,
                icon: filter.estatus===1?<i className=" icon-listado-operaciones mr-1 cursor-pointer text-danger"/>:false,
                url:"/"
              },
              {
                label:"Excel",
                NavLink:NavLink,
                icon: filter.estatus===1?<i className=" icon-listado-operaciones cursor-pointer text-success"/>:false,
                url:"/"
              },
            ]
    },
  ]

  return  <div className="Contenido-Home">
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="title-home mb-4">Lote de pago</div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12 listados">
                <div className="card">
                  <div className="card-header pb-0">
                    <Selector opciones={opciones} setFilter={setFilter}/>
                  </div>
                  <div className="card-body">
                    <Table
                      td={tds}
                      modelo="Administracion"
                      metodo="getLotesPago"
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
