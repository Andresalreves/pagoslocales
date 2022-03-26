import React,{useState,useEffect} from 'react';
import Header from '../../components/header_forms_andres';
import {NavLink,useHistory,useParams} from "react-router-dom";
import Functions from "../../helpers/Functions";
//import OptionCard from "../../components/OptionCard";
//import Table from "../../screens/table";

const test      = true
const opciones  = [ {label:"Listado de funcionarios activos",value:1},
                    {label:"Listado de funcionarios inactivos",value:0}]


const App=()=>{
    let params = useParams();
    let history = useHistory();
    const [data, setData] = useState({lote:{},transferencias_lote:[]});
    useEffect(() => {
        getInit()
    },[])
    const getInit=()=>{
        Functions.PostAsync("Administracion","getLote",params,{},{name:"callbackContinue",funct:callbackContinue})
    }

    const callbackContinue=(response)=>{
        setData(response.data);
    }

    const RechazarTransferencia=(e)=>{
        e.preventDefault();

    }

  return    <div className="Contenido-Home">
                <div className="row mt-4">
                    <div className="col-10 m-auto">
                        <div className="card border-card">
                            <div className="card-body p-5">
                                <Header title="Resumen" estado={"pendiente"} classIcon="icon-documento ico-generico" class="text-left" NavLink={NavLink} to="/"/>
                                <hr/>
                                <div className="row">
                                    <div className="col-md-6 mt-3">
                                        <div className="col-md-12 mt-2 pl-0 d-flex">
                                            <div>
                                                <div className="label"><b>Nombre lote</b></div>
                                                <div className="label text-gray">{data.lote.nombre_lote!==undefined?data.lote.nombre_lote:false}</div>
                                            </div>
                                            <NavLink to="createCuentaDestino" className="cambiar" >Cambiar <i className="icon-cambiar ml-2"></i></NavLink>
                                        </div>
                                        <div className="col-md-12 mt-2 pl-0 d-flex">
                                            <div>
                                                <div className="label"><b>Registros iniciales</b></div>
                                                <div className="label text-gray"><b>{data.lote.registros_iniciales!==undefined?data.lote.registros_iniciales:false}</b></div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mt-2 pl-0 d-flex">
                                            <div>
                                                <div className="label"><b>Monto inicial</b></div>
                                                <div className="label text-gray"><b>{data.lote.monto_inicial!==undefined?data.lote.monto_inicial:false}</b></div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mt-2 pl-0 d-flex">
                                            <div>
                                                <div className="label"><b>Usuario creador</b></div>
                                                <div className="label text-gray"><b>{data.lote.responsable_string!==undefined?data.lote.responsable_string:false}</b></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mt-3">
                                        <div className="col-md-12 mt-2 pl-0 d-flex">
                                            <div>
                                                <div className="label"><b>Cuenta bancaria</b></div>
                                                <div className="label text-gray"><b>{data.lote.cuenta_bancaria_string!==undefined?data.lote.cuenta_bancaria_string:false}</b></div>
                                            </div>
                                            <NavLink to="createCuentaDestino" className="cambiar">Cambiar <i className="icon-cambiar ml-2"></i></NavLink>
                                        </div>
                                        <div className="col-md-12 mt-2 pl-0 d-flex">
                                            <div>
                                                <div className="label"><b>Costo inicial transferencia</b></div>
                                                <div className="label text-gray"><b>{data.lote.costo_inicial!==undefined?data.lote.costo_inicial:false}</b></div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mt-2 pl-0 d-flex">
                                            <div>
                                                <div className="label"><b>Iva inicial</b></div>
                                                <div className="label text-gray"><b>{data.lote.iva_inicial!==undefined?data.lote.iva_inicial:false}</b></div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mt-2 pl-0 d-flex">
                                            <div>
                                                <div className="label"><b>Total lote inicial</b></div>
                                                <div className="label text-gray"><b>{data.lote.total_lote_inicial!==undefined?data.lote.total_lote_inicial:false}</b></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-12 listados">
                                <div className="card">
                                    <div className="card-header pb-0">
                                        <div  className="col text-title text-rosa cursor-pointer border-bottom-rosa-x3 pb-2 pl-5">
                                            <i className="icon-lista-divisas ml-4"></i>Detalles Lote.
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th className="text-center"><b>Consecutivo</b></th>
                                                    <th className="text-center"><b>Ordenante</b></th>
                                                    <th className="text-center"><b>Entidad</b></th>
                                                    <th className="text-center"><b>Valor</b></th>
                                                    <th className="text-center">Costo transferencia</th>
                                                    <th className="text-center">IVA</th>
                                                    <th className="text-center">Aciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {console.log(data.transferencias_lote)}
                                                {data.transferencias_lote!==undefined?data.transferencias_lote.map((row,key)=>{
                                                    return  <>
                                                                <tr>
                                                                    <td key={key}>
                                                                        {row.consecutivo}
                                                                    </td>
                                                                    <td key={key}>
                                                                        {row.ordenante}
                                                                    </td>
                                                                    <td key={key}>
                                                                        {row.entidad}
                                                                    </td>
                                                                    <td key={key}>
                                                                        {row.valor_transferir}
                                                                    </td>
                                                                    <td key={key}>
                                                                        {row.costo_transferencia}
                                                                    </td>
                                                                    <td key={key}>
                                                                        {row.iva}
                                                                    </td>
                                                                    <td className="text-center">
                                                                        <NavLink to={`/VerificarOrdenesNacionales/${row.transferencias_id}`}>
                                                                            <i className="icon-ver-tabla"></i>
                                                                        </NavLink>
                                                                        <NavLink to={`/EliminarOrdenesNacionales/${row.transferencias_id}`}>
                                                                            <i className="icon-anular-rechazar text-danger"></i>
                                                                        </NavLink>
                                                                    </td>
                                                                </tr>
                                                            </>
                                                }):false}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
}
export default App
