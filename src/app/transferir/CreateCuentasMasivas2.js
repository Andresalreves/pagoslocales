import React,{useState,useEffect} from 'react';
import { NavLink } from "react-router-dom";
import Header from '../../components/header_forms_andres';
import UploadFile from '../../components/uploadFileExcel'
import Functions from "../../helpers/Functions";
import Loading from "../../components/Loading";
import Config from "../../helpers/Config";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Store from "../../helpers/Store";

const Table=(props)=>{
  return  <table className="table">
            <thead>
              <th>Titular</th>
              <th>Identificación</th>
              <th>Cuenta registrada</th>
              <th>Entidad bancaria</th>
            </thead>
            {props.data.map((row,key)=>{
              return  <tr key={key}>
                        <td>
                          {row.Tercero_titular}
                        </td>
                        <td className="text-center">
                          {row.Numero_ID}
                        </td>
                        <td className="text-center">
                          {row.Numero_Cuenta}
                        </td>
                        <td className="text-center">
                          {row.Entidad_Bancaria}
                        </td>
                      </tr>
            })}
          </table>
}

const TableList=(props)=>{
  console.log(props.data);
  return  <>
              <div className="row pb-3 pt-3">
                <div className="col-12 mb-3 text-rosa h6 ">Cuentas preinscritas con éxito</div>
                <div className="col-12">
                  <table className="table">
                    <thead>
                      <th>Titular</th>
                      <th>Identificación</th>
                      <th>Cuenta registrada</th>
                      <th>Entidad bancaria</th>
                    </thead>
                    {props.data.registradas.length>0?<>
                      {props.data.registradas.map((row,key)=>{
                        return  <tr key={key}>
                                  <td>
                                    {row.Tercero_titular}
                                  </td>
                                  <td className="text-center">
                                    {row.Numero_ID}
                                  </td>
                                  <td className="text-center">
                                    {row.Numero_Cuenta}
                                  </td>
                                  <td className="text-center">
                                    {row.Entidad_Bancaria}
                                  </td>
                                </tr>
                      })}
                    </>:<tr>
                      <td colSpan="4" className="text-center">
                        No hay registros
                      </td>
                    </tr>}
                  </table>
                </div>
              </div>
              <div className="row bg-gray pb-3 pt-3">
                <div className="col-12 mb-3 text-rosa h6">Cuentas número de cuentas errados</div>
                <div className="col-12">
                  <table className="table">
                    <thead>
                      <th>Titular</th>
                      <th>Identificación</th>
                      <th>Cuenta registrada</th>
                      <th>Entidad bancaria</th>
                    </thead>
                    {props.data.numero_cuenta_errado.length>0?<>
                      {props.data.numero_cuenta_errado.map((row,key)=>{
                        return  <tr key={key}>
                                  <td>
                                    {row.Tercero_titular}
                                  </td>
                                  <td className="text-center">
                                    {row.Numero_ID}
                                  </td>
                                  <td className="text-center">
                                    {row.Numero_Cuenta}
                                  </td>
                                  <td className="text-center">
                                    {row.Entidad_Bancaria}
                                  </td>
                                </tr>
                      })}
                    </>:<tr>
                      <td colSpan="4" className="text-center">
                        No hay registros
                      </td>
                    </tr>}
                  </table>
                </div>
              </div>
              <div className="row pb-3 pt-3">
                <div className="col-12 mb-3 text-rosa h6">Cuentas preinscritas previamente</div>
                <div className="col-12">
                  <table className="table">
                    <thead>
                      <th>Titular</th>
                      <th>Identificación</th>
                      <th>Cuenta registrada</th>
                      <th>Entidad bancaria</th>
                    </thead>
                    {props.data.ya_registradas.length>0?<>
                      {props.data.ya_registradas.map((row,key)=>{
                        return  <tr key={key}>
                                  <td>
                                    {row.Tercero_titular}
                                  </td>
                                  <td className="text-center">
                                    {row.Numero_ID}
                                  </td>
                                  <td className="text-center">
                                    {row.Numero_Cuenta}
                                  </td>
                                  <td className="text-center">
                                    {row.Entidad_Bancaria}
                                  </td>
                                </tr>
                      })}
                    </>:<tr>
                      <td colSpan="4" className="text-center">
                        No hay registros
                      </td>
                    </tr>}
                  </table>
                </div>
              </div>
              <div className="row bg-gray pb-3 pt-3">
                <div className="col-12 mb-3 text-rosa h6">Cuentas con bancos no registrados en el sistema</div>
                <div className="col-12">
                  <table className="table">
                    <thead>
                      <th>Titular</th>
                      <th>Identificación</th>
                      <th>Cuenta registrada</th>
                      <th>Entidad bancaria</th>
                    </thead>
                    {props.data.no_banco.length>0?<>
                      {props.data.no_banco.map((row,key)=>{
                        return  <tr key={key}>
                                  <td>
                                    {row.Tercero_titular}
                                  </td>
                                  <td className="text-center">
                                    {row.Numero_ID}
                                  </td>
                                  <td className="text-center">
                                    {row.Numero_Cuenta}
                                  </td>
                                  <td className="text-center">
                                    {row.Entidad_Bancaria}
                                  </td>
                                </tr>
                      })}
                    </>:<tr>
                      <td colSpan="4" className="text-center">
                        No hay registros
                      </td>
                    </tr>}
                  </table>
                </div>
              </div>
          </>
}

