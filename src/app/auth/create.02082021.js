import React,{useState,useEffect} from 'react';
import logo from '../../assets/images/logo.svg'
import Functions from "../../helpers/Functions";
import Store from "../../helpers/Store";
import Config from "../../helpers/Config";
import { NavLink } from "react-router-dom";
import RegistroPersonal from './registro_persona';
import RegistroEmpresa from './registro_empresa';
import "../../assets/login.css";

const test=true

const App=(props)=>{
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [inputs, setInputs] = useState({});
  const [ChangeColorIcon, setChangeColorIcon] = useState({celular:'',password:''});

  //const value = { iso2: 'co', dialCode: '57' };

  useEffect(() => {
    getInit()
  },[])

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
    Functions.PostAsync("Users","CrearCuenta",inputs,{},{name:"callbackContinue",funct:callbackContinue})
    if (test) {
      props.setModalShow({
        show:true,
        message:<div className="text-center h5">Pendiente de un mensaje quemande Andrés</div>,
        size:""
      })
       setTimeout(function(){ document.location.href  = Config.ConfigAppUrl }, 3000);
    }
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

  return  <div className="container-fluid" >
            <div className="row justify-content-end">
              <div className="col-12 col-md-2 mt-4 d-none d-sm-block">
                <NavLink className="btn btn-primary pl-4 pr-4 col-md-12" to="/">Lo haré luego</NavLink>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-8 col-md-3 mt-sm-4">
                <img src={logo} alt="" className="img-fluid" />
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-12 col-md-4 mt-4">
                <div className="container-formulario mb-4">
                    <div className="title-form">
                      Crear cuenta
                    </div>
                    <div className="container-pass">
                        <input  type='text'
                                className="form-control"
                                placeholder="Celular"
                                onChange={onChange}
                                onFocus={changeColor}
                                onBlur={deleteColor}
                                name="celular"/>
                        <i className={`icon-telefono ${ChangeColorIcon.celular}`}></i>
                    </div>
                    <div className="d-flex flex-wrap mt-3 font-10">
                      <div className="col-12 col-md-4">
                        Tipo de cuenta
                      </div>
                      <div className="ml-3 mr-3">
                        Personal
                        <input onChange={onChange} type="radio" name="tipo_usuario_id" value="1" className="ml-2"/>
                      </div>
                      <div className="ml-3">
                        Empresarial
                        <input onChange={onChange} type="radio" name="tipo_usuario_id" value="2" className="ml-2"/>
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
                        <button type="submit" id="submit" className="btn mb-3 mr-1" onClick={onSubmit}>
                          Crear cuenta
                        </button>
                      </div>
                    </>:false}
                </div>
              </div>
            </div>
          </div>
}

export default App;
