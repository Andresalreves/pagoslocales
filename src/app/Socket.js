import React,{useState,useEffect} from 'react';
//import Functions from "../helpers/Functions";
import StateContext from '../helpers/ContextState'
const App=()=>{
  const context = React.useContext(StateContext);
  // const socket  = Functions.Socket
  //
  // useEffect(() => {
  //   socket.on("actualizar", (data) => {
  //
  //   });
  //   socket.on("estatus", (data) => {
  //     console.log(data);
  //   });
  //
  // }, [socket]);
  //
  // const enviar_peticion=()=>{
  //   //actualizar
  //   socket.emit("actualizar", {
  //     userId: 1,
  //     username:2,
  //   });
  // }
  
  return  <div className="row">
            <div className="col text-center pt-5 cursor-pointer" onClick={()=>context.socket({m:100})}>
              hola
            </div>
          </div>
}
export default App
