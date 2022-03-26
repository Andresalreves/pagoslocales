import React,{useState,useEffect} from 'react';
import Header from '../../components/header_forms_tipo4';
import { NavLink, useParams } from "react-router-dom";
import Store from "../../helpers/Store";
import Functions from "../../helpers/Functions";
import Config from "../../helpers/Config";
import ImgPerfil from '../../assets/images/No_image.png';

const test  = true

const App=()=>{
  const parametros=useParams()
  const [data, setData] = useState(false);

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
                              <img src={data===false?ImgPerfil:data.img_perfil} className="rounded-circle col-12 col-md-3" alt="PGRW" />
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
                          <div className="row mb-2 mt-4">
                            <div className="col-1">
                            </div>
                            <div className="col text-rosa">
                              Información de contacto
                            </div>
                          </div>
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
                          <div className="row mb-2 mt-4">
                            <div className="col-1">
                            </div>
                            <div className="col text-rosa">
                              Documentos de soporte
                            </div>
                          </div>
                          {data.uploadHojaVida!==''?<div className="row mb-2 mt-1">
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
                          </div>:false}
                          {data.uploadAfiliaciones!==''?<div className="row mb-2 mt-1">
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
                          </div>:false}
                          {data.uploadDocumentosSoporte!==''?<div className="row mb-2 mt-1">
                            <div className="col-1">
                            </div>
                            <div className="col text-rosa">
                              <i className="icon-link-documento"/> Documentos Soporte
                            </div>
                            <div className="col">
                              <a className="text-rosa" target="_blank" href={data.uploadDocumentosSoporte}>
                                <i className="icon-descargar-pdf"/>
                              </a>
                              <span className="text-rosa cursor-pointer" onClick={()=>onClickDelete(data,"uploadDocumentosSoporte")}>
                                <i className="icon-eliminar-tabla"/>
                              </span>
                            </div>
                          </div>:false}
                          {data.uploadOtros!==''?<div className="row mb-2 mt-1">
                            <div className="col-1">
                            </div>
                            <div className="col text-rosa">
                              <i className="icon-link-documento"/> Otros
                            </div>
                            <div className="col">
                              <a className="text-rosa" target="_blank" href={data.uploadOtros}>
                                <i className="icon-descargar-pdf"/>
                              </a>
                              <span className="text-rosa cursor-pointer" onClick={()=>onClickDelete(data,"uploadOtros")}>
                                <i className="icon-eliminar-tabla"/>
                              </span>
                            </div>
                          </div>:false}
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
