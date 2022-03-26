import React,{useState,useEffect} from 'react';
import { NavLink,useParams } from "react-router-dom";
import Table from "../../screens/table_movimientos_usd";
import Functions from '../../helpers/Functions';
import Store from "../../helpers/Store";
import Config from "../../helpers/Config";
import  { faFilePdf,faFileExcel } from "@fortawesome/free-solid-svg-icons";
import  { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const App=()=>{
  const params          =   useParams();
  const [data, setData] =   useState(false);
  //const [filter, setFilter] = useState({estatus:1});
  const CallExcel = () =>{
    /*console.log(graficos);
    var image = graficos.ctx.toDataURL();
    document.getElementById('base64').value = image;*/
    let send = {};
    send.token  = Store.get("user").token
    window.open(Config.ConfigApirest+'Excel/Movimientos/getMovimientosBilleteraUSD/token:'+send.token+'/id_billetera:'+params.id);
  }
  const descargar=(data)=>{
    let url = Config.ConfigApirest+"PDF/Movimientos/getMovimientosBilletera?id_billetera="+data.id_billetera+"&token="+Store.get("user").token
    window.open(url)
  }
  let tds       =   [
    {
      label:"Estado",
      value:"estatus_string",
      className:"text-center estatus"
    },
    {
      label:"Fecha",
      value:"fecha_operacion_string",
      className:"text-center"
    },
    {
      label:"Descripción",
      value:"concepto",
      className:"text-justify"
    },

    {
      label:"Moneda",
      value:"tipo_moneda",
      className:"text-center "
    },
    {
      label:"Valor",
      value:"valor_recibido_string",
      className:"text-right "
    },
    {
      label:"Saldo",
      value:"saldo_string2",
      className:"text-right "
    },
    {
      label:"Acciones",
      value:"events",
      icons:[
              {
                label:"Detalle movimiento",
                icon: <i className = "icon-ver-normal text-primary mr-1"/>,
                NavLink:NavLink,
                url:'/Movimientos/USDDetalleBilleteraMovimiento/'+params.id+"/",
                url2:'/Divisas/VerDetalleReportePago/',
              },
            ]
    },
  ]

  useEffect(() => {
    getInit()
  },[])

  const getInit=()=>{
    Functions.PostAsync('Movimientos','getBilletera',{id_billetera:params.id},{},{name:"callbackContinue",funct:callbackContinue})
  }

  const callbackContinue=(response)=>{
    if (response.data) {
      setData(response.data)
    }else {

    }
  }

  return  <div className="Contenido-Home">
            <div className="row">
              <div className="col-12 col-md-12">
                <div className="title-home mb-4">Mis movimientos</div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 listados">
                <div className="card">
                  <div className="card-header pb-0 position-relative">
                    <div className="row border-bottom-rosa-x3">
                      <div  className="col-12 col-md-7 text-title text-rosa cursor-pointer  pb-2 pl-sm-5">
                        <i className="icon-billetera-movil ml-sm-4 "></i>
                        {data.tipo} {data.tipo_moneda!==undefined?"("+data.tipo_moneda+")":false} {data.nro_cuenta}
                      </div>
                      <div className="col-12 col-sm-3 text-right text-white">
                        <div className="row text-bold">
                          <div className="col-6 col-md-6 text-right pt-0" >
                            Saldo disponible
                          </div>
                          <div className="col text-rosa text-left x3">
                            {data.saldo_string}
                          </div>
                        </div>
                      </div>
                      {data.saldo_string!=="0,00"?<>
                        <div className="col-12 col-sm-2 text-right text-white">
                          <FontAwesomeIcon  icon={faFilePdf}
                                            className=" icon-comentarios cursor-pointer text-white mr-2"
                                            onClick={()=>descargar(data)}/>

                          <FontAwesomeIcon  icon={faFileExcel}
                                            className=" icon-comentarios cursor-pointer text-white"
                                            onClick={()=>CallExcel('PDF/Resumen/Reporte_Usuarios/token:')}/>
                        </div>
                      </>:false}
                    </div>
                  </div>
                  <div className="card-body">
                    <Table
                      td={tds}
                      modelo="Movimientos"
                      metodo="getMovimientosBilleteraUSD"
                      limit="20"
                      filter={1}
                      id_billetera={params.id}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
}
export default App
