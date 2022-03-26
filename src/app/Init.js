import React,{useState,useEffect,useRef} from 'react';
import Store from "../helpers/Store";
import Functions from "../helpers/Functions";
import '../assets/container_home.css';
// import visa from '../assets/images/visa.png';
// import mastercard from '../assets/images/master.svg';
import Billetera from '../components/billetera';
import Bolsillo from '../components/bolsillos';
import BolsilloEmpty from '../components/bolsillosEmpty';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import StateContext from '../helpers/ContextState';
import Config from "../helpers/Config";
import BarChart from '../screens/Graficos/BarChart';
import Resumen from '../components/home_resumen';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { reduce } from 'd3';
import { config} from '@fortawesome/fontawesome-svg-core';
import ResumenHome from '../components/ResumenHome';
import RecepcionDivisas from '../components/RecepcionDivisas';
import RecepcionReintegroDivisas from '../components/RecepcionReintegroDivisas';

let divisas_x_plataforma;
let divisas_x_mes;
let terceros_nacionales;
let bancos;
let recibido_usd;
let recibido_eur;

const labelsDefault = ['Chaturbate', 'Stripchat'];
const GraphicDataDefault = {
  labelsDefault,
  datasets: [
    {
      label: 'Vacío',
      graphicData: [0,0],
      borderColor: '#FF40D7',
      backgroundColor: '#FF40D7',
      borderRadius: 20,
    }
  ],
};



