import React,{useState,useEffect} from 'react';
import Header from '../../components/header_forms_tipo2';
import { NavLink, useParams,useHistory } from "react-router-dom";
import Store from "../../helpers/Store";
import Functions from "../../helpers/Functions";
import Config from "../../helpers/Config";
import ImgPerfil from '../../assets/images/No_image.png';
import DocumentosSoporte from "../../components/documentos_soporte_negociacion";
import Comentarios from "../comentarios/index";
import StateContext from '../../helpers/ContextState'

const test  = true

const App=()=>{
  const context           =   React.useContext(StateContext);
  const history           =   useHistory();
  const params            =   useParams();
  const [data, setData]   =   useState(false);
  const [reset, setReset] =   useState(false);

  useEffect(() => {
    context.socketIo.connect()
    getInit()
  },[])


  useEffect(() => {
    if (reset) {
      setReset(false)
    }
  },[reset])

  const getInit=()=>{
    Functions.PostAsync("Administracion","getNegociacionDivisas",{id:params.id},{},{name:"callbackContinue",funct:callbackContinue})
  }

  const callbackContinue=(response)=>{
    //console.log(response.data.cliente_id);
    setData(response.data)
  }

  const handleTranferir=()=>{
    return context.setModalShow({
      show:true,
      message:<>
                <div className="m-auto text-center">
                  <i className="icon-configuracion icon-mesage"></i>
                  <h6 className="mt-2"><b>Atención</b></h6>
                  <div className="text-center ml-auto mr-auto w-50 mt-2">
                    ¿Deseas aprobar esta transferencia?
                  </div>
                  <div className="w-100 text-center mt-4 mb-1">
                    <button type="button" className="btn btn-primary mr-2" onClick={()=>aprobarTransferenciaNegociacion()}>Si</button>
                    <button type="button" className="btn btn-gray" onClick={()=>context.setModalShow({show:false})}>No</button>
                  </div>
                </div></>,
      size:""
    })
  }

  const aprobarTransferenciaNegociacion=()=>{
      Functions.PostAsync(  "Administracion",
                            "aprobarTransferenciaNegociacion",
                            {id:params.id},
                            {},
                            {name:"callback",funct:callback})
  }

  const callback=(data)=>{
    if (data.message!==undefined) {
      context.socketIo.emit('actualizar_notificacion');
      history.push('/Administracion/NegociarDivisas')
      return context.setModalShow({
        show:true,
        message:<>
                  <div className="m-auto text-center">
                    <i className="icon-configuracion icon-mesage"></i>
                    <div className="text-center ml-auto mr-auto w-50 mt-2">
                      {data.message.label}
                    </div>
                    <div className="w-100 text-center mt-4 mb-1">
                      <button type="button" className="btn btn-gray" onClick={()=>context.setModalShow({show:false})}>Continuar</button>
                    </div>
                  </div></>,
        size:""
      })
    }

  }

    return  <>{data?<div className="Contenido-Home">
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="card">
            <div className="card-content">
              <div className="card-body perfil">

                  <div className="p-sm-5">
                    <Header
                        title={"Resumen"}
                        subtitle="30 junio 2021 3:00pm"
                        classIcon="icon-cuenta-bancaria-inactiva ico-generico"
                        />
                    <div className="border mb-4"></div>
                    <div className="row mt-3 justify-content-center">
                      <div className="col-12 col-md-4 pt-2">
                        <div className="label"><b>Titular</b></div>
                        <div className="label text-gray">{data.cliente_string}</div>
                      </div>
                      <div className="col-12 col-md-4 pt-2">
                        <div className="label"><b>Fecha de creación</b></div>
                        <div className="label text-gray">{data.fecha_string}</div>
                      </div>
                      <div className="col-12 col-md-4 pt-2">
                        <div className="label"><b>Funcionario</b></div>
                        <div className="label text-gray">{data.funcionario_string}</div>
                      </div>
                    </div>
                    <div className="row mt-3 justify-content-center">
                      <div className="col-12 col-md-4 pt-2">
                        <div className="label"><b>Cuenta origen</b></div>
                        <div className="label text-gray">{data.cuenta_origen}</div>
                      </div>
                      <div className="col-12 col-md-4 pt-2">
                        <div className="label"><b>Cuenta destino</b></div>
                        <div className="label text-gray">{data.nro_cuenta}</div>
                      </div>
                      <div className="col-12 col-md-4 pt-2">
                        <div className="label"><b>Numeral cambiario</b></div>
                        <div className="label text-gray">{data.nro_cambiario_string}</div>
                      </div>
                    </div>
                    <div className="row mt-3 justify-content-center">
                      <div className="col-12 col-md-4 pt-2">
                        <div className="label"><b>Monto {data.tipo_moneda_destino}</b></div>
                        <div className="label text-gray">{data.valor_usd}</div>
                      </div>
                      <div className="col-12 col-md-4 pt-2">
                        <div className="label"><b>Comisión {data.tipo_moneda_destino}</b></div>
                        <div className="label text-gray">{data.comision_usd}</div>
                      </div>
                      <div className="col-12 col-md-4 pt-2">
                        <div className="label"><b>Negociación {data.tipo_moneda_destino}</b></div>
                        <div className="label text-gray">{data.total_resta_string}</div>
                      </div>
                    </div>
                    <div className="row mt-3 justify-content-center">
                      <div className="col-12 col-md-4 pt-2">
                        <div className="label"><b>Tasa COP</b></div>
                        <div className="label text-gray">{data.tasas}</div>
                      </div>
                      <div className="col-12 col-md-4 pt-2">
                        <div className="label"><b>Subtotal</b></div>
                        <div className="label text-gray">{data.subtotal_string}</div>
                      </div>
                      <div className="col-12 col-md-4 pt-2">
                        <div className="label"><b>Comisión Administrativa</b></div>
                        <div className="label text-gray">{data.comision_administrativa_string}</div>
                      </div>
                    </div>
                    <div className="row mt-3 justify-content-center">
                      <div className="col-12 col-md-4 pt-2">
                        <div className="label"><b>IVA Comisión Administrativa</b></div>
                        <div className="label text-gray">{data.comision_iva_administrativa_string}</div>
                      </div>
                      <div className="col-12 col-md-4 pt-2">
                      <div className="label"><b>Comisión Giro Recibido</b></div>
                      <div className="label text-gray">{data.comision_giro_recibido_string}</div>
                      </div>
                      <div className="col-12 col-md-4 pt-2">
                        <div className="label"><b>IVA Comisión Giro Recibido</b></div>
                        <div className="label text-gray">{data.comision_iva_giro_recibido_string}</div>
                      </div>
                    </div>
                    <div className="row mt-3 justify-content-center">
                      <div className="col-12 col-md-4 pt-2">
                        <div className="label"><b>Total abonar COP</b></div>
                        <div className="label text-gray">{data.total_abona_string}</div>
                      </div>
                      <div className="col-12 col-md-4 pt-2">
                        <div className="label"><b>Concepto</b></div>
                        <div className="label text-gray">{data.concepto_string}</div>
                      </div>
                      <div className="col-12 col-md-4 pt-2">

                      </div>
                    </div>
                  </div>
                  <div className="row mt-3 justify-content-center">
                    <div className="col-11 pt-2">
                      <DocumentosSoporte setReset={setReset} id={params.id} params_id={params.id} usuario_id={data.cliente_id}/>
                    </div>
                  </div>

                  <div className="row mt-3 justify-content-center">
                    <div className="col-11 pt-2">
                      <Header title="Comentarios" classIcon="icon-mensaje-notificacion ico-generico" class="text-left"/>
                    </div>
                  </div>
                  {!reset?<Comentarios id={params.id}/>:false}
                  {data.estatus_transferencia==="4"?<>
                    <div className="row text-center mt-4 justify-content-center">
                      <div className="col-6">
                        <div className="btn btn-primary" onClick={handleTranferir}>Transferir saldo a la cuenta</div>
                      </div>
                    </div>
                  </>:false}
                  <div className="row text-center mt-4 justify-content-center">
                    <div className="col-6">
                      <a target="_blank" href={Config.ConfigApirest+"PDF/Movimientos/getMovimiento?subTmpl=NegociacionDivisas&skip=true&negociacion_id="+params.id+"&token="+Store.get("user").token} className="btn btn-outline-primary2 mb-3 mr-1">Descargar</a>
                      <NavLink to="/Administracion/NegociarDivisas" className="btn btn-outline-primary2 mb-3">Volver</NavLink>
                    </div>
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
