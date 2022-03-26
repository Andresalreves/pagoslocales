import {useState} from 'react';
const App=(props)=>{

  const [activo, setActivo] = useState(0);

  const change=(key,value)=>{
    setActivo(key)
    if (props.setFilter!==undefined) {
      props.setFilter({estatus:value})
    }
  }

  return  <div className="row text-center">
            {props.opciones.map((row,key)=>{
              return  <div  className={activo===key?"col text-title text-rosa cursor-pointer border-bottom-rosa-x3 pb-2":"col text-title text-white cursor-pointer pb-2"}
                            key={key}
                            onClick={()=>{ change(key,row.value) }}>
                          {row.icon}{row.label}
                      </div>
            })}
          </div>
}

export default App
