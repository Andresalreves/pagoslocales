import React,{useState,useEffect} from 'react';
import Functions from "../helpers/Functions";

const App=()=>{
  const [data, setData] = useState([]);
  useEffect(() => {
    getInit()
  },[])

  const getInit=()=>{
    let send    = {estatus:2}
    Functions.PostAsync("Movimientos","getMovimientosBilleteraCOP",send,{},{name:"callback",funct:callback})
  }

  const callback=(response)=>{
    if (response.data!==undefined && response.data.rows!==undefined) {
      setData(response.data.rows)
    }else {
      setData(false)
    }
  }

  return    <div className="card-graficos-2">
              <div className="title-graphycs">
                <b>Resumen</b>
                <select name="dias" className="graphycs-dias">
                  <option value="ULTIMOS 30 DIAS">ULTIMOS 30 DIAS</option>
                  <option value="ULTIMOS 45 DIAS">ULTIMOS 45 DIAS</option>
                  <option value="ULTIMOS 60 DIAS">ULTIMOS 60 DIAS</option>
                </select>
              </div>
              <div className="list">
                {data?<>
                  {data.map((row,key)=>{
                    return    <div className="row mb-3 pb-1" key={key}>
                                <div className="col-12 col-sm-8 text-left">
                                  <b>{row.fecha_solicitud_string} {row.hora_solicitud}</b><br/>
                                  <small>{row.observacion}</small>
                                </div>
                                <div className="col text-right">
                                  <span className="debito pr-2">{row.saldo_string}</span>
                                </div>
                              </div>

                  })}
                </>:<div className="row mb-3 pb-1">
                      <div className="col-12 text-center">
                        No hay transacciones pendientes
                      </div>
                    </div>
                }
              </div>
              <div className="footer-transacciones-home">
                <i className="icon-provisiones"><small className="ver-detalle-home">Ver detalle</small></i>
              </div>
            </div>
}

export default App
