import React,{useState} from 'react';
import Functions from "../helpers/Functions";

const segundos  =   30000
let contador    =   1
const App=({celular})=>{

  const [data, setData]       =   useState({});
  const [active, setActive]   =   useState(true);
  const [message, setMessage] =   useState(false);

  const renviarSMS  = ()=>{
    if (active) {
      setActive(false)
      const myTimeout = setTimeout(()=>{
        setActive(true)
      }, segundos);
    }
    Functions.PostAsync("Users","reenviarCodigoSMS",{celular:celular},{},{name:"callbackContinue",funct:callbackContinue})
  }

  const callbackContinue=(response)=>{
    if (response.message && response.message.label && response.message.public) {
      setMessage(response.message.label)
      contador++
    }
  }

  return  <>
            {message?<div className="titulo-superior text-center text-rosa border p-2 mt-2 mb-2">{message}</div>:false}
            {active && contador<=3?<div className="cursor-pointer" onClick={renviarSMS}>Reenviar SMS</div>:contador==4?<div>Se ha intentado más de 3 veces este método, contacta a un funcionario para resolver</div>:<div>
              El botón de reenviar sms se activará nuevamente en {segundos/1000} segundos
            </div>}
          </>
}
export default App
