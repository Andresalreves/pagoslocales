import React,{useState,useEffect} from 'react';
import logo from '../../assets/images/logo.svg'
import Functions from "../../helpers/Functions";
import Store from "../../helpers/Store";
import { NavLink } from "react-router-dom";
import IntlTelInput from 'react-intl-tel-input';
import RegistroPersonal from './registro_persona';
import RegistroEmpresa from './registro_empresa';
import 'react-intl-tel-input/dist/main.css';
import "../../assets/login.css";

const App=(props)=>{
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [h, setH] = useState(window.innerHeight);
  const [inputs, setInputs] = useState({});

  const value = { iso2: 'co', dialCode: '57' };

  const getInit=()=>{
    let data          =   {token:"skip"}
    Functions.PostAsync("Maestros","get_tablas_maestras",data,{},{name:"callbackInit",funct:callbackInit})
  }

  const callbackInit=(response)=>{
    if (response.data) {
      setData(response.data.ma_preguntas_seguridad)
      setData2(response.data.ma_tipo_identificacion)
    }
  }

  useEffect(() => {
    document.getElementById("root").style.height = h+"px";
    setH(window.innerHeight)
    getInit()
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
            <div className="container-header-login">
                <div className="container-logo-login">
                    <img src={logo} alt="" />
                </div>
                <div className="container-button-crear-cuenta">
                  <NavLink to="/create">Crear cuenta</NavLink>
                </div>
            </div>
            <div className="fondo-login">
                <div className="container-formulario">
                    <div className="title-form">
                        Ingreso a tu cuenta
                    </div>
                    <div className="inputs-crear-cuenta">
                      <div className="container-input">
                        <IntlTelInput
                          preferredCountries={['co']}
                          containerClassName="intl-tel-input w-100"
                          onPhoneNumberChange={onChangeNumero}
                        />
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col ">
                        Tipo de cuenta
                      </div>
                      <div className="col p-0">
                        Personal
                        <input onChange={onChange} type="radio" name="tipo_usuario_id" value="1" className="ml-1"/>
                      </div>
                      <div className="col p-0">
                        Empresarial
                        <input onChange={onChange} type="radio" name="tipo_usuario_id" value="2" className="ml-1"/>
                      </div>
                    </div>
                    {inputs.tipo_usuario_id!==undefined?<>
                      {
                        inputs.tipo_usuario_id==='1'?<>
                          <RegistroPersonal data={data} data2={data2} onChange={onChange}/>
                        </>:<>
                          <RegistroEmpresa data={data} data2={data2} onChange={onChange}/>
                        </>
                      }
                    </>:false}
                    {inputs.tipo_usuario_id!==undefined?<>
                      <div className="submit-login">
                        <button type="submit" id="submit" className="btn" onClick={onSubmit}>
                          Entrar
                        </button>
                        <NavLink to="/" className="btn btn-link">Cancelar</NavLink>
                      </div>
                    </>:false}
                </div>
            </div>
          </div>
}

export default App;
