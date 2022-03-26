import React from 'react';
import { NavLink } from "react-router-dom";
import Table from "../../screens/table_verificar_cuentas_bancarias_reporte";
//import parse from 'html-react-parser';

const App=()=>{

  //const [filter, setFilter] = useState({estatus:1});

  let tds       =   [
    {
      label:"Estado",
      value:"estatus_string",
      className:"text-center estatus",
    },
    {
      label:"Titular",
      value:"titular",
      className:"text-justify",
    },
    {
      label:"Tipo de identificación",
      value:"tipo_identificacion_string",
      className:"text-center",
    },
    {
      label:"Numero de identificación",
      value:"nro_identificacion",
      className:"text-center",
    },
    {
      label:"Soportes",
      value:"porcentaje",
      className:"text-center",
    },
    {
      label:"Acciones",
      value:"events",
      icons:[
              {
                label:"Detalle inscripción",
                icon: <i className = "icon-ver-normal text-primary mr-1"/>,
                NavLink:NavLink,
                url:'/Administracion/VerificarDatosCuentaAprobar/',
              },
            ]
    },
  ]

  // useEffect(() => {
  //
  // },[filter])

  return  <div className="Contenido-Home">
            <div className="row">
              <div className="col-12 col-md-12">
                <div className="title-home mb-4">Gestión Cuentas</div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 listados">
                <div className="card">
                  <div className="card-header pb-0">
                    <div className="row">
                      <div  className="col text-title text-rosa cursor-pointer border-bottom-rosa-x3 pb-2 pl-5">
                        <i className="icon-lista-divisas ml-4"></i> Cuentas Aprobadas / Rechazadas
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <Table
                      td={tds}
                      modelo="Reportes"
                      metodo="getCuentasBancariasTransferenciasUsuarios"
                      limit="8"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
}
export default App
