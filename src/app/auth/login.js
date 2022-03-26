import React,{useState,useEffect} from 'react';
import logo from '../../assets/images/logo.svg'
import Functions from "../../helpers/Functions";
import Store from "../../helpers/Store";
import Config from "../../helpers/Config";
import { NavLink } from "react-router-dom";
//import IntlTelInput from 'react-intl-tel-input';
//import 'react-intl-tel-input/dist/main.css';
import "../../assets/login.css";

const App=(props)=>{
  const [h, setH] = useState(window.innerHeight);
  const [inputs, setInputs] = useState({});
  const [InputType, setInputType] = useState('password');
  const [ChangeColorIcon, setChangeColorIcon] = useState({celular:'',password:''});

  const onChange=(e)=>{
    Functions.Inputs(e,inputs, setInputs)
  }
  const onChangeNumero=(isValid,
                  rawValue,
                  countryData,
                  formattedValue,
                  extension)=>{
    let inputs_={...inputs}
        inputs_.celular   = formattedValue
        setInputs(inputs_)
  }

  const changetype= () =>{
    setInputType(InputType==='text'?'password':'text');
  }

  const deleteColor = (e)=>{
    setChangeColorIcon({celular:'',password:''});
  }

  const changeColor = (e) =>{
    setChangeColorIcon(e.target.name=='celular'?{celular:'icon-red',password:''}:{celular:'',password:'icon-red'});
  }

  const onSubmit=(e)=>{
    e.preventDefault()
    //return console.log(inputs);
    Functions.PostAsync("Users","loginPWA",inputs,{},{name:"callbackContinue",funct:callbackContinue})
  }

  const callbackContinue=(data)=>{
    if (data.error!==undefined){
        props.setModalShow({
        show:true,
        message:  <div className="text-center w-100">
                    <div>{data.error.label}</div>
                    <div className="btn btn-primary2 mt-3" onClick={()=>props.setModalShow({show:false})}
                    >Cerrar</div>
                  </div>,
        size:""
      })
    }else if(data.redirect!==undefined){
        props.setModalShow({
          show:true,
          message:<div className="text-center w-100">
                    <div>  {data.redirect.label} </div>
                    <a href={Config.ConfigAppUrl+"auth/VerificacionSMS/"+inputs.celular} className="btn btn-primary2 mt-3">  Continuar </a>
                  </div>,
          size:""
        })
    }else {
      sessionStorage.setItem('navegador_id',data.data.usuario_id);
      Store.set("user",data.data)
      Store.set("privilegios",data.privilegios)
      document.location.href  = Config.ConfigAppUrl
    }
  }

  return  <div className="container-fluid" >
            <form onSubmit={onSubmit}>
            <div className="row justify-content-end">
              <div className="col-12 col-md-2 mt-sm-4 mt-4 d-none d-sm-block">
                <NavLink className="btn btn-primary pl-4 pr-4 col-md-12" to="/create">Crear cuenta</NavLink>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-8 col-md-2 mt-sm-4">
                <img src={logo} alt="" className="img-fluid" />
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 col-sm-8 mt-2">
                <div className="container-formulario">
                  <div className="title-form">
                      Ingreso  a tu cuenta
                  </div>
                  <div className="container-pass">
                      <input  type='text'
                              required={true}
                              className="form-control"
                              placeholder="Celular"
                              onChange={onChange}
                              onFocus={changeColor}
                              onBlur={deleteColor}
                              name="celular"
                              excepcion='Mayusculas'
                              event="solonumeros"/>
                      <i className={`icon-telefono ${ChangeColorIcon.celular}`}></i>
                  </div>
                  <div className="container-pass mt-2">
                      <input  type={InputType}
                              required={true}
                              className="form-control pass sin-mayusculas"
                              placeholder="Contraseña"
                              onChange={onChange}
                              onFocus={changeColor}
                              onBlur={deleteColor}
                              name="password"
                              excepcion='Mayusculas'/>
                      <i className={`icon-contrasena ${ChangeColorIcon.password}`}></i>
                      <span className={`icon-ver-tabla ${ChangeColorIcon.password}`} onClick={changetype}></span>
                  </div>
                  <div className="options-login d-none d-sm-block">
                      <div className="form-check">

                      </div>
                      <div className="recordar-contraseña">
                          <NavLink to="/recoverPass">Recuperar contraseña</NavLink>
                          {document.location.hostname==='localhost'?<NavLink className="ml-5"  to="/funcionarios">Funcionarios</NavLink>:false}
                      </div>
                  </div>
                  <div className="submit-login d-none d-sm-block">
                      <button type="submit" id="submit" className="btn">
                          Entrar
                      </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-block d-sm-none">
              <div className="row justify-content-center">
                <div className="col-12 mt-4">
                  <button type="submit" id="submit" className="btn btn-primary col" onClick={onSubmit}>
                      Entrar
                  </button>
                </div>
              </div>
            </div>
            <div className="d-block d-sm-none mt-2">
              <div className="row justify-content-center">
                <div className="col-12">
                  <NavLink className="btn btn-outline-primary2 mb-3 mr-1 col-12" to="/create">Crear cuenta</NavLink>

                </div>
              </div>
            </div>

            <div className="d-block d-sm-none mt-0">
              <div className="row ">
                <div className="col-12 text-center">
                    <NavLink className="text-white" to="/recoverPass">Recordar Contraseña</NavLink>

                </div>
              </div>
            </div>
            </form>
          </div>

}

export default App;
