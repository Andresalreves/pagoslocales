import React,{useState,useEffect} from 'react';
import Header from '../../components/header_forms';
import Genero from '../../components/selector_genero';
import Departamento from '../../components/selector_departamento';
import { NavLink } from "react-router-dom";
import Store from "../../helpers/Store";
import Functions from "../../helpers/Functions";
import Config from "../../helpers/Config";
import Select from '../../screens/select';
import StateContext from '../../helpers/ContextState'
import UploadImg from '../../components/uploadImg'
import UploadFile from '../../components/uploadFile'

const test  = false


const App=()=>{
  const context = React.useContext(StateContext);

  const [upload, setUpload] = useState(false);
  const [uploadHojaVida, setUploadHojaVida] = useState(false);
  const [uploadAfiliaciones, setUploadAfiliaciones] = useState(false);
  const [uploadDocumentosSoporte, setUploadDocumentosSoporte] = useState(false);
  const [uploadOtros, setUploadOtros] = useState(false);
  const [data, setData] = useState(false);
  const [dataBolsillo, setDataBolsillo] = useState(false);
  const [inputs, setInputs] = useState(false);
  const [active, setActive] = useState(false);
  const [tipoDate, setTipoDate] = useState(false);
  const [tipoDate2, setTipoDate2] = useState(false);

  useEffect(() => {
    getInit()
  },[])

  const getInit=()=>{
    Functions.PostAsync("Maestros","get_tablas_maestras",{},{},{name:"callbackContinue",funct:callbackContinue})
  }

  const callbackContinue=(response)=>{
    setData(response)
  }

  const onChange=(e)=>{
    Functions.Inputs(e,inputs, setInputs)
  }

  const onSubmit=(e)=>{
    e.preventDefault()
    let send        = {...inputs}
        send.token  = Store.get("user").token
        // send.img_perfil               = JSON.stringify(upload)
        // send.uploadHojaVida           = JSON.stringify(uploadHojaVida)
        // send.uploadAfiliaciones       = JSON.stringify(uploadAfiliaciones)
        // send.uploadDocumentosSoporte  = JSON.stringify(uploadDocumentosSoporte)
        // send.uploadOtros              = JSON.stringify(uploadOtros)
    Functions.PostAsync("Administracion","setFuncionarios",send,{},{name:"callbackSubmit",funct:callbackSubmit})
  }

  const callbackSubmit=(response)=>{
    console.log(response);
  }

  const handleBlur=(estatus)=>{
    setTipoDate(estatus)
  }

  const handleBlur2=(estatus)=>{
    setTipoDate2(estatus)
  }

  return  <div className="Contenido-Home">
            <div className="title-home mb-4">Agregar funcionario</div>
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="card">
                  <div className="card-content">
                    <div className="card-body">
                      <form onSubmit={onSubmit}>
                        <div className="p-5">
                          <Header title="Nuevo Funcionario" subtitle="Creación de terceros" classIcon="icon-listado ico-generico"/>
                          <div className="row mb-2 mt-4">
                            <div className="col text-rosa">
                              Información básico del funcionario
                            </div>
                          </div>
                          <div className="row mb-2 mt-4">
                            <div className="col-12 col-md-6">
                              <UploadImg
                                  upload={upload}
                                  setUpload={setUpload}
                                  title={"Imagen de perfil"}
                                  maxSizeFile="1000000"
                                  textFileAllow="El tamaño de la imagen no puede superar 1MB solo los tipos PNG, GIF y JPG son soportados."
                              />
                            </div>
                            <div className="col-12 col-md-6">
                              <div className="row mb-3">
                                <div className="col">
                                  <input  className="form-control"
                                          type="text"
                                          name="nombre_completo"
                                          placeholder="Nombres"
                                          onChange={onChange}
                                  />
                                </div>
                              </div>
                              <div className="row mb-2">
                                <div className="col-12 col-md-6">
                                  <input  className="form-control"
                                          type="text"
                                          name="nombre_usuario"
                                          placeholder="Nombre de usuario"
                                          onChange={onChange}
                                  />
                                </div>
                                <div className="col-12 col-md-6">
                                  <input  className="form-control"
                                          type="password"
                                          name="password"
                                          placeholder="Password"
                                          onChange={onChange}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-12 col-md-6">
                              <Select
                                required={true}
                                data={(data.ma_tipo_identificacion!==undefined?data.ma_tipo_identificacion:[])}
                                name="tipo_identificacion"
                                selectDefault="Tipo de identificación"
                                onChange={onChange}
                              />
                            </div>
                            <div className="col-12 col-md-6">
                              <input  className="form-control"
                                      type={tipoDate?"date":"text"}
                                      onBlur={()=>handleBlur(false)}
                                      onFocus={()=>handleBlur(true)}
                                      name="fecha_nacimiento"
                                      placeholder="Fecha de nacimiento"
                                      onChange={onChange}
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-12 col-md-6">
                              <input  className="form-control"
                                      type="text"
                                      name="nro_identificacion"
                                      placeholder="Número de identificación"
                                      onChange={onChange}
                              />
                            </div>
                            <div className="col-12 col-md-6">
                              <input  className="form-control"
                                      type="text"
                                      name="Lugar_nacimiento"
                                      placeholder="Lugar de nacimiento"
                                      onChange={onChange}
                              />
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-12 col-md-6">
                              <input  className="form-control"
                                      type="text"
                                      name="lugar_expedicion"
                                      placeholder="Lugar de expedición"
                                      onChange={onChange}
                              />
                            </div>
                            <div className="col-12 col-md-6">
                              <Genero inputs={inputs} setInputs={setInputs} opciones={data} name="genero"/>
                            </div>
                          </div>
                          <div className="row mb-2 mt-4">
                            <div className="col text-rosa">
                              Información de contacto
                            </div>
                          </div>
                          <div className="row mb-3 mt-4">
                            <div className="col-12 col-md-6">
                              <input  className="form-control"
                                      type="text"
                                      name="direccion"
                                      placeholder="Dirección"
                                      onChange={onChange}
                              />
                            </div>
                            <div className="col-12 col-md-6">
                              <input  className="form-control"
                                      type="text"
                                      name="telefono_fijo"
                                      placeholder="Teléfono fijo"
                                      onChange={onChange}
                              />
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-12 col-md-6">
                              <input  className="form-control"
                                      type="text"
                                      name="ciudad"
                                      placeholder="Ciudad"
                                      onChange={onChange}
                              />
                            </div>
                            <div className="col-12 col-md-6">
                              <Select
                                required={true}
                                data={(data.ma_estado_civil!==undefined?data.ma_estado_civil:[])}
                                name="estado_civil"
                                selectDefault="Estado Civil"
                                onChange={onChange}
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-12 col-md-6">
                              <input  className="form-control"
                                      type="text"
                                      name="celular"
                                      placeholder="Teléfono móvil"
                                      onChange={onChange}
                              />
                            </div>
                            <div className="col-12 col-md-6">
                              <input  className="form-control"
                                      type="text"
                                      name="email"
                                      placeholder="Correo electrónico"
                                      onChange={onChange}
                              />
                            </div>
                          </div>
                          <div className="row mb-2 mt-4">
                            <div className="col text-rosa">
                              Parámetros especiales
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-12 col-md-6">
                              <input  className="form-control"
                                      type={tipoDate?"date":"text"}
                                      name="fecha_contratacion"
                                      placeholder="Fecha de contratación"
                                      onChange={onChange}
                                      onBlur={()=>handleBlur(false)}
                                      onFocus={()=>handleBlur(true)}
                              />
                            </div>
                            <div className="col-12 col-md-6">
                              <input  className="form-control"
                                      type="text"
                                      name="cargo"
                                      placeholder="Cargo"
                                      onChange={onChange}
                              />
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-12 col-md-6">
                              <Select
                                data={[]}
                                name="sucursal"
                                selectDefault="Sucursal"
                                onChange={onChange}
                              />
                            </div>
                            <div className="col-12 col-md-6">
                              <input  className="form-control"
                                      type="text"
                                      name="otras_bonificaciones"
                                      placeholder="Otras bonificaciones"
                                      onChange={onChange}
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-12 col-md-6">
                              <div className="mb-3">
                                <input  className="form-control"
                                        type="text"
                                        name="salario_basico_mensual"
                                        placeholder="Salario básico mensual"
                                        onChange={onChange}
                                />
                              </div>
                              <div className="mb-3">
                                <input  className="form-control"
                                        type="text"
                                        name="auxilio_transporte"
                                        placeholder="Auxilio de transporte"
                                        onChange={onChange}
                                />
                              </div>
                            </div>
                            <div className="col-12 col-md-6">
                              <Departamento inputs={inputs} setInputs={setInputs} opciones={data} name="departamento"/>
                            </div>
                          </div>
                          <Header title="Documentos de soporte" subtitle="Suba los siguientes documentos de soporte" classIcon="icon-listado ico-generico"/>
                          <div className="row mb-3">
                            <div className="col-12 col-md-6 text-left">
                              <div className="text-gray ml-3">
                                Hoja de vida
                              </div>
                            </div>
                            <div className="col-12 col-md-6">
                              <UploadFile
                                    upload={uploadHojaVida}
                                    setUpload={setUploadHojaVida}
                                    title={"Seleccione archivo"}
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-12 col-md-6 text-left">
                              <div className="text-gray ml-3">
                                Afiliaciones
                              </div>
                            </div>
                            <div className="col-12 col-md-6">
                              <UploadFile
                                    upload={uploadAfiliaciones}
                                    setUpload={setUploadAfiliaciones}
                                    title={"Seleccione archivo"}
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-12 col-md-6 text-left">
                              <div className="text-gray ml-3">
                                Documentos de soporte
                              </div>
                            </div>
                            <div className="col-12 col-md-6">
                              <UploadFile
                                    upload={uploadDocumentosSoporte}
                                    setUpload={setUploadDocumentosSoporte}
                                    title={"Seleccione archivo"}
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-12 col-md-6 text-left">
                              <div className="text-gray ml-3">
                                Otros
                              </div>
                            </div>
                            <div className="col-12 col-md-6">
                              <UploadFile
                                    upload={uploadOtros}
                                    setUpload={setUploadOtros}
                                    title={"Seleccione archivo"}
                              />
                            </div>
                          </div>
                          <div className="row text-center mt-4 justify-content-center">
                            <div className="col-6">
                              {!test?<button type="submit" className="btn btn-primary mb-3 mr-1">
                                Crear funcionario
                              </button>:<NavLink to="/Funcionario" className="btn btn-primary mb-3 mr-1">Crear funcionario</NavLink>}
                              <NavLink to="/Funcionarios" className="btn btn-gray text-white mb-3">Cancelar</NavLink>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
}
export default App
