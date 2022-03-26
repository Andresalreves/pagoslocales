import React from 'react';
import {NavLink} from "react-router-dom";

const App=()=>{
    
  return    <div className="Contenido-Home">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title-home mb-4">Transferir masivamente</div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-10 m-auto">
                        <div className="card border-card">
                            <div className="card-body p-5">
                                <div className="col-md-12 ml-auto mr-auto mt-3">
                                    <div className="title-generico mt-5 mb-4">
                                        Verifica datos
                                    </div>
                                </div>
                                <hr/>
                                <div className="row">
                                    <div className="col-md-6 mt-3">
                                        <div className="col-md-12 mt-2 pl-0 d-flex">
                                            <div>
                                                <div className="label"><b>Cuenta Origen</b></div>
                                                <div className="label text-gray">Billetera Movil <b>01-321-846-0923</b></div>
                                            </div>
                                            <NavLink to="createCuentaDestino" className="cambiar">Cambiar <i className="icon-cambiar ml-2"></i></NavLink>
                                        </div>
                                        <div className="col-md-12 mt-2 pl-0 d-flex">
                                            <div>
                                                <div className="label"><b>Total de operaciones</b></div>
                                                <div className="label text-gray"><b>4 / 5</b></div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mt-2 pl-0 d-flex">
                                            <div>
                                                <div className="label"><b>Total valor transferir</b></div>
                                                <div className="label text-gray"><b>4.000.000,00 COP</b></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mt-3">
                                        <div className="col-md-12 mt-2 pl-0 d-flex">
                                            <div>
                                                <div className="label"><b>Total valor comisión</b></div>
                                                <div className="label text-gray"><b>38.800,00 COP</b></div>
                                            </div>
                                            <NavLink to="createCuentaDestino" className="cambiar">Cambiar <i className="icon-cambiar ml-2"></i></NavLink>
                                        </div>
                                        <div className="col-md-12 mt-2 pl-0 d-flex">
                                            <div>
                                                <div className="label"><b>Total IVA</b></div>
                                                <div className="label text-gray"><b>6.992,00 COP</b></div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mt-2 pl-0 d-flex">
                                            <div>
                                                <div className="label"><b>Total valor operación</b></div>
                                                <div className="label text-gray"><b>4.045.592,00 COP</b></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                <div className="col-md-12 table-responsive">
                                    <table className="table-trans-masiva">
                                        <thead className="mb-5">
                                            <tr>
                                                <th><b>Estado</b></th>
                                                <th><b>Cuenta destino</b></th>
                                                <th><b>Valor transferir</b></th>
                                                <th><b>Valor Transferencia</b></th>
                                                <th><b>Iva</b></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><b className="Inscrita">Inscrita</b></td>
                                                <td>Ahorros | Colpatria | <b>321-846-0923</b></td>
                                                <td>1.000.000,00</td>
                                                <td>9.200,00 COP</td>
                                                <td>1.748,00 COP</td>
                                            </tr>
                                            <tr>
                                                <td><b className="Inscrita">Inscrita</b></td>
                                                <td>Ahorros | Colpatria | <b>321-846-0923</b></td>
                                                <td>1.000.000,00</td>
                                                <td>9.200,00 COP</td>
                                                <td>1.748,00 COP</td>
                                            </tr>
                                            <tr>
                                                <td><b className="Inscrita">Inscrita</b></td>
                                                <td>Ahorros | Colpatria | <b>321-846-0923</b></td>
                                                <td>1.000.000,00</td>
                                                <td>9.200,00 COP</td>
                                                <td>1.748,00 COP</td>
                                            </tr>
                                            <tr>
                                                <td><b className="Inscrita">Inscrita</b></td>
                                                <td>Ahorros | Colpatria | <b>321-846-0923</b></td>
                                                <td>1.000.000,00</td>
                                                <td>9.200,00 COP</td>
                                                <td>1.748,00 COP</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="Importante mt-4 text-gray">
                                    <b>Importante:</b> Reporte de pago inscrito satisfactoriamente, si tú reporte aparece en estado pendiente aún se encuentra en revisión de nuestro equipo pagoslocales.com; quienes procederán con la revisión en cuentas internacionales antes de acreditar el saldo, después de revisado quedará en estado Acreditado, lo que significará que el dinero estará abonado en tu cuenta en USD, si por el contrario aparece en estado Rechazado singnifica que estos dineros no fueron acreditados en nuestros métodos de pagos internacionales.
                                </div>
                                <div className="text-center mt-4 col-md-12">
                                    <NavLink to="/TransferenciaMasivaExitosa" className="btn btn-primary mb-3 mr-3">Siguiente</NavLink>
                                    <NavLink to="/createCuentaDestino" className="btn btn-gray text-white mb-3">Cancelar</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
}
export default App
