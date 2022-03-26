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
    //Functions.PostAsync("Bolsillo","GetMisBolsillos",send,{},{name:"callbackContinue2",funct:callbackContinue2})
  }

  const callbackContinue2=(response)=>{
    setDataBolsillo(response.data)
  }

  const onChange=(e)=>{
    Functions.Inputs(e,inputs, setInputs)
  }

  const onSubmit=(e)=>{
    e.preventDefault()
    let send        = {...inputs}
        send.token  = Store.get("user").token
    Functions.PostAsync("Administracion","setCreateCuentaBancaria",send,{},{name:"callbackContinue3",funct:callbackContinue3})
  }

  const callbackContinue3=(response)=>{
    console.log(response);
    if (response.error!==undefined) {
      context.setModalShow({
        show:true,
        message:<div className="text-center h5">{response.error.label}</div>,
        size:""
      })
    }else {
      context.setModalShow({
        show:true,
        message:<div className="text-center h5">
                  {response.message.label}
                  <div><a href={Config.ConfigAppUrl+"Administracion/CuentasBancarias"} className="btn btn-gray text-white mb-3 mt-3">Continuar</a></div>
                </div>,
        size:""
      })
      setTimeout(function(){document.location.href  =  Config.ConfigAppUrl+"Administracion/CuentasBancarias" }, 3000);
    }
  }


  return  <div className="Contenido-Home">
            <div className="title-home mb-4">Crear Cuenta</div>
            <div className="row justify-content-center">
              <div className="col-12 col-md-8">
                <div className="card">
                  <div className="card-content">
                    <div className="card-body">
                      <form onSubmit={onSubmit}>
                        <div className="p-5">
                          <div className="row">
                            <div className="col-2 text-right">
                              <i className="icon-crear-cuenta-bancaria ico-generico" />
                            </div>
                            <div className="col-10 pt-3 p-0">
                              <div className="title-generico">Crear cuenta bancaria</div>
                              <div className="cuenta-tarjeta-home">llene los siguientes datos</div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <Select
                                required={true}
                                data={(data.ma_bancos!==undefined?data.ma_bancos:[])}
                                name="entidad_bancaria"
                                selectDefault="Entidad bancaria"
                                onChange={onChange}
                              />
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="col">
                              <input  className="form-control"
                                      type="text"
                                      name="titular"
                                      required={true}
                                      placeholder="Titular"
                                      onChange={onChange}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <Select
                                required={true}
                                data={(data.ma_tipo_cuentas_bancarias!==undefined?data.ma_tipo_cuentas_bancarias:[])}
                                name="tipo_de_cuenta"
                                selectDefault="tipo de cuenta"
                                onChange={onChange}
                              />
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="col">
                              <input  className="form-control"
                                      type="text"
                                      name="numero_cuenta"
                                      required={true}
                                      placeholder="Número de cuenta"
                                      onChange={onChange}
                              />
                            </div>
                          </div>
                          <div className="row text-center mt-4 justify-content-center">
                            <div className="col">
                              <button type="submit" className={"btn btn-primary mb-3 mr-1"} >
                                Siguiente
                              </button>
                              <NavLink to="/Administracion/CuentasBancarias" className="btn btn-gray text-white mb-3">Cancelar</NavLink>
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
