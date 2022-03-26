import React,{useState,useEffect} from 'react';
import Header from '../../components/header_forms_tipo4';
import { NavLink, useHistory, useParams } from "react-router-dom";
import Functions from "../../helpers/Functions";
import OptionCard from "../../components/OptionCard";
import Table from "../../screens/table";
import Config from '../../helpers/Config';
import Store from '../../helpers/Store';
import Comentarios from "../comentarios/index";
import Header2 from '../../components/header_forms_andres';

const test      = true
const opciones  = [ {label:"Listado de funcionarios activos",value:1},
                    {label:"Listado de funcionarios inactivos",value:0}]


const App=()=>{
  let parametros = useParams();
  let history = useHistory();
  const [data, setData] = useState({});
  useEffect(() => {
    getInit()
  },[])

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
                <div className="row mt-4">
                    <div className="col-12 m-auto">
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
                                              <div className="label text-gray"><b>{data.valor_string}</b></div>
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
                                              <div className="label text-gray"><b>{data.total_recibido_string}</b></div>
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
                                              <div className="label text-gray"><b>{data.total_comision_string}</b></div>
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
                                              <div className="label text-gray"><b>{data.valor_recibido_string}</b></div>
                                          </div>
                                      </div>
                                    </div>

                                    {data.funcionario!==undefined&&data.funcionario.usuario_id!==undefined?<>
                                      <hr/>
                                      <div className="col-md-12  mt-2">
                                        <div>
                                            <div className="label"><b>Funcionario</b></div>
                                            <div className="label text-gray"><b>{data.funcionario.nombres} {data.funcionario.apellidos}</b></div>
                                        </div>
                                      </div>
                                    </>:false}
                                    <Header2 title="Comentarios" classIcon="icon-mensaje-notificacion ico-generico" class="text-left"/>
                                    <Comentarios id={"VerDetalleReportePago_"+parametros.id}/>
                                    <div className="text-center mt-4">
                                        <a target="_blank" href={Config.ConfigApirest+"PDF/Divisas/getReporte?id="+parametros.id+"&token="+Store.get("user").token} className="btn btn-outline-primary2 mb-3 mr-1">Descargar</a>
                                        <NavLink to="/Administracion/ReportePago" className="btn btn-gray text-white mb-3">Volver</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
}
export default App
