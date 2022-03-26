import React,{useState,useEffect} from 'react';
import Header from '../../components/header_forms_tipo4';
import { NavLink, useHistory, useParams } from "react-router-dom";
import StateContext from '../../helpers/ContextState';
import Functions from "../../helpers/Functions";
import OptionCard from "../../components/OptionCard";
import Table from "../../screens/table";
import Config from '../../helpers/Config';
import Store from '../../helpers/Store';
import NumberFormat from 'react-number-format';

const test      = true
const opciones  = [ {label:"Listado de funcionarios activos",value:1},
                    {label:"Listado de funcionarios inactivos",value:0}]

let open        = false
const App=()=>{
  const context         = React.useContext(StateContext);
  let parametros = useParams();
  let history = useHistory();
  const [data, setData] = useState({});
  const [inputs, setInputs] = useState({});
  const [equivalencia, setEquivalencia] = useState("");
  const [equivalencia_comision, setEquivalencia_comision] = useState("");
  const [reset, setReset] = useState(false);


  useEffect(() => {
    calcular()
  },[inputs])

  useEffect(() => {
    if (reset) {
      setReset(false)
    }
  },[reset])

  useEffect(() => {
    getInit()
  },[parametros.id])

  const getInit=()=>{
      let data  = {id:parametros.id}
      Functions.PostAsync("Divisas","getReporte",data,{},{name:"callbackGetInit",funct:callbackGetInit})
  }

  const callbackGetInit=(response)=>{
    if (response.data!==undefined && response.data.pagador_id!==undefined) {
      setData(response.data)
      if (response.data.valor!==undefined) {
          setReset(true);
          let inputs_                             = {...inputs}
              inputs_.valor_transferir            = response.data.valor
              inputs_.valor_recibido              = response.data.valor
              inputs_.porcentaje_intermediacion   = response.data.porcentaje.porcentaje_intermediacion
              setInputs(inputs_)
              open=true
      }
    }
  }

  const calcular = ()=>{
    let por_restar=0
    if (data.porcentaje!==undefined && inputs.valor_transferir!==undefined  && !open) {
      por_restar          = parseFloat(data.valor) * parseFloat(data.porcentaje.porcentaje_intermediacion)   / 100
          setEquivalencia(Functions.format(parseFloat(data.valor) - por_restar))
          setEquivalencia_comision(Functions.format(por_restar))
    }else if(open){
      por_restar          = parseFloat(inputs.valor_recibido) * parseFloat(inputs.porcentaje_intermediacion)   / 100
          setEquivalencia(Functions.format(parseFloat(inputs.valor_recibido) - por_restar))
          setEquivalencia_comision(Functions.format(por_restar))
    }
  }

  const confirm=(e)=>{
    e.preventDefault();
    return context.setModalShow({
      show:true,
      message:<>
                <div className="m-auto text-center">
                  <i className="icon-configuracion icon-mesage"></i>
                  <h6 className="mt-2"><b>Atención</b></h6>
                  <div className="text-center ml-auto mr-auto w-50 mt-2">
                    ¿Deseas abonar esta cantidad?
                  </div>
                  <div className="w-100 text-center mt-4 mb-1" >
                    <button type="button" className="btn btn-primary" onClick={()=>onSubmit(e)}>Abonar</button>
                    <button type="button" className="btn btn-gray"  onClick={()=>context.setModalShow({show:false})}>Cancelar</button>
                  </div>
                </div></>,
      size:""
    })
  }

  const onSubmit=(e)=>{
    context.setModalShow({show:false})
    e.preventDefault();
    let send    = {...inputs}
        send.id = parametros.id
        if (inputs.porcentaje_intermediacion===undefined) {
          send.porcentaje_intermediacion  =   data.porcentaje.porcentaje_intermediacion
        }
        if (
              send.valor_recibido!==undefined &&
              parseFloat(send.valor_recibido)>0 &&
              send.valor_transferir!==undefined &&
              parseFloat(send.valor_transferir)>0
            ) {
          Functions.PostAsync("Administracion","setAprobarReportePago",send,{},{name:"callbackSubmit",funct:callbackSubmit})
        }else {
          return context.setModalShow({
            show:true,
            message:<>
                      <div className="m-auto text-center">
                        <i className="icon-configuracion icon-mesage"></i>
                        <h6 className="mt-2"><b>Atención</b></h6>
                        <div className="text-center ml-auto mr-auto w-50 mt-2">
                          No puedes reportar en cero
                        </div>
                        <div className="w-100 text-center mb-4" onClick={()=>context.setModalShow({show:false})}>
                          <button type="button" className="btn btn-gray">Continuar</button>
                        </div>
                      </div></>,
            size:""
          })
        }

  }

  const callbackSubmit=(response)=>{
    context.socketIo.emit('actualizar_notificacion');
    context.socketIo.emit('tableReportarPago');
    history.push("/Administracion/ReportePago");
  }

  return    <div className="Contenido-Home">
                <div className="row">
                  <div className="col-12 col-md-12">
                    <div className="title-home mb-4">Reportes de pagos</div>
                  </div>
                </div>
                <form className="row mt-4" onSubmit={confirm}>
                    <div className="col-sm-8 m-auto">
                        <div className="card border-card">
                            <div className="card-body">
                                <div className="col-md-10 ml-auto mr-auto mt-3">
                                  <Header title="Cantidad reportada"
                                          subtitle={"Cantidad total recibida"}
                                          classIcon="icon-cuenta-bancaria-inactiva ico-generico"
                                          />
                                    <hr/>
                                    <div className="col-md-12 mt-2 pl-0 d-flex">
                                        <div>
                                            <div className="label"><b>Reportado por usuario</b></div>
                                            <div className="label text-gray"><b>{data.valor_string} {data.moneda_string}</b></div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-2 pl-0 d-flex">
                                      {!reset? <NumberFormat
                                        defaultValue={data.valor}
                                        id="valor_transferir_to"
                                        className="form-control"
                                        name="valor_transferir"
                                        placeholder={"Valor a recibido"}
                                        displayType={'input'}
                                        thousandSeparator=','
                                        decimalSeparator='.'
                                        onValueChange={(values) => {
                                          const { formattedValue, value } =   values;
                                          let valor                       =   value;
                                          if (parseFloat(data.valor) < parseFloat(valor) ) {
                                            setReset(true)
                                            return context.setModalShow({
                                              show:true,
                                              message:<>
                                                        <div className="m-auto text-center">
                                                          <i className="icon-configuracion icon-mesage"></i>
                                                          <h6 className="mt-2"><b>Atención</b></h6>
                                                          <div className="text-center ml-auto mr-auto w-50 mt-2">
                                                            Monto supera el valor reportado
                                                          </div>
                                                        </div></>,
                                              size:""
                                            })
                                          }
                                          let inputs_                     =   {...inputs}
                                              inputs_['valor_recibido']   =   valor
                                              setInputs(inputs_)
                                        }}
                                        renderText={(value, props) => <div {...props}>{value}</div>}
                                      />:false}

                                    </div>
                                    <div className="col-md-12 mt-2 pl-0 d-flex">
                                      {data.porcentaje!==undefined?<>
                                          <NumberFormat
                                            defaultValue={data.porcentaje.porcentaje_intermediacion}
                                            className="form-control"
                                            name="porcentaje_intermediacion"
                                            placeholder={"Porcentaje intermediación"}
                                            displayType={'input'}
                                            thousandSeparator=','
                                            decimalSeparator='.'
                                            onValueChange={(values) => {
                                              const { formattedValue, value } = values;
                                              let valor   = value;
                                              let inputs_ = {...inputs}
                                                  inputs_['porcentaje_intermediacion']   = valor
                                                  setInputs(inputs_)
                                            }}
                                            renderText={(value, props) => <div {...props}>{value}</div>}
                                          />
                                        </>:false}
                                    </div>
                                    <div className="col-md-12 mt-2 pl-0  text-right">
                                      {equivalencia_comision!==""?<>
                                        Total comisión <b>{equivalencia_comision} {data.moneda_string}</b>
                                      </>:false}
                                    </div>
                                    <div className="col-md-12 mt-2 pl-0  text-right">
                                      {equivalencia!==""?<>
                                        Total disponible usuario <b>{equivalencia} {data.moneda_string}</b>
                                      </>:false}
                                    </div>
                                    <div className="text-center mt-4">
                                        <button type="submit" className="btn btn-outline-primary2 mb-3 mr-1">Siguiente</button>
                                        <NavLink to="/Administracion/ReportePago" className="btn btn-gray text-white mb-3">Volver</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
}
export default App
