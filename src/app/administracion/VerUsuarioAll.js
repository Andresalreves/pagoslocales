import React,{useState,useEffect} from 'react';
import Header from '../../components/header_forms_andres';
import { NavLink, useParams } from "react-router-dom";
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

const test  = true

const App=()=>{
  const params            =   useParams();
  const [data, setData]   =   useState(false);
  const [reset, setReset] =   useState(false);

  useEffect(() => {
    if (reset) {
      setReset(false)
    }
  },[reset])

  useEffect(() => {
    getInit()
  },[])

  const onSubmit=(e)=>{
    e.preventDefault()
    /*let send        = {...inputs}
        send.token  = Store.get("user").token
        send.documento_de_identificacion    = JSON.stringify(uploaddocumento_de_identificacion)
        send.RUT                            = JSON.stringify(uploadRUT)
        send.Camara_de_comercio             = JSON.stringify(uploadCamara_de_comercio)
        send.SARLAF                         = JSON.stringify(uploadSARLAF)

    Functions.PostAsync("Administracion","setFuncionarios",send,{},{name:"callbackSubmit",funct:callbackSubmit})*/
  }

  const getInit=()=>{
    Functions.PostAsync("Administracion","getUsuario",{usuario_id:params.usuario_id},{},{name:"callbackContinue",funct:callbackContinue})
  }

  const callbackContinue=(response)=>{
    if (response.data!==undefined) {
      setData(response.data)
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
                                    classIcon="icon-documento ico-generico"
                                    data={data}
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
                                <div className="label"><b>Tipo de Cuenta</b></div>
                                <div className="label text-gray">{(data.tipo_cuenta_string!==undefined && data.tipo_cuenta_string!==null)?data.tipo_cuenta_string:'Personal'}</div>
                              </div>
                            </div>
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
                                {data.razon_social!==''?<>
                                  <div className="label"><b>Razón social</b></div>
                                  <div className="label text-gray">
                                    <EditInput  input={data}
                                                name="razon_social"
                                                placeholder="Razón social"
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
                            <div className="row mt-3 mb-5 justify-content-center">
                              <div className="col-12 col-md-5 pt-0">
                                <div className="label"><b>Móvil</b></div>
                                <div className="label text-gray">
                                  {data.celular}
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
                              <DocumentosSoporte user={data} setReset={setReset} id={data.token}/>
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
                            <div className="row text-center mt-4 justify-content-center">
                              <div className="col-12 col-sm-6">
                                <NavLink to={"/Administracion/Reportes/Usuarios/"+params.estatus} className="btn btn-primary mb-3">Ver listado de usuarios</NavLink>
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
