import React,{useState,useEffect} from 'react';
import Header from '../../components/header_forms_andres';
import { NavLink, useHistory, useParams  } from "react-router-dom";
import Functions from "../../helpers/Functions";
import Config from "../../helpers/Config";
import Store from "../../helpers/Store";
import OptionCard from "../../components/OptionCard";
import Table from "../../screens/table";
import StateContext from '../../helpers/ContextState';

const test      = true
const opciones  = [ {label:"Listado de funcionarios activos",value:1},
                    {label:"Listado de funcionarios inactivos",value:0}]


const App=()=>{
  const context = React.useContext(StateContext);
  let parametros = useParams();
  let history = useHistory();
  const [data, setData] = useState({});

  useEffect(() => {
    context.socketIo.connect()
    context.socketIo.emit('ReporteVerificado');
    context.socketIo.emit('actualizar_notificacion');
  },[])

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
                <div className="row">
                    <div className="col-md-12">
                        <div className="title-home mb-4">Crear reporte de pago</div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-8 m-auto">
                        <div className="card border-card">
                            <div className="card-body">
                                <div className="col-md-10 ml-auto mr-auto mt-3">
                                    <Header title="¡Reporte creado con éxito!" classIcon="icon-actualizado-completo ico-generico" />
                                    <hr/>
                                    <div className="col-md-12 mt-2 pl-0 d-flex">
                                        <div>
                                        <div className="label"><b>Cuenta</b></div>
                                            <div className="label text-gray"><b>{data.pagador!==undefined?data.pagador.pagador:false}</b></div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-2 pl-0 d-flex">
                                        <div>
                                            <div className="label"><b>Pagador</b></div>
                                            <div className="label text-gray"><b>{data.pagador!==undefined?data.pagador.nombre_cuenta:false}</b></div>
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
                                    <hr/>
                                    <div className="Importante mt-4 text-gray">
                                        REPORTE DE PAGO INSCRITO SATISFACTORIAMENTE, TÚ REPORTE HA QUEDADO EN ESTADO
                                        PENDIENTE POR REVISIÓN DE NUESTRO EQUIPO <span>pagoslocales.com</span>; QUIENES PROCEDERÁN CON LA
                                        REVISIÓN DE LAS CUENTAS INTERNACIONALES ANTES DE ACREDITAR TU SALDO, DESPUÉS DE
                                        REVISADO QUEDARÁ EN ESTADO ACREDITADO, LO QUE SIGNIFICARÁ QUE EL DINERO ESTARÁ
                                        ABONADO EN TU CUENTA EN {data.moneda_string!==undefined?data.moneda_string:false} Y PODRÁ SER NEGOCIADA LA TASA CON NUESTRA MESA DE
                                        DINERO.
                                    </div>
                                    <div className="text-center mt-5">
                                        <a target="_blank" href={Config.ConfigApirest+"PDF/Divisas/getReporte?id="+parametros.id+"&token="+Store.get("user").token} className="btn btn-outline-primary2 mr-0 mr-sm-1 col-12 col-md-3">Descargar</a>
                                        <NavLink to="/Divisas/CrearReportePago" className="linkButtonBancoRosa mr-1">Nuevo reporte</NavLink>
                                        <NavLink to="/Divisas/ReportarPago" className="btn btn-gray text-white">Lista reportes</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
}
export default App
