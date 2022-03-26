import React,{useState,useEffect} from 'react';
import Header from '../../components/header_forms';
import Genero from '../../components/selector_genero';
import Departamento from '../../components/selector_departamento';
import { NavLink, useParams } from "react-router-dom";
import Store from "../../helpers/Store";
import Functions from "../../helpers/Functions";
import Config from "../../helpers/Config";
import Select from '../../screens/select';
import StateContext from '../../helpers/ContextState'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import Comentarios from "../comentarios/index";
import SubtituloSeparador from "../../components/subtitulos_separadores";

const test  = false
const datos_basicos={

}

const limitUpload =   1000000;

const App=()=>{
  const params            =   useParams();
  const [reset, setReset] =   useState(false);
  const context = React.useContext(StateContext);
  const [uploadAutorizacionPagos, setuploadAutorizacionPagos] = useState(false);
  const [uploadW8W9, setuploadW8W9] = useState(false);
  const [uploadContrato, setuploadContrato] = useState(false);
  const [data, setData] = useState(false);
  const [data2, setData2] = useState(false);
  const [dataIn, setDataIn] = useState(false);
  const [dataBolsillo, setDataBolsillo] = useState(false);
  const [inputs, setInputs] = useState((test)?datos_basicos:false);
  const [active, setActive] = useState(false);
  const [tipoDate, setTipoDate] = useState(false);
  const [tipoDate2, setTipoDate2] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [pasaporte,setPasaporte] = useState(true);
  const [ciudades,setCiudades] = useState([]);


  useEffect(() => {
    if(!inputs){
      setInputs({genero:"1"})
    }

    if (params.id===undefined) {
      setMostrarFormulario(true)
    }else {
      setInputs({funcionario_id:params.id})
      setMostrarFormulario(false)
    }
    getInit()
  },[])

  const getInit=()=>{
    if(params.id!==undefined) {
      Functions.PostAsync("Administracion","getCreateCuentasClientes",{id:params.id},{},{name:"callbackContinue2",funct:callbackContinue2})
    }
    Functions.PostAsync("Maestros","get_tablas_maestras",{},{},{name:"callbackContinue",funct:callbackContinue})
  }

  const callbackContinue=(response)=>{
    setData(response)
    setMostrarFormulario(true)
  }

  useEffect(() => {
    if (data2) {
      setMostrarFormulario(true)
    }
  },[data2])

  const callbackContinue2=(response)=>{
    let inputs_ = {...inputs}
        Object.entries(response.data).map((row,key)=>{
          return inputs_[row[0]]  = row[1]
        })
    setInputs(inputs_)
    setData2(response.data)
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
            data.id         =   params.id
            data.name       =   event.target.name
            data.label      =   label
            Functions.PostAsync("Administracion","UploadCreateCuentasClientes",data,{},{name:"callbackContinueSend",funct:callbackContinueSend})
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

  useEffect(() => {
    //console.log(uploadAutorizacionPagos);
    // let send  = {file:JSON.stringify(uploadAutorizacionPagos),name:"uploadAutorizacionPagos"}
    // Functions.PostAsync("Administracion","UploadCreateCuentasClientes",send,{},{name:"callbackUpload",funct:callbackUpload})
  },[uploadAutorizacionPagos])

  useEffect(() => {
    let send  = {file:JSON.stringify(uploadW8W9),name:"uploadW8W9"}
    Functions.PostAsync("Administracion","UploadCreateCuentasClientes",send,{},{name:"callbackUpload",funct:callbackUpload})
  },[uploadW8W9])

  useEffect(() => {
    let send  = {file:JSON.stringify(uploadContrato),name:"uploadContrato"}
    Functions.PostAsync("Administracion","UploadCreateCuentasClientes",send,{},{name:"callbackUpload",funct:callbackUpload})
  },[uploadContrato])

  const callbackUpload=(response)=>{
    if (response.data!==undefined && response.data!=='') {
      let inputs_                 = {...inputs}
          inputs_[response.name]  = response.value
          setInputs(inputs_)
    }
  }

  const callbackSubmit=(response)=>{
    if (response.message.confirmation!==undefined) {
      document.location.href  =   Config.ConfigAppUrl+'Administracion/CuentasClientes'
    }
  }

  const handleBlur=(estatus)=>{
    setTipoDate(estatus)
  }

  const handleBlur2=(estatus)=>{
    setTipoDate2(estatus)
  }


  const handleOnSearch = (string, results) => {
    return false
  }

  const callback=(response)=>{
    setCiudades(response.data)
  }

  const handleOnSelect = (item,name) => {
    let inputs_         =   {...inputs}
        inputs_[name]   =   item.id
        setInputs(inputs_)
  }

  const formatResult = (item) => {
    return item;
    //return (<p dangerouslySetInnerHTML={{__html: '<strong>'+item+'</strong>'}}></p>); //To format result as html
  }

  const handleClickSubmit=(e)=>{
    //document.getElementById("miformulario").submit();
    e.preventDefault()
    let send        = {...inputs}
        send.token  = Store.get("user").token
    Functions.PostAsync("Administracion","setCreateCuentasClientes",send,{},{name:"callbackSubmit",funct:callbackSubmit})
  }

  const onSubmit=(e)=>{
    e.preventDefault()
    let send        = {...inputs}
        send.token  = Store.get("user").token
    Functions.PostAsync("Administracion","setCreateCuentasClientes",send,{},{name:"callbackSubmit",funct:callbackSubmit})
  }

  const onClickDelete=(row,campo)=>{
    let data_={
                campo:campo,
                value:"",
                id:params.id
              }
    Functions.PostAsync("Administracion","updateCreateCuentasClientesFile",data_,{},{name:"callbackContinue3",funct:callbackContinue3})
  }

  const callbackContinue3=()=>{
    getInit()
  }

  return  <>{mostrarFormulario?<div className="Contenido-Home">
              <div className="title-home mb-4">Crear cuenta Int. clientes</div>
                <div className="row justify-content-center">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-content">
                        <div className="card-body">
                          <form onSubmit={onSubmit} id="miformulario">
                            <div className="p-sm-5">
                              <Header title="Crear cuenta"
                                      subtitle="Internacional clientes"
                                      classIcon="icon-detalles-operacion ico-generico"/>
                              <div className="border"></div>
                              <div className="row mb-2 mt-4">
                                <div className="col-12 col-md-6 mb-2">
                                  <input  className="form-control"
                                          type="text"
                                          required
                                          name="razon_social"
                                          defaultValue={test?datos_basicos.razon_social:data2.razon_social}
                                          placeholder="Razón social"
                                          onChange={onChange}
                                  />
                                </div>
                                <div className="col-12 col-md-6">
                                  <input  className="form-control"
                                          type="text"
                                          required={true}
                                          name="entidad_bancaria"
                                          defaultValue={test?datos_basicos.entidad_bancaria:data2.entidad_bancaria }
                                          placeholder="Entidad bancaria"
                                          onChange={onChange}
                                  />
                                </div>
                              </div>
                              <div className="row mb-2">
                                <div className="col-12 col-md-6">
                                  <Select
                                    render_id={params.id!==undefined?true:false}
                                    required={true}
                                    data={(data.ma_tipo_cuentas_bancarias!==undefined?data.ma_tipo_cuentas_bancarias:[])}
                                    name="ma_tipo_cuentas_bancarias"
                                    selectDefault="Tipo de cuenta"
                                    onChange={onChange}
                                    defaultValue={test?datos_basicos.ma_tipo_cuentas_bancarias:data2.ma_tipo_cuentas_bancarias}
                                  />
                                </div>
                                <div className="col-12 col-md-6">
                                  <input  className="form-control"
                                          type="text"
                                          name="pais"
                                          required={true}
                                          defaultValue={test?datos_basicos.pais:data2.pais}
                                          placeholder="País"
                                          onChange={onChange}
                                  />
                                </div>
                              </div>
                              <div className="row mb-3">
                                <div className="col-12 col-md-6 mb-2">
                                  <input  className="form-control"
                                          required={true}
                                          type={tipoDate?"date":"text"}
                                          onBlur={()=>handleBlur(false)}
                                          onFocus={()=>handleBlur(true)}
                                          name="fecha_creacion"
                                          defaultValue={test?datos_basicos.fecha_creacion:data2.fecha_creacion}
                                          placeholder="Fecha de creación"
                                          onChange={onChange}
                                  />
                                </div>
                                <div className="col-12 col-md-6">
                                  <input  className="form-control"
                                          type="text"
                                          name="funcionario"
                                          required={true}
                                          defaultValue={test?datos_basicos.funcionario:data2.funcionario}
                                          placeholder="Funcionario"
                                          onChange={onChange}
                                  />
                                </div>
                              </div>
                              <Header title="Documentos de soporte" subtitle="Suba los siguientes documentos de soporte" classIcon="icon-documento ico-generico"/>
                              <div className="row mb-3 mt-3">
                                {data2.uploadAutorizacionPagos!==undefined && data2.uploadAutorizacionPagos!==""?<>
                                  <div class="col-12 col-sm-4 text-rosa d-none d-md-block d-lg-block">Autorización de pagos</div>
                                  <div className="col-8 col-md-4 text-rosa border-bottom">
                                    <i className="icon-link-documento"/> Autorización de pagos
                                  </div>
                                  <div className="col-4 col-sm ">
                                    <a className="text-rosa" target="_blank" href={data2.uploadAutorizacionPagos}>
                                      <i className="icon-descargar-pdf"/>
                                    </a>
                                    <span className="text-rosa cursor-pointer" onClick={()=>onClickDelete(data,"uploadAutorizacionPagos")}>
                                      <i className="icon-eliminar-tabla"/>
                                    </span>
                                  </div>
                                </>:<>
                                  <div class="col-12 col-sm-4 text-gray d-none d-md-block d-lg-block">Autorización de pagos</div>
                                  <div className="col-12 col-md-4 text-gray border-bottom uploadFile position-relative">
                                    <input type="file" accept="application/pdf" name={"uploadAutorizacionPagos"} accept="application/pdf" className="inputfile position-absolute" onChange={upload} />
                                    <i className="icon-link-documento text-gray"/>Seleccionar archivo
                                  </div>
                                  <div className="col-12 col-md-4 text-gray">
                                    Autorización aún no seleccionada
                                  </div>
                                </>}
                              </div>
                              <div className="row mb-3">
                                {data2.uploadW8W9!==undefined && data2.uploadW8W9!==""?<>
                                  <div class="col-12 col-sm-4 text-rosa d-none d-md-block d-lg-block">W8 / W9</div>
                                  <div className="col-8 col-md-4 text-rosa border-bottom">
                                    <i className="icon-link-documento"/> W8 / W9
                                  </div>
                                  <div className="col-4 col-sm">
                                    <a className="text-rosa" target="_blank" href={data2.uploadW8W9}>
                                      <i className="icon-descargar-pdf"/>
                                    </a>
                                    <span className="text-rosa cursor-pointer" onClick={()=>onClickDelete(data,"uploadW8W9")}>
                                      <i className="icon-eliminar-tabla"/>
                                    </span>
                                  </div>
                                </>:<>
                                  <div class="col-12 col-sm-4 text-gray d-none d-md-block d-lg-block">W8 / W9 </div>
                                  <div className="col-12 col-md-4 text-gray border-bottom uploadFile position-relative">
                                    <input type="file" accept="application/pdf" name={"uploadW8W9"} className="inputfile position-absolute" onChange={upload} />
                                    <i className="icon-link-documento text-gray"/>Seleccionar Archivo
                                  </div>
                                  <div className="col-12 col-md-4 text-gray">
                                    W8 / W9 aún no seleccionada
                                  </div>
                                </>}
                              </div>

                              <div className="row mb-3">
                                {data2.uploadContrato!==undefined && data2.uploadContrato!==""?<>
                                  <div class="col-12 col-sm-4 text-rosa d-none d-md-block d-lg-block">Contrato</div>
                                  <div className="col-8 col-md-4 text-rosa border-bottom">
                                    <i className="icon-link-documento"/> Contrato
                                  </div>
                                  <div className="col-4 col-sm">
                                    <a className="text-rosa" target="_blank" href={data2.uploadContrato}>
                                      <i className="icon-descargar-pdf"/>
                                    </a>
                                    <span className="text-rosa cursor-pointer" onClick={()=>onClickDelete(data,"uploadContrato")}>
                                      <i className="icon-eliminar-tabla"/>
                                    </span>
                                  </div>
                                </>:<>
                                  <div class="col-12 col-sm-4 text-gray d-none d-md-block d-lg-block">Contrato</div>
                                  <div className="col-12 col-md-4 text-gray border-bottom uploadFile position-relative">
                                    <input type="file" accept="application/pdf" name={"uploadContrato"} className="inputfile position-absolute" onChange={upload} />
                                    <i className="icon-link-documento text-gray"/>Seleccionar Archivo
                                  </div>
                                  <div className="col-12 col-md-4 text-gray">
                                    Contrato aún no seleccionado
                                  </div>
                                </>}
                              </div>
                            </div>
                          </form>
                          <div className="pl-sm-5 pr-sm-5">
                            <Header title="Comentarios" classIcon="icon-mensaje-notificacion ico-generico" class="text-left"/>
                            <SubtituloSeparador title="Comentarios"/>
                            {!reset?<Comentarios id={"CreateCuentasClientes_"+params.id}/>:false}
                            <div className="row text-center mt-4 justify-content-center">
                              <div className="col-6">
                                {!test || 1===1?<button type="button" className="btn btn-primary mb-3 mr-1" onClick={handleClickSubmit}>
                                  Guardar
                                </button>:<NavLink to="/Administracion/Funcionario" className="btn btn-primary mb-3 mr-1">Guardar</NavLink>}
                                <NavLink to="/Administracion/CuentasClientes" className="btn btn-gray text-white mb-3">Cancelar</NavLink>
                              </div>
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
