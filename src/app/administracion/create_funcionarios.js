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
import UploadImg from '../../components/uploadImg'
import UploadFile from '../../components/uploadFile'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import SoloCelular from '../../components/SoloCelular';
import queryString from 'query-string';
import Municipios from '../../helpers/Municipios';
const queryStringParams = queryString.parse(window.location.search);


const test  = false
const datos_basicos={
    nombre_completo:"JORGE MENDEZ",
    nombre_usuario:"JORGE",
    password:"123456",
    fecha_nacimiento:"1977-10-18",
    nro_identificacion:"123456789",
    Lugar_nacimiento:"SALAMINA",
    lugar_expedicion:"SALAMINA",
    direccion:"SALAMINA",
    telefono_fijo:"123456",
    ciudad:"SALAMINA",
    celular:"123456",
    email:"lic.jorgemendez@gmail.com",
}

const App=()=>{
  const parametros=useParams()
  const context = React.useContext(StateContext);
  const [upload, setUpload] = useState(false);
  const [uploadHojaVida, setUploadHojaVida] = useState(false);
  const [uploadAfiliaciones, setUploadAfiliaciones] = useState(false);
  const [uploadDocumentosSoporte, setUploadDocumentosSoporte] = useState(false);
  const [uploadOtros, setUploadOtros] = useState(false);
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
  const [ChangeColorIcon, setChangeColorIcon] = useState({celular:'',password:''});

  useEffect(() => {
    if (!inputs) {
      setInputs({genero:"1"})
    }

    if (queryStringParams.id===undefined) {
      setMostrarFormulario(true)
    }else {
      setInputs({funcionario_id:queryStringParams.id})
      setMostrarFormulario(false)
    }
    getInit()
  },[])

  const getInit=()=>{
    if (parametros.id!==undefined) {
      Functions.PostAsync("Administracion","getFuncionario",{id:parametros.id},{},{name:"callbackContinue2",funct:callbackContinue2})
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

  const onSubmit=(e)=>{
    e.preventDefault()
    if (inputs.celular===undefined || inputs.celular.length!==10) {
      return context.setModalShow({
                              show:true,
                              message:<div className="text-center text-dark">El número celular no es correcto</div>
                            })
    }

    let send        = {...inputs}
        send.token  = Store.get("user").token
        // send.img_perfil               = JSON.stringify(upload)
        // send.uploadHojaVida           = JSON.stringify(uploadHojaVida)
        // send.uploadAfiliaciones       = JSON.stringify(uploadAfiliaciones)
        // send.uploadDocumentosSoporte  = JSON.stringify(uploadDocumentosSoporte)
        // send.uploadOtros              = JSON.stringify(uploadOtros)
        //console.log(send);
    Functions.PostAsync("Administracion","setFuncionarios",send,{},{name:"callbackSubmit",funct:callbackSubmit})
  }

  useEffect(() => {
    let send  = {file:JSON.stringify(upload),name:"foto"}
    Functions.PostAsync("Administracion","Upload",send,{},{name:"callbackUpload",funct:callbackUpload})
  },[upload])

  useEffect(() => {
    let send  = {file:JSON.stringify(uploadHojaVida),name:"uploadHojaVida"}
    Functions.PostAsync("Administracion","Upload",send,{},{name:"callbackUpload",funct:callbackUpload})
  },[uploadHojaVida])

  useEffect(() => {
    let send  = {file:JSON.stringify(uploadAfiliaciones),name:"uploadAfiliaciones"}
    Functions.PostAsync("Administracion","Upload",send,{},{name:"callbackUpload",funct:callbackUpload})
  },[uploadAfiliaciones])

  useEffect(() => {
    let send  = {file:JSON.stringify(uploadDocumentosSoporte),name:"uploadDocumentosSoporte"}
    Functions.PostAsync("Administracion","Upload",send,{},{name:"callbackUpload",funct:callbackUpload})
  },[uploadDocumentosSoporte])

  useEffect(() => {
    let send  = {file:JSON.stringify(uploadOtros),name:"uploadOtros"}
    Functions.PostAsync("Administracion","Upload",send,{},{name:"callbackUpload",funct:callbackUpload})
  },[uploadOtros])

  const callbackUpload=(response)=>{
    if (response.data!==undefined && response.data!=='') {
      let inputs_                 = {...inputs}
          inputs_[response.name]  = response.value
          setInputs(inputs_)
    }
  }

  const callbackSubmit=(response)=>{
    document.location.href  =   Config.ConfigAppUrl+'Administracion/funcionario/'+response.message.confirmation
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

  const deleteColor = (e)=>{
    setChangeColorIcon({celular:'',password:''});
  }

  const changeColor = (e) =>{
    setChangeColorIcon(e.target.name=='celular'?{celular:'icon-red',password:''}:{celular:'',password:'icon-red'});
  }

  return  <>{mostrarFormulario?<div className="Contenido-Home">
              <div className="title-home mb-4">Agregar funcionario</div>
                <div className="row justify-content-center">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-content">
                        <div className="card-body">
                          <form onSubmit={onSubmit}>
                            <div className="p-5">
                              <Header title="Nuevo Funcionario"
                                      subtitle="Creación de terceros"
                                      classIcon="icon-detalles-operacion ico-generico"
                                      NavLink={NavLink}
                                      to="Funcionarios"
                                      />
                              <div className="border"></div>
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
                                              required={true}
                                              type="text"
                                              defaultValue={test?datos_basicos.nombres:data2.nombres}
                                              name="nombres"
                                              placeholder="Nombres"
                                              onChange={onChange}
                                      />
                                    </div>
                                    <div className="col">
                                      <input  className="form-control"
                                              required={true}
                                              type="text"
                                              defaultValue={test?datos_basicos.apellidos:data2.apellidos}
                                              name="apellidos"
                                              placeholder="Apellidos"
                                              onChange={onChange}
                                      />
                                    </div>
                                  </div>
                                  <div className="row mb-2">
                                    <div className="col-12 col-md-6">
                                      <input  className="form-control"
                                              type="text"
                                              required={true}
                                              name="nombre_usuario"
                                              defaultValue={test?datos_basicos.nombre_usuario:data2.nombre_usuario}
                                              placeholder="Nombre de usuario"
                                              onChange={onChange}
                                      />
                                    </div>
                                    <div className="col-12 col-md-6">
                                      <input  className="form-control"
                                              type="password"
                                              name="password"
                                              required={true}
                                              defaultValue={test?datos_basicos.password:""}
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
                                    render_id={queryStringParams.id!==undefined?true:false}
                                    required={true}
                                    data={(data.ma_tipo_identificacion!==undefined?data.ma_tipo_identificacion:[])}
                                    name="tipo_identificacion"
                                    selectDefault="Tipo de identificación"
                                    defaultValue={(datos_basicos.tipo_identificacion===undefined)?false:datos_basicos.tipo_identificacion}
                                    onChange={onChange}
                                  />
                                </div>
                                <div className="col-12 col-md-6">
                                  <input  className="form-control"
                                          required={true}
                                          type={tipoDate?"date":"text"}
                                          onBlur={()=>handleBlur(false)}
                                          onFocus={()=>handleBlur(true)}
                                          name="fecha_nacimiento"
                                          defaultValue={test?datos_basicos.fecha_nacimiento:data2.fecha_nacimiento}
                                          placeholder="Fecha de nacimiento"
                                          onChange={onChange}
                                  />
                                </div>
                              </div>
                              <div className="row mb-3">
                                <div className="col-12 col-md-6">
                                  <input  className="form-control"
                                          required={true}
                                          type="text"
                                          name="nro_identificacion"
                                          id="nro_identificacion"
                                          defaultValue={test?datos_basicos.nro_identificacion:data2.nro_identificacion}
                                          placeholder="Número de identificación"
                                          onChange={onChange}
                                          event={pasaporte?'':'solonumeros'}
                                  />
                                </div>
                                <div className="col-12 col-md-6">
                                  <ReactSearchAutocomplete
                                    className="form-control"
                                    name="lugar_nacimiento"
                                    placeholder="Lugar de nacimiento"
                                    items={Municipios}
                                    onSearch={handleOnSearch}
                                    onSelect={(result)=>handleOnSelect(result,"lugar_nacimiento")}
                                    autoFocus
                                    formatResult={formatResult}
                                  />
                                </div>
                              </div>
                              <div className="row mb-2">
                                <div className="col-12 col-md-6">
                                  <ReactSearchAutocomplete
                                    className="form-control"
                                    name="lugar_expedicion"
                                    placeholder="Lugar de expedición"
                                    items={Municipios}
                                    onSearch={handleOnSearch}
                                    onSelect={(result)=>handleOnSelect(result,"lugar_expedicion")}
                                    autoFocus
                                    formatResult={formatResult}
                                  />
                                </div>
                                <div className="col-12 col-md-6">
                                  <Genero
                                      inputs={inputs}
                                      setInputs={setInputs}
                                      opciones={data}
                                      name="genero"
                                      defaultValue={test?datos_basicos.genero:data2.genero}
                                  />
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
                                          required={true}
                                          name="direccion"
                                          defaultValue={test?datos_basicos.direccion:data2.direccion}
                                          placeholder="Dirección"
                                          onChange={onChange}
                                  />
                                </div>
                                <div className="col-12 col-md-6">
                                  <input  className="form-control"
                                          type="text"
                                          required={true}
                                          name="telefono_fijo"
                                          defaultValue={test?datos_basicos.telefono_fijo:data2.telefono_fijo}
                                          placeholder="Teléfono fijo"
                                          onChange={onChange}
                                  />
                                </div>
                              </div>
                              <div className="row mb-2">
                                <div className="col-12 col-md-6">
                                  <ReactSearchAutocomplete
                                    className="form-control"
                                    name="ciudad"
                                    placeholder="Ciudad"
                                    items={Municipios}
                                    onSearch={handleOnSearch}
                                    onSelect={(result)=>handleOnSelect(result,"ciudad")}
                                    autoFocus
                                    formatResult={formatResult}
                                  />
                                </div>
                                <div className="col-12 col-md-6">
                                  <Select
                                    render_id={queryStringParams.id!==undefined?true:false}
                                    required={true}
                                    data={(data.ma_estado_civil!==undefined?data.ma_estado_civil:[])}
                                    name="ma_estado_civil_id"
                                    selectDefault="Estado Civil"
                                    onChange={onChange}
                                    defaultValue={test?datos_basicos.ma_estado_civil_id:data2.ma_estado_civil_id}
                                  />
                                </div>
                              </div>
                              <div className="row mb-3">
                                <div className="col-12 col-md-6">
                                  <SoloCelular
                                      required={true}
                                      className="form-control"
                                      placeholder="Celular"
                                      setModalShow={context.setModalShow}
                                      onChange={onChange}
                                      onFocus={changeColor}
                                      onBlur={deleteColor}
                                      inputs={inputs}
                                      setInputs={setInputs}
                                      name="celular"
                                      id="celular"
                                  />
                                </div>
                                <div className="col-12 col-md-6">
                                  <input  className="form-control"
                                          type="email"
                                          name="email"
                                          required={true}
                                          defaultValue={test?datos_basicos.email:data2.email}
                                          placeholder="Correo electrónico"
                                          onChange={onChange}
                                  />
                                </div>
                              </div>
                              <Header title="Documentos de soporte" subtitle="Suba los siguientes documentos de soporte" classIcon="icon-documento ico-generico"/>
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
                                        defaultValue={test?datos_basicos.uploadHojaVida:data2.uploadHojaVida}
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
                                        defaultValue={test?datos_basicos.uploadAfiliaciones:data2.uploadAfiliaciones}
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
                                        defaultValue={test?datos_basicos.uploadDocumentosSoporte:data2.uploadDocumentosSoporte}
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
                                        defaultValue={test?datos_basicos.uploadOtros:data2.uploadOtros}
                                  />
                                </div>
                              </div>
                              <div className="row text-center mt-4 justify-content-center">
                                <div className="col-6">
                                  {!test || 1===1?<button type="submit" className="btn btn-primary mb-3 mr-1">
                                    Crear funcionario
                                  </button>:<NavLink to="/Administracion/Funcionario" className="btn btn-primary mb-3 mr-1">Crear funcionario</NavLink>}
                                  <NavLink to="/Administracion/Funcionarios" className="btn btn-gray text-white mb-3">Cancelar</NavLink>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
          </div>:false}

        </>
}
export default App
