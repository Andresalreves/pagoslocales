import React,{useState,useEffect} from 'react';
import Header from '../../components/header_forms_andres';
import {NavLink,useHistory,useParams} from "react-router-dom";
import Functions from "../../helpers/Functions";
import StateContext from '../../helpers/ContextState'

const test      = true
const opciones  = [ {label:"Listado de funcionarios activos",value:1},
                    {label:"Listado de funcionarios inactivos",value:0}]


const App=()=>{
    const context = React.useContext(StateContext);
    let params    = useParams();
    let history   = useHistory();
    const [data, setData] = useState({lote:{},transferencias_lote:[]});
    useEffect(() => {
        getInit()
    },[])
    const getInit=()=>{
        Functions.PostAsync("Administracion","getLote",params,{},{name:"callbackContinue",funct:callbackContinue})
    }

    const callbackContinue=(response)=>{
      setData({
                lote:response.data,
                transferencias_lote:response.items,
                iva:response.iva,
                iva_string:response.iva_string,
                costo_transferencia:response.costo_transferencia,
                costo_transferencia_string:response.costo_transferencia_string,
                total_lote:response.total_lote,
                total_lote_string:response.total_lote_string,
              });
    }

    const RechazarTransferencia=(e)=>{
        e.preventDefault();

    }

    const devuelveItemLote=(items_lote_id,transferencias_id)=>{
      context.setModalShow({
        show:true,
        message:<div className="text-center">
                  {"¿Deseas quitar este pago del lote?"}
                  <div className="row justify-content-center mt-3">
                    <div className="col-4" onClick={()=>{devuelveItemLoteSubmit(items_lote_id,transferencias_id); context.setModalShow({show:false}); }}>
                      <div className="btn btn-primary btn-block">Devolver</div>
                    </div>
                    <div className="col-4" onClick={()=>context.setModalShow({show:false})}>
                      <div className="btn btn-gray btn-block">Cancelar</div>
                    </div>
                  </div>
                </div>,
        size:""
      })
    }

    const devuelveItemLoteSubmit=(items_lote_id,transferencias_id)=>{
      Functions.PostAsync("Administracion","removeItemLote",{items_lote_id:items_lote_id,transferencias_id:transferencias_id},{},{name:"callbackInit",funct:callbackInit})
    }

    const callbackInit=()=>{
      getInit()
    }

  return    <div className="Contenido-Home">
                <div className="row mt-4">
                    <div className="col-10 m-auto">
                        <div className="card border-card">
                            <div className="card-body p-5">
                                <Header title="Resumen"
                                        estado={"pendiente"}
                                        classIcon="icon-documento ico-generico"
                                        class="text-left"
                                        history={window.history.back}/>
                                <hr/>
                                <div className="row">
                                    <div className="col-md-6 mt-3">
                                        <div className="col-md-12 mt-2 pl-0 d-flex">
                                            <div>
                                                <div className="label"><b>Nombre lote</b></div>
                                                <div className="label text-gray">{data.lote.nombre_lote!==undefined?data.lote.nombre_lote:false}</div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mt-2 pl-0 d-flex">
                                            <div>
                                                <div className="label"><b>Registros iniciales</b></div>
                                                <div className="label text-gray"><b>{data.lote.total_registros!==undefined?data.lote.total_registros:false}</b></div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mt-2 pl-0 d-flex">
                                            <div>
                                                <div className="label"><b>Usuario creador</b></div>
                                                <div className="label text-gray"><b>{data.lote.usuario_creador  !==undefined?data.lote.usuario_creador:false}</b></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mt-3">
                                        <div className="col-md-12 mt-2 pl-0 d-flex">
                                            <div>
                                                <div className="label"><b>Cuenta bancaria</b></div>
                                                <div className="label text-gray"><b>{data.lote.cuenta_bancaria_string!==undefined?data.lote.cuenta_bancaria_string:false}</b></div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mt-2 pl-0 d-flex">
                                            <div>
                                                <div className="label"><b>Costo inicial transferencia</b></div>
                                                <div className="label text-gray"><b>{data.costo_transferencia_string!==undefined?data.costo_transferencia_string:false}</b></div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mt-2 pl-0 d-flex">
                                            <div>
                                                <div className="label"><b>Iva inicial</b></div>
                                                <div className="label text-gray"><b>{data.iva_string!==undefined?data.iva_string:false}</b></div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mt-2 pl-0 d-flex">
                                            <div>
                                                <div className="label"><b>Total lote inicial</b></div>
                                                <div className="label text-gray"><b>{data.total_lote_string!==undefined?data.total_lote_string:false}</b></div>
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
                                                {data.transferencias_lote!==undefined?data.transferencias_lote.map((row,key)=>{
                                                    return  <>
                                                                <tr>
                                                                    <td key={key}>
                                                                        {row.consecutivo_items}
                                                                    </td>
                                                                    <td key={key}>
                                                                        {row.ordenante}
                                                                    </td>
                                                                    <td key={key}>
                                                                        {row.banco}
                                                                    </td>
                                                                    <td key={key} className="text-right">
                                                                        {row.valor_transferir_string}
                                                                    </td>
                                                                    <td key={key} className="text-right">
                                                                        {row.costo_transferencia_string}
                                                                    </td>
                                                                    <td key={key} className="text-right">
                                                                        {row.iva_string}
                                                                    </td>
                                                                    <td className="text-center">
                                                                        <NavLink to={`/Administracion/VerificarOrdenesNacionales/${row.transferencias_id}`}>
                                                                            <i className="icon-ver-tabla"></i>
                                                                        </NavLink>
                                                                        {data.lote!==undefined && data.lote.estatus!==undefined && parseInt(data.lote.estatus)===1?<>
                                                                          <span className="cursor-pointer" onClick={()=>devuelveItemLote(row.items_lote_id,row.transferencias_id)}>
                                                                              <i className="icon-anular-rechazar text-danger"></i>
                                                                          </span>
                                                                        </>:false}
                                                                        {data.lote!==undefined && data.lote.estatus!==undefined && parseInt(data.lote.estatus)===2?<>
                                                                          <NavLink to={`/Administracion/RechazarLote/${row.items_lote_id}/${row.transferencias_id}`}>
                                                                              <i className="icon-anular-rechazar text-danger"></i>
                                                                          </NavLink>
                                                                        </>:false}
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
