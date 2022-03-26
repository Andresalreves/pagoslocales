import {useEffect,useState} from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import Select from '../../screens/select';
import Functions from '../../helpers/Functions';
import TipoIdentificacion from '../../components/tipo_identificacion';

const App=(props)=>{

  const [ciudades, setCiudades] = useState([]);

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

  useEffect(() => {
    document.getElementById("nro_identificacion").value='';
  },[props.pasaporte])

  return  <>
            <input  type="text"
                    className="form-control mt-2"
                    placeholder="Nombres"
                    onChange={props.onChange}
                    name="nombres"/>

            <input  type="text"
                    className="form-control mt-2"
                    placeholder="Apellidos"
                    onChange={props.onChange}
                    name="apellidos"/>

            <TipoIdentificacion
              required={true}
              data={props.data2}
              name="tipo_identificacion"
              selectDefault="Tipo de identificación"
              onChange={props.onChange}

              id2="nro_identificacion"
              required2={true}
              name2="nro_identificacion"
              placeholder2="Número de identificación"
              onChange2={props.onChange}
              className2="form-control mt-0 mb-2"
              event2={props.pasaporte?'':'solonumeros'}
            />
            
            <ReactSearchAutocomplete
              className="form-control"
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
                    placeholder="Email"
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
