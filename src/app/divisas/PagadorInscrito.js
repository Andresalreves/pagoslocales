import React,{useState,useEffect} from 'react';
import Header from '../../components/header_forms_andres';
import { NavLink, useHistory, useParams } from "react-router-dom";
import Functions from "../../helpers/Functions";
import Config from "../../helpers/Config";
import Store from "../../helpers/Store";
import OptionCard from "../../components/OptionCard";
import Table from "../../screens/table";
import StateContext from '../../helpers/ContextState';


const App=()=>{
    let parametros = useParams();
    let history = useHistory();
    const [data, setData] = useState({});
    const [ver, setVer] = useState(parametros.id===undefined?true:false);
    const context = React.useContext(StateContext);

    useEffect(() => {
      context.socketIo.connect()
      context.socketIo.emit('PagadorInscrito');
      getInit()
    },[])

    useEffect(() => {
      getInit()
    },[])

    function getInit(){
        let data  = {id:parametros.id}
        Functions.PostAsync("Divisas","getPagador",data,{},{name:"callbackGetInit",funct:callbackGetInit})
    }
    function callbackGetInit(response){
      setData(response.data)
      setVer(true)
    }

    function onSubmit( e ){
        e.preventDefault()
        let data  = {id:parametros.id,estatus:1}
        Functions.PostAsync("Divisas","setStatusPagador",data,{},{name:"callbackSubmit",funct:callbackSubmit})
    }

    function callbackSubmit(response){
      if (response.message!==undefined && response.message.label!==undefined) {
        history.push("/CuentaInscrita/"+parametros.id);
      }
      if (response.error!==undefined && response.error.public) {
        context.setModalShow({
          show:true,
          message:<div className="text-center h5">
                    {response.error.label}
                    <div className="row justify-content-center mt-2">
                      <div className="col-3" onClick={()=>context.setModalShow({show:false})}>
                        <div className="btn btn-primary btn-block">Reintentar</div>
                      </div>
                    </div>
                  </div>,
          size:""
        })
        //history.push("/Verificarpagador/"+response.data.id);
      }
    }
  return    <>
              {ver?<div className="Contenido-Home">
                      <div className="row d-none d-sm-block">
                          <div className="col-md-12">
                              <div className="title-home mb-4">Inscribir pagadores</div>
                          </div>
                      </div>
                          <div className="row mt-0 mt-sm-4">
                              <div className="col-12 col-md-10 m-auto">
                                  <div className="card border-card">
                                      <div className="card-body">
                                          <div className="col-md-10 ml-auto mr-auto mt-0 mt-sm-3">
                                              <Header title="¡Pagador inscrito con exito!" classIcon="icon-actualizado-completo ico-generico" />
                                              <hr/>
                                              <div className="col-md-12 mt-2 pl-0 d-flex">
                                                  <div>
                                                      <div className="label"><b>Nombre de la cuenta</b></div>
                                                      <div className="label text-gray"><b>{data!==undefined?data.nombre_cuenta:false}</b></div>
                                                  </div>
                                              </div>
                                              <div className="col-md-12 mt-2 pl-0 d-flex">
                                                  <div>
                                                  <div className="label"><b>Tercero | Pagador</b></div>
                                                      <div className="label text-gray"><b>{data!==undefined?data.pagador:false}</b></div>
                                                  </div>
                                              </div>
                                              <div className="col-md-12 mt-2 pl-0 d-flex">
                                                  <div>
                                                      <div className="label"><b>Tipo</b></div>
                                                      <div className="label text-gray"><b>{data!==undefined?data.tipo_pagador_string:false}</b></div>
                                                  </div>
                                              </div>
                                              <div className="col-md-12 mt-2 pl-0 d-flex">
                                                  <div>
                                                      <div className="label"><b>Moneda</b></div>
                                                      <div className="label text-gray"><b>{data!==undefined?data.moneda_pago_string:false}</b></div>
                                                  </div>
                                              </div>

                                              <hr/>
                                              <div className="Importante mt-4 text-gray">
                                                EN CUMPLIMIENTO A LA NORMATIVIDAD NACIONAL Y
                                                NUESTRA POLÍTICA de PREVENCIÓN Y FACILITACIÓN AL LAVADO DE ACTIVOS Y FINANCIACIÓN DEL TERRORISMO, NO REALIZAREMOS OPERACIONES A TERCEROS CON HISTORIAL
                                                DELICTIVO, EN CASO DE PRESENTARSE ALGUNA SITUACIÓN DE MANEJO ESPECIAL TU OPERACIÓN
                                                SERÁ RECHAZADA Y LA CUENTA NO ESTARÁ HABILITADA PARA TRANSFERENCIAS FUTURAS.
                                              </div>
                                              <div className="text-center mt-5">
                                                  <a target="_blank" href={Config.ConfigApirest+"PDF/Divisas/getPagador?id="+parametros.id+"&token="+Store.get("user").token} className="btn btn-outline-primary2 mr-0 mr-sm-1 col-12 col-md-3 mb-2">Descargar</a>
                                                  <NavLink to="/Divisas/InscribirPagadores" className="btn btn-outline-primary2 mr-0 mr-sm-1 col-12 col-md-4 mb-2">Nuevo pagador</NavLink>
                                                  <NavLink to="/Divisas/Pagadores" className="btn btn-gray text-white col-12 col-md-4 mb-2">Lista pagadores</NavLink>
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
