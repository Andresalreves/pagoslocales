import React from 'react';

const App=(props)=>{
  const onChange=(e)=>{

    let value         = e.target.value
    let inputCelular  = document.getElementById("celular")

    if (isNaN(value)) {
      inputCelular.value="";
      inputCelular.focus();
      return errorModal("Sólo se admiten números")
    }

    if (value.length===1 && value!=="3") {
      inputCelular.value="";
      inputCelular.focus();
      return errorModal("El número celular debe comenzar en 3")
    }

    if (value.length>10) {
      inputCelular.value="";
      inputCelular.focus();
      let inputs_ = {...props.inputs}
          delete(inputs_.celular)
          delete(inputs_.ma_tipo_cuenta_id)
          props.setInputs(inputs_)
      return errorModal("El celular debe contener 10 números")
    }

    if (value.length===10 && props.onChange!==undefined) {
      props.onChange(e)
    }

  }

  const errorModal=(message)=>{
    if (props.setModalShow===undefined) {
      return false;
    }
    return props.setModalShow({
              show:true,
              message:  <div className="text-center">
                          <div>{message}</div>
                          <div className="btn btn-primary2 mt-2"
                            onClick={()=>props.setModalShow({
                              show:false,
                              message:"",
                            })}>Cerrar</div>
                        </div>,
              size:""
            })
  }
  return <input   type='text'
                  required={props.required}
                  className={props.className}
                  placeholder={props.placeholder}
                  onChange={onChange}
                  onFocus={props.onFocus}
                  onBlur={props.onBlur}
                  name={props.name}
                  autoComplete="off"
                  id={props.id}/>
}

export default App