const App=(props)=>{
  const context = React.useContext(StateContext);
  const [data, setData]       = useState(false);
  const [resumen, setResumen]       = useState(false);
  const [reset, setReset]     = useState(false);
  const [dataBolsillo, setDataBolsillo] = useState(false);
  const [message, setMessage] = useState(false);
  const [GraphicData,setGraphicData] = useState({});
  const [GraphicData2,setGraphicData2] = useState({});
  let MyGraphic1 = useRef(null);
  let MyGraphic2 = useRef(null);

  const CallPDF = () =>{
    let send = {};
    send.token  = Store.get("user").token
    window.open(Config.ConfigApirest+'PDF/Resumen/Resumen_home/token:'+send.token);
  }

  useEffect(() =>{
    if(reset){
      setReset(false);
    }
  },[reset])


  useEffect(() => {
    getInit();
  },[])


  useEffect(() => {
    context.socketIo.on("actualizar_notificacion", () => {
      getInit()
      setReset(true)
    });
  }, [context.socketIo]);

  const getInit=()=>{
    let send    = {token:props.user.token}
    Functions.PostAsync("Resumen","Resumen_home",send,{},{name:"callbackContinue",funct:callbackContinueResumen});
    Functions.PostAsync("Home","GetCuentasDefault",send,{},{name:"callbackContinue",funct:callbackContinue});
  }

  const callbackContinue=(response)=>{

    if (response.message!==undefined && response.message.code!==undefined && props.user.funcionario_id===undefined) {
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
    let send    = {token:props.user.token}
    Functions.PostAsync("Bolsillo","GetMisBolsillos",send,{},{name:"callbackContinue2",funct:callbackContinue2})
  }
  const callbackContinueResumen=(response_resumen)=>{
    if(response_resumen.data!==undefined){
      let labels = [];
      let ValueGraphics = [];
      let labels2 = [];
      let ValueGraphics2 = [];
      setResumen(response_resumen.data);

      if (response_resumen.data && response_resumen.data.pagado) {
        divisas_x_plataforma = Object.values(response_resumen.data.pagado);
      }

      if(response_resumen.data.pagado_usd !==undefined){
        recibido_usd = Object.values(response_resumen.data.pagado_usd);
      }
      if(response_resumen.data.pagado_eur !==undefined){
        recibido_eur = Object.values(response_resumen.data.pagado_eur);
      }
      divisas_x_mes = response_resumen.data.total_x_mes!==undefined?Object.values(response_resumen.data.total_x_mes):{};
      terceros_nacionales = response_resumen.data.terceros_nacionales!==undefined?Object.values(response_resumen.data.terceros_nacionales):{};
      bancos = response_resumen.data.entidades_bancarias!==undefined?Object.values(response_resumen.data.entidades_bancarias):{};
      if(recibido_usd!==undefined){
        recibido_usd.map((v6,k6)=>{
          labels.push(v6.abonado_pagador);
          ValueGraphics.push(v6.abonado_saldo_number);
        });
      }

      if(recibido_eur!==undefined){
        recibido_eur.map((v7,k7)=>{
          labels2.push(v7.abonado_pagador);
          ValueGraphics2.push(v7.abonado_saldo_number);
        });
      }


      let MyData = {
        labels,
        datasets: [
          {
            data: ValueGraphics,
            borderColor: '#FF40D7',
            backgroundColor: '#FF40D7',
            borderRadius: 20,
          }
        ],
      };


      let MyData2 = {
        labels:[...labels2],
        datasets: [
          {
            data: ValueGraphics2,
            borderColor: '#FF40D7',
            backgroundColor: '#FF40D7',
            borderRadius: 20,
          }
        ],
      };
      setGraphicData2(MyData2);
      setGraphicData(MyData);
      if(MyGraphic1 !=null && MyGraphic2.current != null){
        if(MyGraphic1.current !=null && MyGraphic2.current != null){
          setTimeout(function(){
            var image1 = MyGraphic1.current.canvas.toDataURL();
            var image2 = MyGraphic2.current.canvas.toDataURL();
            let send    = {token:props.user.token,imagen1:image1,imagen2:image2}
            Functions.PostAsync("Resumen","SaveGraphics",send,{},{name:"callbackContinue2"})
          },2000);
        }
      }
    }
  }
  const callbackContinue2=(response)=>{

    if (response.message!==undefined) {
      setMessage(response.message)
    }
    if(response.data!==undefined) {
      setDataBolsillo(response.data)
    }
  }

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
  );

  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
    aspectRatio:5,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      /*title: {
        display: true,
        text: 'Chart.js Horizontal Bar Chart',
      },*/
    },
  };

  /*const labels = ['Chaturbate', 'Stripchat', 'Epayservice', 'Otras plataformas'];
  const GraphicData = {
    labels,
    datasets: [
      {
        //label: 'Dataset 2',
        graphicData: [40,58,65,45],
        borderColor: '#FF40D7',
        backgroundColor: '#FF40D7',
        borderRadius: 20,
      }
    ],
  };*/


  return <div className="Contenido-Home">
          {data?<>
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="title-home">
                  <div className="row">
                    <div className="col">
                      Mis Productos
                    </div>
                    <div className="col-2 text-center d-block d-sm-none">
                      <div className={!props.display1?"icon-up cursor-pointer":"icon-down cursor-pointer"} onClick={()=>{props.display1?props.setDisplay1(false):props.setDisplay1(true)}}>
                        <i className="icon-cambiar"/>
                      </div>
                    </div>
                  </div>
                </div>
                {message?<div className="h3 text-left mt-3">{message.label}</div>:false}
                {!props.display1?<div className="row mt-4">
                  {data.map((row,key)=>{
                    return <Billetera key={key} row={row}/>
                  })}
                </div>:false}
                {dataBolsillo?<>
                  {parseInt(props.user.estatus)>1 && dataBolsillo && dataBolsillo.Activos!==undefined?<>
                    <div className="title-home mt-4">
                      <div className="row">
                        <div className="col">
                          Mis Bolsillos
                        </div>
                        <div className="col-2 text-center d-block d-sm-none">
                          <div className={!props.display2?"icon-up cursor-pointer":"icon-down cursor-pointer"} onClick={()=>{props.display2?props.setDisplay2(false):props.setDisplay2(true)}}>
                            <i className="icon-cambiar"/>
                          </div>
                        </div>
                      </div>
                    </div>
                    {!props.display2?<div className="row mt-4">
                      {
                        dataBolsillo && dataBolsillo.Activos!==undefined && dataBolsillo.Activos.length>0?<>
                          {dataBolsillo.Activos.map((row,key)=>{
                              return <Bolsillo key={key} row={row}/>
                            })}</>:<BolsilloEmpty className="col-12 col-md-6 cursor-pointer pl-0"/>
                      }
                    </div>:false}
                </>:<>
                      <div className="title-home mt-4">
                        <div className="row mb-3">
                          <div className="col">
                            Mis Bolsillos
                          </div>
                          <div className="col-2 text-center d-block d-sm-none">
                            <div className={!props.display2?"icon-up cursor-pointer":"icon-down cursor-pointer"} onClick={()=>{props.display2?props.setDisplay2(false):props.setDisplay2(true)}}>
                              <i className="icon-cambiar"/>
                            </div>
                          </div>
                        </div>
                      </div>
                      <BolsilloEmpty/>
                    </>
                  }
                </>:false}
              </div>
              <div className="col-12 col-md-6 text-right d-none d-sm-block">
                <div className="text-gray pt-1">
                  <b>Último ingreso: {props.user.ultimo_login_string}</b>
                </div>
                <div className="row mt-2">
                  <div className="col-md-12">
                    {!reset?<>
                      <Resumen/>
                    </>:false}
                  </div>
                </div>
              </div>
            </div>
            <div className='resumen-transaccional'>
              <div className="title-home">
                <div className="row">
                  <div className="col">
                    Resumen transaccional - Comercio exterior
                    <FontAwesomeIcon  icon={faFilePdf}
                                      style={{width:"20px"}}
                                      className="resumen-comercio-exterior"
                                      onClick={CallPDF}/>
                  </div>
                </div>
              </div>
              <div className='d-flex mt-3 justify-content-between'>
                <div className='containers-info-home'>
                  <div  className='subtitle-container-dinero text-center'>
                    Dinero pendiente por abonar USD
                  </div>
                  <div className='contenedor-dinero bg-rosa text-white'>
                    <b>{resumen.saldo_pendiente_usd!==undefined?resumen.saldo_pendiente_usd:'0'} USD</b>
                  </div>
                </div>
                <div className='containers-info-home'>
                  <div  className='subtitle-container-dinero text-center'>
                    Dinero pendiente por abonar EUR
                  </div>
                  <div className='contenedor-dinero bg-rosa text-white'>
                    <b>{resumen.saldo_pendiente_eur!==undefined?resumen.saldo_pendiente_eur:'0'} EUR</b>
                  </div>
                </div>
                <div className='containers-info-home'>
                  <div  className='subtitle-container-dinero text-center'>
                    Total operaciones internacionales
                  </div>
                  <div className='contenedor-dinero'>
                    <b>{resumen.operaciones_in_realizadas!==undefined?resumen.operaciones_in_realizadas:'0'}</b>
                  </div>
                </div>
                <div className='containers-info-home'>
                  <div  className='subtitle-container-dinero text-center'>
                    Total pagos recibidos de plataforma
                  </div>
                  <div className='contenedor-dinero'>
                    <b>{resumen.total_reportes_pagados!==undefined?resumen.total_reportes_pagados:'0'}</b>
                  </div>
                </div>
                <div className='containers-info-home'>
                  <div  className='subtitle-container-dinero text-center'>
                    Pagos realizados a terceros
                  </div>
                  <div className='contenedor-dinero'>
                    <b>{resumen.pagos_realizados_terceros!==undefined?resumen.pagos_realizados_terceros:'0'}</b>
                  </div>
                </div>
              </div>
              <div className='container-fluid mt-4 p-0'>
                <div className='row'>
                  <div className='col-lg-6'>
                    <div className='contenedor-dinero position-relative p-0'>
                      <div className='title-cuadro-intermedio bg-blue text-white p-2'><b>USD contra plataformas</b></div>
                      <div className='usd-plataformas'>
                        {GraphicData.labels!==undefined?<Bar options={options} data={GraphicData} ref={MyGraphic1} />:<Bar ref={MyGraphic1} options={options} data={GraphicDataDefault}/>}
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-6'>
                    <div className='contenedor-dinero p-0'>
                      <div className='title-cuadro-intermedio bg-blue text-white p-2'><b>EUR contra plataformas</b></div>
                      <div className='usd-plataformas'>
                        {GraphicData2.labels!==undefined?<Bar ref={MyGraphic2} options={options} data={GraphicData2} />:<Bar ref={MyGraphic2} options={options} data={GraphicDataDefault}/>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='container-fluid mt-4 p-0'>
                <div className="row">
                  <div className='col-12 col-sm-6'>
                  {!reset?<>
                    <ResumenHome  title="Recepción divisas por plataforma"
                                  modelo="Resumen"
                                  metodo="getResumenDivisasPlataformas"
                                  classNameMain="contenedor-dinero p-0"
                                  classNameBody="p-3 h-recepcion-divisas"
                                  Component={RecepcionDivisas}/>
                    </>:false}
                  </div>
                  <div className='col-lg-6'>
                  {!reset?<>
                    <ResumenHome  title="Resumen reintegro Divisas"
                                                modelo="Resumen"
                                                metodo="Resumen_home"
                                                classNameMain="contenedor-dinero p-0"
                                                classNameBody="p-3 h-recepcion-divisas"
                                                Component={RecepcionReintegroDivisas}/>
                  </>:false}
                  </div>
                </div>
                <div className='row mt-4'>
                  <div className='col-lg-6'>
                    <div className="contenedor-dinero text-white p-0 max-heigt-container-dinero">
                      <div id="accordion2">
                        <div className='title-cuadro-intermedio bg-blue text-white p-2'>
                          <b>Recepción Divisas por mes</b>
                        </div>
                        <div className="container-overflow">
                          <div className='px-4'>
                            <table className='table_divisas_x_plataforma'>
                              <thead>
                                <tr>
                                  <td className='text-left w-50'><b className='saldo-mis-productos fz-1'>Mes</b></td>
                                  <td><b className='saldo-mis-productos fz-1 w-50'>USD</b></td>
                                  <td><b className='saldo-mis-productos fz-1 w-50'>EUR</b></td>
                                </tr>
                              </thead>
                              <tbody className='text-gray'>
                                {divisas_x_mes!==undefined && divisas_x_mes.length>0?<>
                                  {divisas_x_mes.map((v1,k1)=>{
                                    return <tr key={k1}>
                                    <td className='text-left'>{v1.mes}</td>
                                    <td className='text-right'>{v1.valor_usd!==undefined?v1.valor_usd:' - '}</td>
                                    <td className='text-right'>{v1.valor_eur!==undefined?v1.valor_eur:' - '}</td>
                                  </tr>
                                  })}
                                </>
                                :false}
                              </tbody>
                            </table>
                          </div>
                          <div className='bg-blue2 px-4 pt-2 pb-2 text-white'>
                            <table className='table_divisas_x_plataforma'>
                              <tbody>
                                <tr>
                                  <td className='text-left w-50'><b>TOTAL RECIBIDO</b></td>
                                  <td className='w-25 text-right'><b>{resumen.total_monto_reportes_usd?resumen.total_monto_reportes_usd:"0.00"}</b></td>
                                  <td className='w-25 text-right'><b>{resumen.total_monto_reportes_eur?resumen.total_monto_reportes_eur:"0.00"}</b></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className='px-4'>
                            <table className='table_divisas_x_plataforma text-gray'>
                              <tbody>
                                <tr>
                                  <td className='text-left w-50'>Comisión PGS Locales, INC</td>
                                  <td className='w-25 text-right'>{resumen.total_comisiones_usd?resumen.total_comisiones_usd:"0.00"}</td>
                                  <td className='w-25 text-right'>{resumen.total_comisiones_eur?resumen.total_comisiones_eur:"0.00"}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className='footer-container-divisas-plataforma px-4 pt-2 pb-2 bg-blue2 text-white'>
                            <table className='table_divisas_x_plataforma'>
                              <tbody>
                                <tr>
                                  <td className='text-left w-50'><b>TOTAL</b></td>
                                  <td className='w-25 text-right'><b>{resumen.total_monto_aprobados_dolares!=undefined?resumen.total_monto_aprobados_dolares:'0.00'}</b></td>
                                  <td className='w-25 text-right'><b>{resumen.total_monto_aprobados_euros!=undefined?resumen.total_monto_aprobados_euros:'0.00'}</b></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-6'>
                  <div className="contenedor-dinero text-white p-0 max-heigt-container-dinero">
                      <div id="accordion2">
                        <div className='title-cuadro-intermedio bg-blue text-white p-2'>
                          <b>Recepción Divisas por mes</b>
                        </div>
                        <div className="container-overflow">
                          <div className='px-4'>
                            <table className='table_divisas_x_plataforma'>
                              <thead>
                                <tr>
                                  <td className='text-left w-50'><b className='saldo-mis-productos fz-1'>Concepto</b></td>
                                  <td><b className='saldo-mis-productos fz-1 w-50'>Cantidad (COP)</b></td>
                                </tr>
                              </thead>
                              <tbody className='text-gray'>
                                <tr>
                                  <td className='text-left'>Subtotal reintegro Divisas</td>
                                  <td className='text-right'>{resumen.subtotal!==undefined?resumen.subtotal:'0'}</td>
                                </tr>
                                <tr>
                                  <td className='text-left'>Comisión reintegro giros</td>
                                  <td className='text-right'>{resumen.comision_giro_recibido!==undefined?resumen.comision_giro_recibido:'0'}</td>
                                </tr>
                                <tr>
                                  <td className='text-left'>IVA comisión reintegro giros</td>
                                  <td className='text-right'>{resumen.comision_iva_giro_recibido!==undefined?resumen.comision_iva_giro_recibido:'0'}</td>
                                </tr>
                                <tr>
                                  <td className='text-left'>Comisión Administrativa</td>
                                  <td className='text-right'>{resumen.comision_administrativa!==undefined?resumen.comision_administrativa:'0'}</td>
                                </tr>
                                <tr>
                                  <td className='text-left'>IVA Comisión Administrativa</td>
                                  <td className='text-right'>{resumen.comision_iva_administrativa!==undefined?resumen.comision_iva_administrativa:'0'}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className='bg-blue2 px-4 pt-2 pb-2'>
                            <table className='table_divisas_x_plataforma'>
                              <tbody>
                                <tr>
                                  <td className='text-left w-50'><b>TOTAL REINTEGRO</b></td>
                                  <td className='w-50 text-right'><b>{resumen.total!==undefined?resumen.total:'0'}</b></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className='px-4'>
                            <table className='table_divisas_x_plataforma text-gray'>
                              <tbody>
                                <tr>
                                  <td className='text-left w-50'>Total pagos realizados a terceros</td>
                                  <td className='w-50 text-right'>{resumen.total_pago_terceros!==undefined?resumen.total_pago_terceros:'0'}</td>
                                </tr>
                                <tr>
                                  <td className='text-left w-50'>Costo total transferencias</td>
                                  <td className='w-50 text-right'>{resumen.costo_transferencias!==undefined?resumen.costo_transferencias:'0'}</td>
                                </tr>
                                <tr>
                                  <td className='text-left w-50'>IVA Costo total transferencias</td>
                                  <td className='w-50 text-right'>{resumen.iva_costo_transferencia!==undefined?resumen.iva_costo_transferencia:'0'}</td>
                                </tr>
                                <tr>
                                  <td className='text-left w-50'>GMF sobre total transferencias</td>
                                  <td className='w-50 text-right'>{resumen.gmf!==undefined?resumen.gmf:'0'}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className='footer-container-divisas-plataforma px-4 pt-2 pb-2 bg-blue2 text-white'>
                            <table className='table_divisas_x_plataforma'>
                              <tbody>
                                <tr>
                                  <td className='text-left w-50'><b>Total dinero disponible</b></td>
                                  <td className='w-50 text-right'><b>{resumen.total_disponible!==undefined?resumen.total_disponible:'0'}</b></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row mt-4'>
                  <div className='col-lg-6'>
                    <div className='contenedor-dinero p-0 max-heigt-overflow'>
                      <div className='title-cuadro-intermedio bg-blue text-white p-2'>
                        <b>Principales terceros naciónales (cumplimiento)</b>
                      </div>
                      <div className='px-4 pb-3 mt-3'>
                        <table className='table_divisas_x_plataforma'>
                          <thead>
                            <tr>
                              <td className='text-left w-50'><b className='saldo-mis-productos fz-1'>Tercero</b></td>
                              <td><b className='saldo-mis-productos fz-1 w-50'>Cantidad (COP)</b></td>
                            </tr>
                          </thead>
                          <tbody className='text-gray'>
                                {terceros_nacionales!==undefined && terceros_nacionales.length>0?<>
                                  {terceros_nacionales.map((v1,k1)=>{
                                    return <tr key={k1}>
                                    <td className='text-left'>{v1.titular}</td>
                                    <td className='text-right'>{v1.total}</td>
                                  </tr>
                                  })}
                                </>
                                :false}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-6'>
                    <div className='contenedor-dinero p-0 max-heigt-overflow'>
                      <div className='title-cuadro-intermedio bg-blue text-white p-2'>
                        <b>Principales entidades Bancarias</b>
                      </div>
                      <div className='px-4 pb-3 mt-3'>
                        <table className='table_divisas_x_plataforma'>
                          <thead>
                            <tr>
                              <td className='text-left w-50'><b className='saldo-mis-productos fz-1'>Entidad Bancaria</b></td>
                              <td><b className='saldo-mis-productos fz-1 w-50'>Cantidad (COP)</b></td>
                            </tr>
                          </thead>
                          <tbody className='text-gray'>
                                {bancos!==undefined && bancos.length>0?<>
                                  {bancos.map((v1,k1)=>{
                                    return <tr key={k1}>
                                    <td className='text-left'>{v1.banco}</td>
                                    <td className='text-right'>{v1.total}</td>
                                  </tr>
                                  })}
                                </>
                                :false}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>:false}
        </div>
}

export default App;
