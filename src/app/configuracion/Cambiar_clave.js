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
import PasswordChecklist from "react-password-checklist"

const test  = true

const App=()=>{
  const context = React.useContext(StateContext);
  const [InputType, setInputType] = useState('password');
  const [InputType2, setInputType2] = useState('password');
  const [password, setPassword] = useState("")
  const [passwordAgain, setPasswordAgain] = useState("")
  const [error, setError] = useState(true)
  const [error2, setError2] = useState(false)
  const [data, setData] = useState(false);
  const [dataBolsillo, setDataBolsillo] = useState(false);
  const [inputs, setInputs] = useState(false);
  const [active, setActive] = useState(false);
  const [botonActivo, setBotonActivo] = useState(false);
  const [contrasenaValida, setContrasenaValida] = useState(false)
  const [alert1, setAlert1] = useState(false)
  const [alert2, setAlert2] = useState(false)



  useEffect(() => {
    if (contrasenaValida) {
      setError(false)
    }
  },[contrasenaValida])

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
    if(e.target.name ==='password'){
      let inpust_ = {...inputs}
          inpust_[e.target.name]=e.target.value
          setPassword(e.target.value)
      return setInputs(inpust_);
    }
    Functions.Inputs(e,inputs, setInputs)
  }

  const onSubmit=(e)=>{
    e.preventDefault()
    if (password!==passwordAgain) {
      return setError2(true)
    }else {
      setError2(false)
    }
    Functions.PostAsync("Users","setPasswordNew",{passwordAnt:inputs.clave_anterior,password:password,token:Store.get("user").token},{},{name:"callbackContinuepass",funct:callbackContinuepass})
  }

  const callbackContinuepass=(response)=>{
    if (response.error!==undefined && response.error.public) {
      context.setModalShow({
        show:true,
        message:<div className="text-center ">{response.error.label}</div>,
        size:""
      })
    }else if(response.message!==undefined && response.message.public ) {
      context.setModalShow({
        show:true,
        message:<div className="text-center ">{response.message.label}</div>,
        size:""
      })
    }
  }

  const callbackContinue3=(response)=>{
    if (response.error!==undefined) {
      context.setModalShow({
        show:true,
        message:<div className="text-center ">{response.error.label}</div>,
        size:""
      })
    }else {
      context.setModalShow({
        show:true,
        message:<div className="text-center ">
                  {response.message.label}
                  <div><a href={Config.ConfigAppUrl+"bolsillos"} className="btn btn-gray text-white mb-3 mt-3">Continuar</a></div>
                </div>,
        size:""
      })
      setTimeout(function(){document.location.href  =  Config.ConfigAppUrl+"CuentasBancarias" }, 3000);
    }
  }

  const changetype= () =>{
    setInputType(InputType==='text'?'password':'text');
  }

  const changetype2= () =>{
    setInputType2(InputType2==='text'?'password':'text');
  }



  return  <div className="Contenido-Home">
            <div className="title-home mb-4">Cambiar clave</div>
            <div className="row justify-content-center">
              <div className="col-12 col-md-8">
                <div className="card">
                  <div className="card-content ">
                    <div className="card-body">
                      <form onSubmit={onSubmit}>
                        <div className="p-5">
                          <div className="row">
                            <div className="col-2 text-right">
                              <i className="icon-crear-cuenta-bancaria ico-generico" />
                            </div>
                            <div className="col-10 pt-3 p-0">
                              <div className="title-generico">Nueva clave</div>
                              <div className="cuenta-tarjeta-home">Creación de una nueva clave</div>
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="col pr-1 pl-1">
                              <input  className="form-control sin-mayusculas"
                                      type="password"
                                      name="clave_anterior"
                                      required={true}
                                      placeholder="Clave anterior"
                                      onChange={onChange}
                                      excepcion='Mayusculas'
                              />
                            </div>
                          </div>
                          <div className="row ">
                            <div className="col-12 p-1">
                              <div className="container-pass">
                                <input  type={InputType}
                                        className={alert1?"form-control pass pass-primary sin-mayusculas":"form-control pass pass-secondary sin-mayusculas"}
                                        name="password" autoComplete="off"
                                        onChange={e => setPassword(e.target.value)}
                                        excepcion='Mayusculas'/>
                                <i className="icon-contrasena"></i>
                                <div className={alert1?"label-alert":"label"}>Contraseña</div>
                                <div className="right">
                                  <i className="twl-icon-icon-mostrar-login" onClick={changetype}></i>
                                </div>
                              </div>
                              {error?<>
                                <div className="alert text-left">
                                  Debe contener 6 caracteres: una mayúscula, minuscula y un caracter especial
                                </div>
                              </>:false}
                            </div>
                          </div>
                          <div className="row mt-0">
                            <div className="col-12 p-1">
                              <div className="container-pass">
                                <input  type={InputType2}
                                        className={alert2?"form-control pass pass-primary sin-mayusculas":"form-control pass pass-secondary sin-mayusculas"}
                                        name="password2" autoComplete="off"
                                        onChange={e => setPasswordAgain(e.target.value)}
                                        excepcion='Mayusculas'/>
                                <i className="icon-contrasena"></i>
                                <div className={alert2?"label-alert":"label"}>Contraseña</div>
                                <div className="right">
                                  <i className="twl-icon-icon-mostrar-login" onClick={changetype2}></i>
                                </div>
                                {error2?<>
                                  <div className="alert text-left">
                                    Tu contraseña no coinciden
                                  </div>
                                </>:false}
                              </div>
                            </div>
                          </div>
                          <div className="row mt-0 d-none">
                            <div className="col-12 p-1">
                              <PasswordChecklist
                                rules={["length","specialChar","capital"]}
                                minLength={5}
                                value={password}
                                valueAgain={passwordAgain}
                                onChange={(isValid) => {setContrasenaValida(isValid);}}
                              />
                            </div>
                          </div>
                          <div className="row text-center mt-4 justify-content-center">
                            <div className="col-6">
                              <button type="submit" className={"btn btn-primary mb-3 mr-1"} >
                                Guardar
                              </button>
                              <NavLink to="/" className="btn btn-gray text-white mb-3">Cancelar</NavLink>
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
