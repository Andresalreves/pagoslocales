import React,{useState,useEffect} from 'react';
import { NavLink } from "react-router-dom";
import Store from "../../helpers/Store";
import Functions from "../../helpers/Functions";
import StateContext from '../../helpers/ContextState'
import NumberFormat from 'react-number-format';

const App=()=>{
  const context = React.useContext(StateContext);

  const [inputs, setInputs] = useState({});
  const [ver, setVer] = useState(false);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    if (reset) {
      setReset(false)
    }
  },[reset])

  useEffect(() => {
    getInit()
  },[])

  const getInit=()=>{
    let send    = {token:Store.get("user").token,uid:Store.get("user").token}
    Functions.PostAsync("Administracion","getSystem",send,{},{name:"callbackContinue",funct:callbackContinue})
  }

  const callbackContinue=(response)=>{
    response.data.comision_iva_giro_recibido  = parseFloat(response.data.comision_dd) * 19 /100
    response.data.comision_iva_administrativa  = parseFloat(response.data.comision_administrativa) * 19 /100
    setInputs(response.data)
    setVer(true)
  }

  const onChange=(e)=>{
    Functions.Inputs(e,inputs, setInputs)
  }

  const onSubmit=(e)=>{
    e.preventDefault()
    let send        = {...inputs}
        send.token  = Store.get("user").token
    Functions.PostAsync("Administracion","setSystem",send,{},{name:"callbackContinue3",funct:callbackContinue3})
  }

  const callbackContinue3=(response)=>{
    context.socket.actualizar_comision()
    if (response.error!==undefined) {
      context.setModalShow({
        show:true,
        message:<div className="text-center h5">{response.error.label}</div>,
        size:""
      })
    }else {
      context.setModalShow({
        show:true,
        message:<div className="text-center">
                  <div>{response.message.label}</div>
                  <div className="btn btn-gray text-white mb-3 mt-3" onClick={()=>context.setModalShow({show:false})}>Continuar</div>
                </div>,
        size:""
      })
    }
  }


  return  <>{ver?<div className="Contenido-Home">
                    <div className="title-home mb-4">Comisiones</div>
                    <div className="row justify-content-center">
                      <div className="col-12 col-md-8">
                        <div className="card">
                          <div className="card-content">
                            <div className="card-body">
                              <form onSubmit={onSubmit}>
                                <div className="p-5">
                                  <div className="row">
                                    <div className="col-2 text-right">
                                      <i className="icon-crear-cuenta-bancaria ico-generico" />
                                    </div>
                                    <div className="col-10 pt-3 p-0">
                                      <div className="title-generico">Generar comisiones</div>
                                      <div className="cuenta-tarjeta-home">llene el siguiente formulario</div>
                                    </div>
                                  </div>
                                  <div className="row mb-2 mt-4">
                                    <div className="col text-primary">
                                      <b className="p-0 m-0 text-bold">Transferencia</b>
                                    </div>
                                  </div>
                                  <div className="row mb-2">
                                    <div className="col border-right">
                                        <div>Pagoslocales.com</div>
                                        <div>{inputs.pagos_locales!==undefined?inputs.pagos_locales:""}</div>
                                    </div>
                                    <div className="col border-right">
                                        <div>ACH</div>
                                        <div>{inputs.ach!==undefined?inputs.ach:""}</div>
                                    </div>
                                    <div className="col">
                                        <div>IVA</div>
                                        <div>{inputs.iva!==undefined?inputs.iva:""}</div>
                                    </div>
                                  </div>
                                  <hr/>
                                  <div className="row mb-2 mt-4">
                                    <div className="col text-primary">
                                      <b className="p-0 m-0 text-bold">Costos</b>
                                    </div>
                                  </div>
                                  <div className="row mb-2">
                                    <div className="col">
                                        <div>Máxima transferencia</div>
                                        <div>{inputs.maxima_transferencia!==undefined?inputs.maxima_transferencia:""}</div>
                                    </div>
                                  </div>
                                  <hr/>
                                  <div className="row mb-2 mt-4">
                                    <div className="col text-primary">
                                      <b className="p-0 m-0 text-bold">Comisión Divisas</b>
                                    </div>
                                  </div>
                                  <div className="row mb-2">
                                    <div className="col border-right">
                                        <div>Comisión USD</div>
                                        <div>{inputs.comision_USD!==undefined?inputs.comision_USD:""}</div>
                                    </div>
                                    <div className="col border-right">
                                        <div>Comisión giro recibido</div>
                                        <div>{inputs.comision_dd!==undefined?inputs.comision_dd:""}</div>
                                    </div>
                                    <div className="col border-right">
                                        <div>IVA Comisión giro recibido</div>
                                        <div>{inputs.comision_iva_giro_recibido!==undefined?inputs.comision_iva_giro_recibido:""}</div>
                                    </div>
                                  </div>

                                  <div className="row mb-2">
                                    <div className="col border-right">
                                        <div>Comisión administrativa</div>
                                        <div>{inputs.comision_administrativa!==undefined?inputs.comision_administrativa:""}</div>
                                    </div>
                                    <div className="col border-right">
                                        <div>IVA Comisión administrativa</div>
                                        <div>{inputs.comision_iva_administrativa!==undefined?inputs.comision_iva_administrativa:""}</div>
                                    </div>
                                    <div className="col border-right">

                                    </div>
                                  </div>

                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>:false}

          </>
}
export default App
