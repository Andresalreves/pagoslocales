import React,{useState,useEffect} from 'react';
import { NavLink,useHistory } from "react-router-dom";
import Header from '../../components/header_forms_andres';
import UploadFile from '../../components/uploadFileExcel'
import Functions from "../../helpers/Functions";
import Loading from "../../components/Loading";
import Select from '../../screens/select';
import Alert from 'react-bootstrap/Alert'
import StateContext from '../../helpers/ContextState';
import Store from '../../helpers/Store';
import Config from "../../helpers/Config";


let resultado = {

                }

const Items=(data)=>{
  return  <div className="mb-3 border p-4">
            <h5 className="text-rosa">
              {data.data[0]}
            </h5>
            <div className="row">
              <div className="col">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Pagador</th>
                      <th>Nombre cuenta</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.data[1] && data.data[1].length>0?<>
                      {data.data[1].map((row,key)=>{
                        return  <tr key={key}>
                                  <td className="text-center">{row.pagador}</td>
                                  <td className="text-center">{row.nombre_cuenta}</td>
                                </tr>
                      })}
                      </>:<>
                      <tr>
                        <td colspan="2" className="text-center">No hay datos</td>
                      </tr>
                    </>}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
}

const App=()=>{
  let history = useHistory();
  const [upload, setUpload]   = useState(false);
  const [data, setData]       = useState({});
  const [inputs, setInputs]   = useState({});

  const handleOnSubmit=()=>{
    Store.set("ProcesarInscripcionPagadoresMasivas",{data:data,inputs:inputs})
    Functions.PostAsync("Divisas","ProcesarInscripcionPagadoresMasivas",
                          { data:JSON.stringify(data),
                            inputs:JSON.stringify(inputs),
                            file:JSON.stringify(upload),
                            name:"upload",
                          },{},{  name:"callbackProcesarCuentasMasivas",
                                  funct:callbackProcesarCuentasMasivas})
  }

  const callbackProcesarCuentasMasivas=(response)=>{
    if (response.data) {
      setData(response.data)
    }
  }

  return  <div className="Contenido-Home">
            <div className="row">
              <div className="col-md-12">
                <div className="title-home mb-4">Inscribir Pagadores masivamente</div>
              </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-7 m-auto">
                    <div className="card border-card">
                        <div className="card-body">
                          {Object.entries(data).length>0?<>
                              {Object.entries(data).map((row,key)=>{
                                return <Items data={row}/>
                              })}
                            </>:<>
                            {data?<div className="col-md-10 ml-auto mr-auto mt-3">
                                <Header title="Documento de Inscripción Pagadores" classIcon="icon-documento ico-generico" subtitle="Inscribir cuentas masivamente" />
                                <hr/>
                                <div className="row mb-3">
                                  <div className="col-12 text-left">
                                    Descarga el formato para inscripción masiva <a href={Config.ConfigApirest+"images/inscripcion_masivas_pagadores.xlsx"} className="text-rosa">Aquí</a>
                                  </div>
                                </div>
                            </div>:data===true?<Loading/>:false}
                            <form className="mt-4">
                              <div className="row mb-3 col-md-10 ml-auto mr-auto">
                                <div className="col-12 text-center mb-3">
                                  <UploadFile
                                        required={true}
                                        upload={upload}
                                        setUpload={setUpload}
                                        title={"Formato de pagadores"}
                                  />
                                </div>
                              </div>
                            </form>
                            <div className="row mt-3">
                              <div className="col">
                                <div className="text-center mt-4">
                                    {upload?<div onClick={handleOnSubmit} className={"btn btn-primary2 mb-3 mr-1"}>Procesar</div>:false}
                                    <NavLink to="/Divisas/InscribirPagadores" className="btn btn-gray text-white mb-3">Cancelar</NavLink>
                                </div>
                              </div>
                            </div>
                          </>}
                        </div>
                    </div>
                </div>
            </div>
           </div>
}
export default App
