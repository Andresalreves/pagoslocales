import React,{useState,useEffect} from 'react';
import { NavLink, useParams } from "react-router-dom";
import Functions from "../../helpers/Functions";
import OptionCard from "../../components/OptionCard";
import Config from '../../helpers/Config';
import Store from '../../helpers/Store';
import StateContext from '../../helpers/ContextState';
import Header from "../../components/header_forms_andres";



const App=()=>{
    const context = React.useContext(StateContext);
    const parametros=useParams();
    const [data, setData] = useState({});

    useEffect(() => {
      context.socketIo.connect()
      context.socketIo.emit('ConfirmacionTransferencia');
      getInit()
    },[parametros.id])

    useEffect(() => {
      getInit()
    },[])

    function getInit(){
      let data  = {id:parametros.transferencias_id}
      Functions.PostAsync("Transferir","getTransferencia",data,{},{name:"callbackGetInit",funct:callbackGetInit})
    }

    function callbackGetInit(response){
      setData(response.data)
    }


  return      <div className="Contenido-Home">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title-home mb-4">¡Transferencia con exitosa!</div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-12 col-md-8 m-auto">
                        <div className="card border-card">
                            <div className="card-body">
                                <div className="items-verificacion row justify-content-between m-sm-4">
                                    <OptionCard OptionIndicator="1" TextOptionIndicator="Preparación"/>
                                    <OptionCard OptionIndicator="2" TextOptionIndicator="Verificación"/>
                                    <OptionCard OptionIndicator="3" TextOptionIndicator="Confirmación" myclass="optionActive"/>
                                </div>
                                <div className="col-md-10 ml-auto mr-auto mt-3">
                                <Header title="¡Transferencia con exito.!" classIcon="icon-documento ico-generico"/>
                                    <div className="d-flex text-gray text-confirmation-tranfer mt-4">
                                        <div><b>Comprobante PSG-01-{data.consecutivo}</b></div>
                                        <div className="ml-auto"><b>{data.fecha_solicitud_string} - {data.hora_solicitud}</b></div>
                                    </div>
                                    <hr/>
                                    <div className="col-md-12 mt-2 pl-0 d-flex">
                                      <div>
                                          <div className="label"><b>Cuenta de Origen</b></div>
                                          <div className="label text-gray">
                                            <b>
                                              {data.bolsillo && data.descripcion==='RETIRO DE BOLSILLO'?<>
                                                  {data.bolsillo.tipo} {data.bolsillo.nombre_bolsillo}
                                                </>:data.bolsillo && data.descripcion==='TRANSFERENCIA A BOLSILLO'?<>
                                                  {data.tipo_cuentas_string_emergente} {data.nro_cuenta_destino} (COP)
                                                </>:<>
                                                {data.cuenta_origen_string}
                                              </>}
                                            </b>
                                          </div>
                                      </div>
                                    </div>
                                    <div className="col-md-12 mt-2 pl-0 d-flex">
                                      <div>
                                          <div className="label"><b>Cuenta de destino</b></div>
                                          <div className="label text-gray">
                                            <b>
                                              {data.bolsillo && data.descripcion==='RETIRO DE BOLSILLO'?<>
                                                  {data.tipo_cuenta_destino} {data.nro_cuenta_destino}
                                                </>:data.bolsillo && data.descripcion==='TRANSFERENCIA A BOLSILLO'?<>
                                                  {data.bolsillo.tipo} {data.bolsillo.nombre_bolsillo}
                                                </>:<>
                                                {data.cuenta_destino_string}
                                              </>}
                                            </b>
                                          </div>
                                      </div>
                                    </div>
                                    <div className="col-md-12 mt-2 pl-0 d-flex">
                                      <div>
                                          <div className="label"><b>Valor a transferir</b></div>
                                          {data.saldo_positivo_string!==undefined?<>
                                            <div className="label text-gray"><b>
                                              {data.saldo_positivo_string} COP</b></div>
                                          </>:false}
                                      </div>
                                    </div>
                                    <div className="col-md-12 mt-2 pl-0 d-none">
                                        <div>
                                            <div className="label"><b>GMF TRANSACCIONAL</b></div>

                                            {data.relacion!==undefined && data.relacion.GMF!==undefined?<>
                                              <div className="label text-gray"><b>{data.concepto!=='TRANSFERENCIA A BOLSILLO'?data.relacion.GMF.label:"0.00"} COP</b></div>
                                            </>:false}

                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-2 pl-0 d-flex">
                                      <div>
                                          <div className="label"><b>Costo de la transferencia</b></div>
                                          {data.bolsillo && (data.descripcion==='RETIRO DE BOLSILLO' || data.descripcion==='TRANSFERENCIA A BOLSILLO')?<>
                                            <div className="label text-gray">
                                              <b>
                                                0.00 COP
                                              </b>
                                            </div>
                                            </>:<>
                                            {data.costo_transferencia!==undefined?<>
                                              <div className="label text-gray"><b>
                                                {data.costo_transferencia} COP</b></div>
                                            </>:false}
                                          </>}

                                      </div>
                                    </div>
                                    <div className="col-md-12 mt-2 pl-0 d-flex">
                                      <div>
                                          <div className="label"><b>IVA</b></div>
                                          {data.bolsillo && (data.descripcion==='RETIRO DE BOLSILLO' || data.descripcion==='TRANSFERENCIA A BOLSILLO')?<>
                                          <div className="label text-gray">
                                            <b>
                                              0.00 COP
                                            </b>
                                          </div>
                                            </>:<>
                                            {data.iva_!==undefined?<>
                                              <div className="label text-gray"><b>
                                                {data.iva_} COP</b></div>
                                            </>:false}
                                          </>}

                                      </div>
                                    </div>
                                    <div className="col-md-12 mt-2 pl-0 d-flex mb-4">
                                        <div>
                                            <div className="label"><b>Concepto</b></div>
                                            <div className="label text-gray"><b>{data.concepto}</b></div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-0 pl-0 d-flex mb-4">
                                        <div>
                                            <div className="label"><b>Observación</b></div>
                                            <div className="label text-gray"><b>{data.observacion}</b></div>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="Importante mt-4 text-gray">
                                        <b>Importante:</b> Estimado(a) cliente, te informamos que esta operación será reflejada en la cuenta del remitente el día de hoy si el pago fue realizado antes de las 15:00 Horas (03:00 PM) o el día de mañana si se realizó después de esta hora. Si realizaste la transferencia en día no hábil, cursará el primer ciclo ACH del siguiente día hábil. Cómo medida de seguridad te recordamos la importancia de cambiar periódicamente tus claves de acceso.
                                    </div>
                                    <div className="text-center mt-5">
                                      <a target="_blank" href={Config.ConfigApirest+"PDF/Transferir/getTransferencia?id="+parametros.transferencias_id+"&token="+Store.get("user").token} className="btn btn-outline-primary2  mr-1">Descargar</a>
                                      <NavLink to="/Transferir/Transferir" className="btn btn-primary col-12 col-md-6">Nueva transferencia</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

}
export default App
