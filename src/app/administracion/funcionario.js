import React,{useState,useEffect} from 'react';
import Header from '../../components/header_forms_tipo4';
import { NavLink, useParams } from "react-router-dom";
import Store from "../../helpers/Store";
import Functions from "../../helpers/Functions";
import Config from "../../helpers/Config";
import ImgPerfil from '../../assets/images/No_image.png';
import EditInput from '../../components/EditInput';
import EditInputNombreCompleto from '../../components/EditInputNombreCompleto';
import EditInputIdentificacion from '../../components/EditInputIdentificacion';
import EditInputEstadoCivil from '../../components/EditInputEstadoCivil';
import EditInputFecha from '../../components/EditInputFecha';

import StateContext from '../../helpers/ContextState';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

import BtnSelector from '../../components/BtnSelector';

const test  = true
const limitUpload =   1000000;

const is_security  = [
                        {label:"Dpto Seguridad",value:2},
                        {label:"Dpto Administrativo",value:1}
                      ]

const App=()=>{
  const parametros=useParams()
  const [data, setData]     = useState(false);
  const [inputs, setInputs] = useState({});
  const [pasaporte,setPasaporte] = useState(true);
  const [editLugar,setEditLugar] = useState(false);
  const [editIdentificacion,setEditIdentificacion] = useState(false);
  const [tipoDate, setTipoDate] = useState(false);
  const [tipoDate2, setTipoDate2] = useState(false);
  const [ciudades,setCiudades] = useState([]);
  const context             =   React.useContext(StateContext);

  useEffect(() => {
    getInit()
  },[])



  const getInit=()=>{
    Functions.PostAsync("Administracion","getFuncionario",{id:parametros.id},{},{name:"callbackContinue",funct:callbackContinue})
  }

  const callbackContinue=(response)=>{
    setData(response.data)
    let inputs_             =  {...inputs}
        inputs_.is_security =  response.data.is_security
        setInputs(inputs_)
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

  const onChange=(e)=>{
    if(e.target.name ==='tipo_identificacion'){
      document.getElementById("nro_identificacion").value='';
      if(e.target.value ==='3'){
        setPasaporte(true);
      }else{
        setPasaporte(false);
      }
    }
    Functions.Inputs(e,inputs, setInputs)
  }

  const handleBlur=(estatus)=>{
    setTipoDate(estatus)
  }

  const handleBlur2=(estatus)=>{
    setTipoDate2(estatus)
  }

  const handleOnSelect = (item,name) => {
    let inputs_         =   {...inputs}
        inputs_[name]   =   item.id
        setInputs(inputs_)
  }

  const handleOnSearch = (string, results) => {
    return false
  }

  const callback=(response)=>{
    setCiudades(response.data)
  }

  const formatResult = (item) => {
    return item;
  }

  // useEffect(() => {
  //   onUpdate();
  // },[inputs.is_security])

  const onUpdate=(value)=>{
    let data_ =  {...inputs}
        data_.is_security  =  value
        data_.funcionario_id=parametros.id
    Functions.PostAsync("Administracion","securityBool",data_,{})
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
                          <BtnSelector onUpdate={onUpdate} data={is_security} inputs={inputs} setInputs={setInputs} name="is_security"/>

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
                              <div className="label text-gray">
                                <EditInputNombreCompleto  input={data}
                                            name="nombres::apellidos"
                                            placeholder="Nombre Completo"
                                            module="Administracion"
                                            component="setData"
                                            table="usuarios"
                                            keys="token"
                                            keyValue="token"
                                            id={data}
                                            event='sololetras'
                                />

                              </div>
                            </div>
                            <div className="col-12 col-md-5 pt-2">
                              <div className="label"><b>Fecha de nacimiento</b></div>
                              <div className="label text-gray">
                                <EditInputFecha  input={data}
                                            name="fecha_nacimiento"
                                            placeholder="Fecha de nacimiento"
                                            module="Administracion"
                                            component="setData"
                                            table="usuarios"
                                            keys="token"
                                            keyValue="token"
                                            id={data}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row mt-3 justify-content-center">
                            <div className="col-12 col-md-5 pt-2">
                              <div className="label"><b>Identificación</b></div>
                              <div className="label text-gray">
                                <EditInputIdentificacion  input={data}
                                            name="lugar_nacimiento"
                                            placeholder="Lugar de nacimiento"
                                            type="autocomplete"
                                            module="Administracion"
                                            component="setData"
                                            table="usuarios"
                                            keys="token"
                                            keyValue="token"
                                            valuedDefaul={data.tipo_identificacion_string}
                                            id={data}
                                            getInit={getInit}
                                />
                              </div>
                            </div>
                            <div className="col-12 col-md-5 pt-2">
                              <div className="label"><b>Lugar de nacimiento</b></div>
                              <div className="label text-gray">
                                <EditInput  input={data}
                                            name="lugar_nacimiento"
                                            placeholder="Lugar de nacimiento"
                                            type="autocomplete"
                                            module="Administracion"
                                            component="setData"
                                            table="usuarios"
                                            keys="token"
                                            keyValue="token"
                                            id={data}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row mt-3 justify-content-center">
                            <div className="col-12 col-md-5 pt-2">
                              <div className="label"><b>Lugar de expedición</b></div>
                              <div className="label text-gray">
                                <EditInput  input={data}
                                            name="lugar_expedicion"
                                            placeholder="Lugar de expedición"
                                            type="autocomplete"
                                            module="Administracion"
                                            component="setData"
                                            table="usuarios"
                                            keys="token"
                                            keyValue="token"
                                            id={data}
                                />
                              </div>
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
                              <div className="label text-gray">
                                <EditInput  input={data}
                                            name="ciudad"
                                            placeholder="Ciudad"
                                            type="autocomplete"
                                            module="Administracion"
                                            component="setData"
                                            table="usuarios"
                                            keys="token"
                                            keyValue="token"
                                            id={data}
                                />
                              </div>
                            </div>
                            <div className="col-12 col-md-5 pt-2">
                              <div className="label"><b>Teléfono fijo</b></div>
                              <div className="label text-gray">
                                <EditInput  input={data}
                                            name="telefono_fijo"
                                            placeholder="Teléfono fijo"
                                            module="Administracion"
                                            component="setData"
                                            table="usuarios"
                                            keys="token"
                                            keyValue="token"
                                            id={data}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row mt-3 justify-content-center">
                            <div className="col-12 col-md-5 pt-2">
                              <div className="label"><b>Dirección</b></div>
                              <div className="label text-gray">
                                <EditInput  input={data}
                                            name="direccion"
                                            placeholder="Dirección"
                                            module="Administracion"
                                            component="setData"
                                            table="usuarios"
                                            keys="token"
                                            keyValue="token"
                                            id={data}
                                />
                              </div>
                            </div>
                            <div className="col-12 col-md-5 pt-2">
                              <div className="label"><b>Email</b></div>
                              <div className="label text-gray">
                                <EditInput  input={data}
                                            name="email"
                                            type="email"
                                            placeholder="Email"
                                            module="Administracion"
                                            component="setData"
                                            table="usuarios"
                                            keys="token"
                                            keyValue="token"
                                            id={data}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row mt-3 justify-content-center">
                            <div className="col-12 col-md-5 pt-2">
                              <div className="label"><b>Estado civil</b></div>
                              <div className="label text-gray">
                                <EditInputEstadoCivil  input={data}
                                            name="ma_estado_civil_id"
                                            placeholder="Estado Civil"
                                            module="Administracion"
                                            component="setData"
                                            table="usuarios"
                                            keys="token"
                                            keyValue="token"
                                            valuedDefaul={data.tipo_identificacion_string}
                                            id={data}
                                            getInit={getInit}
                                />
                              </div>
                            </div>
                            <div className="col-12 col-md-5 pt-2">
                              <div className="label"><b>Teléfono móvil</b></div>
                              <div className="label text-gray">
                                <EditInput  input={data}
                                            name="celular"
                                            type="tel"
                                            placeholder="Celular"
                                            module="Administracion"
                                            component="setData"
                                            table="usuarios"
                                            keys="token"
                                            keyValue="token"
                                            id={data}
                                />
                              </div>
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
