import React,{useState,useEffect} from 'react';
import { NavLink, useHistory, useParams } from "react-router-dom";
import Table from "../../screens/table_movimientos";
import Functions from '../../helpers/Functions';
//import parse from 'html-react-parser';

const App=()=>{
  const params          =   useParams();
  const [data, setData] =   useState(false);
  let history = useHistory();
  //const [filter, setFilter] = useState({estatus:1});

  let tds       =   [
    {
      label:"Estado",
      value:"estatus_string",
      className:"text-center"
    },
    {
      label:"Fecha",
      value:"fecha_solicitud_string",
      className:"text-center"
    },
    {
      label:"Descripción",
      value:"concepto",
      className:"text-left"
    },
    {
      label:"Moneda",
      value:"tipo_moneda",
      className:"text-center"
    },
    {
      label:"Valor",
      value:"saldo_string",
      className:"text-right"
    },
    {
      label:"Saldo",
      value:"saldo_string2",
      className:"text-right"
    },
    {
      label:"Acciones",
      value:"events",
      icons:[
              {
                label:"Detalle movimiento",
                icon: <i className = "icon-ver-normal text-primary mr-1"/>,
                NavLink:NavLink,
                url:'/Transferir/VerTransferencia/'+params.id_billetera+"/",
                url2:'/Movimientos/NegociacionDivisas/'+params.id_billetera+"/",
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
    if (response.data!==undefined) {
      setData(response.data)
    }
  }

  return  <div className="Contenido-Home">
            <div className="row">
              <div className="col-10">
                <div className="title-home mb-4">Mis movimientos</div>
              </div>
              <div className="col-2 text-end">
                <div className="btn btn-primary" onClick={history.goBack}> Volver </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 listados">
                <div className="card">
                  <div className="card-header pb-0">
                    <div className="row border-bottom-rosa-x3">
                      <div  className="col-12 col-md-8 text-title text-rosa cursor-pointer  pb-2 pl-5">
                        <i className="icon-billetera-movil ml-4"></i>
                        {data.tipo} {data.tipo_moneda!==undefined?"("+data.tipo_moneda+")":false} {data.nro_cuenta}
                      </div>
                      <div className="col text-right text-white">
                        <div className="row text-bold">
                          <div className="col-12 col-md-6 text-right pt-0" >
                            Saldo disponible
                          </div>
                          <div className="col text-rosa text-left x3">
                            {data.saldo_string}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <Table
                      td={tds}
                      modelo="Movimientos"
                      metodo="getMovimientosBilletera"
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
