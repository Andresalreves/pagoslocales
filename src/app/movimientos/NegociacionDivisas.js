import React,{useState,useEffect} from 'react';
import Header from '../../components/header_forms_tipo2';
import { NavLink, useParams } from "react-router-dom";
import Store from "../../helpers/Store";
import Functions from "../../helpers/Functions";
import Config from "../../helpers/Config";


const App=()=>{
  const params          =   useParams();
  const [data, setData] = useState(false);
  const [reset, setReset] =   useState(false);

  useEffect(() => {
    getInit()
  },[])

  useEffect(() => {
    if (reset) {
      setReset(false)
    }
  },[reset])

  const getInit=()=>{
    Functions.PostAsync("Administracion","getNegociacionDivisas",{id:params.id_negociacion},{},{name:"callbackContinue",funct:callbackContinue})
  }

  const callbackContinue=(response)=>{
    setData(response.data)
  }

    return  <>{data?<div className="Contenido-Home">
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="card">
            <div className="card-content">
              <div className="card-body perfil">

                  <div className="p-sm-5">
                    <Header
                        title={"Resumen"}
                        subtitle="30 junio 2021 3:00pm"
                        classIcon="icon-cuenta-bancaria-inactiva ico-generico"
                        />
                    <div className="border mb-4"></div>
                    <div className="row mt-3 justify-content-center">
                      <div className="col-12 col-md-4 pt-2">
                        <div className="label"><b>Titular</b></div>
                        <div className="label text-gray">{data.cliente_string}</div>
                      </div>
                      <div className="col-12 col-md-4 pt-2">
                        <div className="label"><b>Fecha de creación</b></div>
                        <div className="label text-gray">{data.fecha_string}</div>
                      </div>
                      <div className="col-12 col-md-4 pt-2">
                        <div className="label"><b>Funcionario</b></div>
                        <div className="label text-gray">{data.funcionario_string}</div>
                      </div>
                    </div>
                    <div className="row mt-3 justify-content-center">
                      <div className="col-12 col-md-4 pt-2">
                        <div className="label"><b>Cuenta origen</b></div>
                        <div className="label text-gray">{data.cuenta_origen}</div>
                      </div>
                      <div className="col-12 col-md-4 pt-2">
                        <div className="label"><b>Cuenta destino</b></div>
                        <div className="label text-gray">{data.nro_cuenta}</div>
                      </div>
                      <div className="col-12 col-md-4 pt-2">
                        <div className="label"><b>Numeral cambiario</b></div>
                        <div className="label text-gray">{data.nro_cambiario_string}</div>
                      </div>
                    </div>
                    <div className="row mt-3 justify-content-center">
                      <div className="col-12 col-md-4 pt-2">
                        <div className="label"><b>Monto {data.tipo_moneda_destino}</b></div>
                        <div className="label text-gray">{data.valor_usd}</div>
                      </div>
                      <div className="col-12 col-md-4 pt-2">
                        <div className="label"><b>Comisión {data.tipo_moneda_destino}</b></div>
                        <div className="label text-gray">{data.comision_usd}</div>
                      </div>
                      <div className="col-12 col-md-4 pt-2">
                        <div className="label"><b>Negociación {data.tipo_moneda_destino}</b></div>
                        <div className="label text-gray">{data.total_resta_string}</div>
                      </div>
                    </div>
                    <div className="row mt-3 justify-content-center">
                      <div className="col-12 col-md-4 pt-2">
                        <div className="label"><b>Tasa COP</b></div>
                        <div className="label text-gray">{data.tasas}</div>
                      </div>
                      <div className="col-12 col-md-4 pt-2">
                        <div className="label"><b>Subtotal</b></div>
                        <div className="label text-gray">{data.subtotal_string}</div>
                      </div>
                      <div className="col-12 col-md-4 pt-2">
                        <div className="label"><b>Comisión Administrativa</b></div>
                        <div className="label text-gray">{data.comision_administrativa_string}</div>
                      </div>
                    </div>
                    <div className="row mt-3 justify-content-center">
                      <div className="col-12 col-md-4 pt-2">
                        <div className="label"><b>IVA Comisión Administrativa</b></div>
                        <div className="label text-gray">{data.comision_iva_administrativa_string}</div>
                      </div>
                      <div className="col-12 col-md-4 pt-2">
                      <div className="label"><b>Comisión Giro Recibido</b></div>
                      <div className="label text-gray">{data.comision_giro_recibido_string}</div>
                      </div>
                      <div className="col-12 col-md-4 pt-2">
                        <div className="label"><b>IVA Comisión Giro Recibido</b></div>
                        <div className="label text-gray">{data.comision_iva_giro_recibido_string}</div>
                      </div>
                    </div>
                    <div className="row mt-3 justify-content-center">
                      <div className="col-12 col-md-4 pt-2">
                        <div className="label"><b>Total abonar COP</b></div>
                        <div className="label text-gray">{data.total_abona_string}</div>
                      </div>
                      <div className="col-12 col-md-4 pt-2">
                        <div className="label"><b>Concepto</b></div>
                        <div className="label text-gray">{data.concepto_string}</div>
                      </div>
                      <div className="col-12 col-md-4 pt-2">

                      </div>
                    </div>
                  </div>
                  <div className="row text-center mt-4 justify-content-center">
                    <div className="col-6">
                      <a target="_blank" href={Config.ConfigApirest+"PDF/Movimientos/getMovimiento?subTmpl=NegociacionDivisas&negociacion_id="+params.id_negociacion+"&token="+Store.get("user").token} className="btn btn-outline-primary2 mb-3 mr-1">Descargar</a>
                      <NavLink to={"/Movimientos/DetalleBilletera/"+params.id_billetera} className="btn btn-gray mb-3">Volver</NavLink>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>:false}

          </>
}
export default App
