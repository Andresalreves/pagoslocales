import React,{useState,useEffect} from 'react';
import StateContext from '../helpers/ContextState';
import ItemsMenu from '../helpers/Constants';
import Functions from "../helpers/Functions";
import logo from '../assets/images/logo.svg';
import Store from "../helpers/Store";
import Breadcrumbs from "./breadcrumbs";
import Profile from "./profile";
import Config from "../helpers/Config";
import Modal from "../screens/modal";


import Bandeja from "./comentarios/Bandeja";

/*TRANSFERIR*/
import TransferenciasMasivas from "./transferir/TransferenciasMasivas";
import VerificarTransferenciaMasiva from "./transferir/VerificarTransferenciaMasiva";

/* ADMINISTRACION/USUARIOS */
import Usuarios from "./administracion/usuarios";
import UsuariosAll from "./administracion/UsuariosAll";
import VerUsuario from "./administracion/VerUsuario";
import VerUsuarioAll from "./administracion/VerUsuarioAll";
import Funcionarios from "./administracion/funcionarios";
import Funcionario from "./administracion/funcionario";
import CreateFuncionarios from "./administracion/create_funcionarios";
import AprobarOrdenesNacionales from "./administracion/AprobarOrdenesNacionales";
import CreateLote from "./administracion/createLote";
import RechazarLote from "./administracion/RechazarLote";

/*CUENTAS BANCARIAS*/
import CuentasBancarias from "./administracion/cuentas_bancarias";
import CreateCuentasBancarias from "./administracion/create_cuentas_bancarias";
import CuentaBancaria from "./administracion/cuenta_bancaria";
import ResumenCuentaBancaria from "./administracion/ResumenCuentaBancaria";
import CuentaBancariaResult from "./administracion/cuenta_bancaria_result";

/*DIVISAS*/
import NegociarDivisas from "./administracion/NegociarDivisas";
import CrearNegociarDivisas from "./administracion/createNegociacionDivisas";
import NegociacionDivisas from "./administracion/NegociacionDivisas";
import ReporteNegociacionDivisas from "./administracion/ReporteNegociacionDivisas";
import ReporteNegociarDivisas from "./administracion/ReporteNegociarDivisas";

/*APROBACION DE CUENTAS*/
import AprobacionCuentas from "./administracion/AprobacionCuentas";
import ReporteAprobacionCuentas from "./administracion/ReporteAprobacionCuentas";

/*LOTES*/
import Lotes from "./administracion/Lotes";
import VerificarLote from "./administracion/VerificarLote";

import AdminDetalleBilletera from "./administracion/AdminDetalleBilletera";
import AdminDetalleBilleteraUSD from "./administracion/AdminDetalleBilleteraUSD";

/*REPORTE DE PAGOS*/
import ReporteDePagos from "./administracion/ReporteDePagos";
import ReporteDePagosAll from "./administracion/ReporteDePagosAll";
import AprobarReportePago from "./administracion/AprobarReportePago";
import VerDetalleReportePago2 from "./administracion/VerDetalleReportePago";
import Reportes from "./administracion/Reportes";

/*ORDENES*/
import OrdenesNacionales from "./administracion/OrdenesNacionales";
import ReporteOrdenesNacionales from "./administracion/ReporteOrdenesNacionales";
import OrdenesInternacionales from "./administracion/OrdenesInternacionales";

/*Cuentas Clientes*/
import CuentasClientes from "./administracion/CuentasClientes";
import VerificarDatosCuentaAprobar from "./administracion/VerificarDatosCuentaAprobar";
import VerificarDatosCuentaAprobarAll from "./administracion/VerificarDatosCuentaAprobarAll";
import VerificarOrdenesNacionales from "./administracion/VerificarOrdenesNacionales";

/*Comisiones*/
import Comisiones from "./administracion/Comisiones";
import AdministracionPagadores from "./administracion/Pagadores";
import ReporteEstadosCuenta from "./administracion/ReporteEstadosCuenta";
import Emails from "./administracion/emails";
import Notificaciones from "./notificaciones/List";
import CreateEmail from "./administracion/createEmail";


import DptoSeguridad from "./dptoSeguridad";

import '../assets/fontello.css';
import '../assets/menu.css';
import NotFound from "./Init404";


