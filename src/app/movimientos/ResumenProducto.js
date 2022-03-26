import React,{useState,useEffect} from 'react';
import {NavLink, useParams } from "react-router-dom";
import Header from "../../components/header_forms_andres";
import Functions from '../../helpers/Functions';
import Config from '../../helpers/Config';
import Store from '../../helpers/Store';


const App=()=>{
    const parametros          =   useParams();
    const [data, setData] = useState(false);
    //let options = { year: 'numeric', month: 'long', day: 'numeric' };

    useEffect(() => {
        getInit()
    },[])

    function getInit(){
        parametros.skip = true
        parametros.MovimientoIndividual = true
        Functions.PostAsync("Movimientos","getMovimiento",parametros,{},{name:"callbackGetInit",funct:callbackGetInit})
    }
    function callbackGetInit(data){
      if (data.data!==undefined && data.data.transferencias_id!==undefined) {
        setData(data.data)
      }
    }

    const open=(url)=>{
      window.open(url)
    }

    return    <div className="Contenido-Home">
                <div className="row mt-4">
                    <div className="col-10 m-auto">
                        <div className="card border-card">
                            <div className="card-body p-5">
                              {data?<>
                                <Header title="Resumen" classIcon="icon-documento ico-generico" estatus={data.estatus} estado={data.estatus_string!==undefined?data.estatus_string:false} subtitle={data.fecha_string!==undefined?data.fecha_string+' - '+data.hora_string:false}/>
                                <hr/>
                                <div className="row ">
                                    <div className="col-md-6 mt-3">
                                        <div className="col-md-12 mt-2 pl-0 d-flex">
                                            <div>
                                              <div className="label"><b>Titular</b></div>
                                              <div className="label text-gray"> <b>{(data.receptor_real && data.receptor_real.titular_real)?data.receptor_real.titular_real: data.titular_cuenta_destino}</b></div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mt-2 pl-0 d-flex">
                                            <div>
                                                <div className="label"><b>Entidad Bancaria</b></div>
                                                <div className="label text-gray"><b>{data.banco_string!==undefined && data.banco_string!==''&& data.banco_string!==null?data.banco_string:data.receptor_real && data.receptor_real.banco_string?data.receptor_real.banco_string:"pagoslocales"}</b></div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mt-2 pl-0 d-flex">
                                            <div>
                                                <div className="label"><b>Cuenta</b></div>
                                                <div className="label text-gray"><b>
                                                  {data.receptor_real  && data.receptor_real.tipo?<>
                                                      {(data.receptor_real.tipo==='Billetera Móvil')?data.receptor_real.tipo:" cuenta " +data.tipo_de_cuenta_string} {data.receptor_real.nro_cuenta}
                                                    </>:<>
                                                      cuenta {data.tipo_de_cuenta_string!==undefined?data.tipo_de_cuenta_string:data.nro_cuenta_destino}
                                                  </>}
                                                  </b>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mt-2 pl-0 d-flex">
                                            <div>
                                                <div className="label"><b>Concepto</b></div>
                                                <div className="label text-gray"><b>{data.concepto!==undefined?data.concepto:"N/A"}</b></div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mt-2 pl-0 d-flex">
                                            <div>
                                                <div className="label"><b>Observación</b></div>
                                                <div className="label text-gray"><b>{data.observacion!==undefined?data.observacion:false}</b></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mt-3">
                                        <div className="col-md-12 mt-2 pl-0 d-flex">
                                            <div>
                                              <div className="label"><b>Valor transferencia</b></div>
                                              {data.relacion.TRANSACCION!==null?<>
                                                <div className="label text-gray"><b>{data.relacion!==undefined && data.relacion.TRANSACCION!==undefined && data.relacion.TRANSACCION.label?data.relacion.TRANSACCION.label:data.relacion.TRANSACCION===undefined  && data.saldo_string!==undefined?data.saldo_string:"0.00"} COP</b></div>
                                              </>:<>
                                                <div className="label text-gray"><b>{data.saldo_string!==undefined?data.saldo_string:"0.00"} COP</b></div>
                                              </>}

                                            </div>
                                        </div>
                                        <div className="col-md-12 mt-2 pl-0 d-flex">
                                            <div>
                                                <div className="label"><b>Comisión</b></div>
                                                {parseInt(Store.get("user").tipo_usuario_id)<4?<>
                                                  {data.relacion.TRANSACCION!==null?<>
                                                    <div className="label text-gray"><b>{data.relacion!==undefined && data.relacion.COMISION_TRANSACCIONAL!==undefined?data.relacion.COMISION_TRANSACCIONAL.label:data.relacion.COMISION_TRANSACCIONAL===undefined  && data.comision_string!==undefined?data.comision_string:"0.00"} COP</b></div>
                                                    </>:<>
                                                    <div className="label text-gray"><b>{data.comision_string!==undefined?data.comision_string:"0.00"} COP</b></div>
                                                  </>}
                                                </>:parseInt(Store.get("user").tipo_usuario_id)>3 && !data.is_receptor?<>
                                                  {data.relacion.TRANSACCION!==null?<>
                                                    <div className="label text-gray"><b>{data.relacion!==undefined && data.relacion.COMISION_TRANSACCIONAL!==undefined?data.relacion.COMISION_TRANSACCIONAL.label:data.relacion.COMISION_TRANSACCIONAL===undefined  && data.comision_string!==undefined?data.comision_string:"0.00"} COP</b></div>
                                                    </>:<>
                                                    <div className="label text-gray"><b>{data.comision_string!==undefined?data.comision_string:"0.00"} COP</b></div>
                                                  </>}
                                                </>:<>
                                                  <div className="label text-gray"><b>{data.comision_string!==undefined?data.comision_string:"0.00"} COP</b></div>
                                                </>}
                                            </div>
                                        </div>
                                        <div className="col-md-12 mt-2 pl-0 d-flex">
                                            <div>
                                                <div className="label"><b>IVA sobre comisión</b></div>

                                                {parseInt(Store.get("user").tipo_usuario_id)<4?<>
                                                  {data.relacion.TRANSACCION!==null?<>
                                                      <div className="label text-gray"><b>{data.relacion!==undefined && data.relacion.IVA_COMISION_TRANSACCIONAL!==undefined?data.relacion.IVA_COMISION_TRANSACCIONAL.label:data.relacion.IVA_COMISION_TRANSACCIONAL===undefined  && data.iva_sobre_comision_string!==undefined?data.iva_sobre_comision_string:"0.00"} COP</b></div>
                                                    </>:<>
                                                      <div className="label text-gray"><b>{data.iva_sobre_comision_string!==undefined?data.iva_sobre_comision_string:"0.00"} COP</b></div>
                                                    </>}
                                                </>:parseInt(Store.get("user").tipo_usuario_id)>3 && !data.is_receptor?<>
                                                  {data.relacion.TRANSACCION!==null?<>
                                                    <div className="label text-gray"><b>{data.relacion!==undefined && data.relacion.IVA_COMISION_TRANSACCIONAL!==undefined?data.relacion.IVA_COMISION_TRANSACCIONAL.label:data.relacion.IVA_COMISION_TRANSACCIONAL===undefined  && data.iva_sobre_comision_string!==undefined?data.iva_sobre_comision_string:"0.00"} COP</b></div>
                                                  </>:<>
                                                    <div className="label text-gray"><b>{data.iva_sobre_comision_string!==undefined?data.iva_sobre_comision_string:"0.00"} COP</b></div>
                                                  </>}
                                                </>:<>
                                                  <div className="label text-gray"><b>{data.comision_string!==undefined?data.comision_string:"0.00"} COP</b></div>
                                                </>}



                                            </div>
                                        </div>
                                        <div className="col-md-12 mt-2 pl-0 d-flex">
                                          <div>
                                              <div className="label"><b>Valor Transferencia</b></div>

                                              {parseInt(Store.get("user").tipo_usuario_id)<4?<>
                                                {
                                                  data.relacion.TRANSACCION!==null?<>
                                                    <div className="label text-gray"><b>{data.relacion!==undefined && data.relacion.GMF!==undefined?data.relacion.GMF.label:data.relacion.GMF===undefined  && data.total_operacion!==undefined?data.total_operacion:"0.00"} COP</b></div>
                                                  </>:<>
                                                    <div className="label text-gray"><b>{data.total_operacion!==undefined?data.total_operacion:"0.00"} COP</b></div>
                                                  </>
                                                }
                                              </>:parseInt(Store.get("user").tipo_usuario_id)>3 && !data.is_receptor?<>
                                                {
                                                  data.relacion.TRANSACCION!==null?<>
                                                    <div className="label text-gray"><b>{data.relacion!==undefined && data.relacion.GMF!==undefined?data.relacion.GMF.label:data.relacion.GMF===undefined  && data.total_operacion!==undefined?data.total_operacion:"0.00"} COP</b></div>
                                                  </>:<>
                                                    <div className="label text-gray"><b>{data.total_operacion!==undefined?data.total_operacion:"0.00"} COP</b></div>
                                                  </>
                                                }
                                              </>:<>
                                                <div className="label text-gray"><b>{data.comision_string!==undefined?data.comision_string:"0.00"} COP</b></div>
                                              </>}

                                          </div>
                                        </div>
                                        <div className="col-md-12 mt-2 pl-0 d-flex">
                                            <div>
                                                <div className="label"><b>Total operación</b></div>
                                                <div className="label text-gray"><b>
                                                  {parseInt(Store.get("user").tipo_usuario_id)<4?<>
                                                    { data.relacion!==undefined &&
                                                      data.relacion.TOTAL_COSTO_TRANSACCION!==undefined &&
                                                      data.relacion.TOTAL_COSTO_TRANSACCION!=="0,00"
                                                      ?data.relacion.TOTAL_COSTO_TRANSACCION:data.saldo_string
                                                    }
                                                  </>:parseInt(Store.get("user").tipo_usuario_id)>3 && !data.is_receptor?<>
                                                    { data.relacion!==undefined &&
                                                      data.relacion.TOTAL_COSTO_TRANSACCION!==undefined &&
                                                      data.relacion.TOTAL_COSTO_TRANSACCION!=="0,00"
                                                      ?data.relacion.TOTAL_COSTO_TRANSACCION:data.saldo_string
                                                    }
                                                  </>:<>
                                                    { data.relacion!==undefined &&
                                                      data.relacion.TOTAL_COSTO_TRANSACCION!==undefined &&
                                                      data.relacion.TOTAL_COSTO_TRANSACCION!=="0,00"
                                                      ?data.saldo_string:data.saldo_string
                                                    }
                                                  </>}
                                                   COP
                                                </b></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right mt-4">
                                    <div className="btn btn-outline-primary2 mb-3 mr-1"
                                      onClick={()=>open(Config.ConfigApirest+"PDF/Movimientos/getMovimiento?skip=true&transferencias_id="+parametros.id+"&token="+Store.get("user").token)}>
                                      Descargar
                                    </div>
                                    {parametros.cuenta_id?<NavLink to={"/Movimientos/DetalleBilletera/"+parametros.cuenta_id} className="btn btn-primary text-white mb-3">Volver</NavLink>:<NavLink to={"/Movimientos/Movimientos"} className="btn btn-primary text-white mb-3">Volver</NavLink>}

                                </div>
                              </>:<div className="text-center">Espere mientras consultamos</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
}
export default App
