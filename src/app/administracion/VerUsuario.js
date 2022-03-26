import React,{useState,useEffect} from 'react';
import Header from '../../components/header_forms_andres';
import { NavLink, useParams,useHistory } from "react-router-dom";
import Store from "../../helpers/Store";
import Functions from "../../helpers/Functions";
import Config from "../../helpers/Config";
import ImgPerfil from '../../assets/images/No_image.png';
import UploadFile from '../../components/uploadFile'
import Comentarios from "../comentarios/index";
import DocumentosSoporte from "../../components/documentos_soporte";
import SubtituloSeparador from "../../components/subtitulos_separadores";

import EditInput from '../../components/EditInput';
import EditInputIdentificacion from '../../components/EditInputIdentificacion';
import EditInputFecha from '../../components/EditInputFecha';
import StateContext from '../../helpers/ContextState'
import Select from '../../screens/select';


const test    = true
const estatus = [
                  {
                    label:"Aprobar",
                    value:2
                  },
                  {
                    label:"Rechazar",
                    value:9
                  },
                ]

const App=()=>{
  const history                       =   useHistory();
  const context                       =   React.useContext(StateContext);
  const params                        =   useParams();
  const [data, setData]               =   useState(false);
  const [data2, setData2]             =   useState(false);
  const [reset, setReset]             =   useState(false);
  const [activeSave, setActiveSave]   =   useState(false);
  const [inputs, setInputs]           =   useState({});

  useEffect(() => {
    if (reset) {
      setReset(false)
    }
  },[reset])

  useEffect(() => {
    //context.socketIo.emit("TableUsuarios",{})
    getInit()
  },[])



  const onSubmit=(e)=>{
    e.preventDefault()
    let data_                   =   {...inputs}
        data_.usuario_id        =   inputs.token
        delete(data_.token)
    Functions.PostAsync("Administracion","VerificarCuenta",data_,{},{name:"callbackSubmitEstatus",funct:callbackSubmitEstatus})
  }

  const callbackSubmitEstatus   =   (response)=>{
    if (response.message!==undefined && response.message.label!==undefined) {
      context.socket.lista_clientes_conectados()
      context.socket.actualizar_notificacion()
      context.socketIo.emit("actualizar_cuenta")
      context.setModalShow({
        show:true,
        message:<div className="text-center">
                  <div>{response.message.label}</div>
                  <div className="row justify-content-center mt-2">
                    <div className="col" onClick={()=>{context.setModalShow({show:false}); history.push("/Administracion/Usuarios")}}>
                      <div className="btn btn-primary btn-block mt-3">Continuar</div>
                    </div>
                  </div>
                </div>,
        size:""
      })
      //history.push("/AprobacionCuentas");
    }
  }

  const getInit=()=>{
    Functions.PostAsync("Administracion","getUsuario",{usuario_id:params.usuario_id},{},{name:"callbackContinue",funct:callbackContinue})
  }

  const callbackContinue=(response)=>{
    if (response.data!==undefined) {
      setData(response.data)
      setInputs(response.data)
    }
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

  const onChange=(e)=>{
    Functions.Inputs(e,inputs, setInputs)
  }

  return  <>
            {data?<div className="Contenido-Home">
              <div className="row justify-content-center">
                <div className="col-12">
                  <div className="card">
                    <div className="card-content">
                      <div className="card-body perfil">

                          <div className="p-sm-5">
                            <Header title="Resumen"
                                    estado="Pendiente"
                                    data={data}
                                    classIcon="icon-documento ico-generico"
                                    class="text-left"/>
                            <div className="border mb-4"></div>


                            <div className="row mt-3 justify-content-center">
                              <div className="col-12 col-md-5 pt-2">
                                <div className="label"><b>Nombres y apellidos</b></div>
                                <div className="label text-gray">
                                  { data.nombre_representante_legal!==undefined &&
                                    data.nombre_representante_legal!=="" &&
                                    data.nombre_representante_legal!==null?<>
                                      <EditInput  input={data}
                                                  name="razon_social"
                                                  replace={data.nombre_completo}
                                                  placeholder="Razón social"
                                                  module="Administracion"
                                                  component="setData"
                                                  table="usuarios"
                                                  keys="token"
                                                  keyValue="token"
                                                  id={data}
                                                  getInit={getInit}
                                      />
                                    </>:<div className="row">
                                          <div className="pl-3 pr-2 d-flex">
                                            <EditInput  input={data}
                                                        name="nombres"
                                                        replace={data.nombres}
                                                        placeholder="Nombres"
                                                        module="Administracion"
                                                        component="setData"
                                                        table="usuarios"
                                                        keys="token"
                                                        keyValue="token"
                                                        id={data}
                                                        getInit={getInit}
                                            />
                                          </div>
                                          <div className="d-flex">
                                            <EditInput  input={data}
                                                        name="apellidos"
                                                        replace={data.apellidos}
                                                        placeholder="Apellidos"
                                                        module="Administracion"
                                                        component="setData"
                                                        table="usuarios"
                                                        keys="token"
                                                        keyValue="token"
                                                        id={data}
                                                        getInit={getInit}
                                            />
                                          </div>
                                    </div>}
                                </div>
                              </div>
                              <div className="col-12 col-md-5 pt-2">
                                <div className="label"><b>Cuenta</b></div>
                                <div className="label text-gray">
                                  {data.celular}
                                </div>
                              </div>
                            </div>
                            <div className="row mt-3 justify-content-center">
                              <div className="col-12 col-md-5 pt-2">
                                <div className="label"><b>Identificación</b></div>
                                <div className="label text-gray">
                                    <EditInputIdentificacion  input={data}
                                                name="tipo_identificacion"
                                                name2="nro_identificacion"
                                                placeholder={ data.nombre_representante_legal!==undefined &&
                                                              data.nombre_representante_legal!=="" &&
                                                              data.nombre_representante_legal!==null?"NIT":"Identificación"}
                                                type="autocomplete"
                                                module="Administracion"
                                                component="setData"
                                                replace={data.tipo_identificacion_string+" "+data.nro_identificacion}
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
                                {data.razon_social!==''?<>
                                  <div className="label"><b>Razón social</b></div>
                                  <div className="label text-gray">
                                    <div className="label text-gray">{(data.razon_social!==undefined)?data.razon_social:''}</div>
                                  </div>
                                </>:false}
                              </div>
                            </div>
                            <div className="row mt-3 justify-content-center">
                              <div className="col-12 col-md-5 pt-2">
                                <div className="label"><b>Tipo de Cuenta</b></div>
                                <div className="label text-gray">{(data.tipo_cuenta_string!==undefined && data.tipo_cuenta_string!==null)?data.tipo_cuenta_string:'Personal'}</div>
                              </div>
                              <div className="col-12 col-md-5 pt-2">
                                {data.representante_legal!==''?<>
                                  <div className="label"><b>Representante legal</b></div>
                                  <div className="label text-gray">
                                    <EditInput  input={data}
                                                name="nombre_representante_legal"
                                                placeholder="Nombres Representante Legal"
                                                module="Administracion"
                                                component="setData"
                                                table="usuarios"
                                                keys="token"
                                                keyValue="token"
                                                id={data}
                                                getInit={getInit}
                                    />
                                  </div>
                                </>:false}
                              </div>
                            </div>
                            <div className="row mt-3 mb-4 justify-content-center">
                              <div className="col-12 col-md-5 pt-2">
                                <div className="label"><b>Email</b></div>
                                <div className="label text-gray">
                                  <EditInput  input={data}
                                              name="email"
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
                              <div className="col-12 col-md-5 pt-2">
                                {data.razon_social!==''?<>
                                <div className="label"><b>Identificación Representante Legal</b></div>
                                <div className="label text-gray">
                                    <EditInputIdentificacion  input={data}
                                                name="tipo_identificacion_representante_legal"
                                                name2="numero_identificacion_representante_legal"
                                                placeholder={ data.nombre_representante_legal!==undefined &&
                                                              data.nombre_representante_legal!=="" &&
                                                              data.nombre_representante_legal!==null?"NIT":"Identificación"}
                                                type="autocomplete"
                                                module="Administracion"
                                                component="setData"
                                                replace={data.tipo_identificacion_representante_legal_string+" "+data.numero_identificacion_representante_legal}
                                                table="usuarios"
                                                keys="token"
                                                keyValue="token"
                                                valuedDefaul={data.tipo_identificacion_representante_legal_string+" "+data.numero_identificacion_representante_legal}
                                                id={data}
                                                getInit={getInit}
                                    />
                                </div>
                                </>:false}
                              </div>
                            </div>
                            <div className="row mt-3 mb-5 justify-content-center">
                              <div className="col-12 col-md-5 pt-0">
                                <div className="label"><b>Móvil</b></div>
                                <div className="label text-gray">
                                  {data.celular}
                                </div>
                              </div>
                              <div className="col-12 col-md-5 pt-2">
                                <div className="label"><b>Ciudad Expedición</b></div>
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
                            </div>
                            <div className="row mt-3 mb-5 justify-content-center">
                              <div className="col-12 col-md-5 pt-2">
                                {data.codigo_sms!=='9000'?<>
                                  <div className="label"><b>Cod. SMS</b></div>
                                  <div class="label text-gray"><div>{data.codigo_sms}</div></div>
                                </>:false}
                              </div>
                              <div className="col-12 col-md-5 pt-0">
                                {data.razon_social!==''?<>
                                <div className="label"><b>Fecha de expedición</b></div>
                                <div className="label text-gray">
                                  <EditInputFecha  input={data}
                                              name="fecha_expedicion"
                                              placeholder="Fecha de expedición"
                                              module="Administracion"
                                              component="setData"
                                              table="usuarios"
                                              keys="token"
                                              keyValue="token"
                                              id={data}
                                  />
                                </div>
                                </>:false}
                              </div>
                            </div>
                            <Header title="Documentos de soporte" subtitle="Suba los siguientes documentos de soporte" classIcon="icon-documento ico-generico" class="text-left"/>
                            <div className="mt-2 p-3">
                              <DocumentosSoporte  require="sarlaft"
                                                  setActiveSave={setActiveSave}
                                                  user={data}
                                                  setReset={setReset}
                                                  id={data.token}
                                                  modulo_token_prefijo="modulo_token_prefijo"/>
                            </div>
                            <Header title="Comentarios" classIcon="icon-mensaje-notificacion ico-generico" class="text-left"/>
                            <SubtituloSeparador title="Comentarios"/>
                            {!reset?<Comentarios id={data.token}/>:false}
                            <div className="row text-center mt-4 justify-content-center d-none">
                              <div className="col-6">
                                <NavLink to="/AsginarRol" className="btn btn-primary mb-3 mr-1">Asignar Rol</NavLink>
                                <NavLink to="/Descargar" className="btn btn-outline-primary2 mb-3 mr-1">Descargar</NavLink>
                                <NavLink to="/Funcionarios" className="btn btn-outline-primary2 mb-3">Ver listado de funcionario</NavLink>
                              </div>
                            </div>


                            <form onSubmit={onSubmit}>
                              {activeSave && parseInt(context.user.tipo_usuario_id)<4?<>
                                {data.estatus==='1'?<Select
                                  required={true}
                                  data={estatus}
                                  name="estatus"
                                  selectDefault="Estado"
                                  onChange={onChange}
                                />:false}
                              </>:<div className="p-5"><h3 className="text-rosa">Importante</h3><br/>No se puede aprobar un usuario sin antes cargar el Soporte de consulta</div>}
                              <div className="row text-center mt-4 justify-content-md-center">
                                <div className="col-12 col-sm-6">
                                  {activeSave?<button type="submit" className="btn btn-primary mb-3 mr-1">Guardar</button>:false}
                                  <NavLink to={"/Administracion/Usuarios"} className="btn btn-gray mb-3">Ver listado de usuarios</NavLink>
                                </div>
                              </div>
                            </form>

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
