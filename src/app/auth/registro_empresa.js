import {useEffect,useState} from 'react';
import Select from '../../screens/select';
import Functions from '../../helpers/Functions';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import PasswordChecklist from "react-password-checklist"
import Municipios from '../../helpers/Municipios';

const App=(props)=>{

  const [ciudades, setCiudades] = useState([]);
  const [tipo_identificacion, setTipoIdentificacion] = useState(props.data2);
  const [disabledCiudad, setDisabledCiudad] = useState(false);
  const [reset, setReset] = useState(false);

  const handleOnSearch = (string, results) => {
    return false
  }

  const [tipoDate, setTipoDate] = useState(false);
  const [tipoDate2, setTipoDate2] = useState(false);

  const [password, setPassword] = useState("")
  const [error, setError] = useState(true)
  const [contrasenaValida, setContrasenaValida] = useState(false);

  const [classNameID, setClassNameID] = useState("");
  const [classNameSecurity, setClassNameSecurity] = useState("");


  useEffect(() => {
    if (reset) {
      setReset(false)
    }
    let inputs_={...props.inputs}
        inputs_.tipo_identificacion="4"
        props.setInputs(inputs_);
  },[reset])

  const callback=(response)=>{
    if (response.data.length>0) {
      setCiudades(response.data)
    }else {
      setCiudades([])
      setReset(true)
      let inputs_={...props.inputs}
          inputs_.ciudad  = ""
          props.setInputs(inputs_)
      if (props.setModalShow!==undefined) {
        props.setModalShow({
                    show:true,
                    message:<div className="text-center">
                              <div>La ciudad que ingresaste no existe</div>
                              <div className="btn btn-primary2 mt-2"
                                onClick={()=>props.setModalShow({
                                  show:false,
                                  message:"",
                                })}>Cerrar</div>
                            </div>,
                    size:""
                  })
      }

    }
  }

  const handleOnHover = (result) => {
  }

  const handleOnSelect = (item) => {
    let inputs_={...props.inputs}
        inputs_.ciudad  = item.id
        props.setInputs(inputs_)
        setDisabledCiudad(inputs_.ciudad)
  }

  const handleOnFocus = () => {
  }

  const formatResult = (item) => {
    return item;
   // return (<p dangerouslySetInnerHTML={{__html: '<strong>'+item+'</strong>'}}></p>); //To format result as html
  }

  const onBlur=(e)=>{
    if (e.target.value.length!==10) {
      props.setModalShow({
        show:true,
        message:  <div className="text-center">
                    Por favor ingresar NIT con dígito de verificación
                  </div>,
        size:""
      })
    }
  }

  useEffect(() => {
    let tipo_identificacion_ =  [...tipo_identificacion]
        delete(tipo_identificacion_[3])
        //console.log(tipo_identificacion_);
        setTipoIdentificacion(tipo_identificacion_)
    document.getElementById("numero_identificacion_representante_legal").value='';
  },[props.pasaporte])

  const handleBlur=(estatus)=>{
    setTipoDate(estatus)
  }

  const handleBlur2=(estatus)=>{
    setTipoDate2(estatus)
  }

  const tipoidentificacion=(e)=>{
    //console.log(e.target.value);
    setClassNameID("active")
    props.onChange(e)
  }

  const tipoPregunta=(e)=>{
    //console.log(e.target.value);
    setClassNameSecurity("active")
    props.onChange(e)
  }

  return  <>
            <input  type="text"
                    className="form-control mt-2"
                    placeholder="Razón social"
                    required={true}
                    onChange={props.onChange}
                    name="razon_social"/>

            <div className="mt-2">
              <Select
                className={classNameID}
                required={true}
                data={[{label:'NIT',value:'4',icon:false}]}
                name="tipo_identificacion"
                selectDefault="Tipo de documento"
                onChange={(e)=>tipoidentificacion(e)}
                defaultValue="4"
              />
            </div>
            <input  type="text"
                    required={true}
                    maxLength={10}
                    className="form-control mt-0"
                    placeholder="Número de identificación"
                    onChange={props.onChange}
                    name="nro_identificacion"
                    onBlur={onBlur}
                    event={'solonumeros'}/>

            <input  type="text"
                    required={true}
                    className="form-control mt-2"
                    placeholder="Nombre del representante legal"
                    onChange={props.onChange}
                    name="nombre_representante_legal"/>

            <div className="mt-2">
              <Select
                required={true}
                data={tipo_identificacion}
                name="tipo_identificacion_representante_legal"
                selectDefault="Tipo de documento representante legal"
                onChange={props.onChange}
              />
            </div>

            <input  type="text"
                    required={true}
                    className="form-control mt-0 mb-2"
                    placeholder="Número de identificación representante legal"
                    onChange={props.onChange}
                    id="numero_identificacion_representante_legal"
                    name="numero_identificacion_representante_legal"
                    event={props.pasaporte?'':'solonumeros'}/>

                    <div className={disabledCiudad?"d-none":"d-block"}>
                      {!reset?<ReactSearchAutocomplete
                        className="form-control"
                        placeholder="Ciudad de expedición"
                        disabled={disabledCiudad}
                        items={Municipios}
                        onSearch={handleOnSearch}
                        onHover={handleOnHover}
                        onSelect={handleOnSelect}
                        onFocus={handleOnFocus}
                        formatResult={formatResult}
                      />:false}

                    </div>
                    <div className={!disabledCiudad?"d-none":"d-block simula_input"} onClick={()=>{setDisabledCiudad(false);setReset(true);}}>
                      {disabledCiudad}
                    </div>

            <div className="mt-2">
              <input  className="form-control"
                      required={true}
                      type={tipoDate?"date":"text"}
                      onBlur={()=>handleBlur(false)}
                      onFocus={()=>handleBlur(true)}
                      name="fecha_expedicion"
                      placeholder="Fecha de expedición"
                      onChange={props.onChange}
              />
            </div>


            <input  type="email"
            required={true}
                    className="form-control mt-2"
                    placeholder="Ejemplo@gmail.com"
                    onChange={props.onChange}
                    type="email"
                    name="email"/>

            <div className="mt-2">
              <Select
                className={classNameSecurity}
                required={true}
                data={props.data}
                name="pregunta_seguridad"
                selectDefault="Pregunta de seguridad"
                onChange={(e)=>tipoPregunta(e)}
              />
            </div>

            <input  type="text"
            required={true}
                    className="form-control mt-0"
                    placeholder="Responder a la pregunta"
                    onChange={props.onChange}
                    name="respuesta_seguridad"/>

            <div className="container-pass">
                <input  type={props.InputType}
                    className="form-control mt-2 sin-mayusculas"
                    placeholder="Contraseña"
                    required={true}
                    onChange={props.onChange}
                    onFocus={props.changeColor}
                    onBlur={props.deleteColor}
                    name="password"/>
                <i className={`icon-contrasena ${props.ChangeColorIcon.password}`}></i>
                <span className={`icon-ver-tabla ${props.ChangeColorIcon.password}`} onClick={props.changetype}></span>
                {props.error?<>
                  <div className="alert text-left">
                    Debe contener 6 caracteres: una mayúscula, minuscula y un caracter especial
                  </div>
                </>:false}
            </div>
            <div className="d-none">
              <PasswordChecklist
                rules={["length","specialChar","capital"]}
                minLength={5}
                value={props.password}
                onChange={(isValid) => {props.setContrasenaValida(isValid);}}
              />
            </div>
          </>
}
export default App