import { faArrowCircleLeft,faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

const time_=3000;
let MyModal = {};

function App(props) {
  const [MyPerfil, setMyPerfil] = useState(false);
  const [menuShow, setMenuShow] = useState(false);
  const [menuToggle, setMenuToggle] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  function reportWindowSize() {
    if (window.innerWidth<500) {
      setMenuShow(false)
    }else {
      setMenuShow(true)
    }
  }
  window.onresize = reportWindowSize;

  // const openSubMenu=(row,e)=>{
  //   e.preventDefault()
  //   if (open===row) {
  //     setOpen(false)
  //   }else {
  //     setOpen(row)
  //   }
  // }

  useEffect(() => {
    //document.getElementById("sidebar").style.minHeight = window.innerHeight+"px";
    if (Store.get("user").user_id!==undefined){
      //setMenu(Store.get("user").menu)
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
       setMenuToggle(true)
     }, time_);
  }

  const escondeMenu=()=>{
    document.getElementById("sidebar").addEventListener('mouseover', () => setMenuToggle(false));
    document.getElementById("sidebar").addEventListener('mouseleave', () => ocultarMenuTemporizador());
    document.getElementById("clickevent").addEventListener("click", () => {setMenuToggle(true);});
  }

  const handleClearDB=()=>{
    Functions.PostAsync("Administracion","clearDB",{},{},{name:"callbackClearDB",funct:callbackClearDB})
  }

  const callbackClearDB=(response)=>{
    setModalShow({
      show:true,
      message:<>
                <div className="title-mensage mb-3">
                  {response.message}
                </div>
              </>,
      size:""
    })
    //console.log(response);
  }

  return  <StateContext.Provider value={{...props}}>
            <Router>
              <Modal modalShow={modalShow} setModalShow={setModalShow} />
              <div className="position-absolute w-100 top-0">
                <div className="p-3 bg-gray text-white">
                  s
                </div>
              </div>
              <div className="container-fluid min-height">
                <div className="row">

                  <div className={!menuToggle?"col-6 col-md-2 sidebar":"col-1 col-md-1 sidebar"} id="sidebar" >
                    <div className="d-block d-sm-none">
                      <FontAwesomeIcon  icon={!menuToggle?faArrowCircleLeft:faArrowCircleRight}

                                        className={!menuToggle?"d-none":"cursor-pointer col-5 "}
                                        onClick={()=>setMenuToggle(menuToggle?false:true)}/>
                    </div>
                    <div className="row justify-content-center mt-3 ">
                        <div className="text-center col-11  mb-3">
                          <img src={logo} alt="Pagoslocales" className="img-fluid"/>
                        </div>
                      {parseInt(Store.get("user").estatus)<9?<div className="col-12 p-0" id="vertical">
                        <div>
                          {ItemsMenu.Modulos[7].items.map((row2,key2)=>{
                            return <NavLink  to={row2.url}
                                                key={key2}
                                                activeClassName="selected"
                                                className={row2.label==='Seguridad' && props.user.is_security==="2"?" col-12 ":row2.label==='Seguridad' && props.user.is_security!=="2"?"d-none":" col-12 "}
                                                onClick={()=>setMenuToggle(true)}
                                                >
                                      <div  className="row">
                                          <div className={!menuToggle?"col-4 text-right":"col-12 text-center"}>
                                            <i className={!menuToggle?row2.ico+" demo-icon h6 text-rosa":row2.ico+" demo-icon h5 text-rosa"}></i>
                                          </div>
                                          {!menuToggle?<div className="col text-white pl-0">{row2.label}</div>:false}
                                      </div>
                                    </NavLink>
                                })
                          }
                        </div>
                      </div>:<div className="col-12 p-0" id="vertical"></div>}
                    </div>
                  </div>

                  <div className={!menuToggle && !menuShow?"col-12 bg-light":!menuToggle && menuShow?"col-10 bg-light":"col-12 col-sm-11 bg-light"} >
                      <div className="navtop">
                        <div className="row">
                          <div className="barra-superior">
                            <Breadcrumbs {...props} menuShow={menuShow}
                                                    setMenuShow={setMenuShow}
                                                    menuToggle={menuToggle}
                                                    setMenuToggle={setMenuToggle}
                                                    MyPerfil={MyPerfil}
                                                    setMyPerfil={setMyPerfil}
                                                    />
                          </div>
                          <div className="col text-right">
                            <Profile {...props}/>
                          </div>
                        </div>
                      </div>
                      <div id="clickevent">
                        {parseInt(Store.get("user").estatus)<9?<div className="text-uppercase">
                          <Switch>
                            {props.user.is_security==="2"?<Route path="/Administracion/seguridad">
                              <DptoSeguridad/>
                            </Route>:false}
                            <Route exact path="/Bandeja">
                              <Bandeja/>
                            </Route>

                            <Route exact path="/Administracion/Reporte/NegociarDivisas">
                              <ReporteNegociarDivisas/>
                            </Route>

                            <Route path="/Administracion/Movimientos/DetalleBilletera/:id">
                              <AdminDetalleBilletera/>
                            </Route>

                            <Route path="/Administracion/Movimientos/USDDetalleBilletera/:id">
                              <AdminDetalleBilleteraUSD/>
                            </Route>

                            <Route path="/Administracion/VerificarLote/:lote_pago_id">
                              <VerificarLote/>
                            </Route>
                            <Route path="/Administracion/RechazarLote/:id/:lote_pago_id">
                              <RechazarLote/>
                            </Route>
                            <Route path="/Administracion/CreateLote">
                              <CreateLote/>
                            </Route>
                            <Route path="/Administracion/Pagadores">
                              <AdministracionPagadores/>
                            </Route>
                            <Route exact path="/Administracion/Reporte/ReporteEstadosCuenta">
                              <ReporteEstadosCuenta/>
                            </Route>

                            <Route exact path="/Administracion/Notificaciones">
                              <Notificaciones/>
                            </Route>
                            <Route exact path="/Administracion/Notificaciones/:id">
                              <CreateEmail/>
                            </Route>
                            <Route exact path="/Administracion/createNotificaciones">
                              <CreateEmail/>
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

                            <Route exact path="/">
                              <div className="min-height-home">
                                <div className="row">
                                  <div className="col h3">
                                    Home
                                  </div>
                                </div>
                              </div>
                            </Route>
                            <Route path="/Administracion/VerUsuario/:usuario_id">
                              <VerUsuario/>
                            </Route>
                            <Route path="/Administracion/Reportes/VerUsuario/:usuario_id/:estatus">
                              <VerUsuarioAll/>
                            </Route>
                            <Route path="/Administracion/AprobarOrdenesNacionales/:transferencias_id">
                              <AprobarOrdenesNacionales/>
                            </Route>
                            <Route exact path="/VerificarTransferenciaMasiva">
                              <VerificarTransferenciaMasiva/>
                            </Route>
                            <Route exact path="/TransferenciasMasivas">
                              <TransferenciasMasivas/>
                            </Route>

                            <Route path="/Administracion/Usuarios/:estatus">
                              <Usuarios/>
                            </Route>

                            <Route path="/Administracion/Usuarios*">
                              <Usuarios/>
                            </Route>

                            <Route path="/Administracion/Reportes/Usuarios/:id">
                              <UsuariosAll/>
                            </Route>
                            <Route path="/Administracion/Reportes/Usuarios">
                              <UsuariosAll/>
                            </Route>



                            <Route exact path="/Administracion/Reportes">
                              <Reportes/>
                            </Route>

                            <Route exact path="/Administracion/Reporte/ReportePago">
                              <ReporteDePagosAll any={true}/>
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
                            <Route path="/Divisas/VerDetalleReportePago/:id">
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
                            <Route path="/Administracion/AprobacionCuentas">
                              <AprobacionCuentas/>
                            </Route>
                            <Route path="/Administracion/Reporte/AprobacionCuentas">
                              <ReporteAprobacionCuentas/>
                            </Route>
                            <Route exact path="/Administracion/Comisiones">
                              <Comisiones/>
                            </Route>
                            <Route exact path="/Administracion/Comisiones/:id/:subID">
                              <Comisiones/>
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
                          </div>:<div className="mt-5 text-center h2">Su solicitud de activación de cuenta, no fue aprobada</div>
                        }
                    </div>
                  </div>


                </div>
              </div>
          </Router>
        </StateContext.Provider>
}

export default App;
