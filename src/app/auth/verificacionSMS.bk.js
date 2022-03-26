import React,{useState,useEffect} from 'react';
import logo from '../../assets/images/logo.svg'
import Functions from "../../helpers/Functions";
import Store from "../../helpers/Store";
import Config from "../../helpers/Config";
import { NavLink,useParams,useHistory } from "react-router-dom";
import RegistroPersonal from './registro_persona';
import RegistroEmpresa from './registro_empresa';
import "../../assets/login.css";

const test=true

const App=(props)=>{
  let parametros = useParams();
  let history = useHistory();

  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [inputs, setInputs] = useState({});
  const [ChangeColorIcon, setChangeColorIcon] = useState({celular:'',password:''});
  const [InputType, setInputType] = useState('password');
  const [pasaporte,setPasaporte] = useState(true);

  //const value = { iso2: 'co', dialCode: '57' };

  useEffect(() => {
    getInit()
  },[])
  const changetype= () =>{
    setInputType(InputType==='text'?'password':'text');
  }

  const deleteColor = (e)=>{
    setChangeColorIcon({celular:'',password:''});
  }

  const changeColor = (e) =>{
    setChangeColorIcon(e.target.name=='celular'?{celular:'icon-red',password:''}:{celular:'',password:'icon-red'});
  }

  const getInit=()=>{
    let data          =   {token:"skip"}
    Functions.PostAsync("Maestros","get_tablas_maestras",data,{},{name:"callbackInit",funct:callbackInit})
  }

  const callbackInit=(response)=>{
    if (response.ma_preguntas_seguridad) {
      setData(response.ma_preguntas_seguridad)
    }
    if (response.ma_tipo_identificacion) {
      setData2(response.ma_tipo_identificacion)
    }
  }

  const onChange=(e)=>{

    if(e.target.name ==='tipo_identificacion'){
      if(e.target.value ==='3'){
        setPasaporte(true);
      }else{
        setPasaporte(false);
      }
    }
    if(e.target.name ==='tipo_identificacion_representante_legal'){
      if(e.target.value ==='3'){
        setPasaporte(true);
      }else{
        setPasaporte(false);
      }
    }
    if (e.target.name=="celular") {
      Functions.PostAsync("Users","VerificarTelefonoCodigoSMS",{celular:e.target.value},{},{name:"callbackAutocomplete",funct:callbackAutocomplete})
    }
    Functions.Inputs(e,inputs, setInputs)
  }

  const callbackAutocomplete=(response)=>{

    if (response.error!==undefined && response.error.label!==undefined) {
      document.getElementById("celular").value="";
      document.getElementById("celular").focus();
      props.setModalShow({
        show:true,
        message:<div className="text-center h5">{response.error.label}</div>,
        size:""
      })
      let inputs_ = {...inputs}
          delete(inputs_.celular)
          delete(inputs_.ma_tipo_cuenta_id)
          setInputs(inputs_)
    }
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

  const onSubmit=(e)=>{
    e.preventDefault()
    let inputs_={...inputs}
        inputs_.celular=parametros.telefono
        //return console.log(inputs_);
    Functions.PostAsync("Users","VerificarCuentaSMS",inputs_,{},{name:"callbackContinue",funct:callbackContinue})
  }

  const callbackContinue=(data)=>{

    if (data.error!==undefined) {
      props.setModalShow({
        show:true,
        message:<div className="text-center h5">{data.error.label}</div>,
        size:""
      })
    }else{
      props.setModalShow({
        show:true,
        message:<><div className="title-mensage">{data.message.label}</div>
                    <div className="col-3 ml-auto mr-auto" onClick={()=>props.setModalShow({show:false})}>
                      <div className="btn btn-primary btn-block">
                        Continuar
                      </div>
                    </div>
                  </>,
        size:""
      })
      history.push('/');
    }
  }

  return  <div className="container-fluid" >
            <div className="row justify-content-center">
              <div className="col-8 col-md-3 mt-sm-4">
                <img src={logo} alt="" className="img-fluid" />
              </div>
            </div>
            <form className="row justify-content-center" onSubmit={onSubmit}>
              <div className="col-12 col-md-4 mt-4">
                <div className="container-formulario mb-4">
                    <div className="title-form">
                      Verifica tu cuenta
                    </div>
                    <div className="container-pass">
                        <input  type='text'
                                className="form-control"
                                placeholder="Código enviado al celular"
                                onChange={onChange}
                                onFocus={changeColor}
                                onBlur={deleteColor}
                                name="codigo"
                                id="codigo"/>
                        <i className={`icon-telefono ${ChangeColorIcon.celular}`}></i>
                    </div>
                    <div className="submit-login">
                      <button type="submit" id="submit" className="btn mb-3 mr-1">
                        Verificar cuenta
                      </button>
                    </div>

                </div>
              </div>
            </form>
          </div>
}

export default App;
