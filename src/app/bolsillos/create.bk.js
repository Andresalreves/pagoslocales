import React,{useState,useEffect} from 'react';
import Bolsillo from '../../components/bolsillos';
import BolsilloEmpty from '../../components/bolsillosEmpty';
import BolsilloCreate from '../../components/bolsillosCreate';
import { NavLink } from "react-router-dom";
import Store from "../../helpers/Store";
import Functions from "../../helpers/Functions";
import Config from "../../helpers/Config";
import Select from '../../screens/select';
import StateContext from '../../helpers/ContextState'

const test  = true

const App=()=>{
  const context = React.useContext(StateContext);

  const [data, setData] = useState(false);
  const [dataBolsillo, setDataBolsillo] = useState(false);
  const [inputs, setInputs] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    getInit()
  },[])

  const getInit=()=>{
    let send    = {token:Store.get("user").token}
    Functions.PostAsync("Maestros","get_tablas_maestras",send,{},{name:"callbackContinue",funct:callbackContinue})
  }

  const callbackContinue=(response)=>{
    setData(response)
    let send    = {token:Store.get("user").token}
    Functions.PostAsync("Bolsillo","GetMisBolsillos",send,{},{name:"callbackContinue2",funct:callbackContinue2})
  }

  const callbackContinue2=(response)=>{
    setDataBolsillo(response.data)
  }

  const onChange=(e)=>{
    Functions.Inputs(e,inputs, setInputs)
    if (e.target.name==="proposito") {
      setActive(e.target.value)
    }
  }

  const onSubmit=(e)=>{
    e.preventDefault()
    let send        = {...inputs}
        send.token  = Store.get("user").token
    Functions.PostAsync("Bolsillo","setBolsillo",send,{},{name:"callbackContinue3",funct:callbackContinue3})
  }

  const callbackContinue3=(response)=>{
    if (response.error!==undefined) {
      context.setModalShow({
        show:true,
        message:<div className="text-center h5">{response.error}</div>,
        size:""
      })
    }else {
      context.setModalShow({
        show:true,
        message:<div className="text-center h5">
                  {response.message.label}
                  <div><a href={Config.ConfigAppUrl+"bolsillos"} className="btn btn-gray text-white mb-3 mt-3">Continuar</a></div>
                </div>,
        size:""
      })
      setTimeout(function(){document.location.href  =  Config.ConfigAppUrl+"bolsillos" }, 3000);
    }
  }

  return  <div className="Contenido-Home">
            <div className="title-home mb-4">Crea Bolsillo</div>
            <div className="row justify-content-center">
              <div className="col-12 col-md-8">
                <div className="card">
                  <div className="card-content">
                    <div className="card-body">
                      <form onSubmit={onSubmit}>
                        <div className="p-5">
                          <div className="row">
                            <div className="col-2 text-right">
                              <i className="icon-nuevo-pagador ico-generico" />
                            </div>
                            <div className="col-10 pt-3 p-0">
                              <div className="title-generico">Datos del bolsillo</div>
                              <div className="cuenta-tarjeta-home">Creación de bolsillo</div>
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="col">
                              <input  className="form-control"
                                      type="text"
                                      name="nombre_bolsillo"
                                      placeholder="Nombre del bolsillo"
                                      onChange={onChange}
                              />
                            </div>
                          </div>
                          <div className="row mb-0">
                            <div className="col">
                              <Select
                                required={true}
                                data={(data.ma_proposito!==undefined?data.ma_proposito:[])}
                                name="proposito"
                                selectDefault="Seleccione"
                                onChange={onChange}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <input  className="form-control"
                                      type="text"
                                      name="meta_bolsillo"
                                      placeholder="Meta del bolsillo"
                                      onChange={onChange}
                              />
                            </div>
                          </div>
                          {data.ma_proposito!==undefined?<div className="row mt-5">
                            <div className="col-12 ">
                              Íconos
                            </div>
                          </div>:false}
                          <div className="row">
                            {(data.ma_proposito!==undefined?<>
                              {data.ma_proposito.map((row,key)=>{
                                return  <div className="col-12 col-md-4 mb-3" key={key}>
                                          <div className={active===row.label?"card border-rosa":"card border-normal"}>
                                            <div className="card-body text-center">
                                              <div className="btn-ico">
                                                <i className={row.icon}/>
                                              </div>
                                              <div className="label">
                                                {row.label}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                              })}
                            </>:false)}
                          </div>
                          <div className="row text-center mt-4 justify-content-center">
                            <div className="col-6">
                              <button type="submit" className="btn btn-primary mb-3 mr-1">
                                Crear bolsillo
                              </button>
                              <NavLink to="/bolsillos" className="btn btn-gray text-white mb-3">Cancelar</NavLink>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
}
export default App
