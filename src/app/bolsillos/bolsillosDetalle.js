import React,{useState,useEffect} from 'react';
import { NavLink, useParams } from "react-router-dom";
import Table from "../../screens/table_bolsillo_detalles";
import Functions from '../../helpers/Functions';
//import parse from 'html-react-parser';

const App=()=>{
  const params          =   useParams();
  const [filter, setFilter] = useState({estatus:2});
  const [data, setData] = useState(false);

  let tds       =   [
    {
      label:"Fecha",
      value:"fecha_solicitud_string",
      className:"text-center"
    },
    {
      label:"Descripción",
      value:"concepto",
    },
    {
      label:"Valor",
      value:"saldo",
      className:"text-right"
    },
    {
      label:"Moneda",
      value:"tipo_moneda",
      className:"text-center"
    },
    {
      label:"Saldo",
      value:"saldo_string",
      className:"text-right"
    },
    {
      label:"Acciones",
      value:"events",
      icons:[
              {
                label:"Ver movimiento",
                icon: <i className = "icon-ver-normal mr-1"/>,
                NavLink:NavLink,
                url:'/Bolsillos/Detalle/'+params.id+'/Movimiento/',
              },
            ]
    },
  ]

  const getInit=()=>{
    let data_                  =   {}
        data_.bolsillo_id      =   params.id
    Functions.PostAsync("Bolsillo","getMovimientos",data_,{},{name:"callbackContinue",funct:callbackContinue})
  }

  const callbackContinue=(response)=>{

    if (response.data!==undefined) {
      setData(response.data.bolsillo)
    }
  }

  useEffect(() => {
    getInit()
  },[])

  return  <div className="Contenido-Home">
            <div className="row">
              <div className="col-12 col-md-12">
                <div className="title-home mb-4">Mis movimientos de bolsillo</div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 listados">
                <div className="card">
                  <div className="card-header pb-0">
                    <div className="row">
                      <div  className="col text-title text-rosa cursor-pointer border-bottom-rosa-x3 pb-2 pl-5">
                        <i className="icon-lista-divisas ml-4"></i> {data.nombre_bolsillo}
                      </div>
                      <div  className="col text-right text-rosa text-white x3">
                        <b>$ {data&&data.saldo_string!==undefined?data.saldo_string:false}</b>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <Table
                      td={tds}
                      modelo="Bolsillo"
                      metodo="getMovimientos"
                      limit="8"
                      filter={params.id}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
}
export default App
