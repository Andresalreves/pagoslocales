import React,{useState,useEffect} from 'react';
import Store from "../helpers/Store";
import Functions from "../helpers/Functions";
import '../assets/container_home.css';
// import visa from '../assets/images/visa.png';
// import mastercard from '../assets/images/master.svg';
import Billetera from '../components/billetera';
import Bolsillo from '../components/bolsillos';
import BolsilloEmpty from '../components/bolsillosEmpty';
//import { Doughnut } from 'react-chartjs-2';
import StateContext from '../helpers/ContextState'
import Area from '../screens/Graficos/Area';
import BarChart from '../screens/Graficos/BarChart';

//let metodo    =   "GetCuentasDefault";
const App=(props)=>{

  const context = React.useContext(StateContext);

  const [data, setData] = useState(false);
  //const [data2, setData2] = useState(false);
  const [dataBolsillo, setDataBolsillo] = useState(false);
  const [message, setMessage] = useState(false);


  useEffect(() => {
    getInit()
  },[])


  const getInit=()=>{
    let send    = {token:Store.get("user").token}
    Functions.PostAsync("Home","GetCuentasDefault",send,{},{name:"callbackContinue",funct:callbackContinue})
  }

  const callbackContinue=(response)=>{
    if (response.message!==undefined && response.message.code!==undefined && Store.get("user").funcionario_id===undefined) {
      context.setModalShow({
        show:true,
        message:<div className="text-center h5">
                  {response.message.label}
                </div>,
        size:""})
        Store.clear();
        context.setUser(false);
      return false;
    }
    if (response.message!==undefined) {
      setMessage(response.message)
    }
    if(response.data!==undefined) {
      setData(response.data)
    }
    getInit2()
  }

  const getInit2=()=>{
    let send    = {token:Store.get("user").token}
    Functions.PostAsync("Bolsillo","GetMisBolsillos",send,{},{name:"callbackContinue2",funct:callbackContinue2})
  }

  const callbackContinue2=(response)=>{
    if (response.message!==undefined) {
      setMessage(response.message)
    }
    if(response.data!==undefined) {
      setDataBolsillo(response.data)
    }
  }

  return <div className="Contenido-Home">
          {data?<>
            <div className="row">
              <div className="col">
                <div className="title-home">
                  <div className="row">
                    <div className="col text-left">
                      Mis Productos
                    </div>
                    <div className="col-2 text-left d-block d-sm-none">
                      <div className={!props.display1?"icon-up cursor-pointer":"icon-down cursor-pointer"} onClick={()=>{props.display1?props.setDisplay1(false):props.setDisplay1(true)}}>
                        <i className="icon-cambiar"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col text-right d-none d-sm-block">

              </div>
            </div>
            {message?<div className="h3 text-left mt-3">{message.label}</div>:false}
            {!props.display1?<div className="row mt-4">
              {data.map((row,key)=>{
                return <Billetera className="col-12 col-md-4 mb-3" key={key} row={row}/>
              })}
            </div>:false}
          </>:false}
        </div>
}

export default App;
