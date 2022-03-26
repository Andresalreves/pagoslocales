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
    //return console.log(inputs);
    Functions.PostAsync("Users","loginPWA",inputs,{},{name:"callbackContinue",funct:callbackContinue})
  }

  const callbackContinue=(data)=>{
    if (data.error!==undefined) {
      props.setModalShow({
        show:true,
        message:<div className="text-center h5">{data.error.label}</div>,
        size:""
      })
    }else {
      Store.set("user",data.data)
      document.location.href  = Config.ConfigAppUrl
    }
  }

  return  <div className="container-fluid fondo-login" >
            <div className="row justify-content-end">
              <div className="col-12 col-md-2 mt-4">
                <NavLink className="btn btn-primary mr-5" to="/create">Crear cuenta</NavLink>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-12 col-md-2 mt-4">
                <img src={logo} alt="" className="img-fluid" />
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-12 col-md-4 mt-4">
                <div className="container-formulario">
                    <div className="title-form">
                        Ingreso a tu cuenta
                    </div>
                    <div className="container-input">
                      {
                        (Store.get("user").usuario_id===undefined?<IntlTelInput
                                                                    preferredCountries={['co']}
                                                                    containerClassName="intl-tel-input w-100"
                                                                    onPhoneNumberChange={onChangeNumero}/>:false)
                      }

                    </div>
                    <div className="container-pass">
                        <input  type="password"
                                className="form-control pass"
                                placeholder="Contraseña"
                                onChange={onChange}
                                name="password"/>
                        <i className="icon-contrasena"></i>
                    </div>
                    <div className="options-login">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label className="form-check-label label-login" htmlFor="flexCheckDefault">
                                Mantener iniciada tu sessión
                            </label>
                        </div>
                        <div className="recordar-contraseña">
                            <NavLink to="/recoverPass">Recordar Contraseña</NavLink>
                        </div>
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
