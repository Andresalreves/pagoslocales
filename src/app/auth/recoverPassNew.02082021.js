import React,{useState,useEffect} from 'react';
import logo from '../../assets/images/logo.svg'
import Functions from "../../helpers/Functions";
import Config from "../../helpers/Config";
import { NavLink, useHistory } from "react-router-dom";
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import "../../assets/login.css";
import PasswordChecklist from "react-password-checklist"
import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);

const inputs_array=["1","2","3","4","",""]
let inputs__  = {}

const test    =   false

const Recover1=(props)=>{
  return <div className="container-formulario">
            <div className="title-form">
                Recuperar mi contraseña
            </div>
            <div className="container-pass">
                <input  type='text'
                        className="form-control"
                        placeholder="Celular"
                        onChange={props.onChange}
                        onFocus={props.changeColor}
                        onBlur={props.deleteColor}
                        name="celular"/>
                <i className={`icon-telefono ${props.ChangeColorIcon.celular}`}></i>
            </div>
            <div className="submit-login d-none d-sm-block">
              <button type="submit" id="submit" className="btn btn-primary mr-2" onClick={props.onSubmit}>
                Recuperar
              </button>
              <NavLink className="btn btn-outline-primary2 mb-3 mr-1 mt-3" to="/">Cancelar</NavLink>
            </div>
        </div>
}
const Recover2=(props)=>{

  const [block,setBlock]  =   useState(false);
  const [passWordInputs,setPassWordInputs]  =   useState(false);

  const onChange=(e,position)=>{
    let inputs_           =   {...inputs__}
        inputs_.token     =   props.open.token
        inputs_[position] =   e.target.value
        inputs__          =   inputs_
    if (document.getElementById(position)) {
      document.getElementById(position).focus();
    }else {
      setBlock(true)
      Functions.PostAsync("Users","recoverValidation",inputs__,{},{name:"callbackContinue",funct:callbackContinue})
      if (test) {
        return setPassWordInputs(test)
      }
    }

  }

  const callbackContinue=(response)=>{
    if (test) {
      return setPassWordInputs(test)
    }
    if (response.error===undefined) {
      return setPassWordInputs(test)
    }
  }

  return  <>
            {!passWordInputs?<div className="container-formulario text-center">
              <form onSubmit={props.onSubmit}>
                <h3 className="text-muted">Olvidé mi contraseña</h3>
                <div className="mt-3 text-muted">
                  {props.open.label}
                </div>
                <div className="row mt-4">
                  {inputs_array.map((value, key)=>{
                    let key_  = key+1
                    return  <div className="col-2 col-md-2 p-1" key={key}>
                              <input  type="text"
                                      id={"input_"+key}
                                      maxLength="1"
                                      min="0"
                                      max="9"
                                      readOnly={block}
                                      name={"input_"+key}
                                      className="form-control text-center"
                                      onChange={(e)=>{onChange(e,"input_"+key_)}}
                                      placeholder={value}/>
                            </div>
                  })}
                </div>
              </form>
            </div>:<Recover3/>}
          </>
}

const Recover3=(props)=>{
  const [password, setPassword] = useState("")
	const [passwordAgain, setPasswordAgain] = useState("")
  const [error, setError] = useState(true)
  const [error2, setError2] = useState(false)
  const [alert1, setAlert1] = useState(false)
  const [alert2, setAlert2] = useState(false)
  const [contrasenaValida, setContrasenaValida] = useState(false)

  const callbackContinue=(response)=>{
    if (test || response.error===undefined) {
      document.location.href  = Config.ConfigAppUrl
    }
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
    if (password!==passwordAgain) {
      return setError2(true)
    }else {
      setError2(false)
    }
    Functions.PostAsync("Users","setPassword",{password:password,token:queryStringParams.token},{},{name:"callbackContinue",funct:callbackContinue})
  }

  return    <div className="container-formulario text-center">
              <form onSubmit={onSubmit}>
                <h3 className="text-muted">Ingresa tu nueva contraseña</h3>
                <div className="mt-3 text-muted">

                </div>
                <div className="row mt-4">
                  <div className="col-12 p-1">
                    <div className="container-pass">
                      <input  type="password"
                              className={alert1?"form-control pass pass-primary":"form-control pass pass-secondary"}
                              name="password" autoComplete="off"
                              onChange={e => setPassword(e.target.value)}/>
                      <i className="icon-contrasena"></i>
                      <div className={alert1?"label-alert":"label"}>Contraseña</div>
                      <div className="right">
                        <i className="twl-icon-icon-mostrar-login"></i>
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
                      <input  type="password"
                              className={alert2?"form-control pass pass-primary":"form-control pass pass-secondary"}
                              name="password2" autoComplete="off"
                              onChange={e => setPasswordAgain(e.target.value)}/>
                      <i className="icon-contrasena"></i>
                      <div className={alert2?"label-alert":"label"}>Contraseña</div>
                      <div className="right">
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
                    <button className="btn btn-primary">Guardar</button>
                  </div>
                </div>
              </form>
            </div>
 }

const App=(props)=>{
  const [h, setH] = useState(window.innerHeight);
  const [inputs, setInputs]     =   useState({});
  const [open, setOpen]         =   useState(false);
  const [ChangeColorIcon, setChangeColorIcon] = useState({celular:'',password:''});
  let history                   =   useHistory();


  useEffect(() => {
    document.getElementById("root").style.height = h+"px";
    setH(window.innerHeight)
    if (queryStringParams.verify) {
      setOpen(queryStringParams)
    }

  },[h])

  const onChangeNumero=(isValid,
                  rawValue,
                  countryData,
                  formattedValue,
                  extension)=>{
    let inputs_={...inputs}
        inputs_.celular   = formattedValue
        setInputs(inputs_)
  }

  const onSubmit=()=>{
    Functions.PostAsync("Users","recover",inputs,{},{name:"callbackContinue",funct:callbackContinue})
  }

  const callbackContinue=(response)=>{
    if (response.error!==undefined) {
      props.setModalShow({
        show:true,
        message:<div className="text-center h5">{response.error}</div>,
        size:""
      })
    }else if(response.message!==undefined && response.message.public ) {
      history.push("/recoverPass?verify=true&token="+response.message.token+"&label="+response.message.label);
      setOpen(response.message)
    }
  }

  const onChange=(e)=>{
    Functions.Inputs(e,inputs, setInputs)
  }

  const onClickSubmit=()=>{
    Functions.PostAsync("Users","recover",inputs,{},{name:"callbackContinue",funct:callbackContinue})
  }

  return  <div className="container-fluid" >
            <div className="row justify-content-center">
              <div className="col-8 col-md-3 mt-sm-4">
                <img src={logo} alt="" className="img-fluid" />
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-12 col-md-4 mt-4">
                {
                  !open? <>
                          <Recover1 ChangeColorIcon={ChangeColorIcon} onChange={onChange} onSubmit={onSubmit}/>
                        </>:<>
                          <Recover2  open={open}/>
                        </>
                }
              </div>
            </div>
            <div className="d-block d-sm-none">
              <div className="row justify-content-center">
                <div className="col-12 mt-4">
                  <div type="submit" className="btn btn-primary col" onClick={onClickSubmit}>
                      Recupear
                  </div>
                </div>
              </div>
            </div>
            <div className="d-block d-sm-none mt-2">
              <div className="row justify-content-center">
                <div className="col-12">
                  <NavLink className="btn btn-outline-primary2 mb-3 mr-1 col-12" to="/">Cancelar</NavLink>
                </div>
              </div>
            </div>
          </div>
}

export default App;
