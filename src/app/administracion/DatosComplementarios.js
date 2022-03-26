import React,{useState,useEffect} from 'react';
import Header from '../../components/header_forms';
import { NavLink, useParams } from "react-router-dom";
import Store from "../../helpers/Store";
import Functions from "../../helpers/Functions";
import Config from "../../helpers/Config";
import ImgPerfil from '../../assets/images/No_image.png';
import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);

const test  = true

const App=()=>{
    console.log(useParams());
  const [data, setData] = useState(false);

  useEffect(() => {
    getInit()
  },[])

  const getInit=()=>{
    Functions.PostAsync("Administracion","getFuncionario",{id:queryStringParams.id},{},{name:"callbackContinue",funct:callbackContinue})
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
            <div className="title-home mb-4">Aprobacion de cuenta</div>
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="card">
                  <div className="card-content">
                    <div className="card-body perfil">
                        <div className="p-5">
                          <div className="row mt-3">
                            <div className="col-md-6">
                              <div className="label"><b>Titular</b></div>
                              <div className="label text-gray">Nombre completo</div>
                            </div>
                            <div className="col-md-6 pt-2">
                              <div className="label"><b>Usuario</b></div>
                              <div className="label text-gray"></div>
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col-md-6 pt-2">
                              <div className="label"><b>Identificación</b></div>
                              <div className="label text-gray">CC 156496846</div>
                            </div>
                            <div className="col-md-6 pt-2">
                              <div className="label"><b>Fecha de solicitud</b></div>
                              <div className="label text-gray"></div>
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col-md-6 pt-2">
                              <div className="label"><b>Cuenta registrada</b></div>
                              <div className="label text-gray"></div>
                            </div>
                            <div className="col-md-6 pt-2">
                              <div className="label"><b>Hora de solicitud</b></div>
                              <div className="label text-gray"></div>
                            </div>
                          </div>
                          <div className="row mt-3 mb-4">
                            <div className="col-md-12 pt-2">
                              <div className="label"><b>Entidad Bancaria</b></div>
                              <div className="label text-gray"></div>
                            </div>
                          </div>
                          <Header title="Documentos de soporte" subtitle="Suba los siguientes documentos de soporte" classIcon="icon-documento ico-generico" class="text-left"/>
                          <div className="row mt-4 mb-5">
                            <div class="col-md-5 label text-gray pl-5">
                                Soporte Consulta
                            </div>
                            <div className="col-md-7">
                                <div className="row mb-2 mt-1">
                                <div className="col-1">
                                </div>
                                <div className="col text-gray">
                                    <i className="icon-link-documento"/> Hoja de vida
                                </div>
                                <div className="col">
                                    <a className="text-rosa" target="_blank" href="">
                                        <i className="icon-descargar-pdf"/>
                                    </a>
                                    <span className="text-rosa cursor-pointer" onClick={()=>onClickDelete()}>
                                        <i className="icon-eliminar-tabla"/>
                                    </span>
                                </div>
                            </div>
                            </div>
                          </div>
                            <div className="col-md-12 m-0 p-0">
                              <div className="label"><b>Cuenta registrada</b></div>
                            </div>
                            <div className="Container-observaciones">
                                <div className="container-input-observaciones">
                                    <textarea name="observacion"/>
                                </div>
                                <div className="opciones-Observaciones">
                                    <i className="icon-datos-complementarios" />
                                    <i className="icon-subir-video" />
                                    <i className="icon-etiquetar" />
                                    <i className="icon-link-documento" />
                                </div>
                            </div>
                            <div className="comentario-observacion">
                                <div className="img-comentario">
                                    <img src="https://isenacode.com/wp-content/uploads/2019/06/whatsapp-foto-perfil-malware-768x576.jpg" alt="img-perfil"/>
                                </div>
                                <div className="texto-observacion">
                                    <b>Andres Felipe Castañeda</b> <small className="label text-gray">Mayo 13,2021</small><br/>
                                Lorem, ipsum dolor sit, amet consectetur adipisicing elit. Pariatur laboriosam libero reiciendis itaque maiores veritatis assumenda cum omnis, accusamus blanditiis repellendus quis voluptatibus cupiditate possimus consequuntur quaerat. Consequatur porro, repudiandae.
                                </div>
                                <div className="acciones-comentarios">
                                    <i className="icon-eliminar"></i>
                                </div>
                            </div>
                            <Header title="Gestionar" classIcon="icon-documento ico-generico" class="text-left"/>
                            <div className="col-md-6 mt-4 p-0">
                                <select className="select-aprobar-cuenta">
                                    <option>Aprobar</option>
                                    <option>No aprobar</option>
                                </select>
                            </div>
                            <div className="col-md-12 text-right mt-3">
                                <button type="submit" className="btn btn-primary mb-3 mr-1">
                                    Guardar
                                </button>
                                <NavLink to="/Funcionarios" className="btn btn-gray text-white mb-3">Cancelar</NavLink>
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
