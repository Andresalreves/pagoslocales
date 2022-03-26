import React,{useState,useEffect} from 'react';
import Header from '../../components/header_forms_tipo4';
import { NavLink, useHistory, useParams } from "react-router-dom";
import Functions from "../../helpers/Functions";
import Config from '../../helpers/Config';
import Store from '../../helpers/Store';
import Comentarios from "../comentarios/index";
import DocumentosSoporte from "../../components/documentos_soporte_reporte_pago";

const App=()=>{
  let parametros = useParams();
  const [data, setData] = useState({});
  const [reset, setReset] =   useState(false);
  useEffect(() => {
    getInit()
  },[])

  useEffect(() => {
    if (reset) {
      setReset(false)
    }
  },[reset])

  function getInit(){
      let data  = {id:parametros.id}
      Functions.PostAsync("Divisas","getReporte",data,{},{name:"callbackGetInit",funct:callbackGetInit})
  }

  function callbackGetInit(response){
    if (response.data!==undefined && response.data.pagador_id!==undefined) {
      setData(response.data)
    }
  }
  const onSubmit=(e)=>{
      e.preventDefault();
      //Functions.PostAsync("Administracion","setFuncionarios",send,{},{name:"callbackSubmit",funct:callbackSubmit})
  }
  return    <div className="Contenido-Home">
                <div className="row mt-sm-4">
                    <div className="col-12 col-sm-12 m-auto">
                        <div className="card border-card">
                            <div className="card-body">
                                <div className="col-md-10 ml-auto mr-auto mt-3">
                                  <Header title="Resumen"
                                          subtitle={data.fecha}
                                          estatus={data.estatus}
                                          estatus_string={data.estatus_string}
                                          classIcon="icon-cuenta-bancaria-inactiva ico-generico"

                                          />
                                    <hr/>
                                    <div className="row">
                                      <div className="col-md-6 mt-2 pl-0">
                                          <div>
                                              <div className="label"><b>Cuenta</b></div>
                                              <div className="label text-gray"><b>{data.pagador!==undefined?data.pagador.nombre_cuenta:false}</b></div>
                                          </div>
                                      </div>
                                      <div className="col-md-6 mt-2 pl-0 ">
                                          <div>
                                              <div className="label"><b>Valor reportado</b></div>
                                              <div className="label text-gray"><b>{data.valor_string} </b></div>
                                          </div>
                                      </div>
                                      <div className="col-md-6 mt-2 pl-0">
                                          <div>
                                              <div className="label"><b>Pagador</b></div>
                                              <div className="label text-gray"><b>{data.pagador!==undefined?data.pagador.pagador:false}</b></div>
                                          </div>
                                      </div>
                                      <div className="col-md-6 mt-2 pl-0 d-flex">
                                          <div>
                                              <div className="label"><b>Valor recibido</b></div>
                                              <div className="label text-gray"><b>{data.total_recibido_string}  </b></div>
                                          </div>
                                      </div>
                                      <div className="col-md-6 mt-2 pl-0">
                                          <div>
                                            <div className="label"><b>Moneda</b></div>
                                            <div className="label text-gray"><b>{data.moneda_string!==undefined?data.moneda_string:""}</b></div>
                                          </div>
                                      </div>
                                      <div className="col-md-6 mt-2 pl-0 d-flex">
                                          <div>
                                              <div className="label"><b>Comisión</b></div>
                                              <div className="label text-gray"><b>{data.total_comision_string}  </b></div>
                                          </div>
                                      </div>
                                      <div className="col-md-6  mt-2 pl-0 d-flex">
                                          <div>
                                              <div className="label"><b>Fecha operación</b></div>
                                              <div className="label text-gray"><b>{data.fecha_operacion_string}</b></div>
                                          </div>
                                      </div>
                                      <div className="col-md-6  mt-2 pl-0 d-flex">
                                          <div>
                                              <div className="label"><b>Valor abonado</b></div>
                                              <div className="label text-gray"><b>{data.valor_recibido_string}  </b></div>
                                          </div>
                                      </div>
                                    </div>

                                    <Header title="Documentos de soporte" subtitle="Suba los siguientes documentos de soporte" classIcon="icon-documento ico-generico" class="text-left"/>
                                    <div className="mt-2 p-3">

                                      {data.estatus==="9" || data.estatus==="1"?<>
                                        <DocumentosSoporte user={data} setReset={setReset} id={"VerificarDatosReporte_"+parametros.id} id={parametros.id}/>
                                      </>:<>
                                        <DocumentosSoporte user={data} setReset={setReset} id={"VerificarDatosReporte_"+parametros.id} id={parametros.id} noDelete={true}/>
                                      </>}




                                    </div>
                                    <Header title="Comentarios" classIcon="icon-mensaje-notificacion ico-generico" class="text-left"/>
                                    {!reset?<Comentarios usuario_id={Store.get("user").usuario_id} id={parametros.id}/>:false}
                                    <div className="text-center mt-4">
                                        <a target="_blank" href={Config.ConfigApirest+"PDF/Divisas/getReporte?id="+parametros.id+"&token="+Store.get("user").token} className="btn btn-outline-primary2 mb-3 mr-1">Descargar reporte</a>
                                        <NavLink to="/Divisas/ReportarPago" className="btn btn-gray text-white mb-3">Volver</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
}
export default App
