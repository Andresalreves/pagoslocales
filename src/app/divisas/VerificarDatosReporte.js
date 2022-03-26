import React,{useState,useEffect} from 'react';
import Header from '../../components/header_forms_andres';
import { NavLink, useHistory, useParams } from "react-router-dom";
import Functions from "../../helpers/Functions";
import Store from "../../helpers/Store";
import OptionCard from "../../components/OptionCard";
import Table from "../../screens/table";
import Comentarios from "../comentarios/index";
import DocumentosSoporte from "../../components/documentos_soporte_reporte_pago";

const test      = true
const opciones  = [ {label:"Listado de funcionarios activos",value:1},
                    {label:"Listado de funcionarios inactivos",value:0}]


const App=()=>{
  let parametros = useParams();
  let history = useHistory();
  const [data, setData] = useState({});
  const [reset, setReset] =   useState(false);
  const [files, setFiles] =   useState(false);
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
      let send={...data}
          delete(send.token)
      Functions.PostAsync("Divisas","setReportepagoStatusNew",send,{},{name:"callbackSubmit",funct:callbackSubmit})
  }
  function callbackSubmit(response){
    if (response.confirmation!==undefined && response.confirmation===true ) {
      return history.push("/Divisas/ReporteVerificado/"+parametros.id);
    }
  }

  return    <div className="Contenido-Home">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title-home mb-4">crear reporte de pago</div>
                    </div>
                </div>

                    <div className="col-12 m-auto">
                        <div className="card border-card">
                            <div className="card-body">
                                <div className="col-md-10 ml-auto mr-auto mt-3">
                                    <div className="title-generico mt-5 mb-4">
                                        Verifica datos del reporte
                                    </div>
                                    <hr/>
                                    <div className="col-md-12 mt-2 pl-0 d-flex">
                                        <div>
                                            <div className="label"><b>Cuenta</b></div>
                                            <div className="label text-gray"><b>{data.pagador!==undefined?data.pagador.nombre_cuenta:false}</b></div>
                                        </div>
                                        <NavLink to={"/Divisas/CrearReportePago/"+parametros.id} className="cambiar">Cambiar <i className="icon-cambiar ml-2"></i></NavLink>
                                    </div>
                                    <div className="col-md-12 mt-2 pl-0 d-flex">
                                        <div>
                                            <div className="label"><b>Pagador</b></div>
                                            <div className="label text-gray"><b>{data.pagador!==undefined?data.pagador.pagador:false}</b></div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-2 pl-0 d-flex">
                                        <div>
                                            <div className="label"><b>Tipo Pagador</b></div>
                                            <div className="label text-gray"><b>{data.tipo_pagador_string!==undefined?data.tipo_pagador_string:false}</b></div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-2 pl-0 d-flex">
                                        <div>
                                            <div className="label"><b>Moneda</b></div>
                                            <div className="label text-gray"><b>{data.moneda_string!==undefined?data.moneda_string:false}</b></div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-2 pl-0 d-flex">
                                        <div>
                                            <div className="label"><b>Valor</b></div>
                                            <div className="label text-gray"><b>{data.valor_string}</b></div>
                                        </div>
                                    </div>

                                    <Header title="Documentos de soporte" subtitle="Sube los siguientes documentos de soporte" classIcon="icon-documento ico-generico" class="text-left"/>
                                    <div className="mt-2 p-3">
                                      {data.estatus==="9" || data.estatus==="1"?<>
                                        <DocumentosSoporte  setFiles={setFiles}
                                                            user={data}
                                                            setReset={setReset}
                                                            id={parametros.id} />
                                      </>:<>
                                        <DocumentosSoporte  setFiles={setFiles}
                                                            user={data}
                                                            setReset={setReset}
                                                            id={parametros.id}
                                                            noDelete={true}/>
                                      </>}

                                    </div>
                                    <Header title="Comentarios" classIcon="icon-mensaje-notificacion ico-generico" class="text-left"/>
                                    {!reset?<Comentarios usuario_id={Store.get("user").usuario_id} id={parametros.id}/>:false}
                                    {files?<div className="text-center mt-4">
                                        <form className="row mt-4 text-center" onSubmit={onSubmit}>
                                          <div className="col">
                                          <button  type="submit" className="btn btn-primary mb-3 mr-3">Confirmar</button>
                                          <NavLink to="/Divisas/CrearReportePago" className="btn btn-gray text-white mb-3">Cancelar</NavLink>
                                          </div>
                                        </form>
                                    </div>:false}

                                </div>
                            </div>
                        </div>
                    </div>

            </div>
}
export default App
