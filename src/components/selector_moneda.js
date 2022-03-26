import {useState,useEffect} from 'react';
const App=(props)=>{

  const [activo, setActivo] = useState(0);
  const [string, setString] = useState(false);

  const change=(key,row)=>{
    setActivo(key)
    setString(row.label)
    if (props.setInputs!==undefined) {
      let input = {...props.inputs}
          input[props.name] = row.value
          props.setInputs(input)
    }
  }
  useEffect(() => {
    if (!string && props.opciones.ma_monedas!==undefined) {
      setString(props.opciones.ma_monedas[0].label)
      props.setCurrent(props.opciones.ma_monedas[0].value)
    }
  },[props.opciones])

  return  <div className="row text-center">
            <div className="col-4 ml-3 pt-3 mr-3 text-center text-gray">Moneda a negociar</div>
            {props.opciones.ma_monedas!==undefined?<>
              {props.opciones.ma_monedas.map((row,key)=>{
                return  <div  className={activo===key?"col-2 p-1":"col-2 p-1"}
                              key={key}
                              onClick={()=>{ change(key,row) }}>
                          <div className={activo===key?"btn2 btn-primary2":"btn2 btn-gray2"}>
                            {row.label}
                          </div>
                        </div>
              })}
            </>:false}
          </div>
}

export default App
