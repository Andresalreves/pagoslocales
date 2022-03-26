import React,{useState,useEffect} from 'react';
import logo from '../../assets/images/logo.svg'
import Functions from "../../helpers/Functions";
import Store from "../../helpers/Store";
import { NavLink } from "react-router-dom";
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import "../../assets/login.css";

const App=(props)=>{
  const [h, setH] = useState(window.innerHeight);
  const [inputs, setInputs] = useState({});

  const value = { iso2: 'co', dialCode: '57' };

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
    Functions.PostAsync("Users","loginPWA",inputs,{},{name:"callbackContinue",funct:callbackContinue})
  }

  const callbackContinue=(data)=>{
    if (data.error!==undefined) {
      props.setModalShow({
        show:true,
        message:<div className="text-center h5">{data.error}</div>,
        size:""
      })
    }else {
      props.setUser(data)
      Store.set("user",data.data)
    }
  }

  return  <div className="container-login">
            <NavLink className="btn btn-primary mr-5" to="/create">Crear cuenta</NavLink>
            <div className="fondo-login">
                <div className="container-formulario">
                  <img src={logo} alt="" />
                    <div className="title-form">
                        Ingreso a tu cuenta
                    </div>
                    <div className="container-input">
                      <IntlTelInput
                        preferredCountries={['co']}
                        containerClassName="intl-tel-input w-100"
                        onPhoneNumberChange={onChangeNumero}
                      />
                    </div>
                    <div className="submit-login">
                        <button type="submit" id="submit" className="btn" onClick={onSubmit}>
                            Recuperar contraseña
                        </button>
                    </div>
                </div>
            </div>
          </div>
}

export default App;
