import React,{useState,useEffect} from 'react';
//import Header from '../../components/header_forms_andres';
import { NavLink } from "react-router-dom";
import Functions from "../../helpers/Functions";
import OptionCard from "../../components/OptionCard";
import Table from "../../screens/table";

const test      = true
const opciones  = [ {label:"Listado de funcionarios activos",value:1},
                    {label:"Listado de funcionarios inactivos",value:0}]


const App=()=>{

    const onSubmit=(e)=>{
        e.preventDefault();
        alert('Hola');
        //Functions.PostAsync("Administracion","setFuncionarios",send,{},{name:"callbackSubmit",funct:callbackSubmit})
    }
  return    <div className="Contenido-Home">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title-home mb-4">Transferir</div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-7 m-auto">
                        <div className="card border-card">
                            <div className="card-body">
                                <div className="row justify-content-between m-4">
                                    <OptionCard OptionIndicator="1" TextOptionIndicator="Preparación"/>
                                    <OptionCard OptionIndicator="2" TextOptionIndicator="Verificación"/>
                                    <OptionCard OptionIndicator="3" TextOptionIndicator="Confirmación" myclass="optionActive"/>
                                </div>
                                <div className="col-md-10 ml-auto mr-auto mt-3">
                                    <div className="title-generico mt-5 mb-4">
                                        Verifica la transferencia
                                    </div>
                                    <div className="d-flex text-gray text-confirmation-tranfer">
                                        <div><b>Comprobante No. PSG-01-000001</b></div>
                                        <div className="ml-auto">26 Julio 2021 - 10:13 a.m.</div>
                                    </div>
                                    <hr/>
                                    <div className="col-md-12 mt-2 pl-0 d-flex">
                                        <div>
                                            <div className="label"><b>Cuenta de Origen</b></div>
                                            <div className="label text-gray">Billetera móvil <b>01-314-865-4127 (COP)</b></div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-2 pl-0 d-flex">
                                        <div>
                                            <div className="label"><b>Cuenta de destino</b></div>
                                            <div className="label text-gray">Fulanito Pérez | Ahorros | Colpatria <b>3218549854</b></div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-2 pl-0 d-flex">
                                        <div>
                                            <div className="label"><b>Valor a transferir</b></div>
                                            <div className="label text-gray"><b>1.000.000,00 COP</b></div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-2 pl-0 d-flex">
                                        <div>
                                            <div className="label"><b>Costo de la transferencia</b></div>
                                            <div className="label text-gray"><b>9.200.000,00 COP</b></div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-2 pl-0 d-flex">
                                        <div>
                                            <div className="label"><b>IVA</b></div>
                                            <div className="label text-gray"><b>2.300.050,54 COP</b></div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-2 pl-0 d-flex mb-4">
                                        <div>
                                            <div className="label"><b>Concepto</b></div>
                                            <div className="label text-gray"><b>Pago proveedor</b></div>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="Importante mt-4 text-gray">
                                        <b>Importante:</b> Estimado(a) cliente, te informamos que esta operación será reflejada en la cuenta del remitente el día de hoy si el pago fue realizado antes de las 15:00 Horas (03:00 PM) o el día de mañana si se realizó después de esta hora. Si realizaste la transferencia en día no hábil, cursará el primer ciclo ACH del siguiente día hábil. Cómo medida de seguridad te recordamos la importancia de cambiar periódicamente tus claves de acceso.
                                    </div>
                                    <div className="text-center mt-5">
                                        <NavLink to="/" className="linkButtonBancoRosa mr-1">Descargar</NavLink>
                                        <NavLink to="/Transferir" className="btn btn-gray text-white">Nueva transferencia</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
}
export default App
