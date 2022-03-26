import React,{useState,useEffect} from 'react';
import Store from "../../helpers/Store";
import { NavLink } from "react-router-dom";
import Functions from "../../helpers/Functions";
import Table from "../../screens/tableVerificarOrdenesNacionales";

import Billetera from '../../components/billetera';
import StateContext from '../../helpers/ContextState'



const MisMovimientos=()=>{
    const [data, setData] = useState([]);

    const context = React.useContext(StateContext);
    const [filter, setFilter] = useState({estatus:1,type:1});

    useEffect(() => {
        getInit()
    },[]);

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
        if(response.data!==undefined){
          setData(response.data)
        }
    }

    let tds       =   [
      {
        label:"Fecha",
        value:"fecha_solicitud",
      },
      {
        label:"Titular",
        value:"titular_cuenta_destino",
      },
      {
        label:"Entidad bancaria",
        value:"entidad_bancaria_string",
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
        label:"Acciones",
        value:"events",
        icons:[
                {
                  label:"Verificar",
                  icon: <i className = "icon-ver-tabla mr-1 text-primary"/>,
                  NavLink:NavLink,
                  url:'/Movimientos/ResumenProducto/',
                }
              ]
      },
    ]

  return  <div className="Contenido-Home">
            <div className="row">
              <div className="col-12 col-md-12">
                <div className="title-home mb-4">Mis productos</div>
              </div>
            </div>
            <div className="row">
                {data.map((row,key)=>{
                    return <Billetera key={key} row={row} className="col-12 col-md-3 mb-3"/>
                })}
            </div>
            <div className="row mt-5">
              <div className="col-12 listados">
                <div className="card">
                  <div className="card-header pb-0">
                    <div className="row">
                      <div  className="col text-title text-rosa cursor-pointer border-bottom-rosa-x3 pb-2 pl-5">
                        <i className="icon-datos-complementarios ml-4"></i> Pagos pendientes en ciclo ACH
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <Table
                      td={tds}
                      modelo="Administracion"
                      metodo="getSolicitudTransferenciasNacionales"
                      limit="8"
                      filter={filter}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
}
export default MisMovimientos
