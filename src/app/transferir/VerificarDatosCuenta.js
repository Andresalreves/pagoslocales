import React,{useState,useEffect} from 'react';
import { NavLink, useParams,useHistory } from "react-router-dom";
import Functions from "../../helpers/Functions";
import StateContext from '../../helpers/ContextState';

const App=()=>{
  const context             =   React.useContext(StateContext);
  let history = useHistory();
  const parametros=useParams()
  const [data, setData] = useState(false);

  useEffect(() => {
    getInit()
  },[])

  function getInit(){
      let data  = {id:parametros.id}
      Functions.PostAsync("Transferir","getCuenta",data,context,{name:"callbackGetInit",funct:callbackGetInit})
  }
  function callbackGetInit(data){
      setData(data)

  }

  function onSubmit( e ){
      e.preventDefault()
      let data  = {id:parametros.id,estatus:1}
      Functions.PostAsync("Transferir","setStatusCuenta",data,context,{name:"callbackSubmit",funct:callbackSubmit})
  }

  function callbackSubmit(response){
    //if (response.message!==undefined && response.message.label!==undefined) {
      history.push("/Transferir/CuentaInscrita/"+parametros.id);
    //}
  }

  return    <form onSubmit={onSubmit}><div className="Contenido-Home">
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
                                        Verifica datos de cuenta
                                    </div>
                                    <hr/>
                                    <div className="col-md-12 mt-2 pl-0 d-flex">
                                        <div>
                                            <div className="label"><b>Titular</b></div>
                                            <div className="label text-gray"><b>{(data.data!==undefined)?data.data.titular:false}</b></div>
                                        </div>
                                        <NavLink to={"/Transferir/createCuentaDestino/"+parametros.id} className="cambiar">Cambiar <i className="icon-cambiar ml-2"></i></NavLink>
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
                                    <div className="text-center mt-4">
                                        <button type="submit" className="btn btn-primary mb-3 mr-3">Crear</button>
                                        <NavLink to="/Transferir/createCuentaDestino" className="btn btn-gray text-white mb-3">Cancelar</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </form>
}
export default App
