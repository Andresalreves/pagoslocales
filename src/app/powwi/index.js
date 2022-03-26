import React,{useState,useEffect} from 'react';
import Functions from "../../helpers/Functions";
const App=()=>{
  const [data, setData]               =   useState(false);

  useEffect(() => {
    Functions.PostAsync("Powwi","Testing",{},{},{name:"callback",funct:callback})
  },[])

  const callback=(response)=>{
    console.log(response);
  }

  return <div>Prueba</div>
}
export default App
