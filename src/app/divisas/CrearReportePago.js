import React,{useState,useEffect} from 'react';
import { NavLink,useHistory, useParams } from "react-router-dom";
import Functions from "../../helpers/Functions";
import Store from "../../helpers/Store";
import Table from "../../screens/table";
import Header from "../../components/header_forms_andres";
import StateContext from '../../helpers/ContextState';
import Select from '../../screens/selectCustom';
import NumberFormat from 'react-number-format';



const App=()=>{
  let history = useHistory();
  const parametros=useParams()
  const context = React.useContext(StateContext);
  const [tipo_pagador, setTipoPagador] = useState([]);
  const [info, setInfo] = useState(false);
  const [inputs, setInputs] = useState({});
  const [data, setData] = useState([]);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    if (parametros.id!==undefined) {
      setReset(true)
      getInit2()
    }else {
      getInit()
    }
  },[])

  function getInit2(){
    let data  = {id:parametros.id}
    Functions.PostAsync("Divisas","getReporte",data,{},{name:"callbackGetInit2",funct:callbackGetInit2})
  }

  function callbackGetInit2(data){
    setInputs(data.data)
    getInit()
  }

  function getInit(){
      let data        = {}
      Functions.PostAsync("Divisas","GetPagadoresinscritos",data,context,{name:"callbackGetInit",funct:callbackGetInit})
  }

  function callbackGetInit(response){
    setData(response.data);
    setReset(false)
  }
  const onSubmit=(e)=>{
      e.preventDefault();
      let send={...inputs}
          send.token  = Store.get("user").token
      Functions.PostAsync("Divisas","setReportepago",send,{},{name:"callbackSubmit",funct:callbackSubmit});
  }
  function callbackSubmit(response){
    if (response.confirmation!==undefined && response.confirmation===true && response.data!==undefined) {
      return history.push("/Divisas/VerificarDatosReporte/"+response.data.id);
    }
  }
  const onChange=(e)=>{
      Functions.Inputs(e,inputs, setInputs)
  }

  return  <div className="Contenido-Home">
            <div className="row">
              <div className="col-md-6">
                <div className="title-home mb-4">Crear reporte de pago</div>
              </div>
              <div className="col-12 col-md-6 text-center text-md-right">
                <NavLink className="btn btn-primary" to="/Divisas/CrearReporteMasivo">
                  <i className="icon-agregar mr-1"/>Crear reportes Masivamente
                </NavLink>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-7 m-auto">
                <div className="card border-card">
                  <div className="card-body">
                      <div className="col-md-8 ml-auto mr-auto mt-3">
                        <Header title="Nuevo reporte" subtitle="Reporte de pago" classIcon="icon-nuevo-reporte ico-generico"/>
                        <form onSubmit={onSubmit} className="mt-4">
                          {!reset && (inputs.pagador!==undefined || parametros.id===undefined)?<Select
                            id="pagador"
                            required={true}
                            value={inputs.pagador!==undefined?inputs.pagador.token:""}
                            data={data}
                            name="pagador"
                            selectDefault="Pagador"
                            onChange ={onChange}
                          />:false}

                          {!reset?<NumberFormat
                            defaultValue={inputs.valor}
                            required='required'
                            className="form-control"
                            name="valor"
                            placeholder="Valor"
                            displayType={'input'}
                            thousandSeparator=','
                            decimalSeparator='.'
                            onValueChange={(values) => {
                              const { formattedValue, value } = values;
                              let inputs_ = {...inputs}
                                  inputs_['valor']  = value
                                  setInputs(inputs_)
                            }}

                            renderText={(value, props) => <div {...props}>{value}</div>}
                          />:false}
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary mb-3 mt-3 mr-3">
                                    Siguiente
                                </button>
                                <NavLink to="/Divisas/ReportarPago" className="btn btn-gray text-white">Cancelar</NavLink>
                            </div>
                        </form>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
}
export default App
