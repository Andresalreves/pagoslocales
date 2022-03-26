import React,{useState,useEffect} from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import Functions from "../helpers/Functions";
const App=(props)=>{
  const [input, setInput] = useState(false);
  const [open, setOpen]   = useState(false);
  const [data, setData]   = useState(false);

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
    let data          =   {string:string}
    Functions.PostAsync("Maestros","searchCiudad",data,{},{name:"callback",funct:callback})
  }

  const callback=(response)=>{
    setData(response.data)
  }

  const formatResult = (item) => {
    return item;
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
    setOpen(false)
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
                        items={data}
                        onSearch={handleOnSearch}
                        onSelect={(result)=>handleOnSelect(result,props.name)}
                        autoFocus
                        formatResult={formatResult}
                      />
                    </div>:<div className="col-8 mb-2">
                        <input  className="form-control"
                                type="text"
                                required={true}
                                name="nombres"
                                placeholder={props.placeholder}
                                defaultValue={(input.nombres!==undefined)?input.nombres:""}
                                onChange={onChange}
                                event='sololetras'
                        />

                        <input  className="form-control mt-2"
                                type="text"
                                required={true}
                                name="apellidos"
                                placeholder={props.placeholder}
                                defaultValue={(input.apellidos!==undefined)?input.apellidos:""}
                                onChange={onChange}
                                event='sololetras'
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
                    {input.nombres} {input.apellidos}
                  </div>}
          </>
}

export default App
