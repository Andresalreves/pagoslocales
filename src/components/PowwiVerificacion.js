import React,{useState} from 'react';
import Functions from "../helpers/Functions";
import StateContext from '../helpers/ContextState';

const inputs_array=[1,2,3,4,"",""]

const test    =   ["1","2","3","4","5","6"]
let inputs__  =  {}

const App=()=>{

  const context = React.useContext(StateContext);

  const [block,setBlock]  =   useState(false);
  const [passWordInputs,setPassWordInputs]  =   useState(false);

  const onChange=(e,position)=>{
    let inputs_           =   {...inputs__}
        inputs_[position] =   e.target.value
        inputs__          =   inputs_
    if (document.getElementById(position)) {
      document.getElementById(position).focus();
    }else {
      setBlock(true)
      if (test) {
        let result=6
        Object.entries(inputs__).map((row,key)=>{
          if (test[key]===row[1] && (result===6 || result===true) ) {
            return result  = true
          }else {
            return result  = false
          }
        })

        context.setModalShow({
          show:true,
          message:<div className="text-center h5">{(result)?"Código verificado":"Código errado o no válido"}</div>,
          size:""
        })

        setBlock(false)

        return setPassWordInputs(test)
      }else {
        Functions.PostAsync("Powwi/Users","CrearCuenta",inputs__,{},{name:"callbackContinue",funct:callbackContinue})
      }
    }
  }

  const callbackContinue=(response)=>{
    if (test) {
      return setPassWordInputs(test)
    }
    if (response.error===undefined) {
      return setPassWordInputs(test)
    }
  }

  const onSubmit=(e)=>{
    e.preventDefault()
  }

  return  <div className="container">
            <div className="row">
              <div className="col">
                <form onSubmit={onSubmit}>
                  <div className="row">
                    <div className="col">
                      <h3 className="text-muted">Seguridad</h3>
                      <div className="mt-3 text-muted">
                        Código enviado a su celular
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="row mt-4">
                        {inputs_array.map((value, key)=>{
                          let key_  = key+1
                          return  <div className="col-2 col-md-2 p-1" key={key}>
                                    <input  type="text"
                                            required={true}
                                            id={"input_"+key}
                                            maxLength="1"
                                            min="0"
                                            max="9"
                                            readOnly={block}
                                            name={"input_"+key}
                                            className="form-control text-center"
                                            onChange={(e)=>{onChange(e,"input_"+key_)}}
                                            placeholder={value}/>
                                  </div>
                        })}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
}

export default App
