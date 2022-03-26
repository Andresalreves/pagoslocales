import React,{useState,useEffect} from 'react';
import Header from '../../components/header_forms_tipo4';
import { NavLink, useParams } from "react-router-dom";
import Store from "../../helpers/Store";
import Functions from "../../helpers/Functions";
import Config from "../../helpers/Config";
import ImgPerfil from '../../assets/images/No_image.png';
import StateContext from '../../helpers/ContextState';

const test  = true
const limitUpload =   1000000;

const App=()=>{
  const parametros=useParams()
  const [data, setData]     = useState(false);
  const [inputs, setInputs] = useState({});
  const context             =   React.useContext(StateContext);

  useEffect(() => {
    getInit()
  },[])

  const getInit=()=>{
    Functions.PostAsync("Administracion","getFuncionario",{id:parametros.id},{},{name:"callbackContinue",funct:callbackContinue})
  }

  const callbackContinue=(response)=>{
    setData(response.data)
  }

  const onClickDelete=(row,campo)=>{
    let data_={
                funcionario_id:row.funcionario_id,
                campo:campo,
                value:""
              }
    Functions.PostAsync("Administracion","updateFuncionario",data_,{},{name:"callbackContinue3",funct:callbackContinue3})
  }

  const callbackContinue3=()=>{
    getInit()
  }

  const upload=(event,label)=>{
    let file          =   event.target.files[0];
    if (file.type!=="application/pdf") {
      return context.setModalShow({
                              show:true,
                              message:<div className="text-center text-dark">Formato de archivo no permitido</div>
                            })
    }

    let reader        =   new FileReader();
    reader.onload       =   function() {
      if (file.size<limitUpload) {
        let inputs_={...inputs}
            inputs_.file  =   { src:reader.result,
                                lastModified:file.lastModified,
                                size:file.size,
                                type:file.type,
                                name:event.target.name,
                                label:label,
                                file_name:file.name
                              }

        let data            =   inputs_
            data.file       =   (Object.is(inputs_.file,inputs_.file))?JSON.stringify(inputs_.file):""
            data.user       =   Store.get("user").token
            data.id         =   parametros.id
            data.name       =   event.target.name
            data.label      =   label
            Functions.PostAsync("Administracion","UploadSoporteFuncionario",data,{},{name:"callbackContinueSend",funct:callbackContinueSend})
      }else {
        context.setModalShow({
                                show:true,
                                message:<div className="text-center text-dark">El Archivo supera el límite permitido de {limitUpload/1000000}MB</div>
                              })
      }
    }
    reader.readAsDataURL(file);
  }

  const callbackContinueSend=(data)=>{
    getInit()
  }

  return  <div className="Contenido-Home">
            <div className="title-home mb-4">Funcionario</div>
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="card">
                  <div className="card-content">
                    <div className="card-body perfil">

                        <div className="p-5">
                          <Header
                              title={parametros.id!==undefined?"Funcionario creado con éxito":"Funcionario"}
                              classIcon="icon-documento ico-generico"/>
                          <div className="border mb-4"></div>
                          <div className="row mt-3 justify-content-center">
                            <div className="col-12 col-md-5">
                              <img src={data===false?ImgPerfil:data.img_perfil} className="rounded-circle col-12 col-md-4" alt="PGRW" />
                            </div>
                            <div className="col-12 col-md-5 pt-2">
                              <div className="label"><b>Nombre de usuario</b></div>
                              <div className="label text-gray">@{data.nombre_usuario}</div>
                            </div>
                          </div>
                          <div className="row mt-3 justify-content-center">
                            <div className="col-12 col-md-5 pt-2">
                              <div className="label"><b>Nombre completo</b></div>
                              <div className="label text-gray">{data.nombre_completo}</div>
                            </div>
                            <div className="col-12 col-md-5 pt-2">
                              <div className="label"><b>Fecha de nacimiento</b></div>
                              <div className="label text-gray">{data.fecha_nacimiento}</div>
                            </div>
                          </div>
                          <div className="row mt-3 justify-content-center">
                            <div className="col-12 col-md-5 pt-2">
                              <div className="label"><b>Identificación</b></div>
                              <div className="label text-gray"> {data.tipo_identificacion_string}</div>
                            </div>
                            <div className="col-12 col-md-5 pt-2">
                              <div className="label"><b>Lugar de nacimiento</b></div>
                              <div className="label text-gray">{data.lugar_nacimiento}</div>
                            </div>
                          </div>
                          <div className="row mt-3 justify-content-center">
                            <div className="col-12 col-md-5 pt-2">
                              <div className="label"><b>Lugar de expedición</b></div>
                              <div className="label text-gray">{data.lugar_expedicion}</div>
                            </div>
                            <div className="col-12 col-md-5 pt-2">
                              <div className="label"><b>Género</b></div>
                              <div className="label text-gray">{data.genero_string}</div>
                            </div>
                          </div>

                          <Header title="Información de contacto" classIcon="icon-documento ico-generico" class="text-left"/>
                          <div className="row mt-3 justify-content-center">
                            <div className="col-12 col-md-5 pt-2">
                              <div className="label"><b>Ciudad</b></div>
                              <div className="label text-gray">{data.ciudad}</div>
                            </div>
                            <div className="col-12 col-md-5 pt-2">
                              <div className="label"><b>Teléfono fijo</b></div>
                              <div className="label text-gray">{data.telefono_fijo}</div>
                            </div>
                          </div>
                          <div className="row mt-3 justify-content-center">
                            <div className="col-12 col-md-5 pt-2">
                              <div className="label"><b>Dirección</b></div>
                              <div className="label text-gray">{data.direccion}</div>
                            </div>
                            <div className="col-12 col-md-5 pt-2">
                              <div className="label"><b>Email</b></div>
                              <div className="label text-gray">{data.email}</div>
                            </div>
                          </div>
                          <div className="row mt-3 justify-content-center">
                            <div className="col-12 col-md-5 pt-2">
                              <div className="label"><b>Estado civil</b></div>
                              <div className="label text-gray">{data.estado_civil_string}</div>
                            </div>
                            <div className="col-12 col-md-5 pt-2">
                              <div className="label"><b>Teléfono móvil</b></div>
                              <div className="label text-gray">{data.celular}</div>
                            </div>
                          </div>
                          <Header title="Documentos de soporte" classIcon="icon-documento ico-generico" class="text-left"/>
                          {data.uploadHojaVida!==undefined?<div className="row mb-2 mt-1">
                            <div className="col-1">
                            </div>
                            <div className="col text-rosa">
                              <i className="icon-link-documento"/> Hoja de vida
                            </div>
                            <div className="col">
                              <a className="text-rosa" target="_blank" href={data.uploadHojaVida}>
                                <i className="icon-descargar-pdf"/>
                              </a>
                              <span className="text-rosa cursor-pointer" onClick={()=>onClickDelete(data,"uploadHojaVida")}>
                                <i className="icon-eliminar-tabla"/>
                              </span>
                            </div>
                          </div>:<div className="row  mb-2 mt-1">
                            <div class="col-1"></div>
                            <div className="col-12 col-md-5 text-gray border-bottom uploadFile position-relative">
                              <input type="file" accept="application/pdf" name={"uploadHojaVida"} className="inputfile position-absolute" onChange={upload} />
                              <i className="icon-link-documento text-gray"/> Seleccionar hoja de vida
                            </div>
                            <div className="col-12 col-md-4 text-gray">
                              Archivo aún no seleccionado
                            </div>
                          </div>}



                          {data.uploadAfiliaciones!==undefined?<div className="row mb-2 mt-1">
                            <div className="col-1">
                            </div>
                            <div className="col text-rosa">
                              <i className="icon-link-documento"/> Afiliaciones
                            </div>
                            <div className="col">
                              <a className="text-rosa" target="_blank" href={data.uploadAfiliaciones}>
                                <i className="icon-descargar-pdf"/>
                              </a>
                              <span className="text-rosa cursor-pointer" onClick={()=>onClickDelete(data,"uploadAfiliaciones")}>
                                <i className="icon-eliminar-tabla"/>
                              </span>
                            </div>
                          </div>:<div className="row  mb-2 mt-1">
                            <div class="col-1"></div>
                            <div className="col-12 col-md-5 text-gray border-bottom uploadFile position-relative">
                              <input type="file" accept="application/pdf" name={"uploadAfiliaciones"} className="inputfile position-absolute" onChange={upload} />
                              <i className="icon-link-documento text-gray"/> Seleccionar hoja afiliaciones
                            </div>
                            <div className="col-12 col-md-4 text-gray">
                              Archivo aún no seleccionado
                            </div>
                          </div>}


                          {data.uploadDocumentosSoporte!==undefined?<div className="row mb-2 mt-1">
                            <div className="col-1">
                            </div>
                            <div className="col text-rosa">
                              <i className="icon-link-documento"/> Documento Soporte
                            </div>
                            <div className="col">
                              <a className="text-rosa" target="_blank" href={data.uploadDocumentosSoporte}>
                                <i className="icon-descargar-pdf"/>
                              </a>
                              <span className="text-rosa cursor-pointer" onClick={()=>onClickDelete(data,"uploadDocumentosSoporte")}>
                                <i className="icon-eliminar-tabla"/>
                              </span>
                            </div>
                          </div>:<div className="row  mb-2 mt-1">
                            <div class="col-1"></div>
                            <div className="col-12 col-md-5 text-gray border-bottom uploadFile position-relative">
                              <input type="file" accept="application/pdf" name={"uploadDocumentosSoporte"} className="inputfile position-absolute" onChange={upload} />
                              <i className="icon-link-documento text-gray"/> Seleccionar Documento Soporte
                            </div>
                            <div className="col-12 col-md-4 text-gray">
                              Archivo aún no seleccionado
                            </div>
                          </div>}

                          {data.uploadOtros!==undefined?<div className="row mb-2 mt-1">
                            <div className="col-1">
                            </div>
                            <div className="col text-rosa">
                              <i className="icon-link-documento"/> Otros Documentos
                            </div>
                            <div className="col">
                              <a className="text-rosa" target="_blank" href={data.uploadOtros}>
                                <i className="icon-descargar-pdf"/>
                              </a>
                              <span className="text-rosa cursor-pointer" onClick={()=>onClickDelete(data,"uploadOtros")}>
                                <i className="icon-eliminar-tabla"/>
                              </span>
                            </div>
                          </div>:<div className="row  mb-2 mt-1">
                            <div class="col-1"></div>
                            <div className="col-12 col-md-5 text-gray border-bottom uploadFile position-relative">
                              <input type="file" accept="application/pdf" name={"uploadOtros"} className="inputfile position-absolute" onChange={upload} />
                              <i className="icon-link-documento text-gray"/> Seleccionar Otro Documento Soporte
                            </div>
                            <div className="col-12 col-md-4 text-gray">
                              Archivo aún no seleccionado
                            </div>
                          </div>}


                          <div className="row text-center mt-4 justify-content-center">
                            <div className="col-12 col-md-10">
                              <NavLink to="/Administracion/Funcionarios" className="btn btn-outline-primary2 mb-3">Ver listado de funcionario</NavLink>
                            </div>
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
