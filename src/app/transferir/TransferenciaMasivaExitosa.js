import React,{useState,useEffect} from 'react';
import Header from '../../components/header_forms_andres';
import {NavLink,useParams} from "react-router-dom";
import Store from '../../helpers/Store';
import Config from '../../helpers/Config';
import Functions from '../../helpers/Functions';

const App=()=>{
  let parametros = useParams();
  const [data, setData] = useState([]);
  const [id, setId] = useState(false);
  const [total, setTotal] = useState({
                                        iva:0,
                                        valor_transferir:0,
                                        valor_transferencia:0,
                                      });
  const [cuenta_origen, setCuenta_origen] = useState({});

  useEffect(() => {
    let send  = {id:parametros.id}
    Functions.PostAsync("Transferir","GetTransferenciaMasiva",send,{},{name:"callbackInit",funct:callbackInit})
  },[])

  function callbackInit(response){
    if (response.data!==undefined) {
      setData(response.data)
      calcularTotales(response.data)
      setCuenta_origen(response.cuenta_origen)
      setId(response.id)
    }
  }

  function calcularTotales(data){
    let total_    = {...total}
    data.map((row,key)=>{
      total_.iva                  += row.iva
      total_.valor_transferir     += row.valor_transferir
      return total_.valor_transferencia  += row.comision
    })
    setTotal(total_)
  }

  const open=(url)=>{
    window.open(url)
  }

  return    <div className="Contenido-Home">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title-home mb-4">Transferir masivamente</div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-12 m-auto">
                        <div className="card border-card">
                            <div className="card-body p-5">
                                <Header title="¡Tranferencia exitosa!" classIcon="icon-actualizado-completo ico-generico" />
                                <hr/>
                                <div className="row">
                                    <div className="col-md-6 mt-3">
                                        <div className="col-md-12 mt-2 pl-0 d-flex">
                                            <div>
                                                <div className="label"><b>Cuenta Origen</b></div>
                                                <div className="label text-gray">{cuenta_origen.tipo!==undefined?cuenta_origen.tipo:false} <b>{cuenta_origen.nro_cuenta!==undefined?cuenta_origen.nro_cuenta:false}</b></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mt-3">
                                        <div className="col-md-12 mt-2 pl-0 d-flex">
                                            <div>
                                                <div className="label"><b>Total valor a transferir</b></div>
                                                <div className="label text-gray">
                                                  {Functions.format(total.valor_transferir,2)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-6 mt-3">
                                      <div className="col-md-12 mt-2 pl-0 d-flex">
                                          <div>
                                              <div className="label"><b>Total valor transferencia</b></div>
                                              <div className="label text-gray">
                                                {Functions.format(total.valor_transferencia,2)}
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="col-md-6 mt-3">
                                      <div className="col-md-12 mt-2 pl-0 d-flex">
                                          <div>
                                              <div className="label"><b>Total IVA</b></div>
                                              <div className="label text-gray">
                                                {Functions.format(total.iva,2)}
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                </div>
                                <hr/>
                                <div className="table-responsive p-0">
                                    <table className="table">
                                        <thead className="mb-5">
                                            <tr>
                                                <th><b>Cuenta destino</b></th>
                                                <th><b>Valor transferir</b></th>
                                                <th><b>Valor Transferencia</b></th>
                                                <th><b>Iva</b></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                          {data.map((row,key)=>{
                                            //console.log(row);
                                            if (row.estatus_actual===2) {
                                              return <tr key={key}>

                                                          <td  className="text-center">{row.cuenta_origen.tipo_cuenta} | {row.cuenta_origen.banco} | <b>{row.cuenta_origen.nro_cuenta}</b></td>
                                                          <td  className="text-right">{row.valor_transferir_string}</td>
                                                          <td  className="text-right">{row.comision_string} COP</td>
                                                          <td  className="text-right">{row.iva_string} COP</td>
                                                      </tr>
                                            }else {
                                              return false
                                            }

                                          })}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="Importante mt-4 text-gray">
                                    <b>Importante:</b> Reporte de pago inscrito satisfactoriamente, si tú reporte aparece en estado pendiente aún se encuentra en revisión de nuestro equipo pagoslocales.com; quienes procederán con la revisión en cuentas internacionales antes de acreditar el saldo, después de revisado quedará en estado Acreditado, lo que significará que el dinero estará abonado en tu cuenta en USD, si por el contrario aparece en estado Rechazado singnifica que estos dineros no fueron acreditados en nuestros métodos de pagos internacionales.
                                </div>
                                <div className="text-center mt-4 col-md-12">
                                    {id?<>
                                        <div className="text-rosa mr-2"
                                          onClick={()=>open(Config.ConfigApirest+"PDF/Movimientos/getMovimiento?skip=true&transferencias_id="+id+"&token="+Store.get("user").token)}>
                                          Descargar
                                        </div>
                                      </>:false}
                                    <NavLink to="/Transferir/Transferir" className="btn btn-primary2 mb-3 mr-3">Terminar</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
}
export default App
