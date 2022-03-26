import React,{useState,useEffect} from 'react';
import StateContext from '../helpers/ContextState';
import ItemsMenu from '../helpers/Constants';
import Init from "./Init";
import InitNoVerificados from "./InitNoVerificados";
import InitFuncionario from "./InitFuncionario";
import Utilidades from "./Init";
import Formularios from "./Init";
import Proyectos from "./Init";
import Twl from "./Init";
import Clientes from "./Init";
import Empresas from "./empresas";
import Ventas from "./Init";
import Finanzas from "./Init";
import Bolsillos from "./bolsillos";
import BolsillosCreate from "./bolsillos/create";
import BolsillosDetalle from "./bolsillos/bolsillosDetalle";
import BolsillosDetalleMovimiento from "./bolsillos/BolsillosDetalleMovimiento";
import BolsillosEditar from "./bolsillos/BolsillosEditar";
import logo from '../assets/images/logo.svg';
import iconAyuda from '../assets/images/necesito-ayuda.svg';
import Breadcrumbs from "./breadcrumbs";
import Profile from "./profile";

/*TRANSFERIR*/
import Transferir from "./transferir/transferir";
import VerificarTransferencia from "./transferir/VerificarTransferencia";
import ConfirmacionTransferencia from "./transferir/ConfirmacionTransferencia";
import TransferenciasMasivas from "./transferir/TransferenciasMasivas";
import CreateCuentasMasivas from "./transferir/CreateCuentasMasivas2";
import CreateCuentaDestino from "./transferir/createCuentaDestino";
import VerificarDatosCuenta from "./transferir/VerificarDatosCuenta";
import CuentaInscrita from "./transferir/CuentaInscrita";
import VerificarTransferenciaMasiva from "./transferir/VerificarTransferenciaMasiva";
import VerTransferencia from "./transferir/VerTransferencia";
import TransferenciaMasivaExitosa from "./transferir/TransferenciaMasivaExitosa";

/*MOVIMIENTOS*/
import Movimientos2 from "./movimientos/MisMovimientos";
import USDDetalleBilletera from "./movimientos/USDDetalleBilletera";
import USDDetalleBilleteraMovimiento from "./movimientos/USDDetalleBilleteraMovimiento";
import Movimientos from "./movimientos/MisMovimientos";
import MovimientosResumenProducto from "./movimientos/ResumenProducto";
import DetalleBilletera from "./movimientos/DetalleBilletera";

/*DIVISAS*/
import Pagadores from "./divisas/Pagadores"
import InscribirPagadores from "./divisas/InscribirPagadores";
import InscribirPagadoresMasivamente from "./divisas/InscribirPagadoresMasivamente";

import Verificarpagador from "./divisas/Verificarpagador";
import PagadorInscrito from "./divisas/PagadorInscrito";
import Operaciones from "./divisas/Operaciones";
import VerDetalleOperacion from "./divisas/VerDetalleOperacion";
import ReportarPago from "./divisas/ReportarPago";
import CrearReporteMasivo from "./divisas/CrearReporteMasivo";
import CrearReportePago from "./divisas/CrearReportePago";
import VerificarDatosReporte from "./divisas/VerificarDatosReporte";
import ReporteVerificado from "./divisas/ReporteVerificado";

/* ADMINISTRACION/USUARIOS */
import Usuarios from "./administracion/usuarios";
import UsuariosAll from "./administracion/UsuariosAll";
import VerUsuario from "./administracion/VerUsuario";
import VerUsuarioAll from "./administracion/VerUsuarioAll";
import DatosComplementarios from "./administracion/DatosComplementarios";
import CuentaVerificada from "./administracion/CuentaVerificada";
import Funcionarios from "./administracion/funcionarios";
import Funcionario from "./administracion/funcionario";
import CreateFuncionarios from "./administracion/create_funcionarios";
import AprobarOrdenesNacionales from "./administracion/AprobarOrdenesNacionales";
import CreateLote from "./administracion/createLote";
import EliminarOrdenesNacionales from "./administracion/EliminarOrdenesNacionales";
import RechazarLote from "./administracion/RechazarLote";

