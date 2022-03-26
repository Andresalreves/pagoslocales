import React,{useState,useEffect} from 'react';
import Header from '../../components/header_forms_tipo4';
import { NavLink, useParams } from "react-router-dom";
import Store from "../../helpers/Store";
import Functions from "../../helpers/Functions";
import StateContext from '../../helpers/ContextState';
import TextoEnriquecido from '../../components/TextoEnriquecido';

let emailPrueba             =   "";

const App=()=>{
  const parametros          =   useParams()
  const [data, setData]     =   useState(false);
  const [inputs, setInputs] =   useState({});
  const context             =   React.useContext(StateContext);

  useEffect(()    =>  {
    emailPrueba   =   Store.get("user").email
    getInit()
  },[])

  const getInit=()=>{
    Functions.PostAsync("Administracion","getEmail",{id:parametros.id},{},{name:"callbackContinue",funct:callbackContinue})
  }

  const callbackContinue=(response)=>{
    setInputs(response.data)
    setData(response.data)
  }

  const onSubmit=(e)=>{
    e.preventDefault()
    let data    = {...inputs}
        data.id = data.token
        delete (data.token)
        Functions.PostAsync("Administracion","setEmail",data,{},{name:"callbackSubmit",funct:callbackSubmit})
  }

  const callbackSubmit=(response)=>{
    if (response.error!==undefined && response.error.label!==undefined) {
      return context.setModalShow({
                              show:true,
                              message:<div className="text-center text-dark">{response.error.label}</div>
                            })
    }
    if (response.message!==undefined && response.message.label!==undefined) {
      return context.setModalShow({
                              show:true,
                              message:<div className="text-center text-dark">{response.message.label}</div>
                            })
    }
  }

  const onChange=(e)=>{
    let inputs_                 =   {...inputs}
        inputs_[e.target.name]  =   e.target.value
        setInputs(inputs_)
  }

  const onChangeEmailPrueba=(e)=>{
    emailPrueba =   e.target.value
  }

  const sendEmailPrueba=()=>{
    Functions.PostAsync("Administracion","SendMailTest",{
                                                      id:parametros.id,
                                                      email:emailPrueba
                                                    },{},{name:"callbackSendMail",funct:callbackSendMail})
  }

  const callbackSendMail=(response)=>{
    if (response.error!==undefined && response.error.label!==undefined) {
      return context.setModalShow({
                              show:true,
                              message:<div className="text-center text-dark">{response.error.label}</div>
                            })
    }
    if (response.message!==undefined && response.message.label!==undefined) {
      return context.setModalShow({
                              show:true,
                              message:<div className="text-center text-dark">{response.message.label}</div>
                            })
    }
  }

  return  <div className="Contenido-Home">
            <div className="title-home mb-4">Funcionario</div>
            <div className="row justify-content-center">
              <div className="col-12">
                <form onSubmit={onSubmit} className="card">
                  <div className="card-content">
                    <div className="card-body perfil">

                        <div className="p-5">
                          <Header
                              title={parametros.id!==undefined?"Funcionario creado con éxito":"Funcionario"}
                              classIcon="icon-documento ico-generico"/>
                          <div className="border mb-4"></div>
                          <div className="row mt-3">
                            <div className="col-6 pt-2">
                              <div className="label"><b>Módulo</b></div>
                              <div className="label text-gray">
                                <input  className="form-control none"
                                        required={true}
                                        type="text"
                                        defaultValue={data!==null?data.modulo:""}
                                        name="modulo"
                                        placeholder="Módulo"
                                        onChange={onChange}
                                />
                              </div>
                            </div>
                            <div className="col-6 pt-2">
                              <div className="label"><b>Método</b></div>
                              <div className="label text-gray">
                                <input  className="form-control none"
                                        required={true}
                                        type="text"
                                        defaultValue={data!==null?data.metodo:""}
                                        name="metodo"
                                        placeholder="Método"
                                        onChange={onChange}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row mt-0">
                            <div className="col-12 pt-2">
                              <div className="label"><b>Título del email (subject)</b></div>
                              <div className="label text-gray">
                                <input  className="form-control none"
                                        required={true}
                                        type="text"
                                        defaultValue={data!==null?data.label:""}
                                        name="label"
                                        placeholder="Título del email (subject)"
                                        onChange={onChange}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row mt-0">
                            <div className="col-12 pt-2">
                              <div className="label"><b>Texto del email</b></div>
                              <div className="label text-gray">
                                <TextoEnriquecido
                                  className="form-control none min-height-300"
                                  required={true}
                                  type="text"
                                  rows="10"
                                  cols="50"
                                  defaultValue={data!==null?data.texto:""}
                                  name="texto"
                                  placeholder="Cuerpo del mensaje"
                                  inputs={inputs}
                                  setInputs={setInputs}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row text-center mt-4">
                            <div className="col-12">
                              <div className="card">
                                <div className="card-body">
                                  <div className="row text-center">
                                    <div className="col-6">
                                      <input  onChange={onChangeEmailPrueba}
                                              type="text"
                                              name="email"
                                              placeholder="Correo electrónico"
                                              className="form-control"
                                              defaultValue={Store.get("user").email}
                                      />
                                    </div>
                                    <div className="col-6">
                                      <div className="btn btn-primary2 btn-block" onClick={sendEmailPrueba}>Enviar correo prueba</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row text-center mt-4 justify-content-center">
                            <div className="col-12 col-md-2">
                              <button className="btn btn-primary2" type="submit">Guardar</button>
                            </div>
                            <div className="col-12 col-md-4">
                              <NavLink to="/Administracion/Emails" className="btn btn-outline-primary2 mb-3">Ver listado de emails</NavLink>
                            </div>
                          </div>
                        </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
}
export default App
