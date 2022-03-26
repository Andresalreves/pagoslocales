import React,{useState,useEffect} from 'react';
import ImgPerfil from '../assets/images/No_image.png';
import { NavLink } from "react-router-dom";
import Store from "../helpers/Store";
import Functions from "../helpers/Functions";
import Avatar from "../components/Avatar";
import StateContext from '../helpers/ContextState';
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Profile1=(props)=>{
  return  <div className="row">
            <div className="col-1">
              <div className="d-none">
                {props.menuToggle?<div className="mt-3"><FontAwesomeIcon icon={faArrowCircleRight} size="lg" className="cursor-pointer" onClick={()=>props.setMenuToggle(props.menuToggle?false:true)}/></div>:false}
              </div>
            </div>
            <div className="col-1 d-none d-sm-block">
              <div className="p-2">
                <Avatar src={ImgPerfil} alt="perfil pagos locales" className="avatar rounded-circle"/>
              </div>
            </div>
            <div className="col-10 col-md-6">
              <div className="d-none d-sm-block">
                <div className="info-user mt-4 ml-sm-3">
                  <b>{props.user.nombres} {props.user.apellidos} | {props.user.celular}</b> Cuenta {(props.user.cuenta)?props.user.cuenta:' Empresarial'}<br/>
                  <span className={props.user.string_estatus==='Verificado'?"Cuenta-pendiente2":"Cuenta-pendiente" }>
                    <i className="icon-reportes"> {props.user.string_estatus}</i>
                  </span>
                </div>
              </div>
              <div className="d-block d-sm-none x1">
                <div className="row">
                  <div className="col-3">
                    <Avatar src={ImgPerfil} alt="perfil pagos locales" className="img-fluid rounded-circle" />
                  </div>
                  <div className="col">
                    <b>{props.user.nombres} {props.user.apellidos}<br/>
                    {props.user.celular}</b><br/>
                    Cuenta {props.user.cuenta}<br/>
                  </div>
                </div>
              </div>
            </div>
          </div>
}

const App =(props)=>{

  const [news, setNews]         =   useState(props.notificaciones.total_news);
  const context                 =   React.useContext(StateContext);

  const openPerfil=()=>{
    props.setMyPerfil(props.MyPerfil?false:true);
    if (props.notificaciones.total_news>0) {
      let data_=  {}
      Functions.PostAsync("Notificaciones","setEstatusGeneral",data_,{},{name:"callbackNotify",funct:callbackNotify})
    }
  }

  const callbackNotify=(response)=>{
    setNews(0)
    context.socketIo.emit('actualizar_notificacion');
  }

  useEffect(() => {
    setNews(props.notificaciones.total_news)
  },[props.notificaciones.total_news])

  const handleClick=(row)=>{
    openPerfil()
    let data_=  {id:row.token}
    Functions.PostAsync("Notificaciones","setEstatusEspecifico",data_,{},{name:"callbackNotify2",funct:callbackNotify2})

  }

  const callbackNotify2=(response)=>{
    context.socketIo.emit('actualizar_notificacion');
  }

  return  <div className="row align-items-center m-0 p-0">
            <div className="col">
              <Profile1 {...props}/>
            </div>

            <div className="ml-auto d-flex align-items-center" id="dropdown1">
              {parseInt(props.user.estatus)<9?<>
                <div className="dropdown">
                  <div  className={"dropdown-toggle container-notify cursor-pointer"}
                        onClick={openPerfil}
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false">
                    <i className="icon-notificacion"></i>
                    {news>0?<span className="count-notify">{(news)?news:0}</span>:false}
                  </div>
                  {props.notificaciones.data!==undefined?<>
                    <div id="dropdown_MyPerfil1" className={props.MyPerfil?"dropdown-menu show MyPerfil":"dropdown-menu MyPerfil"} aria-labelledby="dropdownMenuButton">
                      {props.notificaciones.data.length>0?<>
                        {props.notificaciones.data.map((row,key)=>{
                            return  <NavLink  key={key}
                                              className="dropdown-item cursor-pointer x1"
                                              to={row.url!==undefined && row.url!==''?row.url:"notificaciones/"+row.token}
                                              onClick={()=>handleClick(row)}
                                    >
                                      <div className="notificacion-header">{row.title}</div>
                                      <div className="w-100 notificacion-body">
                                        <div className="row">
                                          <div className="col-11">
                                            {row.body}
                                          </div>
                                          <div className="col-1 text-center">
                                            {row.estatus==="1"?<div className="circle_new"></div>:false}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="border-bottom pb-3"></div>
                                    </NavLink>
                        })}
                      </>:<>
                        <div className="dropdown-item cursor-pointer x1 text-center">
                          No hay notificaciones pendientes
                        </div>
                      </>}
                    </div>
                  </>:false}
                </div></>:false
              }
              <div className="mr-5 container-icon-salir d-none-d-sm-block">
                <NavLink className="text-dark" onClick={()=>{Store.clear(); props.setUser(false);}} to="/" >
                  <i className="icon-salir"></i> <small>Salir</small>
                </NavLink>
              </div>
            </div>
          </div>
}
export default App