/*CUENTAS BANCARIAS*/
import CuentasBancarias from "./administracion/cuentas_bancarias";
import CreateCuentasBancarias from "./administracion/create_cuentas_bancarias";
import CuentaBancaria from "./administracion/cuenta_bancaria";
import ResumenCuentaBancaria from "./administracion/ResumenCuentaBancaria";
import CuentaBancariaResult from "./administracion/cuenta_bancaria_result";

/*MOVIMIENTOS*/
import ResumenProducto from "./movimientos/ResumenProducto";

/*DIVISAS*/
import NegociarDivisas from "./administracion/NegociarDivisas";
import CrearNegociarDivisas from "./administracion/createNegociacionDivisas";
import NegociacionDivisas from "./administracion/NegociacionDivisas";
import ReporteNegociacionDivisas from "./administracion/ReporteNegociacionDivisas";
import NegociacionDivisasUsuario from "./movimientos/NegociacionDivisas";
import ReporteCuentasCliente  from "./reportes/ReporteCuentasCliente";

/*APROBACION DE CUENTAS*/
import AprobacionCuentas from "./administracion/AprobacionCuentas";
import ReporteAprobacionCuentas from "./administracion/ReporteAprobacionCuentas";
import ReporteNegociarDivisas from "./administracion/ReporteNegociarDivisas";

/*LOTES*/
import Lotes from "./administracion/Lotes";
import VerificarLote from "./administracion/VerificarLote";

/*REPORTE DE PAGOS*/
import ReporteDePagos from "./administracion/ReporteDePagos";
import ReporteDePagosAll from "./administracion/ReporteDePagosAll";
import AprobarReportePago from "./administracion/AprobarReportePago";
import VerDetalleReportePago2 from "./administracion/VerDetalleReportePago";
import VerDetalleReportePago3 from "./divisas/VerDetalleReportePago";
import Reportes from "./administracion/Reportes";
import AdministracionPagadores from "./administracion/Pagadores";

/*ORDENES*/
import OrdenesNacionales from "./administracion/OrdenesNacionales";
import ReporteOrdenesNacionales from "./administracion/ReporteOrdenesNacionales";
import OrdenesInternacionales from "./administracion/OrdenesInternacionales";

/*Cuentas Clientes*/
import CuentasClientes from "./administracion/CuentasClientes";
import CreateCuentasClientes from "./administracion/CreateCuentasClientes";
import VerificarDatosCuentaAprobar from "./administracion/VerificarDatosCuentaAprobar";
import VerificarDatosCuentaAprobarAll from "./administracion/VerificarDatosCuentaAprobarAll";
import VerificarOrdenesNacionales from "./administracion/VerificarOrdenesNacionales";

/*Comisiones*/
import Comisiones from "./administracion/Comisiones";

/*Comisiones*/
import CambiarClave from "./configuracion/Cambiar_clave";
import Costos from "./configuracion/Comisiones";
import DelegarFunciones from "./configuracion/DelegarFunciones";
import DelegarFuncionesEdit from "./configuracion/DelegarFuncionesEdit";

/*Politicas*/
import Politicas from "./configuracion/Politicas";

/*pruebas con socket*/
import Socket from "./Socket";

/*test pantalla intermedia*/
import PowwiVerificacion from "../components/PowwiVerificacion";

/*Reportes*/
import Extractos from "./reportes/Extractos";
//import Movimientos from "./reportes/Movimientos";
import VerMovimientos from "./reportes/VerMovimientos";
import RelacionPagos from "./reportes/RelacionPagos";
import Gastos from "./reportes/Gastos";
import '../assets/fontello.css';
import '../assets/menu.css';

import ReporteEstadosCuenta from "./administracion/ReporteEstadosCuenta";

import Emails from "./administracion/emails";
import CreateEmail from "./administracion/createEmail";


