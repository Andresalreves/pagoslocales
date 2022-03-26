import React,{useState,useEffect} from 'react';
import { NavLink } from "react-router-dom";
import Bolsillo from '../../components/bolsillos';
import BolsilloEmpty from '../../components/bolsillosEmpty';
import BolsilloCreate from '../../components/bolsillosCreate';
import Store from "../../helpers/Store";
import Functions from "../../helpers/Functions";

const App=()=>{
  const [dataBolsillo, setDataBolsillo] = useState(false);
  const [dataBolsilloOff, setDataBolsilloOff] = useState(false);

  useEffect(() => {
    getInit()
  },[])
  const getInit=()=>{
    let send    = {token:Store.get("user").token}
    Functions.PostAsync("Bolsillo","GetMisBolsillos",send,{},{name:"callbackContinue",funct:callbackContinue})
  }

  const callbackContinue=(response)=>{
    setDataBolsillo(response.data.Activos)
    setDataBolsilloOff(response.data.Inactivos)
  }
  return  <div className="Contenido-Home">
            <div className="menu-bottom-transferir">
              <div className="row text-center">
                <div className="col">
                  <NavLink className="text-white p-2" to="/bolsillo/create">
                    Nuevo Bolsillo
                  </NavLink>
                </div>
              </div>
            </div>
            {dataBolsillo && dataBolsillo.length>0?<div className="title-home mb-4">Mis Bolsillos</div>:<></>}
            <div className="row">
              {
                dataBolsillo && dataBolsillo.length>0?<>
                  {dataBolsillo.map((row,key)=>{
                      //console.log(row);
                      return <><Bolsillo key={key} row={row} className="col-12 col-md-3 mb-3" /></>
                    })}</>:false
              }
              {dataBolsillo.length===0?<BolsilloEmpty/>:<BolsilloCreate className="d-none d-sm-block"/>}

            </div>
            {dataBolsilloOff && dataBolsilloOff.length>0?<div className="title-home mb-4 mt-4">Bolsillos inactivos</div>:<></>}
            <div className="row">
              {
                dataBolsilloOff && dataBolsilloOff.length>0?<>
                  {dataBolsilloOff.map((row,key)=>{
                      //console.log(row);
                      return <Bolsillo key={key} row={row} off={true} className="col-12 col-md-3 mb-3" />
                    })}</>:false
              }
            </div>
          </div>
}
export default App
