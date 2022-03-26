import React,{useState} from 'react';
import { NavLink } from "react-router-dom";
import Table from "../../screens/table_verificar_cuentas_bancarias";
//import parse from 'html-react-parser';
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Store from "../../helpers/Store";
import Config from "../../helpers/Config";

const App=()=>{
  const [filter,SetFilter] = useState('');
  const CallExcel = () =>{
    let send = {};
    send.token  = Store.get("user").token
    window.open(Config.ConfigApirest+'Excel/Resumen/getCuentasBancariasTransferencias/estatus:1/filter:'+filter+'/token:'+send.token);
  }

  //const [filter, setFilter] = useState({estatus:1});

  let tds       =   [
    {
      label:"Estado",
      value:"estatus_string",
      className:"text-center estatus",
    },
    {
      label:"Cuenta",
      value:"celular",
      className:"text-center",
      classNameTD:"100",
    },
    {
      label:"Titular",
      value:"titular",
      className:"text-center col-cropper",
    },
    {
      label:"Tipo de identificación",
      value:"tipo_identificacion_string",
      className:"text-center",
      classNameTD:"50%",
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
                label:"Aprobar",
                icon: <i className = "icon-verificar-aprobar mr-1"/>,
                NavLink:NavLink,
                url:'VerificarDatosCuentaAprobar/',
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
                <div className="title-home mb-4">Cuentas Nacionales</div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 listados">
                <div className="card">
                  <div className="card-header pb-0">
                    <div className="row border-bottom-rosa-x3">
                      <div  className="col-12 col-md-6 text-title text-rosa cursor-pointer  pb-2 pl-5">
                        <i className="icon-lista-divisas ml-4"></i> Cuentas Aprobadas / Rechazadas
                      </div>
                      <div className="col-6 text-right text-white">
                        <div className="row text-bold">
                          <div className="col-12 text-right ">
                            <FontAwesomeIcon  icon={faFileExcel}
                                              className=" icon-comentarios cursor-pointer text-white"
                                              onClick={()=>CallExcel()}/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <Table
                      td={tds}
                      modelo="Administracion"
                      metodo="getCuentasBancariasTransferencias"
                      limit="50"
                      setFilter={SetFilter}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
}
export default App
