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

const App=()=>{
    const context = React.useContext(StateContext);
    let history = useHistory();
    const [upload, setUpload]   = useState(false);
    const [data, setData]       = useState(false);
    const [inputs, setInputs]   = useState({});

    const handleOnSubmit=()=>{
    Store.set("ProcesarCreacionReportesMasivos",{data:data,inputs:inputs})
    Functions.PostAsync("Divisas","ProcesarCreacionReportesMasivos",
                          { data:JSON.stringify(data),
                            inputs:JSON.stringify(inputs),
                            file:JSON.stringify(upload),
                            name:"upload",
                          },{},{  name:"callbackProcesarCuentasMasivas",
                                  funct:callbackProcesarReportesMasivamente})
  }

  const callbackProcesarReportesMasivamente=(response)=>{
    let no_encontrados = response.data.no_encontrados;
    let keys = Object.keys(no_encontrados);
    console.log(response.data.no_encontrados);
    context.setModalShow({
        show:true,
        message:<div className="text-center ">
                  <div className="mb-4 h3"><b>Reporte Procesado</b></div>
                  <div className='mb-4 h6 text-left'><b>Reportes creados: {response.data.encontrados}</b></div>
                  <div className='mb-2 h6 text-left'><b>Pagadores no encontrados</b></div>
                        {keys.length>0?<>
                          {keys.map((row,key)=>{
                                //console.log(row);
                                return <div className='mb-1 h6 text-left'><b>{no_encontrados[row]}</b></div> 
                          })}
                        </>:false}
                        {!response.confirmation?<><div onClick={()=>{context.setModalShow({show:false,}) }} className="btn btn-primary text-white mb-3 mt-3">Reintentar</div></>:false}
                </div>,
        size:""
    })
    if(response.confirmation){
        history.push("/Divisas/ReportarPago");
    }
    //console.log(response);
  }

  return  <div className="Contenido-Home">
            <div className="row">
              <div className="col-md-12">
                <div className="title-home mb-4">Crear Reporte masivamente</div>
              </div>
            </div>
            <div className="row mt-4">
                <div className="col-12 m-auto">
                    <div className="card border-card">
                        <div className="card-body">
                          {!data?<div className="col-md-11 ml-auto mr-auto mt-3">
                              <Header title="Documento para crear reporte de pagos masivamente" classIcon="icon-documento ico-generico" subtitle="Crear reporte Masivamente" />
                              <hr/>
                              <div className="row mb-3">
                                <div className="col-12 text-center">
                                  Descarga el formato para reportar masivamente <a href={Config.ConfigApirest+"images/crear_reportes_masivamente.xlsx"} className="text-rosa">Aquí</a>
                                </div>
                              </div>
                          </div>:data===true?<Loading/>:false}
                          <form className="mt-4">
                            <div className="row mb-3">
                              <div className="col-12 text-center mb-3">
                                <UploadFile
                                      required={true}
                                      upload={upload}
                                      setUpload={setUpload}
                                      title={"Seleccione archivo"}
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
                        </div>
                    </div>
                </div>
            </div>
           </div>
}
export default App
