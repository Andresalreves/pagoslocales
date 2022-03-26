import React,{useState,useEffect} from 'react';
import Header from '../../components/header_forms_andres';
import { NavLink, useParams } from "react-router-dom";
import Functions from "../../helpers/Functions";
import Config from '../../helpers/Config';
import StateContext from '../../helpers/ContextState'
import Store from '../../helpers/Store';

const documents   =   [
  {
    label:"Soporte Consulta",
    value:"soporte_consulta",
  },
]

const App=()=>{
  const context = React.useContext(StateContext);
  const parametros          = useParams()
  const [inputs, setInputs] = useState({});
  const [data, setData] = useState(false);
  const [data2, setData2] = useState(false);


  useEffect(() => {
    getInit()
  },[])

  function getInit(){
      let data  = {id:parametros.movimiento_id}
      Functions.PostAsync("Bolsillo","getDetalleMovimiento",data,{},{name:"callbackGetInit",funct:callbackGetInit})
  }
  function callbackGetInit(response){
    if (response.data!==undefined) {
      setData(response.data)
    }
  }


  return    <div className="Contenido-Home">
                <div className="row mt-4">
                    <div className="col-12 m-auto">
                        <div className="card border-card">
                            <div className="card-body">
                                <div className="col-md-10 ml-auto mr-auto mt-3">
                                  <Header title="Resumen"
                                          subtitle={data.fecha_solicitud_string}
                                          classIcon="icon-documento ico-generico"
                                          class="text-left"
                                          estado="Abonado"
                                          estatus={data.estatus}
                                          NavLink={NavLink}
                                          to={"/Bolsillos/Detalle/"+parametros.id}/>
                                  <hr/>
                                  <div className="row d-none">
                                    <div className="col-md-6 mt-2 pl-0">
                                      <div className="label"><b>Titular</b></div>
                                      <div className="labels text-gray"><b>{(data.titular_string!==undefined)?data.titular_string:data.nombres_origen} {(data.apellidos_origen!==undefined)?data.apellidos_origen:false} </b></div>
                                    </div>
                                    <div className="col-md-6 mt-2 pl-0 ">
                                      <div className="label"><b>Comisión</b></div>
                                        <div className="label text-gray">
                                        {data.costo_transferencia?data.costo_transferencia:"0.00"}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-6 mt-2 pl-0">
                                      <div className="label"><b>Entidad bancaria o nombre del bolsillo</b></div>
                                      <div className="labels text-gray"><b>{(data.entidad_bancaria!==undefined)?data.entidad_bancaria:false}</b></div>
                                    </div>
                                    <div className="col-md-6 mt-2 pl-0 ">
                                      <div className="label"><b>IVA sobre comisión</b></div>
                                      <div className="label text-gray">
                                        {data.iva?data.iva:"0.00"}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-6 mt-2 pl-0">
                                      <div className="label"><b>Cuenta</b></div>
                                      <div className="labels text-gray">
                                        <b>{(data.nro_cuenta!==undefined)?data.nro_cuenta:"NO APLICA"}</b>
                                      </div>
                                    </div>
                                    <div className="col-md-6 mt-2 pl-0 ">
                                      <div className="label"><b>Concepto</b></div>
                                      <div className="label text-gray">
                                        <b>{(data.concepto!==undefined)?data.concepto:false}</b>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-6 mt-2 pl-0">
                                      <div className="label"><b>Valor transferencia</b></div>
                                      <div className="labels text-gray"><b>{(data.saldo_string!==undefined)?data.saldo_string:false}</b></div>
                                    </div>
                                    <div className="col-md-6 mt-2 pl-0 ">
                                      <div className="label"><b>Total de operación</b></div>
                                      <div className="label text-gray">
                                      <div className="labels text-gray"><b>{(data.saldo_string!==undefined)?data.saldo_string:false}</b></div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row text-right mt-4 justify-content-end">
                                    <div className="col-12 col-md-8">
                                      <a target="_blank" href={Config.ConfigApirest+"PDF/Movimientos/getMovimiento?transferencias_id="+parametros.movimiento_id+"&token="+Store.get("user").token} className="btn btn-outline-primary2 mb-3 mr-1">Descargar</a>
                                      <NavLink to={"/Bolsillos/Detalle/"+parametros.id} className="btn btn-gray mb-3 col-12 col-md-3">Volver</NavLink>
                                    </div>
                                  </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
}
export default App
