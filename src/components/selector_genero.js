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
    if (!string && props.opciones.ma_genero!==undefined) {
      setString(props.opciones.ma_genero[0].label)
    }
  },[props.opciones])

  return  <div className="row text-center">
            <div className="col-4 ml-3 pt-3 mr-3 text-center text-gray">Género</div>
            {props.opciones.ma_genero!==undefined?<>
              {props.opciones.ma_genero.map((row,key)=>{
                return  <div  className={activo===key?"col-2 p-1":"col-2 p-1"}
                              key={key}
                              onClick={()=>{ change(key,row) }}>
                          <div className={activo===key?"btn2 btn-primary2":"btn2 btn-gray2"}>
                            <i className={row.icon}/>
                          </div>
                        </div>
              })}
            </>:false}
            <div className="col-2 ml-3 p-0 pt-3 mr-3 text-left text-gray">
              {string}
            </div>
          </div>
}

export default App
