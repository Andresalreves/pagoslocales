import logo from '../../assets/images/logo.svg'
import React,{useState,useEffect} from 'react';
import Functions from "../../helpers/Functions";
import PasswordChecklist from "react-password-checklist"
import {  useHistory } from "react-router-dom";

import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);

const App=(props)=>{

  const [password, setPassword] = useState("")
	const [passwordAgain, setPasswordAgain] = useState("")
  const [error, setError] = useState(true)
  const [error2, setError2] = useState(false)
  const [alert1, setAlert1] = useState(false)
  const [alert2, setAlert2] = useState(false)
  const [contrasenaValida, setContrasenaValida] = useState(false);
  const [InputType, setInputType] = useState('password');
  const [InputType2, setInputType2] = useState('password');
  let history                   =   useHistory();

  const callbackContinue=(response)=>{
    props.setModalShow({
      show:true,
      message:<div className="text-center">
                <div>Contraseña cambiada con éxito</div>
              </div>,
      size:""
    })
    history.push('/');
  }

  useEffect(() => {
    if (contrasenaValida) {
      setError(false)
    }else {
      setError(true)
    }
  },[contrasenaValida])

  const onSubmit=(e)=>{
    e.preventDefault()
    //return console.log(queryStringParams);
    if (password!==passwordAgain){
      return setError2(true)
    }else{
      setError2(false)
    }
    Functions.PostAsync("Users","setPassword",{password:password,token:queryStringParams.token},{},{name:"callbackContinue",funct:callbackContinue})
  }

  const changetype= () =>{
    setInputType(InputType==='text'?'password':'text');
  }
  const changetype2= () =>{
    setInputType2(InputType2==='text'?'password':'text');
  }


  return    <div className="container-fluid" >
              <div className="row justify-content-center">
                <div className="col-8 col-md-3 mt-sm-4">
                  <img src={logo} alt="" className="img-fluid" />
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-12 col-md-4 mt-4">
                  <div className="container-formulario text-center">
                    <form onSubmit={onSubmit}>
                      <h3 className="text-muted">Ingresa tu nueva contraseña</h3>
                      <div className="mt-3 text-muted">

                      </div>
                      <div className="row mt-4">
                        <div className="col-12 p-1">
                          <div className="container-pass">
                            <input  type={InputType} required={true}
                                    className={alert1?"form-control pass pass-primary sin-mayusculas":"form-control pass pass-secondary sin-mayusculas"}
                                    name="password"
                                    autoComplete="off"
                                    onChange={e => setPassword(e.target.value)}/>
                            <i className="icon-contrasena"></i>
                            <div className={alert1?"label-alert":"label"}>Contraseña</div>
                            <div className="right" onClick={changetype}>
                              <i className="twl-icon-icon-mostrar-login" ></i>
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
                            <input  type={InputType2} required={true}
                                    disabled={(contrasenaValida)?false:true}
                                    className={alert2?"form-control pass pass-primary sin-mayusculas" :"form-control pass pass-secondary sin-mayusculas"}
                                    name="password2" autoComplete="off"
                                    onChange={e => setPasswordAgain(e.target.value)}/>
                            <i className="icon-contrasena"></i>
                            <div className={alert2?"label-alert":"label"}>Contraseña</div>
                            <div className="right" onClick={changetype2}>
                              <i className="twl-icon-icon-mostrar-login"></i>
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
                      <div className="row mt-5">
                        <div className="col-12 p-1">
                          <button type="submit" className="btn btn-primary">Guardar</button>
                        </div>
                      </div>
                    </form>
                  </div>
              </div>
            </div>
          </div>
}
export default App
