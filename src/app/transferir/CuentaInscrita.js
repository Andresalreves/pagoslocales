import React,{useState,useEffect} from 'react';
import { NavLink, useParams } from "react-router-dom";
import Functions from "../../helpers/Functions";
import Config from "../../helpers/Config";
import Store from "../../helpers/Store";
import StateContext from '../../helpers/ContextState';


const App=()=>{
  const context           =   React.useContext(StateContext);
  const parametros=useParams()
  const [data, setData] = useState(false);

  useEffect(() => {
    context.socketIo.connect()
    context.socketIo.emit('CuentaInscrita');
    getInit()
  },[parametros.id])

  function getInit(){
      let data  = {id:parametros.id}
      Functions.PostAsync("Transferir","getCuenta",data,{},{name:"callbackGetInit",funct:callbackGetInit})
  }
  function callbackGetInit(data){
    setData(data)
  }



  return    <div className="Contenido-Home">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title-home mb-4">Crear cuenta destino</div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-12 col-sm-8 m-auto">
                        <div className="card border-card">
                            <div className="card-body">
                                <div className="col-md-10 ml-auto mr-auto mt-3">
                                    <div className="title-generico mt-5 mb-4">
                                    ¡Cuenta {data.data!==undefined && data.data.estatus==='1'?'pre':""}inscrita con éxito!
                                    </div>
                                    <hr/>
                                    <div className="col-md-12 mt-2 pl-0 d-flex">
                                        <div>
                                            <div className="label"><b>Titular</b></div>
                                            <div className="label text-gray"><b>{(data.data!==undefined)?data.data.titular:false}</b></div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-2 pl-0 d-flex">
                                        <div>
                                            <div className="label"><b>Tipo</b></div>
                                            <div className="label text-gray"><b>{(data.data!==undefined)?data.data.tipo_cuenta_string:false}</b></div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-2 pl-0 d-flex">
                                        <div>
                                            <div className="label"><b>Identificación</b></div>
                                            <div className="label text-gray">
                                              <b>{(data.data!==undefined)?data.data.tipo_identificacion_string:false} {(data.data!==undefined)?data.data.nro_identificacion:false}</b>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-2 pl-0 d-flex">
                                        <div>
                                            <div className="label"><b>Cuenta registrada</b></div>
                                            <div className="label text-gray"><b> Cuenta {(data.data!==undefined)?data.data.tipo_cuentas_bancarias_string:false} {(data.data!==undefined)?data.data.tipo_cuenta_bancaria_string:false} {(data.data!==undefined)?data.data.nro_cuenta:false}</b></div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-2 pl-0 d-flex">
                                        <div>
                                            <div className="label"><b>Entidad bancaria</b></div>
                                            <div className="label text-gray"><b>{(data.data!==undefined)?data.data.ma_banco_string:false}</b></div>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="Importante mt-4 text-gray">
                                         <b>CUENTA SUJETA A REVISIÓN</b> POR PARTE DEL PROCESO DE CUMPLIMIENTO DE <b>PAGOSLOCALES.COM</b>;
                                         ESTE PROCESO PODRÁ TOMAR HASTA VEINTICUATRO (24) HORAS HÁBILES ANTES
                                         QUE TÚ CUENTA ESTÉ HABILITADA PARA TRANSFERENCIAS,
                                         EN CUMPLIMIENTO A LA NORMATIVIDAD NACIONAL Y NUESTRA POLÍTICA DE PREVENCIÓN Y FACILITACIÓN AL LAVADO DE ACTIVOS Y FINANCIACIÓN DEL TERRORISMO,
                                         NO REALIZAREMOS OPERACIONES A TERCEROS CON HISTORIAL DELICTIVO,
                                         EN CASO DE PRESENTARSE ALGUNA SITUACIÓN DE MANEJO ESPECIAL TU OPERACIÓN
                                         SERÁ RECHAZADA Y LA CUENTA NO ESTARÁ HABILITADA PARA TRANSFERENCIAS FUTURAS.
                                    </div>
                                    <div className="text-center mt-4">
                                        <a target="_blank" href={Config.ConfigApirest+"PDF/Transferir/getCuenta?id="+parametros.id+"&token="+Store.get("user").token} className="btn btn-outline-primary2 mb-3 mr-1">Descargar</a>
                                        <NavLink to="/Transferir/createCuentaDestino" className="btn btn-primary text-white mb-3">Nueva cuenta destino</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
}
export default App
