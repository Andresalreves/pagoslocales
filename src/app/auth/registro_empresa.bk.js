import {useEffect,useState} from 'react';
import Select from '../../screens/select';
import Functions from '../../helpers/Functions';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
const App=(props)=>{
  const [ciudades, setCiudades] = useState([]);
  const [tipo_identificacion, setTipoIdentificacion] = useState(props.data2);
  const handleOnSearch = (string, results) => {
    let data          =   {string:string}
    Functions.PostAsync("Maestros","searchCiudad",data,{},{name:"callback",funct:callback})
  }

  const callback=(response)=>{
    setCiudades(response.data)
  }

  const handleOnHover = (result) => {
  }

  const handleOnSelect = (item) => {
    let inputs_={...props.inputs}
        inputs_.ciudad  = item.id
        props.setInputs(inputs_)
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
                    El campo NIT require 10 números
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

  return  <>
            <input  type="text"
                    className="form-control mt-2"
                    placeholder="Razón social"
                    onChange={props.onChange}
                    name="razon_social"/>

            <div className="mt-2">
              <Select
                required={true}
                data={[{label:'NIT',value:'4',icon:false}]}
                name="tipo_identificacion"
                selectDefault="Tipo de documento"
                onChange={props.onChange}
                defaultValue="4"
              />
            </div>
            <input  type="text"
                    className="form-control mt-0"
                    placeholder="Número de identificación"
                    onChange={props.onChange}
                    name="nro_identificacion"
                    onBlur={onBlur}
                    event={'solonumeros'}/>

            <input  type="text"
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
            {console.log(props.pasaporte)}
            <input  type="text"
                    className="form-control mt-0 mb-2"
                    placeholder="Número de identificación representante legal"
                    onChange={props.onChange}
                    id="numero_identificacion_representante_legal"
                    name="numero_identificacion_representante_legal"
                    event={props.pasaporte?'':'solonumeros'}/>

            <ReactSearchAutocomplete
              className="form-control"
              placeholder="Ciudad de expedición"
              items={ciudades}
              onSearch={handleOnSearch}
              onHover={handleOnHover}
              onSelect={handleOnSelect}
              onFocus={handleOnFocus}
              autoFocus
              formatResult={formatResult}
            />

            <input  type="email"
                    className="form-control mt-2"
                    placeholder="Ejemplo@gmail.com"
                    onChange={props.onChange}
                    name="email"/>

            <div className="mt-2">
              <Select
                required={true}
                data={props.data}
                name="pregunta_seguridad"
                selectDefault="Pregunta de seguridad"
                onChange={props.onChange}
              />
            </div>

            <input  type="text"
                    className="form-control mt-0"
                    placeholder="Responder a la pregunta"
                    onChange={props.onChange}
                    name="respuesta_seguridad"/>

            <div className="container-pass">
                <input  type={props.InputType}
                    className="form-control mt-2"
                    placeholder="Contraseña"
                    onChange={props.onChange}
                    onFocus={props.changeColor}
                    onBlur={props.deleteColor}
                    name="password"/>
                <i className={`icon-contrasena ${props.ChangeColorIcon.password}`}></i>
                <span className={`icon-ver-tabla ${props.ChangeColorIcon.password}`} onClick={props.changetype}></span>
            </div>
          </>
}
export default App
