import React,{useState,useEffect} from 'react';
import logo from '../../assets/images/logo.svg'
import Functions from "../../helpers/Functions";
import Store from "../../helpers/Store";
import Config from "../../helpers/Config";
import { NavLink } from "react-router-dom";
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import "../../assets/login.css";

const App=(props)=>{
  const [h, setH] = useState(window.innerHeight);
  const [inputs, setInputs] = useState({});

  //const value = { iso2: 'co', dialCode: '57' };

  useEffect(() => {
    document.getElementById("root").style.height = h+"px";
    setH(window.innerHeight)
  },[h])

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

  const onSubmit=()=>{
    let send={...inputs}
        send.type = 3
    Functions.PostAsync("Users","loginPWAFuncionarios",send,{},{name:"callbackContinue",funct:callbackContinue})
  }

  const callbackContinue=(data)=>{
    if (data.error!==undefined) {
      props.setModalShow({
        show:true,
        message:<div className="text-center">{data.error.label}</div>,
        size:""
      })
    }else {
      Store.set("user",data.data)
      document.location.href  = Config.ConfigAppUrl
    }
  }

  return  <div className="container-fluid fondo-login" >
            <div className="row justify-content-center">
              <div className="col-12 col-md-2 mt-4">
                <img src={logo} alt="" className="img-fluid" />
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-12 col-md-4 mt-4">
                <div className="container-formulario">
                    <div className="title-form">
                        Ingreso de funcionarios
                    </div>
                    <div className="container-pass">
                        <input  type="text"
                                className="form-control"
                                placeholder="Nombre de usuario"
                                onChange={onChange}
                                name="nombre_usuario"/>
                        <i className="icon-administrativo"></i>
                    </div>
                    <div className="container-pass mt-2">
                        <input  type="password"
                                className="form-control pass"
                                placeholder="Contraseña"
                                onChange={onChange}
                                name="password"/>
                        <i className="icon-contrasena"></i>
                    </div>
                    <div className="submit-login">
                        <button type="submit" id="submit" className="btn" onClick={onSubmit}>
                            Entrar
                        </button>
                    </div>
                </div>
              </div>
            </div>
          </div>
}

export default App;
