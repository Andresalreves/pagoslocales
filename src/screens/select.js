import {useState,useEffect} from 'react';
const App =(props)=>{

  const [open, setOpen] = useState(props.render_id?false:true);

  useEffect(() => {
    if (!open) {
      setOpen(true)
    }

  },[open])

  useEffect(() => {
    if (props.render_id && props.data.length>0 && props.defaultValue!==undefined) {
      setOpen(true)
    }

  },[props.data,props.defaultValue])

  useEffect(() => {
    if (props.defaultValue!==undefined && props.defaultValue!=="") {
      setOpen(false)
    }
  },[props.defaultValue])



  return  <>
            {open?<div className="row pb-2">
              <div className={props.classNameMain!==undefined?props.classNameMain:"col"}>
                <select name={props.name}
                    required={(props.required!==undefined && props.required===true)?"required":false}
                    className={props.className + " form-control"}
                    defaultValue={props.defaultValue}
                    value={props.value}
                    onChange={props.onChange}
                    readOnly={(props.readonly!==undefined && props.readonly===true)?"readonly":false}
                    disabled={(props.disabled!==undefined && props.disabled===true)?"disabled":false}
                >
                  <option hidden value="">{props.selectDefault}</option>
                  {props.data!==undefined?<>
                    {props.data.map((row,key)=>{
                      if (props.valuesIguales===undefined) {
                        return <option value={row.value} key={key} extra={row.extra}>{row.label}</option>
                      }else {
                        return <option value={row.label} key={key} extra={row.extra}>{row.label}</option>
                      }
                    })}
                  </>:false}
                </select>
              </div>
            </div>:false}
          </>
}

export default App
