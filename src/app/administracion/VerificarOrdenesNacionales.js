import React,{useState,useEffect} from 'react';
import Header from '../../components/header_forms_andres';
import { NavLink, useHistory, useParams } from "react-router-dom";
import Functions from "../../helpers/Functions";
import Config from "../../helpers/Config";
import Store from "../../helpers/Store";
import DocumentosSoporte from "../../components/documentos_soporte";
import SubtituloSeparador from "../../components/subtitulos_separadores";
import Comentarios from "../comentarios/index";
import Select from '../../screens/select';
import StateContext from '../../helpers/ContextState'
// import queryString from 'query-string';
// const queryStringParams = queryString.parse(window.location.search);


const App=()=>{
  const context             = React.useContext(StateContext);
  let history               = useHistory();
  const parametros=useParams()
  const [inputs, setInputs] = useState({});
  const [data, setData] = useState(false);
  const [data2, setData2] = useState(false);


  useEffect(() => {
    getInit()
  },[])

  function getInit(){
      let data  = {id:parametros.id}
      Functions.PostAsync("Transferir","getTransferenciaConfirm",data,{},{name:"callbackGetInit",funct:callbackGetInit})
  }
  function callbackGetInit(response){
      setData(response.data)
  }

  function onSubmit( e ){
      e.preventDefault()
      let data  = {id:parametros.id,estatus:inputs.estatus}
      Functions.PostAsync("Transferir","setStatusCuenta",data,{},{name:"callbackSubmit",funct:callbackSubmit})
  }

  function callbackSubmit(response){
    if (response.message!==undefined && response.message.label!==undefined) {
      context.setModalShow({
        show:true,
        message:<div className="text-center h5">
                  {response.message.label}
                  <div className="row justify-content-center mt-2">
                    <div className="col-3" onClick={()=>{context.setModalShow({show:false}); history.push("/AprobacionCuentas")}}>
                      <div className="btn btn-primary btn-block mt-3">Continuar</div>
                    </div>
                  </div>
                </div>,
        size:""
      })
      //history.push("/AprobacionCuentas");
    }
  }


  return    <>
              {data?<div className="Contenido-Home">
                <div className="row">
                  <div className="col-md-12">
                    <div className="title-home mb-4">Verificar </div>
                  </div>
                </div>
                <div className="row mt-4">
                    <div className="col-12 m-auto">
                        <div className="card border-card">
                            <div className="card-body">
                                <div className="col-md-10 ml-auto mr-auto mt-3">
                                  <div className="row">
                                    <div className="col-12 col-md-4 mt-2 pl-0">
                                      <div className="label"><b>Titular</b></div>
                                      <div className="labels text-gray"><b>{(data.cuenta_destino.titular!==undefined)?data.cuenta_destino.titular:false}</b></div>
                                    </div>
                                    <div className="col-12 col-md-4 mt-2 pl-0">
                                      <div className="label"><b>Ordenante</b></div>
                                      <div className="labels text-gray text-uppercase"><b>{(data.ordenante!==undefined)?data.ordenante:false}</b></div>
                                    </div>
                                    <div className="col-12 col-md-4 mt-2 pl-0">
                                      <div className="text-danger"><b>Cumplimiento</b></div>
                                      <div className="label"><b>Fecha SARLAFT</b></div>
                                      <div className="labels text-gray"><b>{(data.fecha_solicitud!==undefined)?data.fecha_solicitud:false}</b></div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-12 col-md-4 mt-2 pl-0">
                                      <div className="label"><b>Identificación</b></div>
                                      <div className="labels text-gray">{(data.tipo_identificacion_string!==undefined)?data.tipo_identificacion_string:false} <b>{(data.cuenta_destino.nro_identificacion!==undefined)?data.cuenta_destino.nro_identificacion:false}</b></div>
                                    </div>
                                    <div className="col-12 col-md-4 mt-2 pl-0">
                                      <div className="label"><b>Valor transferencia</b></div>
                                      <div className="labels text-gray"><b>{(data.saldo_string!==undefined)?data.saldo_string:false}</b></div>
                                    </div>
                                    <div className="col-12 col-md-4 mt-2 pl-0">
                                      <div className="label"><b>Usuarios verificador</b></div>
                                      <div className="labels text-gray"><b>{(data.funcionario_verificador!==undefined)?data.funcionario_verificador:""}</b></div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-12 col-md-4 mt-2 pl-0">
                                      <div className="label"><b>Entidad bancaria</b></div>
                                      <div className="labels text-gray">{(data.cuenta_destino.entidad_bancaria_string!==undefined)?data.cuenta_destino.entidad_bancaria_string:false} <b>{(data.nro_identificacion_ordenante!==undefined)?data.nro_identificacion_ordenante:false}</b></div>
                                    </div>
                                    <div className="col-12 col-md-4 mt-2 pl-0">
                                      <div className="label"><b>Comisión</b></div>
                                      <div className="labels text-gray"><b>{(data.relacion!==undefined)?data.relacion.COMISION_TRANSACCIONAL.label:false}</b></div>
                                    </div>
                                    <div className="col-12 col-md-4 mt-2 pl-0">
                                      <div className="label"><b>Cargo</b></div>
                                      <div className="labels text-gray"><b>{(data.funcionario_verificador_cargo!==undefined)?data.funcionario_verificador_cargo:""}</b></div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-12 col-md-4 mt-2 pl-0">
                                      <div className="label"><b>Tipo de cuenta</b></div>
                                      <div className="labels text-gray"><b>{(data.cuenta_destino.tipo_cuentas_bancarias_string!==undefined)?data.cuenta_destino.tipo_cuentas_bancarias_string:false}</b></div>
                                    </div>
                                    <div className="col-12 col-md-4 mt-2 pl-0">
                                      <div className="label"><b>IVA sobre comisión</b></div>
                                      <div className="labels text-gray"><b>{(data.relacion!==undefined)?data.relacion.IVA_COMISION_TRANSACCIONAL.label:false}</b></div>
                                    </div>
                                    <div className="col-12 col-md-4 mt-2 pl-0">
                                      <div className="label"><b>Fecha solicitud</b></div>
                                      <div className="labels text-gray"><b>{(data.fecha_solicitud!==undefined)?data.fecha_solicitud:false}</b></div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-12 col-md-4 mt-2 pl-0">
                                      <div className="label"><b>Número de cuenta</b></div>
                                      <div className="labels text-gray"><b>{(data.cuenta_destino.nro_cuenta!==undefined)?data.cuenta_destino.nro_cuenta:false}</b></div>
                                    </div>
                                    <div className="col-12 col-md-4 mt-2 pl-0">
                                      <div className="label"><b>Valor Transferencia</b></div>
                                      <div className="labels text-gray"><b>{(data.relacion!==undefined)?data.relacion.GMF.label:false}</b></div>
                                    </div>
                                    <div className="col-12 col-md-4 mt-2 pl-0">
                                      <div className="label"><b>Hora solicitud</b></div>
                                      <div className="labels text-gray"><b>{(data.hora_solicitud!==undefined)?data.hora_solicitud:false}</b></div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-12 col-md-4 mt-2 pl-0">
                                      <div className="label"><b>Concepto</b></div>
                                      <div className="labels text-gray"><b>{(data.observacion!==undefined)?data.observacion:false}</b></div>
                                    </div>
                                    <div className="col-12 col-md-4 mt-2 pl-0">
                                      <div className="label"><b>Total operación</b></div>
                                      <div className="labels text-gray"><b>{(data.relacion!==undefined)?data.relacion.TOTAL_COSTO_TRANSACCION:false}</b></div>
                                    </div>
                                  </div>
                                  <div className="text-right mt-4">
                                      <a target="_blank" href={Config.ConfigApirest+"PDF/Movimientos/getMovimiento?skip=true&transferencias_id="+parametros.id+"&token="+Store.get("user").token} className="btn btn-outline-primary2 mb-3 mr-1">Descargar</a>
                                      <div onClick={()=>window.history.back()} className="btn btn-gray text-white mb-3 col-2">Volver</div>
                                  </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>:false}
          </>

}
export default App
