import React,{useState,useEffect} from 'react';
import logo from '../../assets/images/logo.svg'
import Functions from "../../helpers/Functions";
import Store from "../../helpers/Store";
import Config from "../../helpers/Config";
import { NavLink,useHistory } from "react-router-dom";
import RegistroPersonal from './registro_persona';
import RegistroEmpresa from './registro_empresa';
import SoloCelular from '../../components/SoloCelular';
import validator from 'validator';
import "../../assets/login.css";

const test=true

const App=(props)=>{
  let history = useHistory();
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState(false);
  const [inputs, setInputs] = useState({genero:"1"});
  const [ChangeColorIcon, setChangeColorIcon] = useState({celular:'',password:''});
  const [InputType, setInputType] = useState('password');
  const [pasaporte,setPasaporte] = useState(true);


  const [password, setPassword] = useState("")
  const [error, setError] = useState(true)
  const [contrasenaValida, setContrasenaValida] = useState(false);


  //const value = { iso2: 'co', dialCode: '57' };

  useEffect(() => {
    if (contrasenaValida) {
      setError(false);
    }else {
      setError(true);
    }
  },[contrasenaValida])

  // useEffect(() => {
  //   console.log(inputs.ma_tipo_cuenta_id,error);
  //   setError(true);
  //
  // },[inputs.ma_tipo_cuenta_id])

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
    setData3(response)
  }



  const onChange=(e)=>{

    if(e.target.name ==='password'){
      let inpust_ = {...inputs}
          inpust_[e.target.name]=e.target.value
          setPassword(e.target.value)
      return setInputs(inpust_);
    }

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
      Functions.PostAsync("Users","VerificarTelefono",{celular:e.target.value},{},{name:"callbackAutocomplete",funct:callbackAutocomplete})
    }

    Functions.Inputs(e,inputs, setInputs)
  }

  const callbackAutocomplete=(response)=>{

    if (response.error!==undefined && response.error.label!==undefined) {
      document.getElementById("celular").value="";
      document.getElementById("celular").focus();
      props.setModalShow({
        show:true,
        message:<div className="text-center">{response.error.label}</div>,
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

  const error__=(message)=>{
    props.setModalShow({
                show:true,
                message:<div className="text-center">
                          <div>{message}</div>
                          <div className="btn btn-primary2 mt-2"
                            onClick={()=>props.setModalShow({
                              show:false,
                              message:"",
                            })}>Cerrar</div>
                        </div>,
                size:""
              })
  }

  const onSubmit=()=>{



    if (inputs.ma_tipo_cuenta_id==='2') {
      if (inputs.razon_social===undefined || inputs.razon_social==='') {
        return   error__("la razón social es un campo requerido")
      }
      if (inputs.nro_identificacion===undefined || inputs.nro_identificacion==='') {
        return   error__("El número de identificación es un campo requerido")
      }
      if(inputs.tipo_identificacion===undefined){
        return   error__("El tipo de identificación es un campo requerido");
      }

      if (inputs.nombre_representante_legal===undefined || inputs.nombre_representante_legal==='') {
        return   error__("El nombre del representante legal es un campo requerido")
      }
      if (inputs.tipo_identificacion_representante_legal===undefined || inputs.tipo_identificacion_representante_legal==='') {
        return   error__("El tipo de identificación del representante legal es un campo requerido")
      }
      if (inputs.numero_identificacion_representante_legal===undefined || inputs.numero_identificacion_representante_legal==='') {
        return   error__("El número de identificación del representante legal es un campo requerido")
      }
      if (inputs.ciudad===undefined || inputs.ciudad==='') {
        return   error__("la ciudad de expedición del documento es un campo requerido")
      }
      if (inputs.fecha_expedicion===undefined || inputs.fecha_expedicion==='') {
        return   error__("la fecha de expedición del documento es un campo requerido")
      }

    }else {
      if (inputs.nombres===undefined || inputs.nombres==='') {
        return   error__("El nombre es un campo requerido")
      }

      if (inputs.apellidos===undefined || inputs.apellidos==='') {
        return   error__("El apellido es un campo requerido")
      }

      if (inputs.fecha_nacimiento===undefined || inputs.fecha_nacimiento==='') {
        return   error__("La fecha de nacimiento es un campo requerido")
      }

      if (inputs.genero===undefined || inputs.genero==='') {
        return   error__("El género es un campo requerido")
      }

      if (inputs.tipo_identificacion===undefined || inputs.tipo_identificacion==='') {
        return   error__("El tipo de identificación es un campo requerido")
      }

      if (inputs.nro_identificacion===undefined || inputs.nro_identificacion==='') {
        return   error__("El número de identificación es un campo requerido")
      }

      if (inputs.fecha_expedicion===undefined || inputs.fecha_expedicion==='') {
        return   error__("la fecha de expedición del documento es un campo requerido")
      }

      if (inputs.ciudad===undefined || inputs.ciudad==='') {
        return   error__("la ciudad de expedición del documento es un campo requerido")
      }


    }


    if (inputs.email===undefined || inputs.email==='') {
      return   error__("El email es un campo requerido")
    }
    if (!validator.isEmail(inputs.email)) {
      return   error__("Formato de email está errado")
    }

    if (inputs.pregunta_seguridad===undefined || inputs.pregunta_seguridad==='') {
      return   error__("el tipo de pregunta de seguridad es un campo requerido")
    }

    if (inputs.respuesta_seguridad===undefined || inputs.respuesta_seguridad==='') {
      return   error__("La respuesta de seguridad es un campo requerido")
    }

    if (inputs.password===undefined || inputs.password==='') {
      return   error__("La contraseña es un campo requerido")
    }



    if (error) {
      return   props.setModalShow({
                  show:true,
                  message:<div className="text-center">
                            <div>La contraseña es débil, corrígela</div>
                            <div className="btn btn-primary2 mt-2"
                              onClick={()=>props.setModalShow({
                                show:false,
                                message:"",
                              })}>Cerrar</div>
                          </div>,
                  size:""
                })
    }

    Functions.PostAsync("Users","CrearCuenta",inputs,{},{name:"callbackContinue",funct:callbackContinue})
    /*if (test) {
      props.setModalShow({
        show:true,
        message:<div className="text-center h5">Por favor verifica tu correo electronico.</div>,
        size:""
      })
      //setTimeout(function(){ document.location.href  = Config.ConfigAppUrl }, 3000);
    }*/
  }

  const callbackContinue=(data)=>{
    if (data.error!==undefined) {
      props.setModalShow({
        show:true,
        message:<div className="text-center">{data.error.label}</div>,
        size:""
      })
    }else{
      props.setModalShow({
        show:true,
        message:<>  <div className="title-mensage">{data.message.title_message}</div>
                    <div className="text-center w-75 ml-auto mr-auto mb-3">{data.message.label}</div>
                    <div className="col ml-auto mr-auto" onClick={()=>props.setModalShow({show:false})}>
                      <div className="btn btn-primary btn-block">Ok</div>
                    </div></>,
        size:""
      })
      history.push('/auth/VerificacionSMS/'+inputs.celular);
    }
  }



  useEffect(() => {
    if (contrasenaValida) {
      setError(false)
    }
  },[contrasenaValida])

  return  <div className="container-fluid" >
            <div className="row justify-content-center">
              <div className="col-8 col-md-3 mt-sm-4">
                <img src={logo} alt="" className="img-fluid" />
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-12 col-md-5 mt-4">
                <div className="container-formulario mb-4">
                    <div className="title-form">
                      Crear cuenta
                    </div>
                    <div className="container-pass">
                        <SoloCelular
                          required={true}
                          className="form-control"
                          placeholder="Celular"
                          onChange={onChange}
                          onFocus={changeColor}
                          onBlur={deleteColor}
                          inputs={inputs}
                          setInputs={setInputs}
                          name="celular"
                          id="celular"
                          {...props}
                        />
                        <i className={`icon-telefono ${ChangeColorIcon.celular}`}></i>
                    </div>
                    {inputs.celular!==undefined?<div className="d-flex flex-wrap mt-3 font-10">
                      <div className="col-12 col-md-4">
                        Tipo de cuenta
                      </div>
                      <div className="ml-3 mr-3">
                        Personal
                        <input onChange={onChange} type="radio" name="ma_tipo_cuenta_id" value="1" className="ml-2"/>
                      </div>
                      <div className="ml-3">
                        Empresarial
                        <input onChange={onChange} type="radio" name="ma_tipo_cuenta_id" value="2" className="ml-2"/>
                      </div>
                    </div>:false}

                    {inputs.ma_tipo_cuenta_id!==undefined && inputs.celular!==undefined?<>
                      {
                        inputs.ma_tipo_cuenta_id==='1'?<>
                          <RegistroPersonal
                            password={password}
                            setPassword={setPassword}
                            error={error}
                            setError={setError}
                            contrasenaValida={contrasenaValida}
                            setContrasenaValida={setContrasenaValida}
                            pasaporte={pasaporte}
                            data={data}
                            data2={data2}
                            onChange={onChange}
                            changetype={changetype}
                            ChangeColorIcon={ChangeColorIcon}
                            changeColor={changeColor}
                            deleteColor={deleteColor}
                            InputType={InputType}
                            setInputs={setInputs}
                            inputs={inputs}
                            data3={data3}
                            setModalShow={props.setModalShow}
                          />
                        </>:<>
                          <RegistroEmpresa
                            password={password}
                            setPassword={setPassword}
                            error={error}
                            setError={setError}
                            contrasenaValida={contrasenaValida}
                            setContrasenaValida={setContrasenaValida}
                            {...props}
                            pasaporte={pasaporte}
                            data={data}
                            data2={data2}
                            onChange={onChange}
                            changetype={changetype}
                            ChangeColorIcon={ChangeColorIcon}
                            changeColor={changeColor}
                            deleteColor={deleteColor}
                            InputType={InputType}
                            setInputs={setInputs}
                            data3={data3}
                            inputs={inputs}
                            setModalShow={props.setModalShow}
                          />
                        </>
                      }
                    </>:false}
                    <div className="col-md-12 mt-4 mb-5">
                      <small className="text-gray">Al presionar "crear cuenta", manifiestas que has leido, entendido y aceptado los
                        <span className="recordar-contraseña">
                          <a href="https://apirest.pagoslocales.com/images/ab-pgs.pdf" target="_blank">A-B-PGS-001
                            Términos y condiciones generales de la prestación del servicio de pagoslocales.com®.
                          </a>
                        </span>
                      </small>
                    </div>
                    {inputs.ma_tipo_cuenta_id!==undefined && inputs.celular!==undefined ?<>
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
