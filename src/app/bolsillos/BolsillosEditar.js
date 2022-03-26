import React,{useState,useEffect} from 'react';
import Bolsillo from '../../components/bolsillos';
import BolsilloEmpty from '../../components/bolsillosEmpty';
import BolsilloCreate from '../../components/bolsillosCreate';
import { NavLink , useParams } from "react-router-dom";
import Store from "../../helpers/Store";
import Functions from "../../helpers/Functions";
import Config from "../../helpers/Config";
import Select from '../../screens/select';
import StateContext from '../../helpers/ContextState'
import NumberFormat from 'react-number-format';

const test  = true

const App=()=>{
  let parametros = useParams();
  const context = React.useContext(StateContext);
  const [data, setData] = useState(false);
  const [dataBolsillo, setDataBolsillo] = useState(false);
  const [inputs, setInputs] = useState(false);
  const [info, setInfo] = useState(false);
  const [active, setActive] = useState(false);
  const [botonActivo, setBotonActivo] = useState(false);

  useEffect(() => {
    if (parametros.id!==undefined) {
      getInit2()
    }else {
      getInit()
    }
  },[])

  function getInit2(){
    let data  = {id:parametros.id}
    Functions.PostAsync("Bolsillo","GetBolsillo",data,context,{name:"callbackGetInit2",funct:callbackGetInit2})
  }

  function callbackGetInit2(data){
    if (data.data!==undefined && data.data.bolsillo_id) {
      setInfo(data.data);
      setInputs(data.data)
      getInit()
    }
  }

  const getInit=()=>{
    let send    = {token:Store.get("user").token}
    Functions.PostAsync("Maestros","get_tablas_maestras",send,context,{name:"callbackContinue",funct:callbackContinue})
  }

  const callbackContinue=(response)=>{
    setData(response)
    let send    = {token:Store.get("user").token}
    Functions.PostAsync("Bolsillo","GetMisBolsillos",send,context,{name:"callbackContinue2",funct:callbackContinue2})
  }

  const callbackContinue2=(response)=>{
    setDataBolsillo(response.data)
  }

  const onChange=(e)=>{
    Functions.Inputs(e,inputs, setInputs)
    if (e.target.name==="proposito") {
      setActive(e.target.value)
    }
    if (  (inputs.nombre_bolsillo!==undefined && inputs.nombre_bolsillo!=='') &&
          (inputs.meta_bolsillo!==undefined && inputs.meta_bolsillo!=='') &&
          (inputs.proposito!==undefined && inputs.proposito!=='') ) {
      setBotonActivo(true)
    }else {
      setBotonActivo(false)
    }
  }

  const proposito=(row)=>{
    let inputs_           = {...inputs}
        inputs_.proposito = row.value
        setInputs(inputs_);
        setActive(row.label)
    if (  (inputs_.nombre_bolsillo!==undefined && inputs_.nombre_bolsillo!=='') &&
          (inputs_.meta_bolsillo!==undefined && inputs_.meta_bolsillo!=='') &&
          (inputs_.proposito!==undefined && inputs_.proposito!=='') ) {
      setBotonActivo(true)
    }else {
      setBotonActivo(false)
    }
  }

  const onSubmit=(e)=>{
    e.preventDefault()
    let send        = {...inputs}
        send.token  = Store.get("user").token
    Functions.PostAsync("Bolsillo","setBolsillo",send,context,{name:"callbackContinue3",funct:callbackContinue3})
  }

  const callbackContinue3=(response)=>{
    console.log(response);
    if(response.error!==undefined){
      context.setModalShow({
        show:true,
        message:<div className="text-center ">
                  <div>{response.error.label}</div>
                  <div onClick={()=>{context.setModalShow({show:false,}) }} className="btn btn-primary text-white mb-3 mt-3">Reintentar</div>
                </div>,
        size:""
      })
    }else{
      context.setModalShow({
        show:true,
        message:<div className="text-center  m-auto">
                  {response.message.label}
                  <div><a href={Config.ConfigAppUrl+"bolsillos"} className="btn btn-primary text-white mb-3 mt-3">Continuar</a></div>
                </div>,
        size:""
      })
      setTimeout(function(){document.location.href  =  Config.ConfigAppUrl+"bolsillos" }, 3000);
    }
  }


  return  <div className="Contenido-Home">
            <div className="title-home mb-4">Editar mi bolsillo</div>
            <div className="row justify-content-center">
              <div className="col-12 col-md-8">
                <div className="card">
                  <div className="card-content">
                    <div className="card-body">
                      <form onSubmit={onSubmit}>
                        <div className="p-md-6">
                          <div className="row  ">
                            <div className="col-2 text-right d-none d-sm-block">
                              <i className="icon-nuevo-pagador ico-generico" />
                            </div>
                            <div className="col-10 pt-3 p-0 d-none d-sm-block">
                              <div className="title-generico">{inputs.proposito_string}</div>
                              <div className="text-rosa">Disponible {inputs.saldo_string}</div>
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="col">
                              <input  className="form-control"
                                      type="text"
                                      required={true}
                                      defaultValue={inputs.nombre_bolsillo}
                                      name="nombre_bolsillo"
                                      placeholder="Nombre del bolsillo"
                                      onChange={onChange}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              {inputs.meta_bolsillo!==undefined?<NumberFormat
                                defaultValue={inputs.meta_bolsillo!==undefined?inputs.meta_bolsillo:""}
                                required='required'
                                className="form-control"
                                name="meta_bolsillo"
                                placeholder="Meta del bolsillo"
                                displayType={'input'}
                                thousandSeparator=','
                                decimalSeparator='.'
                                onValueChange={(values) => {
                                  const { formattedValue, value } = values;
                                  let comision = {...inputs}
                                      comision['meta_bolsillo']  = parseFloat(value)
                                      setInputs(comision)
                                }}
                                renderText={(value, props) => <div {...props}>{value}</div>}
                              />:false}
                            </div>
                          </div>
                          <div className="row mt-2">
                            <div className="col-12 ">
                              {info.estatus!==undefined?<Select
                                required={true}
                                data={[{label:"Desactivar",value:1,},{label:"Activar",value:2,}]}
                                name="estatus"
                                selectDefault="Estatus"
                                defaultValue={(info.estatus!==undefined)?info.estatus:""}
                                onChange={onChange}
                              />:false}
                            </div>
                          </div>
                          <div className="row text-center mt-4 justify-content-center">
                            <div className="col-12 col-md-8">
                              <button type="submit" className={true?"btn btn-primary mb-3 mr-1 col-12 col-md-4":"btn btn-primary mb-3 mr-1 col-md-4 disabled"} >
                                Guardar
                              </button>
                              <NavLink to={"/Transferir/Transferir/RetirarBolsillo/"+parametros.id} className="btn btn-outline-primary2 mb-3 col-12 col-md-3 mr-1">Retirar</NavLink>
                              <NavLink to={"/Transferir/Transferir/AbonarBolsillo/"+parametros.id} className="btn btn-outline-primary2 mb-3 col-12 col-md-3">Abonar</NavLink>
                            </div>
                          </div>
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
