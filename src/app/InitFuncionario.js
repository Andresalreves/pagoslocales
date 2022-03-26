import React,{useEffect} from 'react';
// import Store from "../helpers/Store";
// import Functions from "../helpers/Functions";
import '../assets/container_home.css';
// import visa from '../assets/images/visa.png';
// import mastercard from '../assets/images/master.svg';
//import Billetera from '../components/billetera';
//import Bolsillo from '../components/bolsillos';
//import BolsilloEmpty from '../components/bolsillosEmpty';
//import { Doughnut } from 'react-chartjs-2';
//import StateContext from '../helpers/ContextState'

//let metodo    =   "GetCuentasDefault";
const App=()=>{

  //const context = React.useContext(StateContext);

  //const [data, setData] = useState(false);
  //const [data2, setData2] = useState(false);
  //const [dataBolsillo, setDataBolsillo] = useState(false);
  //const [message, setMessage] = useState(false);

  useEffect(() => {
    //getInit()
  },[])


  // const getInit=()=>{
  //   let send    = {token:Store.get("user").token}
  //   Functions.PostAsync("Home","GetCuentasDefault",send,{},{name:"callbackContinue",funct:callbackContinue})
  // }

  // const callbackContinue=(response)=>{
  //   if (response.message!==undefined && response.message.code!==undefined) {
  //     context.setModalShow({
  //       show:true,
  //       message:<div className="text-center h5">
  //                 {response.message.label}
  //               </div>,
  //       size:""})
  //       Store.clear();
  //       context.setUser(false);
  //     return false;
  //   }
  //   // if (response.message!==undefined) {
  //   //   setMessage(response.message)
  //   // }
  //   // if(response.data!==undefined) {
  //   //   setData(response.data)
  //   // }
  //   getInit2()
  // }
  //
  // const getInit2=()=>{
  //   let send    = {token:Store.get("user").token}
  //   Functions.PostAsync("Bolsillo","GetMisBolsillos",send,{},{name:"callbackContinue2",funct:callbackContinue2})
  // }

  // const callbackContinue2=(response)=>{
  //   // if (response.message!==undefined) {
  //   //   setMessage(response.message)
  //   // }
  //   // if(response.data!==undefined) {
  //   //   setDataBolsillo(response.data)
  //   // }
  // }

  return  <div className="Contenido-Home">
            1
          </div>
}

export default App;
