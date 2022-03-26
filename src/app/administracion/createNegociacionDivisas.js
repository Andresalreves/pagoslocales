import React,{useState,useEffect} from 'react';
import Header from '../../components/header_forms';
import Moneda from '../../components/selector_moneda';
import Departamento from '../../components/selector_departamento';
import { NavLink,useHistory } from "react-router-dom";
import Store from "../../helpers/Store";
import Functions from "../../helpers/Functions";
import Config from "../../helpers/Config";
import Select from '../../screens/select';
import StateContext from '../../helpers/ContextState'
import queryString from 'query-string';
import NumberFormat from 'react-number-format';
const queryStringParams = queryString.parse(window.location.search);

const test          = false
const totalCalculo_   = 0


const App=()=>{
  let history   = useHistory();
  const context = React.useContext(StateContext);
  const [autocompletedata, setAutoCompleteData] = useState({});
  const [data, setData] = useState(false);
  const [data2, setData2] = useState(false);
  const [inputs, setInputs] = useState({concepto:1,nro_cambiario:1});
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [totalCalculo, setTotalCalculo] = useState(0);
  const [current, setCurrent] = useState(0);
  const [celular, setCelular] = useState("");
  const [valorUsd2, setValorUsd2] = useState(0);
  const [vista, setVista] = useState(false);
  const [resetMonto, setResetMonto] = useState(false);
  const [comision_usd, setComision_USD] = useState(0);

  //const [reset, setReset] = useState(false);


  useEffect(() => {
    if (resetMonto) {
      setResetMonto(false)
    }
  },[resetMonto])


  useEffect(() => {
    if (vista) {
      setVista(true)
    }
  },[vista])

  useEffect(() => {
    setVista(false)
  },[current])


  useEffect(() => {
    if (queryStringParams.id===undefined) {
      setMostrarFormulario(true)
    }else {
      setInputs({funcionario_id:queryStringParams.id})
      setMostrarFormulario(false)
    }
    getInit()
  },[queryStringParams.id])

  const getInit=()=>{
    if (queryStringParams.id!==undefined) {
      Functions.PostAsync("Administracion","getFuncionario",{id:queryStringParams.id},{},{name:"callbackContinue2",funct:callbackContinue2})
    }
    Functions.PostAsync("Maestros","get_tablas_maestras",{},{},{name:"callbackContinue",funct:callbackContinue})
    Functions.PostAsync("Administracion","get_system",{},{},{name:"callbackSystem",funct:callbackSystem})
  }

  const callbackSystem=(response)=>{
    let inputs_ = {...inputs}
        inputs_.comision_usd=response.data.comision_usd
        inputs_.comision_administrativa=response.data.comision_administrativa
        inputs_.comision_iva_administrativa=response.data.comision_iva_administrativa
        inputs_.comision_giro_recibido=response.data.comision_dd
        inputs_.comision_iva_giro_recibido=response.data.comision_iva_giro_recibido
        setInputs(inputs_)
  }

  const callbackContinue=(response)=>{
    setData(response)
    setMostrarFormulario(true);
  }

  useEffect(() => {
    if (valorUsd2===0 && inputs.valor_usd!==undefined && parseFloat(inputs.valor_usd)>0) {
      setValorUsd2(inputs.valor_usd)
    }
  },[inputs.valor_usd])

  useEffect(() => {
    context.socketIo.connect()
  },[])

  useEffect(() => {
    if (data2) {
      setMostrarFormulario(true)
    }
  },[data2])

  const callbackContinue2=(response)=>{
    let inputs_ = {...inputs}
        Object.entries(response.data).map((row,key)=>{
          return inputs_[row[0]]  = row[1]
        })
    setInputs(inputs_)
    setData2(response.data)
  }

  const onChange=(e)=>{
    Functions.Inputs(e,inputs, setInputs)
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
                  <div className="w-100 text-center mt-4 mb-1">
                    <button type="button" className="btn btn-primary mr-2" onClick={()=>onSubmit2(e)}>Abonar</button>
                    <button type="button" className="btn btn-gray" onClick={()=>context.setModalShow({show:false})}>Cancelar</button>
                  </div>
                </div></>,
      size:""
    })
  }

  const onSubmit=(e)=>{
    e.preventDefault();
    if(parseFloat(inputs.total_abonar)<=0 || inputs.total_abonar==='') {
      return context.setModalShow({
        show:true,
        message:<>
        <div className="m-auto text-center">
          <i className="icon-configuracion icon-mesage"></i>
          <h6 className="mt-2"><b>Atención</b></h6>
          <div className="text-center ml-auto mr-auto w-50 mt-2">
           No se puede negociar divisas en saldo negativo
          </div>
          <div className="w-100 text-center mt-4 mb-4" onClick={()=>context.setModalShow({show:false})}>
            <button type="button" className="btn btn-primary">Continuar</button>
          </div>
        </div></>,
        size:""
      })
    }
    if(inputs.valor_usd<=0 || inputs.valor_usd==='') {
      context.setModalShow({
        show:true,
        message:<>
        <div className="m-auto text-center">
          <i className="icon-configuracion icon-mesage"></i>
          <h6 className="mt-2"><b>Atención</b></h6>
          <div className="text-center ml-auto mr-auto w-50 mt-2">
           No se puede negociar divisas en saldo 0.00
          </div>
          <div className="w-100 text-center mt-4 mb-4" onClick={()=>context.setModalShow({show:false})}>
            <button type="button" className="btn btn-primary">Continuar</button>
          </div>
        </div></>,
        size:""
      })
    }else if(inputs.comision_usd===undefined || inputs.comision_usd<=0 || inputs.comision_usd==='') {
      context.setModalShow({
        show:true,
        message:<>
        <div className="m-auto text-center">
          <i className="icon-configuracion icon-mesage"></i>
          <h6 className="mt-2"><b>Atención</b></h6>
          <div className="text-center ml-auto mr-auto w-50 mt-2">
           No se puede negociar divisas en sin comisión determinada
          </div>
          <div className="w-100 text-center mt-4 mb-4" onClick={()=>context.setModalShow({show:false})}>
            <button type="button" className="btn btn-primary">Continuar</button>
          </div>
        </div></>,
        size:""
      })
    }else if(inputs.tasa===undefined || inputs.tasa<=0 || inputs.tasa==='') {
      context.setModalShow({
        show:true,
        message:<>
        <div className="m-auto text-center">
          <i className="icon-configuracion icon-mesage"></i>
          <h6 className="mt-2"><b>Atención</b></h6>
          <div className="text-center ml-auto mr-auto w-50 mt-2">
           No se puede negociar divisas sin tasa determinada
          </div>
          <div className="w-100 text-center mt-4 mb-4" onClick={()=>context.setModalShow({show:false})}>
            <button type="button" className="btn btn-primary">Continuar</button>
          </div>
        </div></>,
        size:""
      })
    }else if (inputs.valor_usd>0 && inputs.tasa>0 && inputs.comision_usd>0) {
      confirm(e)
    }
  }

  const onSubmit2=(e)=>{
    setDisabled(true)
    e.preventDefault()
    let send        = {...inputs}
        send.token  = Store.get("user").token
    Functions.PostAsync("Administracion","setNegociacion",send,{},{name:"callbackSubmit",funct:callbackSubmit});
  }

  const callbackSubmit=(response)=>{
    if (response.message!==undefined) {
      context.socketIo.emit('actualizar_notificacion');
      context.setModalShow({
        show:true,
        message:<>
        <div className="m-auto text-center">
          <i className="icon-configuracion icon-mesage"></i>
          <h6 className="mt-2"><b>Atención</b></h6>
          <div className="text-center ml-auto mr-auto w-50 mt-2">
           {response.message.label}
          </div>
          <div className="w-100 text-center mt-4 mb-4" onClick={()=>context.setModalShow({show:false})}>
            <button type="button" className="btn btn-primary">Continuar</button>
          </div>
        </div></>,
        size:""
      })
      history.push('/Administracion/NegociarDivisas')
    }
  }

  const SearchUser=(e)=>{
    let val = e.target.value.replace(/[^0-9]/g,'');
    if(val.length>9){
      setCelular(val)
      Functions.PostAsync("Administracion","getClienteAutocomplete",{celular:val,current:current},{},{name:"callbackAutoComplete",funct:callbackAutoComplete})
    }else{
      setCelular("")
      setAutoCompleteData({});
    }
    e.target.value = val;
  }

  useEffect(() => {
    let tasa    = inputs.tasa?inputs.tasa:1
    let inputs_ = {...inputs}
        inputs_.comision_usd_dos  =   (parseFloat(inputs.valor_usd) - parseFloat(inputs.comision_usd))
        inputs_.total_abonar      =   (parseFloat(inputs.valor_usd) - parseFloat(inputs.comision_usd)) * tasa
        let totalCalculo_         =   parseFloat(inputs.comision_administrativa)+
                                      parseFloat(inputs.comision_iva_administrativa)+
                                      parseFloat(inputs.comision_giro_recibido)+
                                      parseFloat(inputs.comision_iva_giro_recibido)

        /*OJO AQUÍ*/
        setTotalCalculo(inputs_.total_abonar-totalCalculo_)
        setInputs(inputs_)
  },[inputs.valor_usd,inputs.comision_usd,inputs.tasa])


  const callbackAutoComplete=(response)=>{
    setComision_USD(response.system.comision_USD)
    let inputs_ = {...inputs}
        inputs_.comision_usd                = response.system.comision_USD
        inputs_.comision_administrativa     = response.system.comision_administrativa
        inputs_.comision_iva_administrativa = response.system.comision_iva_administrativa
        inputs_.comision_giro_recibido      = response.system.comision_dd
        inputs_.comision_iva_giro_recibido  = response.system.comision_iva_giro_recibido
        setInputs(inputs_)
    if (response.data!==undefined) {
      if (parseFloat(response.data.saldo)>0) {
        setVista(true)
      }else {
        setVista(false)
      }
      let add_saldo = {...inputs}
          add_saldo['valor_usd']      =   parseFloat(response.data.saldo)
          add_saldo['nro_cuenta']     =   response.data.nro_cuenta
          add_saldo['cliente']        =   response.data.usuario_id
          add_saldo.comision_usd_dos  =   parseFloat(add_saldo.valor_usd) - parseFloat(response.system.comision_USD)
          add_saldo['comision_usd']   =   response.system.comision_USD

          if (response.system && response.system.comision_USD) {
            add_saldo['comision_giro_recibido']         =   response.system.comision_dd
            add_saldo['comision_iva_administrativa']    =   response.system.comision_iva_administrativa
            add_saldo['comision_administrativa']        =   response.system.comision_administrativa
            add_saldo['comision_iva_giro_recibido']     =   response.system.comision_iva_giro_recibido

          }

          setInputs(add_saldo)
      setAutoCompleteData(response.data)
    }else{
      setAutoCompleteData({});
      setVista(false)
    }
  }




  const seleccionMoneda=(input)=>{
    setCurrent(input.moneda)
    if (celular!=='') {
      setValorUsd2(0)
      setAutoCompleteData({});
      Functions.PostAsync("Administracion","getClienteAutocomplete",{celular:celular,current:input.moneda},{},{name:"callbackAutoComplete",funct:callbackAutoComplete})
    }

  }



  return  <>{mostrarFormulario?<div className="Contenido-Home">
              <div className="title-home mb-4">Crear negociación de divisa</div>
                <div className="row justify-content-center">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-content">
                        <div className="card-body">
                          <form onSubmit={onSubmit}>
                            <div className="p-sm-5">
                              <Header title="Crear nueva negociación"
                                      subtitle="Llenar el siguiente formulario"
                                      classIcon="icon-detalles-operacion ico-generico"
                                      />
                              <div className="border"></div>
                              <div className="row mb-2 mt-4 mb-4">
                                <div className="col text-rosa">
                                  <Moneda opciones={(data.ma_monedas!==undefined)?data:[]}
                                          setInputs={seleccionMoneda}
                                          name="moneda"
                                          setCurrent={setCurrent}/>
                                </div>
                              </div>


                                <div className="row mb-0">
                                  <div className="col-12 col-md-6 mb-2">
                                    <input  className="form-control"
                                            type="text"
                                            name="celular"
                                            required={true}
                                            onChange={SearchUser}
                                            placeholder="Celular"
                                            required="required"
                                    />
                                  </div>
                                  <div className="col-12 col-md-6">
                                    <input  className="form-control"
                                            type="text"
                                            name="cliente"
                                            required={true}
                                            readOnly={true}
                                            value={autocompletedata.cliente!==undefined?autocompletedata.cliente:''}
                                            placeholder="Cliente"
                                            onChange={onChange}
                                            required="required"
                                    />
                                  </div>
                                </div>
                                {vista?<>
                                  <div className="row mb-2">
                                    <div className="col-12 col-md-6 mb-2">

                                      <div className="simula_input text-right">

                                        {(valorUsd2!==undefined)?Functions.format(valorUsd2):"0.00"}
                                      </div>

                                    </div>
                                    <div className="col-12 col-md-6">
                                      {!resetMonto?<>

                                        <NumberFormat decimalScale={2}
                                          value={inputs.valor_usd!==undefined?inputs.valor_usd:''}
                                          required='required'
                                          className="form-control text-right"
                                          name="valor_usd"
                                          id="valor_usd"
                                          placeholder="Valor usd"
                                          displayType={'input'}
                                          thousandSeparator=','
                                          decimalSeparator='.'
                                          onValueChange={(values) => {
                                            const { formattedValue, value } = values;
                                            let valor = value;

                                            if(autocompletedata.saldo!==undefined) {
                                              let limit = parseInt(autocompletedata.saldo);
                                              if (value>limit) {
                                                document.getElementById('valor_usd').value=""
                                                context.setModalShow({
                                                  show:true,
                                                  message:<>
                                                  <div className="m-auto text-center">
                                                    <i className="icon-configuracion icon-mesage"></i>
                                                    <h6 className="mt-2"><b>Atención</b></h6>
                                                    <div className="text-center ml-auto mr-auto w-50 mt-2">
                                                      El monto supera los {autocompletedata.saldo_string} USD de tu billetera, para poder continuar la operación debes modificar el monto actual.
                                                    </div>
                                                    <div className="w-100 text-center mt-4 mb-4" onClick={()=>context.setModalShow({show:false})}>
                                                      <button type="button" className="btn btn-primary">Reintentar</button>
                                                    </div>
                                                  </div></>,
                                                  size:""
                                                })
                                                valor = '';
                                                let inputs_ = {...inputs}
                                                    inputs_['valor_usd']    =   valorUsd2
                                                    setInputs(inputs_)
                                                    setResetMonto(true)
                                              }else {
                                                let inputs_               = {...inputs}
                                                    inputs_['valor_usd']  = valor
                                                    setInputs(inputs_)
                                                let comision = {...inputs}
                                                    comision['valor_usd']  = parseFloat(value)
                                              }
                                            }


                                          }}
                                          renderText={(value, props) => <div {...props}>{value}</div>}
                                        />
                                        </>:false}

                                    </div>
                                    <div className="col-12 col-md-6 mt-0">
                                      {inputs.comision_usd!==undefined?<NumberFormat decimalScale={2}
                                        defaultValue={inputs.comision_usd}
                                        className="form-control text-right"
                                        name="comision_usd"
                                        placeholder="Comisión USD"
                                        displayType={'input'}
                                        thousandSeparator=','
                                        decimalSeparator='.'
                                        onValueChange={(values) => {
                                          const { formattedValue, value } = values;
                                          let comision = {...inputs}
                                              comision['comision_usd']  = parseFloat(value)
                                              setInputs(comision)
                                        }}
                                        renderText={(value, props) => <div {...props}>{value}</div>}
                                      />:false}

                                    </div>
                                    <div className="col-12 col-md-6 mt-0">
                                      <div className="simula_input text-right">
                                        {Functions.format(inputs.comision_usd_dos)}
                                      </div>
                                    </div>

                                      <div className="col-12 col-md-6 mt-2">
                                        <NumberFormat decimalScale={2}
                                          defaultValue={inputs.tasa}
                                          className="form-control text-right"
                                          name="tasa"
                                          placeholder="Tasa"
                                          displayType={'input'}
                                          thousandSeparator=','
                                          decimalSeparator='.'
                                          onValueChange={(values) => {
                                            const { formattedValue, value } = values;
                                            let inputs_ = {...inputs}
                                                inputs_['tasa']  = value
                                                setInputs(inputs_)
                                          }}
                                          renderText={(value, props) => <div {...props}>{value}</div>}
                                        />
                                      </div>
                                      <div className="col-12 col-md-6 mt-2">
                                      <NumberFormat decimalScale={2}
                                          required='required'
                                          disabled
                                          value={inputs.total_abonar!==undefined?inputs.total_abonar:''}
                                          className="form-control text-right"
                                          name="total_abonar"
                                          placeholder="Total abonar COP"
                                          displayType={'input'}
                                          thousandSeparator=','
                                          decimalSeparator='.'
                                          onValueChange={(values) => {
                                            const { formattedValue, value } = values;
                                            let inputs_ = {...inputs}
                                                inputs_['total_abonar']  = value
                                                setInputs(inputs_)
                                          }}
                                          renderText={(value, props) => <div {...props}>{value}</div>}
                                        />
                                      </div>
                                      {inputs.comision_administrativa!==undefined?<div className="col-12 col-md-6 mt-2">
                                        <NumberFormat decimalScale={2}
                                          defaultValue={inputs.comision_administrativa}
                                          required='required'
                                          disabled
                                          className="form-control text-right d-none"
                                          name="comision_administrativa"
                                          placeholder="Comision administrativa"
                                          displayType={'input'}
                                          thousandSeparator=','
                                          decimalSeparator='.'
                                          onValueChange={(values) => {
                                            const { formattedValue, value } = values;
                                            let inputs_ = {...inputs}
                                                inputs_['comision_administrativa']  = value
                                                setInputs(inputs_)
                                          }}
                                          renderText={(value, props) => <div {...props}>{value}</div>}
                                        />
                                        <div className="simula_input text-right">
                                          {Functions.format(inputs.comision_administrativa)}
                                        </div>
                                      </div>:false}


                                      {inputs.comision_iva_administrativa!==undefined?<div className="col-12 col-md-6 mt-2">
                                        <NumberFormat decimalScale={2}
                                          defaultValue={inputs.comision_iva_administrativa}
                                          disabled
                                          required='required'
                                          className="form-control text-right d-none"
                                          name="comision_iva_administrativa"
                                          placeholder="IVA Comision administrativa"
                                          displayType={'input'}
                                          thousandSeparator=','
                                          decimalSeparator='.'
                                          onValueChange={(values) => {
                                            const { formattedValue, value } = values;
                                            let inputs_ = {...inputs}
                                                inputs_['comision_iva_administrativa']  = value
                                                setInputs(inputs_)
                                          }}
                                          renderText={(value, props) => <div {...props}>{value}</div>}
                                        />
                                        <div className="simula_input text-right">
                                          {Functions.format(inputs.comision_iva_administrativa)}
                                        </div>
                                      </div>:false}


                                      {inputs.comision_giro_recibido!==undefined?<div className="col-12 col-md-6 mt-2">
                                        <NumberFormat decimalScale={2}
                                          defaultValue={inputs.comision_giro_recibido}
                                          required='required'
                                          disabled
                                          className="form-control text-right d-none"
                                          name="comision_giro_recibido"
                                          placeholder="Comision giro recibido"
                                          displayType={'input'}
                                          thousandSeparator=','
                                          decimalSeparator='.'
                                          onValueChange={(values) => {
                                            const { formattedValue, value } = values;
                                            let inputs_ = {...inputs}
                                                inputs_['comision_giro_recibido']  = value
                                                setInputs(inputs_)
                                          }}
                                          renderText={(value, props) => <div {...props}>{value}</div>}
                                        />
                                        <div className="simula_input text-right">
                                          {Functions.format(inputs.comision_giro_recibido)}
                                        </div>
                                      </div>:false}


                                      {inputs.comision_iva_giro_recibido!==undefined?<><div className="col-12 col-md-6 mt-2">
                                        <NumberFormat decimalScale={2}
                                          defaultValue={inputs.comision_iva_giro_recibido}
                                          disabled
                                          required='required'
                                          className="form-control text-right d-none"
                                          name="comision_iva_giro_recibido"
                                          placeholder="IVA Comision Giro recibido"
                                          displayType={'input'}
                                          thousandSeparator=','
                                          decimalSeparator='.'
                                          onValueChange={(values) => {
                                            const { formattedValue, value } = values;
                                            let inputs_ = {...inputs}
                                                inputs_['comision_iva_giro_recibido']  = value
                                                setInputs(inputs_)
                                          }}
                                          renderText={(value, props) => <div {...props}>{value}</div>}
                                        />
                                        <div className="simula_input text-right">
                                          {Functions.format(inputs.comision_iva_giro_recibido)}
                                        </div>
                                      </div>

                                      </>:false}
                                      <div className="col-12 col-md-6 mt-2 text-right pt-2">Total</div>

                                        {totalCalculo>0?<div className="col-12 col-md-6 mt-2">
                                          <div className="simula_input text-right">{Functions.format(totalCalculo)}</div>
                                        </div>:false}



                                  </div>
                                </>:false}

                                {vista?<>
                                  <div className="row mb-2">
                                    {data.ma_concepto!==undefined?<div className="col-12 col-md-6 ">
                                        <Select
                                          required={true}
                                          data={(data.ma_concepto!==undefined?data.ma_concepto:[])}
                                          name="concepto"
                                          defaultValue={inputs.concepto}
                                          selectDefault="Concepto"
                                          onChange={onChange}
                                        />
                                      </div>:false
                                    }
                                    {data.ma_concepto!==undefined?<div className="col-12 col-md-6">
                                        <Select
                                          required={true}
                                          data={(data.ma_numero_cambiario!==undefined?data.ma_numero_cambiario:[])}
                                          name="nro_cambiario"
                                          defaultValue={inputs.nro_cambiario}
                                          selectDefault="Número cambiario"
                                          onChange={onChange}
                                        />
                                      </div>:false
                                    }
                                  </div>



                                <div className="row text-center mt-4 justify-content-center">
                                  <div className="col-12 col-sm-6">
                                    {!disabled?<><button type="submit" className={"btn btn-primary mb-3 mr-1"} >
                                      Guardar
                                    </button><NavLink to="/Administracion/NegociarDivisas" className="btn btn-gray text-white mb-3">Cancelar</NavLink></>:<>Por favor espere</>}
                                  </div>
                                </div>
                                </>:false}



                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
          </div>:false}

        </>
}
export default App
