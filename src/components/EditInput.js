import React,{useState,useEffect} from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import Functions from "../helpers/Functions";
import Municipios from '../helpers/Municipios';

const App=(props)=>{
  const [input, setInput] = useState(false);
  const [open, setOpen]   = useState(false);

  useEffect(() => {
    setInput(props.input)
  },[props.input])

  const onClick=()=>{
    setOpen(true)
  }

  const handleOnSelect = (item,name) => {
    let inputs_         =   {...input}
        inputs_[name]   =   item.id
        setInput(inputs_)
  }

  const handleOnSearch = (string, results) => {
    return false
  }

  const formatResult = (item) => {
    return item;
  }

  const onSubmit=()=>{
    let data          =   {
                            value:input[props.name],
                            name:props.name,
                            table:props.table,
                            key:props.keys,
                            keyValue:input[props.keyValue]
                          }
        //console.log(data);
    Functions.PostAsync(props.module,props.component,data,{},{name:"callback2",funct:callback2})
  }

  const callback2=(response)=>{
    setOpen(false)
    if (props.getInit!==undefined) {
      props.getInit()
    }
  }

  const onChange=(e)=>{
    Functions.Inputs(e,input, setInput)
  }

  return  <>
            {open?<div className="row">
                    {props.type==="autocomplete"?<div className=" col-12">
                      <ReactSearchAutocomplete
                        className="form-control"
                        name={props.name}
                        placeholder={props.placeholder}
                        items={Municipios}
                        onSearch={handleOnSearch}
                        onSelect={(result)=>handleOnSelect(result,props.name)}
                        autoFocus
                        formatResult={formatResult}
                      />
                    </div>:<div className="col-8 mb-2">
                      <input  className="form-control"
                              type="text"
                              required={true}
                              name={props.name}
                              placeholder={props.placeholder}
                              defaultValue={(input[props.name]!==undefined)?input[props.name]:""}
                              onChange={onChange}
                              event={props.event}
                      />
                    </div>}
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
                    {(props.replace!==undefined)?props.replace:input[props.name]}
                  </div>}
          </>
}

export default App
