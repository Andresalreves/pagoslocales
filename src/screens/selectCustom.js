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
                    id={props.id}
                    onChange={props.onChange}
                    readOnly={(props.readonly!==undefined && props.readonly===true)?"readonly":false}
                    disabled={(props.disabled!==undefined && props.disabled===true)?"disabled":false}
                >
                  <option hidden value="">{props.selectDefault}</option>
                  {props.data!==undefined?<>
                    {props.data.map((row,key)=>{
                      if (props.activarCta!==undefined && props.activarCta===true && (row.extra==='CTA' || row.extra==='PL') && props.desactivar) {
                        return <option  value={row.value}
                                        key={key}
                                        {...row}
                                        extra={row.extra}
                                        className={row.extra}>{row.label}</option>
                      }
                      else if (props.activarCta!==undefined && props.activarCta===false && row.extra==='CTA' && props.desactivar) {
                        return false
                      }
                      else if (props.activarBm!==undefined && props.activarBm===false && row.extra==='BM' && props.desactivar) {
                        return false
                      }
                      else if (props.activarBm!==undefined && props.activarBm===true && row.extra==='BM' && props.desactivar) {
                        return <option  value={row.value}
                                        key={key}
                                        {...row}
                                        extra={row.extra}
                                        className={row.extra}>
                                        {row.label}
                                </option>
                      }else if (props.activarBol!==undefined && props.activarBol===false && row.extra==='BOL' && props.desactivar) {
                        return false
                      }else if (props.activarBol!==undefined && props.activarBol===true && row.extra==='BOL' && props.desactivar) {
                        return <option  value={row.value}
                                        key={key}
                                        {...row}
                                        extra={row.extra}
                                        className={row.extra}>{row.label}</option>
                      }else if(props.desactivar===undefined){
                        return <option  value={row.value}
                                        key={key}
                                        {...row}
                                        extra={row.extra}
                                        className={row.extra}>{row.label}</option>
                      }else {
                        return false
                      }
                    })}
                  </>:false}
                </select>
              </div>
            </div>:false}
          </>
}

export default App
