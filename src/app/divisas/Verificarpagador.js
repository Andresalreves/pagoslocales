import React,{useState,useEffect} from 'react';
import { NavLink, useHistory, useParams } from "react-router-dom";
import Functions from "../../helpers/Functions";
import StateContext from '../../helpers/ContextState';


const App=()=>{
    let parametros = useParams();
    let history = useHistory();
    const [data, setData] = useState({});
    const [ver, setVer] = useState(parametros.id===undefined?true:false);
    const context = React.useContext(StateContext);

    useEffect(() => {
      getInit()
    },[])

    function getInit(){
        let data  = {id:parametros.id}
        Functions.PostAsync("Divisas","getPagador",data,{},{name:"callbackGetInit",funct:callbackGetInit})
    }
    function callbackGetInit(response){
      if (response.data!==undefined && response.data.pagador_id!==undefined) {
        setData(response.data)
        setVer(true)
      }
    }

    function onSubmit( e ){
        e.preventDefault()
        let data  = {id:parametros.id,estatus:2}
        Functions.PostAsync("Divisas","setStatusPagador",data,{},{name:"callbackSubmit",funct:callbackSubmit})
    }

    function callbackSubmit(response){
      if (response.message!==undefined && response.message.label!==undefined) {
        history.push("/Divisas/PagadorInscrito/"+parametros.id);
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
        //history.push("/parametros.id/"+response.data.id);
      }
    }
  return    <>
              {ver?<form onSubmit={onSubmit}><div className="Contenido-Home">
                      <div className="row d-none d-sm-block">
                          <div className="col-md-12">
                              <div className="title-home mb-4">Inscribir pagadores</div>
                          </div>
                      </div>
                      <div className="row mt-0 mt-sm-4">
                          <div className="col-12 col-md-8 m-auto">
                              <div className="card border-card">
                                  <div className="card-body">
                                      <div className="col-md-10 ml-auto mr-auto mt-0 mt-sm-3">
                                          <div className="title-generico mt-0 mt-sm-5 mb-4">
                                              Verificar datos del pagador
                                          </div>
                                          <hr/>
                                          <div className="col-md-12 mt-2 pl-0 d-flex">
                                              <div>
                                                  <div className="label"><b>Nombre de la cuenta</b></div>
                                                  <div className="label text-gray"><b>{data.nombre_cuenta}</b></div>
                                              </div>
                                            <NavLink to={"/Divisas/InscribirPagadores/"+parametros.id} className="cambiar">Cambiar <i className="icon-cambiar ml-2"></i></NavLink>
                                          </div>
                                          <div className="col-md-12 mt-2 pl-0 d-flex">
                                              <div>
                                                  <div className="label"><b>Tercero | Pagador</b></div>
                                                  <div className="label text-gray"><b>{data.pagador}</b></div>
                                              </div>
                                          </div>
                                          <div className="col-md-12 mt-2 pl-0 d-flex">
                                              <div>
                                                  <div className="label"><b>Tipo</b></div>
                                                  <div className="label text-gray"><b>{data.tipo_pagador_string}</b></div>
                                              </div>

                                          </div>
                                          <div className="col-md-12 mt-2 pl-0 d-flex">
                                              <div>
                                                  <div className="label"><b>Moneda</b></div>
                                                  <div className="label text-gray"><b>{data.moneda_pago_string}</b></div>
                                              </div>

                                          </div>

                                          <div className="text-center mt-4">
                                              <button type="submit" className="btn btn-primary mb-3 mr-3 col-12 col-md-3">Inscribir</button>
                                              <NavLink to="/Divisas/Pagadores" className="btn btn-gray text-white mb-3 col-12 col-md-3">Cancelar</NavLink>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div></form>:false
              }
            </>
}
export default App