const App=()=>{

  const [uploadHojaVida, setUploadHojaVida] = useState(false);
  const [data, setData]   = useState(false);
  const [data2, setData2] = useState(false);

  /*useEffect(() => {
    if (uploadHojaVida) {
      setData(true)
      let send  = {file:JSON.stringify(uploadHojaVida),name:"uploadHojaVida"}
      Functions.PostAsync("Transferir","UploadCuentasMasivas",send,{},{name:"callbackUpload",funct:callbackUpload})
    }
  },[uploadHojaVida])*/

  const CallPDF =()=>{
    if(data2){
      window.open(Config.ConfigApirest+"PDF/Transferir/GetCuentasMasivas/consecutivo:"+data2.consecutivo+'/token:'+Store.get("user").token);
    }
  }
  const callbackUpload=(response)=>{
    setData(response.data)
  }

  const sendFile=()=>{
    if (uploadHojaVida){
      setData(true);
      let send  = {file:JSON.stringify(uploadHojaVida),name:"uploadHojaVida"}
      Functions.PostAsync("Transferir","UploadCuentasMasivas",send,{},{name:"callbackUpload",funct:callbackUpload})
    }
  }

  const handleOnSubmit=()=>{
    Functions.PostAsync("Transferir","ProcesarCuentasMasivas",{data:JSON.stringify(data)},{},{name:"callbackProcesarCuentasMasivas",funct:callbackProcesarCuentasMasivas})
  }

  const callbackProcesarCuentasMasivas=(response)=>{
    if (response.data!==undefined) {
      setData2(response.data)
    }
  }

  return  <div className="Contenido-Home">
            <div className="row">
              <div className={data2?"col-md-8":"col-md-12"}>
                <div className="title-home mb-4">Crear cuentas destino masivamente</div>
              </div>
              {data && data.length && data2?<div className='col-md-4' ><FontAwesomeIcon icon={faFilePdf}
                                                              style={{width:"20px"}}
                                                              className="resumen-comercio-exterior"
                                                              onClick={CallPDF}/></div>:false}
            </div>
            <div className="row mt-4">
                <div className={data && data.length?"col-12 col-md-12 m-auto":"col-12 col-md-8 m-auto"}>
                    <div className="card border-card">
                        <div className="card-body">
                          {!data?<div className="col-md-10 ml-auto mr-auto mt-3">
                              <Header title="Documento de inscripción" classIcon="icon-documento ico-generico" subtitle="Inscribir cuentas masivamente" />
                              <hr/>
                              <div className="row mb-3 col-md-12">
                                <div className="text-left">
                                  Descarga el formato para inscribir tus cuentas <a href={Config.ConfigApirest+"images/pagoslocales2022.xlsx"} className="text-rosa">Aquí</a>
                                </div>
                              </div>
                              <form className="mt-4">
                                <div className="row mb-3 col-md-12">
                                  {/*<div className="col-12 col-md-4 text-left">
                                    <div className="text-gray ml-3">
                                      Formato de cuentas
                                    </div>
                                  </div>*/}
                                  <div className="col-md-12">
                                    <UploadFile
                                          upload={uploadHojaVida}
                                          setUpload={setUploadHojaVida}
                                          title={"Formato de cuentas"}
                                    />
                                  </div>
                                </div>
                                <div className="text-center mt-3">
                                    {uploadHojaVida?<div onClick={sendFile} className="btn btn-primary mr-2 col-12 col-md-3 mb-3">Siguiente</div>:false}
                                    <NavLink to="/transferir" className="btn btn-gray col-12 col-md-3 mb-3">Cancelar</NavLink>
                                </div>
                              </form>
                          </div>:data===true?<Loading/>:!data2?<Table data={data} />:data2?<TableList data={data2}/>:false}
                          <div className="row mt-3">
                            <div className="col">
                              <div className="Importante mt-4 text-gray">
                                   <b>CUENTA SUJETA A REVISIÓN</b> POR PARTE DEL PROCESO DE CUMPLIMIENTO DE <b>PAGOSLOCALES.COM</b>;
                                   ESTE PROCESO PODRÁ TOMAR HASTA VEINTICUATRO (24) HORAS HÁBILES ANTES
                                   QUE TÚ CUENTA ESTÉ HABILITADA PARA TRANSFERENCIAS,
                                   EN CUMPLIMIENTO A LA NORMATIVIDAD NACIONAL Y NUESTRA POLÍTICA DE PREVENCIÓN Y FACILITACIÓN AL LAVADO DE ACTIVOS Y FINANCIACIÓN DEL TERRORISMO,
                                   NO REALIZAREMOS OPERACIONES A TERCEROS CON HISTORIAL DELICTIVO,
                                   EN CASO DE PRESENTARSE ALGUNA SITUACIÓN DE MANEJO ESPECIAL TU OPERACIÓN
                                   SERÁ RECHAZADA Y LA CUENTA NO ESTARÁ HABILITADA PARA TRANSFERENCIAS FUTURAS.
                              </div>
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col">
                              <div className="text-center mt-4">
                                  {data && data.length && !data2?<div onClick={handleOnSubmit} className={data && data.length>0?"btn btn-primary2 mb-3 mr-1":"btn btn-outline-primary2 disabled mb-3 mr-1"}>Procesar</div>:false}
                                  {data && data.length && !data2?<NavLink to="/Transferir/createCuentaDestino" className="btn btn-gray text-white mb-3">Cancelar</NavLink>:false}
                                  {data2?<NavLink to="/Transferir/createCuentaDestino" className="btn btn-outline-primary2 mb-3 mr-1">Terminar</NavLink>:false}
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
