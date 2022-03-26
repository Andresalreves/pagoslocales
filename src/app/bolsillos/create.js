import React,{useState,useEffect} from 'react';
import Bolsillo from '../../components/bolsillos';
import BolsilloEmpty from '../../components/bolsillosEmpty';
import BolsilloCreate from '../../components/bolsillosCreate';
import { NavLink } from "react-router-dom";
import Store from "../../helpers/Store";
import Functions from "../../helpers/Functions";
import Config from "../../helpers/Config";
import NumberFormat from 'react-number-format';
import StateContext from '../../helpers/ContextState'

const test  = true

const App=()=>{
  const context = React.useContext(StateContext);

  const [data, setData] = useState(false);
  const [dataBolsillo, setDataBolsillo] = useState(false);
  const [inputs, setInputs] = useState(false);
  const [active, setActive] = useState(false);
  const [botonActivo, setBotonActivo] = useState(false);

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

    if (  (inputs.nombre_bolsillo!==undefined && inputs.nombre_bolsillo!=='') &&
          (inputs.meta_bolsillo!==undefined && inputs.meta_bolsillo!=='') &&
          (inputs.proposito!==undefined && inputs.proposito!=='') ) {
      setBotonActivo(true)
    }else {
      setBotonActivo(false)
    }
  }

  const proposito=(row)=>{
    let inputs_           = {...inputs}
        inputs_.proposito = row.value
        setInputs(inputs_);
        setActive(row.label)
    if (  (inputs_.nombre_bolsillo!==undefined && inputs_.nombre_bolsillo!=='') &&
          (inputs_.meta_bolsillo!==undefined && inputs_.meta_bolsillo!=='') &&
          (inputs_.proposito!==undefined && inputs_.proposito!=='') ) {
      setBotonActivo(true)
    }else {
      setBotonActivo(false)
    }
  }

  const onSubmit=(e)=>{
    e.preventDefault()
    if (!botonActivo) {
      context.setModalShow({
        show:true,
        message:<div className="text-center ">Debe completar los datos</div>,
        size:""
      })
      return false;
    }
    let send        = {...inputs}
        send.token  = Store.get("user").token
    Functions.PostAsync("Bolsillo","setBolsillo",send,{},{name:"callbackContinue3",funct:callbackContinue3})
  }

  const callbackContinue3=(response)=>{
    if (response.error!==undefined) {
      let elemento = document.getElementById("nombre_bolsillo");
          elemento.value='';
          elemento.focus();
      context.setModalShow({
        show:true,
        message:<>  <div className="text-center ">{response.error.label}</div>
                    <div onClick={()=>{context.setModalShow({show:false,}) }} className="btn btn-gray text-white mb-3 mt-3">Reintentar</div>
                  </>,
        size:""
      })
    }else {
      context.setModalShow({
        show:true,
        message:<div className="text-center m-auto">
                  {response.message.label}
                  <div><a href={Config.ConfigAppUrl+"bolsillos"} className="btn btn-primary text-white mb-3 mt-3">Continuar</a></div>
                </div>,
        size:""
      })
      setTimeout(function(){document.location.href  =  Config.ConfigAppUrl+"bolsillos" }, 3000);
    }
  }


  return  <div className="Contenido-Home">
            <div className="title-home mb-4">Crea un bolsillo</div>
            <div className="row justify-content-center">
              <div className="col-12 col-md-8">
                <div className="card">
                  <div className="card-content">
                    <div className="card-body">
                      <form onSubmit={onSubmit}>
                        <div className="p-md-6">
                          <div className="row  ">
                            <div className="col-2 text-right d-none d-sm-block">
                              <i className="icon-nuevo-pagador ico-generico" />
                            </div>
                            <div className="col-10 pt-3 p-0 d-none d-sm-block">
                              <div className="title-generico">Datos del bolsillo</div>
                              <div className="cuenta-tarjeta-home">Creación de bolsillo</div>
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="col">
                              <input  className="form-control"
                                      type="text"
                                      name="nombre_bolsillo"
                                      id="nombre_bolsillo"
                                      required={true}
                                      placeholder="Nombre del bolsillo"
                                      onChange={onChange}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                            <NumberFormat
                              defaultValue={inputs.meta_bolsillo!==undefined?inputs.meta_bolsillo:""}
                              required='required'
                              className="form-control"
                              name="meta_bolsillo"
                              placeholder="Meta del bolsillo"
                              displayType={'input'}
                              thousandSeparator=','
                              decimalSeparator='.'
                              onValueChange={(values) => {
                                const { formattedValue, value } = values;
                                let comision = {...inputs}
                                    comision['meta_bolsillo']  = parseFloat(value)
                                    if (comision['meta_bolsillo']>0) {

                                    }else {
                                      comision['meta_bolsillo'] = 0
                                    }
                                    setInputs(comision)
                              }}
                              renderText={(value, props) => <div {...props}>{value}</div>}
                            />
                            </div>
                          </div>
                          { ( inputs.nombre_bolsillo!==undefined &&
                              inputs.nombre_bolsillo!=='') &&
                                (
                                  inputs.meta_bolsillo!==undefined &&
                                  inputs.meta_bolsillo!=='' &&
                                  inputs.meta_bolsillo>0
                                )?<>
                            {data.ma_proposito!==undefined?<div className="row mt-5">
                              <div className="col-12 ">
                                Íconos
                              </div>
                            </div>:false}
                            <div className="row">
                              {(data.ma_proposito!==undefined?<>
                                {data.ma_proposito.map((row,key)=>{
                                  return  <div className="col-6 col-md-4 mb-3" key={key}>
                                            <div className={active===row.label?"card border-rosa":"card border-normal"}>
                                              <div className="card-body text-center p-1" onClick={()=>proposito(row)}>
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
                              <div className="col-12 col-md-8">
                                <button type="submit" className={botonActivo?"btn btn-primary mb-3 mr-1 col-12 col-md-6":"btn btn-primary mb-3 mr-1 col-md-6 disabled"} >
                                  Crear bolsillo
                                </button>
                                <NavLink to="/bolsillos" className="btn btn-gray text-white mb-3 col-12 col-md-3">Cancelar</NavLink>
                              </div>
                            </div>

                          </>:false}

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
