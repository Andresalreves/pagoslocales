import React,{useState,useEffect} from 'react';
import { NavLink, useHistory, useParams } from "react-router-dom";
import Functions from "../../helpers/Functions";
import StateContext from '../../helpers/ContextState'


const App=()=>{
  const context             = React.useContext(StateContext);
  let history               = useHistory();
  const parametros=useParams()
  const [data, setData] = useState(false);

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
                                      <div className="labels text-gray text-uppercase"><b> {(data.razon_social_origen!==undefined)?data.razon_social_origen:false} {(data.nombres_origen!==undefined)?data.nombres_origen:false} {(data.apellidos_origen!==undefined)?data.apellidos_origen:false}</b></div>
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
                                      <div className="label"><b>Valor a transferir</b></div>
                                      <div className="labels text-gray"><b>{(data.saldo_string!==undefined)?data.saldo_string:false}</b></div>
                                    </div>
                                    <div className="col-12 col-md-4 mt-2 pl-0">
                                      <div className="label"><b>Usuarios verificador</b></div>
                                      <div className="labels text-gray"><b>{(data.funcionarios!==undefined && data.funcionarios.nombres!==undefined)?data.funcionarios.nombres+' '+data.funcionarios.apellidos:""}</b></div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-12 col-md-4 mt-2 pl-0">
                                      <div className="label"><b>Entidad bancaria</b></div>
                                      <div className="labels text-gray">{(data.cuenta_destino.entidad_bancaria_string!==undefined)?data.cuenta_destino.entidad_bancaria_string:false} <b>{(data.nro_identificacion_ordenante!==undefined)?data.nro_identificacion_ordenante:false}</b></div>
                                    </div>
                                    <div className="col-12 col-md-4 mt-2 pl-0">
                                      <div className="label"><b>Costo de la transferencia</b></div>
                                      <div className="labels text-gray"><b>{(data.comision!==undefined)?data.comision:false}</b></div>
                                    </div>
                                    <div className="col-12 col-md-4 mt-2 pl-0">
                                      <div className="label"><b>Cargo</b></div>
                                      <div className="labels text-gray"><b>{(data.funcionarios!==undefined && data.funcionarios.nombres!==undefined)?'Funcionario':""}</b></div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-12 col-md-4 mt-2 pl-0">
                                      <div className="label"><b>Tipo de cuenta</b></div>
                                      <div className="labels text-gray"><b>{(data.cuenta_destino.tipo_cuentas_bancarias_string!==undefined)?data.cuenta_destino.tipo_cuentas_bancarias_string:false}</b></div>
                                    </div>
                                    <div className="col-12 col-md-4 mt-2 pl-0">
                                      <div className="label"><b>IVA</b></div>
                                      <div className="labels text-gray"><b>{(data.iva!==undefined)?data.iva:false}</b></div>
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
                                      <div className="label"><b>Concepto</b></div>
                                      <div className="labels text-gray"><b>{(data.observacion!==undefined)?data.observacion:false}</b></div>
                                    </div>
                                    <div className="col-12 col-md-4 mt-2 pl-0">
                                      <div className="label"><b>Hora solicitud</b></div>
                                      <div className="labels text-gray"><b>{(data.hora_solicitud!==undefined)?data.hora_solicitud:false}</b></div>
                                    </div>
                                  </div>
                                  <div className="text-right mt-4">
                                      <NavLink to="/Movimientos" className="btn btn-gray text-white pl-5 pr-5">Volver</NavLink>
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