import { faArrowCircleLeft,faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Powwi from "./powwi/index";



import NotFound from "./Init404";


import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

import Store from "../helpers/Store";


const time_=300000

function App(props) {
  const [open, setOpen] = useState(false);
  const [menuShow, setMenuShow] = useState(false);
  const [position, setPosition] = useState(0);
  const [menuToggle, setMenuToggle] = useState(false);
  const [display1, setDisplay1] = useState(false);
  const [display2, setDisplay2] = useState(false);
  const [MyPerfil, setMyPerfil] = useState(false);


  function reportWindowSize() {
    if (window.innerWidth<500) {
      setMenuShow(false)
      //setDisplay1(true)
      //setDisplay2(true)
    }else {
      setMenuShow(true)
      //setDisplay1(false)
      //setDisplay2(false)
    }
  }
  window.onresize = reportWindowSize;

  const openSubMenu=(row,e,id)=>{
    e.preventDefault()
    setPosition(document.getElementById(id).offsetTop *1.8)

    if (open===row) {
      setOpen(false)
    }else {
      setOpen(row)
    }
  }

  useEffect(() => {
    //document.getElementById("sidebar").style.minHeight = window.innerHeight+"px";
    if (Store.get("user").user_id!==undefined) {
      //setMenu(Store.get("user").menu)
    }
    if(!sessionStorage.getItem("navegador_id")){
      Store.clear();
    }
    if (window.innerWidth<500) {
      setMenuShow(false)
    }else {
      setMenuShow(true)
    }
    escondeMenu()
    ocultarMenuTemporizador()
  },[])

  const responsiveMenuShow=()=>{
    setMenuShow(false)
  }

  const ocultarMenuTemporizador=()=>{
     setTimeout(function(){
       setOpen(false)
       setMenuToggle(true)
     }, time_);
  }

  const escondeMenu=()=>{
    document.getElementById("sidebar").addEventListener('mouseover', () => setMenuToggle(false));
    document.getElementById("sidebar").addEventListener('mouseleave', () => ocultarMenuTemporizador());
    document.getElementById("clickevent").addEventListener("click", () => {setMenuToggle(true); setOpen(false); setMyPerfil(false);});
  }


  return  <StateContext.Provider value={{...props}}>
            <Router>
              <div className="position-absolute w-100 top-0">
                <div className="p-3 bg-gray text-white">
                  s
                </div>
              </div>
              <div className="container-fluid min-height">
                <div className="row">
                  <div className={!menuToggle?"col-6 col-md-2 sidebar":"col-1 col-md-1 sidebar"} id="sidebar" >
                    <div className="row justify-content-center mt-3 ">
                      <div className="text-center col-11  mb-3">
                        <FontAwesomeIcon  icon={!menuToggle?faArrowCircleLeft:faArrowCircleRight}

                                        className={!menuToggle?"d-none arrown-toggle":"d-none cursor-pointer col-5 arrown-toggle"}
                                        onClick={()=>setMenuToggle(menuToggle?false:true)}/>
                        <img src={logo} alt="Pagoslocales" className="img-fluid"/>
                      </div>
                      {parseInt(props.user.estatus)===2?<div className={!menuToggle?"col-12 p-0":"d-nones"} id="vertical">
                        <nav className="navbar-default">

                          <div id="navbarSupportedContent" className="collapse-navbar-collapse">
                            <ul className="navbar-nav d-flex flex-column">
                              {ItemsMenu.Modulos.length>0?<>{
                                ItemsMenu.Modulos.map((row,key)=>{

                                  if (  parseInt(props.user.tipo_usuario_id)<2 &&
                                        parseInt(props.user.estatus)<2 &&
                                        row.label!=='Home') {
                                    return <div className="p-5" key={key}></div>
                                  }else if (  parseInt(props.user.tipo_usuario_id)<2 &&
                                              parseInt(props.user.estatus)<2 &&
                                              row.label==='Home') {
                                    return <li key={key} className="nav-item dropdown ttmenu-full" >
                                              <NavLink to={row.url}>
                                                <span className="cursor-pointer">
                                                  <i className={row.ico} ></i>
                                                  {row.label}
                                                </span>
                                              </NavLink>
                                            </li>
                                  }else {

                                    if (props.user.funcionario_id===undefined  ) {

                                      return  <li key={key} className="nav-item dropdown ttmenu-full" >

                                                  { ((props.user.tipo_usuario_id==="4" || props.user.tipo_usuario_id==="5") &&
                                                      row.label!=='Administración') ||
                                                      props.user.tipo_usuario_id==="1" ?<>

                                                    {row.items && (parseInt(props.user.tipo_usuario_id)<5 ||  (props.user.tipo_usuario_id==="5" && props.privilegios[row.url]!==undefined))?<>

                                                      <a href={row.url}  data-toggle={row.items?"dropdown":""}
                                                          className={row.items && !menuToggle?"dropdown-toggle cursor-pointer":"cursor-pointer"}
                                                          aria-expanded="false"
                                                          id={"id_"+row.label}
                                                          onClick={(e)=>openSubMenu("show"+key,e,"id_"+row.label)}>

                                                          <div className="row w-100">
                                                            <div className="col-3">
                                                              <i className={!menuToggle?row.ico+" demo-icon h5 text-rosa":row.ico+" demo-icon h5 text-rosa"} ></i>
                                                            </div>
                                                            <div className="col">
                                                              {!menuToggle?<div>{row.label}</div>:false}
                                                            </div>
                                                          </div>
                                                      </a></>:<>
                                                      {(parseInt(props.user.tipo_usuario_id)<5 ||  (props.user.tipo_usuario_id==="5" && props.privilegios[row.url]!==undefined))?<>
                                                        <NavLink to={row.url} >
                                                            <div className="row w-100">
                                                              <div className="col-3">
                                                                <i className={!menuToggle?row.ico+" demo-icon h5 text-rosa":row.ico+" demo-icon h5 text-rosa"} ></i>
                                                              </div>
                                                              <div className="col">
                                                                {!menuToggle?<div>{row.label}</div>:false}
                                                              </div>
                                                            </div>
                                                        </NavLink>
                                                      </>:false}
                                                      </>
                                                    }
                                                  </>:false}

                                                <ul className={open==="show"+key?"dropdown-menu vertical-menu show":"d-none dropdown-menu vertical-menu"} id={"show"+key} style={{top:0}}>
                                                  <li>
                                                    <div className="ttmenu-content">
                                                      <div className="row-mega-menu">
                                                      {row.items?<>{row.items.map((row2,key2)=>{
                                                        return  <ul key={"link"+key2}>
                                                                  {(parseInt(props.user.tipo_usuario_id)<5 ||  (props.user.tipo_usuario_id==="5" && props.privilegios[row2.url]!==undefined))?<>
                                                                    <li className={props.user.cuenta!=='Empresarial' && row2.empresas!==undefined?'d-none':''}>
                                                                      {row2.url==='#' && row2.blank!==undefined?<>
                                                                        <a href={row2.blank} target="_blank">
                                                                          {row2.label}
                                                                        </a>
                                                                        </>:<NavLink  to={row2.url}
                                                                                      activeClassName="selected"
                                                                                      onClick={()=>setOpen(false)}>
                                                                              {row2.label}
                                                                            </NavLink>
                                                                      }
                                                                    </li>
                                                                  </>:false}
                                                                </ul>
                                                      })}</>:false}
                                                      </div>
                                                    </div>
                                                  </li>
                                                </ul>
                                              </li>
                                    }else if(props.user.funcionario_id!==undefined && (row.label==="Administración" || row.label==="Home")){

                                      return  <li key={key} className="nav-item dropdown ttmenu-full" >
                                                {row.items?<>
                                                <a href={row.url}  data-toggle={row.items?"dropdown":""}
                                                    className={row.items?"dropdown-toggle cursor-pointer":"cursor-pointer"}
                                                    aria-expanded="false"
                                                    id={"id_"+row.label}
                                                    onClick={(e)=>openSubMenu("show"+key,e,"id_"+row.label)}>
                                                  <span className="cursor-pointer">
                                                    <i className={row.ico} ></i>
                                                    {row.label}
                                                  </span>
                                                </a></>:<>
                                                <NavLink to={row.url}>
                                                  <span className="cursor-pointer">
                                                    <i className={row.ico} ></i>
                                                    {row.label}
                                                  </span>
                                                </NavLink>
                                                </>}
                                                <ul className={open==="show"+key?"dropdown-menu vertical-menu show":"d-none dropdown-menu vertical-menu"} id={"show"+key}>
                                                  <li>
                                                    <div className="ttmenu-content">
                                                      <div className="row-mega-menu">
                                                      {row.items?<>{row.items.map((row2,key2)=>{
                                                        return  <ul key={"link"+key2}>
                                                                  <li >
                                                                    <NavLink  to={row2.url}
                                                                              activeClassName="selected"
                                                                              onClick={()=>setOpen(false)}>
                                                                      {row2.label}
                                                                    </NavLink>
                                                                  </li>
                                                                </ul>
                                                      })}</>:false}
                                                      </div>
                                                    </div>
                                                  </li>
                                                </ul>
                                              </li>
                                    }else {
                                      return false
                                    }
                                  }
                                })
                              }</>:false}
                              <li>
                                <a className="text-white text-left text-left-float" href={"https://api.whatsapp.com/send?phone=573195577552&text=Hola,%20necesito%20información%20de%20mi%20cuenta%20"+props.user.celular} target="_blank">

                                  <div className="row w-100">
                                    <div className="col-3">
                                      <i className="icon-notificacion demo-icon h5 text-rosa" ></i>
                                    </div>
                                    <div className="col">
                                      {!menuToggle?<div>Necesito ayuda</div>:false}
                                    </div>
                                  </div>
                                </a>
                              </li>

                            </ul>
                          </div>
                        </nav>
                      </div>: <div className="col-12 p-0" id="vertical">
                                <nav className="navbar-default">
                                  <div id="navbarSupportedContent" className="collapse-navbar-collapse">
                                    <ul className="navbar-nav d-flex flex-column">
                                      <li>
                                        <a className="text-white" href={"https://api.whatsapp.com/send?phone=573195577552&text=Hola,%20necesito%20información%20de%20mi%20cuenta%20"+props.user.celular} target="_blank">Necesito ayuda</a>
                                      </li>
                                    </ul>
                                  </div>
                                </nav>
                                </div>}
                              </div>
                  </div>
                  <div className={!menuToggle && !menuShow?"col-12 bg-light":!menuToggle && menuShow?"col-10 bg-light":"col-12 col-sm-11 bg-light"} >
                      <div className="navtop">
                        <div className="row">
                          <div className="barra-superior">
                            <Breadcrumbs  open={open}
                                          setOpen={setOpen} {...props}
                                          menuShow={menuShow}
                                          setMenuShow={setMenuShow}
                                          menuToggle={menuToggle}
                                          setMenuToggle={setMenuToggle}
                                          MyPerfil={MyPerfil}
                                          setMyPerfil={setMyPerfil}
                                          />
                          </div>
                          <div className="col text-right">
                            <Profile  {...props}/>
                          </div>
                        </div>
                      </div>
                      <div id="clickevent">
                        {parseInt(props.user.estatus)===2?<div className="text-uppercase">
                          <Switch >
                            <Route exact path="/">
                              {props.user.funcionario_id!==undefined?<InitFuncionario/>:<Init display1={display1} setDisplay1={setDisplay1} display2={display2} setDisplay2={setDisplay2} {...props}/>}
                            </Route>

                            <Route path="/Powwi">
                              <Powwi/>
                            </Route>

                            <Route path="/PowwiVerificacion">
                              <PowwiVerificacion/>
                            </Route>

                            <Route path="/Configuracion/DelegarFunciones">
                              <DelegarFunciones/>
                            </Route>

                            <Route path="/Configuracion/DelegarFuncionesEdit/:id">
                              <DelegarFuncionesEdit/>
                            </Route>

                            <Route path="/Configuracion/Costos">
                              <Costos/>
                            </Route>

                            <Route path="/Transferir/TransferenciaMasivaExitosa/:id">
                              <TransferenciaMasivaExitosa/>
                            </Route>

                            <Route path="/Reportes/Usuarios">
                              <ReporteCuentasCliente/>
                            </Route>
                            <Route path="/Socket">
                              <Socket/>
                            </Route>
                            <Route exact path="/Administracion/Reporte/NegociarDivisas">
                              <ReporteNegociarDivisas/>
                            </Route>
                            <Route exact path="/Administracion/Reporte/ReporteEstadosCuenta">
                              <ReporteEstadosCuenta/>
                            </Route>
                            <Route exact path="/Administracion/Emails">
                              <Emails/>
                            </Route>
                            <Route exact path="/Administracion/Email/:id">
                              <CreateEmail/>
                            </Route>
                            <Route exact path="/Administracion/createEmail">
                              <CreateEmail/>
                            </Route>
                            <Route path="/Movimientos/DetalleBilletera/:id_billetera">
                              <DetalleBilletera/>
                            </Route>
                            <Route path="/Movimientos/NegociacionDivisas/:id_billetera/:id_negociacion">
                              <NegociacionDivisasUsuario/>
                            </Route>
                            <Route exact path="/Transferir/ConfirmacionTransferencia/:transferencias_id">
                              <ConfirmacionTransferencia/>
                            </Route>
                            <Route path="/Transferir/VerTransferencia/:cuenta_id/:transferencias_id">
                              <VerTransferencia/>
                            </Route>
                            <Route exact path="/Transferir/TransferenciasMasivas">
                              <TransferenciasMasivas/>
                            </Route>
                            <Route exact path="/Transferir/CreateCuentasMasivas">
                              <CreateCuentasMasivas/>
                            </Route>
                            <Route path="/CuentaVerificada/:usuario_id">
                              <CuentaVerificada/>
                            </Route>
                            <Route path="/Administracion/RechazarLote/:id/:lote_pago_id">
                              <RechazarLote/>
                            </Route>
                            <Route path="/Administracion/EliminarOrdenesNacionales/:transferencias_id">
                              <EliminarOrdenesNacionales/>
                            </Route>
                            <Route path="/Transferir/VerificarTransferencia/:id">
                              <VerificarTransferencia/>
                            </Route>
                            <Route path="/Transferir/VerificarTransferencia">
                              <VerificarTransferencia/>
                            </Route>
                            <Route path="/VerificarTransferenciaCreacionLote/:id">
                              <VerificarTransferencia/>
                            </Route>
                            <Route path="/VerificarTransferencia">
                              <VerificarTransferencia/>
                            </Route>
                            <Route path="/Administracion/AprobarOrdenesNacionales/:transferencias_id">
                              <AprobarOrdenesNacionales/>
                            </Route>
                            <Route path="/VerificarLote/:lote_pago_id">
                              <VerificarLote/>
                            </Route>
                            <Route path="/Administracion/VerificarLote/:lote_pago_id">
                              <VerificarLote/>
                            </Route>
                            <Route path="/Administracion/CreateLote">
                              <CreateLote/>
                            </Route>
                            <Route exact path="/Transferir/Transferir/RetirarBolsillo/:bolsillo">
                              <Transferir {...props}/>
                            </Route>
                            <Route exact path="/Transferir/Transferir/AbonarBolsillo/:bolsillo">
                              <Transferir {...props}/>
                            </Route>
                            <Route exact path="/Transferir/Transferir/:id">
                              <Transferir {...props}/>
                            </Route>
                            <Route exact path="/Transferir/Transferir">
                              <Transferir {...props}/>
                            </Route>
                            <Route exact path="/VerificarTransferenciaMasiva">
                              <VerificarTransferenciaMasiva/>
                            </Route>
                            <Route path="/Movimientos/ResumenProducto/:id">
                              <MovimientosResumenProducto/>
                            </Route>
                            <Route path="/Movimientos/USDDetalleBilleteraMovimiento/:id_billetera/:id_transferencia">
                              <USDDetalleBilleteraMovimiento/>
                            </Route>
                            <Route path="/Movimientos/USDDetalleBilletera/:id">
                              <USDDetalleBilletera/>
                            </Route>
                            <Route path="/Movimientos">
                              <Movimientos2/>
                            </Route>
                            <Route path="/ResumenProducto">
                              <ResumenProducto/>
                            </Route>
                            <Route path="/Divisas/PagadorInscrito/:id">
                              <PagadorInscrito/>
                            </Route>
                            <Route path="/Divisas/Verificarpagador/:id">
                              <Verificarpagador/>
                            </Route>
                            <Route path="/Divisas/Verificarpagador">
                              <Verificarpagador/>
                            </Route>
                            <Route path="/Divisas/CrearReportePago/:id">
                              <CrearReportePago/>
                            </Route>
                            <Route path="/Divisas/CrearReporteMasivo/">
                              <CrearReporteMasivo/>
                            </Route>
                            <Route path="/Divisas/CrearReportePago">
                              <CrearReportePago/>
                            </Route>
                            <Route path="/Divisas/VerificarDatosReporte/:id">
                              <VerificarDatosReporte/>
                            </Route>
                            <Route path="/Divisas/Pagadores">
                              <Pagadores/>
                            </Route>
                            <Route path="/Divisas/ReporteVerificado/:id">
                              <ReporteVerificado/>
                            </Route>
                            <Route path="/Divisas/InscribirPagadores/:id">
                              <InscribirPagadores/>
                            </Route>
                            <Route path="/Divisas/InscribirPagadores">
                              <InscribirPagadores/>
                            </Route>
                            <Route path="/Divisas/InscribirPagadoresMasivamente">
                              <InscribirPagadoresMasivamente/>
                            </Route>
                            <Route path="/Divisas/ReportarPago">
                              <ReportarPago/>
                            </Route>
                            <Route path="/Divisas/VerDetalleReportePago/:id">
                              <VerDetalleReportePago3/>
                            </Route>
                            <Route path="/Administracion/VerUsuario/:usuario_id/:estatus">
                              <VerUsuario/>
                            </Route>
                            <Route path="/Administracion/Reportes/VerUsuario/:usuario_id/:estatus">
                              <VerUsuarioAll/>
                            </Route>
                            <Route path="/DatosComplementarios/:usuario_id">
                              <DatosComplementarios/>
                            </Route>
                            <Route path="/Divisas/VerDetalleOperacion/:id/:billetera_id">
                              <VerDetalleOperacion/>
                            </Route>
                            <Route path="/Divisas/VerDetalleOperacion/:id">
                              <VerDetalleOperacion/>
                            </Route>
                            <Route path="/Divisas/Operaciones*">
                              <Operaciones/>
                            </Route>
                            <Route path="/Administracion/Usuarios/:estatus">
                              <Usuarios/>
                            </Route>

                            <Route path="/Administracion/Usuarios*">
                              <Usuarios/>
                            </Route>

                            <Route exact path="/Bolsillos/Detalle/:id/Movimiento/:movimiento_id">
                              <BolsillosDetalleMovimiento/>
                            </Route>
                            <Route exact path="/Bolsillos/Detalle/:id">
                              <BolsillosDetalle/>
                            </Route>
                            <Route path="/Bolsillos/Editar/:id">
                              <BolsillosEditar/>
                            </Route>
                            <Route path="/bolsillo/create">
                              <BolsillosCreate/>
                            </Route>
                            <Route path="/bolsillos">
                              <Bolsillos/>
                            </Route>

                            <Route exact path="/Administracion/Reportes">
                              <Reportes/>
                            </Route>

                            <Route exact path="/Administracion/Reporte/ReportePago">
                              <ReporteDePagosAll any={true}/>
                            </Route>

                            <Route path="/Administracion/Reportes/Usuarios/:id">
                              <UsuariosAll/>
                            </Route>

                            <Route path="/Administracion/Reportes/Usuarios">
                              <UsuariosAll/>
                            </Route>

                            <Route path="/Administracion/Pagadores">
                              <AdministracionPagadores/>
                            </Route>
                            <Route path="/Utilidades*">
                              <Utilidades/>
                            </Route>
                            <Route path="/Formularios*">
                              <Formularios/>
                            </Route>
                            <Route path="/Proyectos*">
                              <Proyectos/>
                            </Route>
                            <Route path="/Twl*">
                              <Twl/>
                            </Route>
                            <Route path="/Clientes*">
                              <Clientes/>
                            </Route>
                            <Route path="/Empresas">
                              <Empresas/>
                            </Route>
                            <Route path="/Ventas*">
                              <Ventas/>
                            </Route>
                            <Route path="/Finanzas*">
                              <Finanzas/>
                            </Route>
                            <Route path="/Administracion/Funcionarios">
                              <Funcionarios/>
                            </Route>
                            <Route path="/Administracion/createFuncionarios/:id">
                              <CreateFuncionarios/>
                            </Route>
                            <Route path="/Administracion/createFuncionarios">
                              <CreateFuncionarios/>
                            </Route>
                            <Route path="/Administracion/Funcionario/:id">
                              <Funcionario/>
                            </Route>
                            <Route path="/Administracion/CuentasBancarias">
                              <CuentasBancarias/>
                            </Route>
                            <Route path="/Administracion/createCuentasBancarias">
                              <CreateCuentasBancarias/>
                            </Route>
                            <Route path="/Administracion/CuentaBancaria/:id">
                              <CuentaBancaria/>
                            </Route>
                            <Route path="/Administracion/CuentaBancariaResult">
                              <CuentaBancariaResult/>
                            </Route>
                            <Route path="/Administracion/ResumenCuentaBancaria/:id">
                              <ResumenCuentaBancaria/>
                            </Route>
                            <Route path="/Administracion/NegociarDivisas">
                              <NegociarDivisas/>
                            </Route>
                            <Route path="/Administracion/createNegociacionDivisas">
                              <CrearNegociarDivisas/>
                            </Route>
                            <Route path="/Administracion/NegociacionDivisas/:id">
                              <NegociacionDivisas/>
                            </Route>
                            <Route path="/Administracion/Reporte/NegociacionDivisas/:id">
                              <ReporteNegociacionDivisas/>
                            </Route>
                            <Route path="/Administracion/Lotes">
                              <Lotes/>
                            </Route>
                            <Route path="/Administracion/VerDetalleReportePago/:id">
                              <VerDetalleReportePago2/>
                            </Route>
                            <Route path="/Administracion/ReportePago">
                              <ReporteDePagos/>
                            </Route>
                            <Route path="/Administracion/AprobarReportePago/:id">
                              <AprobarReportePago/>
                            </Route>
                            <Route path="/Administracion/OrdenesInternacionales">
                              <OrdenesInternacionales/>
                            </Route>
                            <Route path="/Administracion/OrdenesNacionales">
                              <OrdenesNacionales/>
                            </Route>
                            <Route path="/Administracion/Reporte/OrdenesNacionales">
                              <ReporteOrdenesNacionales/>
                            </Route>
                            <Route path="/Administracion/CuentasClientes">
                              <CuentasClientes/>
                            </Route>
                            <Route path="/Administracion/CreateCuentasClientes/:id">
                              <CreateCuentasClientes/>
                            </Route>
                            <Route path="/Administracion/CreateCuentasClientes">
                              <CreateCuentasClientes/>
                            </Route>
                            <Route path="/Administracion/AprobacionCuentas">
                              <AprobacionCuentas/>
                            </Route>
                            <Route path="/Administracion/Reporte/AprobacionCuentas">
                              <ReporteAprobacionCuentas/>
                            </Route>
                            <Route exact path="/Administracion/Comisiones">
                              <Comisiones {...props}/>
                            </Route>
                            <Route exact path="/Administracion/Comisiones/:id">
                              <Comisiones {...props}/>
                            </Route>
                            <Route path="/Configuracion/Cambiar_clave">
                              <CambiarClave/>
                            </Route>
                            <Route path="/Configuracion/Politicas">
                              <Politicas/>
                            </Route>
                            <Route path="/Reportes/Extractos">
                              <Extractos/>
                            </Route>
                            <Route path="/Reportes/Movimientos">
                              <Movimientos/>
                            </Route>
                            <Route path="/Reportes/VerMovimientos">
                              <VerMovimientos/>
                            </Route>
                            <Route path="/Reportes/RelacionPagos">
                              <RelacionPagos/>
                            </Route>
                            <Route path="/Reportes/Gastos">
                              <Gastos/>
                            </Route>
                            <Route path="/Transferir/createCuentaDestino/:id">
                              <CreateCuentaDestino/>
                            </Route>
                            <Route path="/Transferir/createCuentaDestino">
                              <CreateCuentaDestino/>
                            </Route>
                            <Route path="/Transferir/VerificarDatosCuenta/:id">
                              <VerificarDatosCuenta/>
                            </Route>
                            <Route path="/Transferir/CuentaInscrita/:id">
                              <CuentaInscrita/>
                            </Route>
                            <Route path="/Transferir/VerificarDatosCuentaAprobar/:id">
                              <VerificarDatosCuentaAprobar/>
                            </Route>
                            <Route path="/Administracion/VerificarOrdenesNacionales/:id">
                              <VerificarOrdenesNacionales/>
                            </Route>
                            <Route path="/Administracion/VerificarDatosCuentaAprobar/:id">
                              <VerificarDatosCuentaAprobar/>
                            </Route>
                            <Route path="/Administracion/Reporte/VerificarDatosCuentaAprobar/:id">
                              <VerificarDatosCuentaAprobarAll/>
                            </Route>
                            <Route component={NotFound} />
                          </Switch>
                          </div>:parseInt(props.user.estatus)===1?<div className="mt-5 text-center h2"><InitNoVerificados/> <div>En espera de activación por parte del administrador</div></div>:<div className="mt-5 text-center h2">
                            <div>Tu solicitud de activación de cuenta, no fue aprobada</div>
                          </div>
                        }
                    </div>
                  </div>
                </div>
              </div>
          </Router>
        </StateContext.Provider>
}

export default App;
