import React,{useState,useEffect} from 'react';
import { NavLink,useHistory,useParams } from "react-router-dom";
import Functions from "../../helpers/Functions";
import OptionCard from "../../components/OptionCard";
import Select from '../../screens/selectCustom';
import StateContext from '../../helpers/ContextState';
import Store from "../../helpers/Store";
import NumberFormat from 'react-number-format';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

let saldo_disponible2  = 0;
let saldoACH=0
let saldoPagosLocales =0
let saldo_            =0
const App=(props)=>{
  const context         = React.useContext(StateContext);
  let history           = useHistory();
  const parametros      = useParams();
  const [data, setData] = useState(false);
  const [inputs, setInputs] = useState({});
  const [saldo_disponible, setSaldo] = useState(0);
  const [label1, setLabel1] = useState(false);
  const [label2, setLabel2] = useState(false);
  const [reset, setReset] = useState(false);
  const [edit, setEdit] = useState(false);

  const [items, setItems] = useState([]);

  useEffect(() => {
    if (parametros.id!==undefined && data.cuentas_inscritas!==undefined) {
      let items_ = []
      data.cuentas_inscritas.map((row,key)=>{
        if (row.value===inputs.cuenta_destino) {
          setLabel1(row.label)
        }
        return items_.push({id:key,name:row.label})
      })
      setItems(items_);
    }
  },[data.cuentas_inscritas])

  useEffect(() => {
    if (parametros.id!==undefined) {
      setEdit(true)
      getInit2()
      setSaldo(10000000000);
      saldo_disponible2=10000000000
    }else {
      getInit()
    }
    props.setcomision(false)
  },[props.comision])

  useEffect(() => {
    if (parametros.id!==undefined) {
      getInit2()
      setSaldo(10000000000);
      saldo_disponible2=10000000000
    }else {
      getInit()
    }
  },[])

  useEffect(() => {
    if (reset) {
      setReset(false)
    }
  },[reset])


  useEffect(() => {
    if (!reset && parametros.id!==undefined && edit) {
      setReset(true)
      setEdit(false)
    }
  },[inputs.valor_transferir])


  function getInit2(){
    let send={id:parametros.id}
    Functions.PostAsync("Transferir","getTransferencia",send,context,{name:"callbackGetInit2",funct:callbackGetInit2})
  }

  function callbackGetInit2(response){
    getInit()
    if (response.data!==undefined) {
      //setInputs(response.data)
    }
  }

  function getInit(){
      let data  = {bolsillo_id:parametros.bolsillo,accion:Functions.segment(2)}
      Functions.PostAsync("Transferir","getDatosTranseferencias",data,{},{name:"callbackGetInit",funct:callbackGetInit})
  }

  function callbackGetInit(response){
    if (parametros.id!==undefined && Store.get("send_transfer")) {
      setInputs(Store.get("send_transfer"))
    }else if (response.data!==undefined) {
      setInputs(response.data)
    }else {
      Store.set("send_transfer",false)
    }
    
    if (response.data===undefined) {
      return false;
    }
    setData(response.data);
    let inputs_                 =   {...inputs}
    if (parametros.bolsillo!==undefined && Functions.segment(2)==='RetirarBolsillo') {
          inputs_.cuenta_origen   =   parametros.bolsillo
          inputs_.cuenta_destino  =   response.data.cuentas_inscritas[0].value
          setLabel1(response.data.cuentas_inscritas[0].label)
          setLabel2(response.data.billeteras[0].label)
          setInputs(inputs_)
          saldo_disponible2=saldo_=parseFloat(response.data.billeteras[0].saldo)
          setSaldo(saldo_)
    }else if (parametros.bolsillo!==undefined && Functions.segment(2)==='AbonarBolsillo') {
          inputs_.cuenta_origen   =   response.data.cuentas_inscritas[0].value
          inputs_.cuenta_destino  =   parametros.bolsillo
          setInputs(inputs_)
          setLabel1(response.data.billeteras[0].label)
          setLabel2(response.data.cuentas_inscritas[0].label)
          saldo_disponible2=saldo_=parseFloat(response.data.cuentas_inscritas[0].saldo)
          setSaldo(saldo_)
    }else {

      inputs_.cuenta_origen   =   response.data.cuentas_inscritas[0].value


      setInputs(inputs_)
      saldo_disponible2     =     saldo_  =   parseFloat(response.data.cuentas_inscritas[0].saldo)
      setSaldo(saldo_)

      if (response.data.cuentas_inscritas!==undefined) {
        let items_ = []
        response.data.cuentas_inscritas.map((row,key)=>{
          if (row.id!==inputs_.cuenta_origen) {
            return items_.push({id:key,name:row.label})
          }else {
            return false
          }
        })
        setItems(items_);
        if (response.data.cuentas_inscritas[0]!==undefined && response.data.cuentas_inscritas[0].saldo_maximo_transferir_ach!==undefined) {
          saldoACH=parseFloat(response.data.cuentas_inscritas[0].saldo_maximo_transferir_ach)
        }
        if (response.data.cuentas_inscritas[0]!==undefined && response.data.cuentas_inscritas[0].saldo_maximo_transferir_pagos_locales!==undefined) {
          saldoPagosLocales=parseFloat(response.data.cuentas_inscritas[0].saldo_maximo_transferir_pagos_locales)
        }
      }
    }
  }

  const onSubmit=(e)=>{
      e.preventDefault();
      if (inputs.cuenta_origen===undefined || inputs.cuenta_origen==='') {
        return context.setModalShow({
          show:true,
          message:<>
          <div className="m-auto text-center">
            <i className="icon-configuracion icon-mesage"></i>
            <h6 className="mt-2"><b>Atención</b></h6>
            <div className="text-center ml-auto mr-auto w-50 mt-2">
              No se puede hacer una transferencia sin la cuenta de origen
            </div>
            <div className="w-100 text-center mt-4 mb-4" onClick={()=>context.setModalShow({show:false})}>
              <button type="button" className="btn btn-primary">Reintentar</button>
            </div>
          </div></>,
          size:""
        })
      }
      if (inputs.cuenta_destino===undefined || inputs.cuenta_destino==='') {
        return context.setModalShow({
          show:true,
          message:<>
          <div className="m-auto text-center">
            <i className="icon-configuracion icon-mesage"></i>
            <h6 className="mt-2"><b>Atención</b></h6>
            <div className="text-center ml-auto mr-auto w-50 mt-2">
              No se puede hacer una transferencia sin la cuenta de destino
            </div>
            <div className="w-100 text-center mt-4 mb-4" onClick={()=>context.setModalShow({show:false})}>
              <button type="button" className="btn btn-primary">Reintentar</button>
            </div>
          </div></>,
          size:""
        })
      }
      if (inputs.valor_transferir===undefined || inputs.valor_transferir==='0' || inputs.valor_transferir==='' || parseFloat(inputs.valor_transferir)<0) {
        setReset(true)
        return context.setModalShow({
          show:true,
          message:<>
          <div className="m-auto text-center">
            <i className="icon-configuracion icon-mesage"></i>
            <h6 className="mt-2"><b>Atención</b></h6>
            <div className="text-center ml-auto mr-auto w-50 mt-2">
              No se puede hacer una transferencia en valor {inputs.valor_transferir===undefined?'vacío':inputs.valor_transferir}
            </div>
            <div className="w-100 text-center mt-4 mb-4" onClick={()=>context.setModalShow({show:false})}>
              <button type="button" className="btn btn-primary">Reintentar</button>
            </div>
          </div></>,
          size:""
        })
      }
      let send={...inputs}
          send.bolsillo_id  = parametros.bolsillo
          send.accion       = Functions.segment(2)
          Store.set("send_transfer",send);
          if (parametros.id===undefined) {
            Functions.PostAsync("Transferir","setTransferencia",send,{},{name:"callbackSubmit",funct:callbackSubmit})
          }else {
            send.consecutivo=parametros.id;
            Functions.PostAsync("Transferir","editTransferencia",send,{},{name:"callbackSubmit",funct:callbackSubmit})
          }
  }

  const callbackSubmit=(response)=>{
    if(response.data!==undefined && response.data.id!==undefined) {
      history.push("/Transferir/VerificarTransferencia/"+response.data.id);
    }
  }



  const onChange=(e)=>{
    if (e.target.name==='cuenta_origen') {
      let options = e.target.selectedOptions[0];
      if (options.getAttribute("extra")==='BOL') {

      }else if (options.getAttribute("extra")==='CTA') {

      }else if (options.getAttribute("extra")==='BM') {

      }else {
        return false
      }

      saldo_  = parseFloat(options.getAttribute("saldo"))

      if (options.getAttribute("saldo_maximo_transferir_ach")) {
        saldoACH=parseFloat(options.getAttribute("saldo_maximo_transferir_ach"))
      }else {
        saldoACH=parseFloat(options.getAttribute("saldo"))
      }
      if (options.getAttribute("saldo_maximo_transferir_pagos_locales")) {
        saldoPagosLocales=parseFloat(options.getAttribute("saldo_maximo_transferir_pagos_locales"))
      }else {
        saldoPagosLocales=parseFloat(options.getAttribute("saldo"))
      }


      if (data.cuentas_inscritas!==undefined) {
          let items_ = []
          data.cuentas_inscritas.map((row,key)=>{
            if (e.target.value!==row.value) {
              return items_.push({id:key,name:row.label})
            }else {
              return false
            }
          })
          setItems(items_);
      }

    }

    if (e.target.name==='cuenta_destino') {
      //console.log(e.target.name);
      if (e.target.selectedOptions[0].getAttribute("extra")==='PL') {
        saldo_disponible2=saldoPagosLocales
        setSaldo(saldoPagosLocales)
      }else if (e.target.selectedOptions[0].getAttribute("extra")==='CTA') {
        saldo_disponible2=saldoACH
        setSaldo(saldoACH)
      }else {
        saldo_disponible2=saldo_
        setSaldo(saldo_)
      }
    }
    Functions.Inputs(e,inputs,setInputs);

  }

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    //console.log(string, results)
  }

  const handleOnHover = (result) => {
    // the item hovered
    //console.log(result)
  }

  const handleOnSelect = (item) => {
    // the item selected
    let inputs_={...inputs}
        inputs_.cuenta_destino  = data.cuentas_inscritas[item.id].value
        setInputs(inputs_)

    console.log(saldoPagosLocales,saldoACH,saldo_);

    if (data.cuentas_inscritas[item.id].extra==='PL') {
      saldo_disponible2=saldoPagosLocales
      setSaldo(saldoPagosLocales)
    }else if (data.cuentas_inscritas[item.id].extra==='CTA') {
      saldo_disponible2=saldoACH
      setSaldo(saldoACH)
    }else {
      saldo_disponible2=saldo_
      setSaldo(saldo_)
    }
  }

  const handleOnFocus = () => {
    //console.log('Focused')
  }

  const formatResult = (item) => {
    return item;
  }

  return  <div className="Contenido-Home">
            {data.system!==undefined && data.system!==null?<>
              <div className="menu-bottom-transferir d-block d-sm-none">
                <div className="row text-center">
                  <div className="col">
                    <NavLink className="text-white p-2" to="/Transferir/TransferenciasMasivas">
                      Transferencias masivas
                    </NavLink>
                  </div>
                  <div className="col">
                    <NavLink className="text-white" to="/Transferir/createCuentaDestino">
                      Crear cuenta destino
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-3">
                  <div className="title-home mb-4">Transferir</div>
                </div>
                <div className="col-12 col-md-9 text-right  d-none d-sm-block">
                  <NavLink className="linkButtonBancoRosa mr-3" to="/Transferir/TransferenciasMasivas">
                    <i className="icon-agregar mr-1"/>Transferencias masivas
                  </NavLink>
                  <NavLink className="btn btn-primary" to="/Transferir/createCuentaDestino">
                    <i className="icon-agregar mr-1"/>Crear cuenta destino
                  </NavLink>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-12 col-md-7 m-auto">
                  <div className="card border-card">
                    <div className="card-body ">
                        <div className="items-verificacion row justify-content-between m-sm-4">
                          <OptionCard OptionIndicator="1" TextOptionIndicator="Preparación" myclass="optionActive" />
                          <OptionCard OptionIndicator="2" TextOptionIndicator="Verificación"/>
                          <OptionCard OptionIndicator="3" TextOptionIndicator="Confirmación"/>
                        </div>
                        <div className="Advertencia mt-3">
                            <i className="icon-informacion"></i>
                            Monto máximo por operación {(data.system!==undefined && data.system!==null)?data.system.maxima_transferencia_string:""} COP
                        </div>
                        <div className="col-md-8 ml-auto mr-auto mt-3">
                          <form onSubmit={onSubmit}>
                                  {parametros.bolsillo===undefined ?<Select
                                    defaultValue={"billeteras_a74ea199c3087283d0643738288074b75975ec7c89375168e976a0d18dc3c98a8ac3d8d3fe5b5b56e7406f569a7db1ee"}
                                    id="cuenta_origen"
                                    required={true}
                                    value={inputs.cuenta_origen}
                                    data={(data.billeteras!==undefined?data.billeteras:[])}
                                    name="cuenta_origen"
                                    selectDefault="Cuenta origen"
                                    onChange ={onChange}
                                  />:<div className="pt-1 pb-1 pl-2 border mb-2">Origen: <b>{data.billeteras!==undefined?label2:<>Cargando...</>}</b></div>}
                                  {items.length>0 && !label1?<>
                                    <ReactSearchAutocomplete
                                      placeholder="Cuenta destino"
                                      className="form-control"
                                      items={items}
                                      onSearch={handleOnSearch}
                                      onHover={handleOnHover}
                                      onSelect={handleOnSelect}
                                      onFocus={handleOnFocus}
                                      formatResult={formatResult}
                                    />
                                  </>:label1?<div className="pt-1 pb-1 pl-2 border mb-2" onClick={()=>setLabel1(false)}>Destino: <b>{data.cuentas_inscritas!==undefined?label1:<>Cargando...</>}</b></div>:false}
                                  {!reset?<NumberFormat
                                    defaultValue={inputs.valor_transferir}
                                    id="valor_transferir_to"
                                    className="form-control"
                                    name="valor_transferir"
                                    placeholder={saldo_disponible===0?"Valor a transferir":"Valor máximo a transferir de "+Functions.format(saldo_disponible)}
                                    displayType={'input'}
                                    thousandSeparator=','
                                    decimalSeparator='.'
                                    onValueChange={(values) => {
                                      const { value } = values;
                                      let valor = value;
                                      if(data.system!==undefined) {
                                        let limit = parseInt(data.system.maxima_transferencia)
                                        //let elemento = document.getElementById("valor_transferir_to");
                                        if (value>limit) {
                                          setReset(true)
                                          context.setModalShow({
                                            show:true,
                                            message:<>
                                            <div className="m-auto text-center">
                                              <i className="icon-configuracion icon-mesage"></i>
                                              <h6 className="mt-2"><b>Atención</b></h6>
                                              <div className="text-center ml-auto mr-auto w-100 mt-2">
                                                El monto supera los {Functions.format(limit)} COP aceptados por transferencia, para poder continuar la operación debes modificar el monto actual.
                                              </div>
                                              <div className="w-100 text-center mt-4 mb-4" onClick={()=>context.setModalShow({show:false})}>
                                                <button type="button" className="btn btn-primary">Reintentar</button>
                                              </div>
                                            </div></>,
                                            size:""
                                          })
                                          valor = '';
                                        }else if (parseFloat(value)>saldo_disponible2 && inputs.cuenta_destino!==undefined){
                                          console.log(parseFloat(value),saldo_disponible2);
                                          context.setModalShow({
                                            show:true,
                                            message:<>
                                                    <div className="m-auto text-center">
                                                      <i className="icon-configuracion icon-mesage"></i>
                                                      <h6 className="mt-2"><b>Atención</b></h6>
                                                      <div className="text-center ml-auto mr-auto w-100 mt-2">
                                                        <div>
                                                          Monto ({value}) supera tu saldo actual {saldo_disponible2}
                                                        </div>
                                                      </div>
                                                      <div className="w-100 text-center mt-4 mb-4" onClick={()=>{context.setModalShow({show:false}); setReset(true);}}>
                                                        <button type="button" className="btn btn-primary">Reintentar</button>
                                                      </div>
                                                    </div></>,
                                            size:""
                                          })
                                          valor = '';
                                        }else if (value>saldo_disponible2 && inputs.cuenta_destino===undefined){
                                          context.setModalShow({
                                            show:true,
                                            message:<>
                                                    <div className="m-auto text-center">
                                                      <i className="icon-configuracion icon-mesage"></i>
                                                      <h6 className="mt-2"><b>Atención</b></h6>
                                                      <div className="text-center ml-auto mr-auto w-100 mt-2">
                                                        <div>
                                                          No existe cuenta seleccionada o inscrita
                                                        </div>
                                                      </div>
                                                      <div className="w-100 text-center mt-4 mb-4" onClick={()=>{context.setModalShow({show:false}); setReset(true);}}>
                                                        <button type="button" className="btn btn-primary">Reintentar</button>
                                                      </div>
                                                    </div></>,
                                            size:""
                                          })
                                          valor = '';
                                        }
                                      }
                                      let inputs_ = {...inputs}
                                          inputs_['valor_transferir']  = valor
                                          setInputs(inputs_)
                                    }}
                                    //onValueChange={(e)=>onChange(e,value)}
                                    renderText={(value, props) => <div {...props}>{value}</div>}
                                  />:false}

                              <textarea className="form-control mt-2"
                                        value={inputs.observacion}
                                        required='required'
                                        name="observacion"
                                        placeholder="Concepto"
                                        onChange={onChange}
                              ></textarea>
                              <div className="text-center">
                                { (((inputs.cuenta_origen!==undefined && inputs.cuenta_origen!=='') &&
                                (inputs.cuenta_destino!==undefined && inputs.cuenta_destino!=='') &&
                                (inputs.observacion!==undefined && inputs.observacion!=='')) || (parametros.id!==undefined) )?<button type="submit" className="btn btn-primary mb-3 mt-3 col-12 col-md-3">
                                    Continuar
                                </button>:<div className="btn btn-gray mb-3 mt-3 col-12 col-md-3">Continuar</div>}
                              </div>
                          </form>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
              </>:data.system!==undefined && data.system===null?<>
              <div className="row mt-4">
                <div className="col-12 col-md-7 m-auto">
                  <div className="card border-card">
                    <div className="card-body text-center">
                      Problemas con los datos de comisiones, por favor reportar al administrador
                    </div>
                  </div>
                </div>
              </div>
            </>:false}

          </div>
}
export default App
