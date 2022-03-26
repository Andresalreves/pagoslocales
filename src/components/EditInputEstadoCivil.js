import React,{useState,useEffect} from 'react';
import Functions from "../helpers/Functions";
import Select from '../screens/select';
const App=(props)=>{
  const [input, setInput] = useState(false);
  const [open, setOpen]   = useState(false);
  const [data, setData]   = useState(false);

  useEffect(() => {
    setInput(props.input)
    getInit()
  },[props.input])

  const getInit=()=>{
    Functions.PostAsync("Maestros","get_tablas_maestras",{},{},{name:"callbackContinue",funct:callbackContinue})
  }

  const callbackContinue=(response)=>{
    setData(response)
  }

  const onClick=()=>{
    setOpen(true)
  }

  const onSubmit=()=>{
    let data          =   {
                            value:JSON.stringify(input),
                            name:props.name,
                            table:props.table,
                            key:props.keys,
                            keyValue:input[props.keyValue],
                            multiple:true
                          }
        //console.log(data);
    Functions.PostAsync(props.module,props.component,data,{},{name:"callback2",funct:callback2})
  }

  const callback2=(response)=>{
    props.getInit()
    setOpen(false)
  }

  const onChange=(e)=>{
    Functions.Inputs(e,input, setInput)
  }

  return  <>
            {open?<div className="row">
                    <div className="col-8 mb-2">
                        <Select
                          required={true}
                          data={(data.ma_estado_civil!==undefined?data.ma_estado_civil:[])}
                          name="ma_estado_civil_id"
                          selectDefault="Tipo de identificación"
                          defaultValue={(input.ma_estado_civil_id===undefined)?false:input.ma_estado_civil_id}
                          onChange={onChange}
                        />
                    </div>
                    <div className="col-5">
                      <div className="btn btn-primary2 btn-sm" onClick={onSubmit}>
                        Guardar
                      </div>
                    </div>
                    <div className="col-5">
                      <div className="btn btn-gray btn-sm" onClick={()=>setOpen(false)}>
                        Cancelar
                      </div>
                    </div>
                  </div>:<div onClick={onClick}>
                    {input.estado_civil_string}
                  </div>}
          </>
}

export default App
