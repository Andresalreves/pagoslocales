import {useState,useEffect} from 'react';
const test  = [
                {
                  label:"Talento humano 1",
                  value:1,
                  icon:"icon-pagoslocalescom",
                },
                {
                  label:"Talento humano 2",
                  value:1,
                  icon:"icon-pagoslocalescom",
                },
                {
                  label:"Talento humano 3",
                  value:1,
                  icon:"icon-pagoslocalescom",
                },
                {
                  label:"Talento humano 4",
                  value:1,
                  icon:"icon-pagoslocalescom",
                },
                {
                  label:"Talento humano 5",
                  value:1,
                  icon:"icon-pagoslocalescom",
                },
                {
                  label:"Talento humano 6",
                  value:1,
                  icon:"icon-pagoslocalescom",
                },
              ]
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
      //setString(props.opciones.ma_genero[0].label)
      setString(test[0].label)
    }
  },[props.opciones])

  return  <>
            <div className="row mb-3">
              <div className="col-3 pt-3 text-left text-rosa">
                Departamento
              </div>
              <div className="col-8 pt-3 text-left text-gray">
                {string}
              </div>
            </div>
            <div className="row text-center">
              {props.opciones.ma_genero3!==undefined?<>
                {props.opciones.ma_genero3.map((row,key)=>{
                  return  <div  className={activo===key?"col-2 p-1":"col-2 p-1"}
                                key={key}
                                onClick={()=>{ change(key,row) }}>
                            <div className={activo===key?"btn2 btn-primary2":"btn2 btn-gray2"}>
                              <i className={row.icon}/>
                            </div>
                          </div>
                })}
              </>:false}
              {test!==undefined?<>
                {test.map((row,key)=>{
                  return  <div  className={activo===key?"col-2 p-1":"col-2 p-1"}
                                key={key}
                                onClick={()=>{ change(key,row) }}>
                            <div className={activo===key?"btn2 btn-primary2":"btn2 btn-gray2"}>
                              <i className={row.icon}/>
                            </div>
                          </div>
                })}
              </>:false}
            </div>
          </>
}

export default App
