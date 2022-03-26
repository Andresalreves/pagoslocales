import React,{useState,useEffect} from 'react';
import Header from '../../components/header_forms_tipo4';
import { NavLink,  useParams } from "react-router-dom";
import Functions from "../../helpers/Functions";
import Config from '../../helpers/Config';
import Store from '../../helpers/Store';
import VerDatalleOperacion from '../../components/VerDatalleOperacion';



const Tmp2=(props)=>{
  return <>
          <div className="row">
            <div className="col-md-12 mt-2 pl-0">
                <div>
                    <div className="label"><b>Concepto</b></div>
                    <div className="label text-gray"><b>{props.data.observacion!==undefined?props.data.observacion:false}</b></div>
                </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mt-2 pl-0">
                <div>
                    <div className="label"><b>Cuenta abonada</b></div>
                    <div className="label text-gray"><b>{ props.data.cuenta_destino!==undefined &&
                                                          props.data.cuenta_destino.tipo!==undefined &&
                                                          props.data.cuenta_destino.nro_cuenta!==undefined
                                                            ?props.data.cuenta_destino.tipo+" | "+props.data.cuenta_destino.nro_cuenta :false}</b></div>
                </div>
            </div>
            <div className="col-md-6 mt-2 pl-0 ">
                <div>
                    <div className="label"><b>Monto debitado</b></div>
                    <div className="label text-gray"><b>{props.data.valor_transferir}</b></div>
                </div>
            </div>
          </div>
        </>
}

const App=()=>{
  let parametros = useParams();
  const [data, setData] = useState({});
  const [tmp, setTmp]   = useState(false);
  useEffect(() => {
    getInit()
  },[])

  function getInit(){
      let data  = {id:parametros.id_transferencia}
      Functions.PostAsync("Movimientos","getMovimientoBilleteraUSD",data,{},{name:"callbackGetInit",funct:callbackGetInit})
  }

  function callbackGetInit(response){
    if (response.data!==undefined) {
      setData(response.data)
    }
    if (response.abono_divisas!==undefined && response.abono_divisas) {
      setTmp(2)
    }else {
      setTmp(1)
    }
  }

  return    <>
              {
                tmp===1? <>
                            <div className="Contenido-Home">
                              <div className="row mt-sm-4">
                                <div className="col-12 col-sm-8 m-auto">
                                    <div className="card border-card">
                                        <div className="card-body">
                                            <div className="col-md-10 ml-auto mr-auto mt-3">
                                              <Header title="Resumen"
                                                      subtitle={data.fecha}
                                                      estatus={data.estatus}
                                                      estatus_string={data.estatus_string}
                                                      classIcon="icon-cuenta-bancaria-inactiva ico-generico"/>
                                                <hr/>
                                                {tmp===1?<div className="row">
                                                  <div className="col-md-6 mt-2 pl-0">
                                                      <div>
                                                          <div className="label"><b>Cuenta</b></div>
                                                          <div className="label text-gray"><b>{data.nombre_cuenta!==undefined?data.nombre_cuenta:false}</b></div>
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
                                                          <div className="label text-gray"><b>{data.pagador!==undefined?data.pagador:false}</b></div>
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
                                                          <div className="label text-gray"><b>{data.moneda_pago_string}</b></div>
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
                                                </div>:tmp===2?<Tmp2 data={data}/>:false}
                                                <div className="text-center mt-4">

                                                    <a target="_blank" href={Config.ConfigApirest+"PDF/Movimientos/getMovimientoBilleteraUSD?id="+parametros.id_transferencia+"&token="+Store.get("user").token} className="btn btn-outline-primary2 mb-3 mr-1">Descargar</a>
                                                    <NavLink to={"/Movimientos/USDDetalleBilletera/"+parametros.id_billetera} className="btn btn-gray text-white mb-3">Volver</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                              </div>
                            </div>
                        </>:<>
                          <VerDatalleOperacion parametros={parametros}  data={data}/>
                        </>
              }
            </>
}
export default App
