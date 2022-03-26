import {useState,useEffect} from 'react';
const App=(props)=>{

  const [activo, setActivo] = useState((parseInt(props.filter.estatus)>0)?parseInt(props.filter.estatus)-1:1);
  //const [activo, setActivo] = useState(props.filter.estatus!==undefined?parseInt(props.filter.estatus)-1:1);

  const change=(key,value)=>{
    setActivo(key)
    if (props.setFilter!==undefined){
      props.setFilter({estatus:value})
    }
  }

  useEffect(() => {
    setActivo((parseInt(props.filter.estatus)>0)?parseInt(props.filter.estatus):1)
  },[props.filter.estatus])


  return  <div className="row text-center">
            {props.opciones.map((row,key)=>{
              return  <div  className={activo===row.value?"col text-title text-rosa cursor-pointer border-bottom-rosa-x3 pb-2":"col text-title text-white cursor-pointer pb-2"}
                            key={key}
                            onClick={()=>{ change(key,row.value) }}>
                          {row.icon}{row.label}
                      </div>
            })}
          </div>
}

export default App
