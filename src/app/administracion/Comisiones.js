import React,{useState,useEffect} from 'react';
import { NavLink , useParams } from "react-router-dom";
import Store from "../../helpers/Store";
import Functions,{format} from "../../helpers/Functions";
import StateContext from '../../helpers/ContextState'
import NumberFormat from 'react-number-format';
import SubtituloSeparador from "../../components/subtitulos_separadores";
import Header from '../../components/header_forms_andres';
import Comentarios from "../comentarios/index";

const App=()=>{
  const context = React.useContext(StateContext);
  let parametros = useParams();
  const [inputs, setInputs] = useState({});
  const [ver, setVer] = useState(false);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    if (reset) {
      setReset(false)
    }
  },[reset])

  useEffect(() => {
    getInit()
  },[])

  const getInit=()=>{
    let send    = {token:Store.get("user").token,uid:parametros.id}
    Functions.PostAsync("Administracion","getSystem",send,{},{name:"callbackContinue",funct:callbackContinue})
  }

  const callbackContinue=(response)=>{
    response.data.comision_iva_giro_recibido  = parseFloat(response.data.comision_dd) * 19 /100
    response.data.comision_iva_administrativa  = parseFloat(response.data.comision_administrativa) * 19 /100
    setInputs(response.data)
    setVer(true)
  }

  const onChange=(e)=>{
    Functions.Inputs(e,inputs, setInputs)
  }

  const onSubmit=(e)=>{
    e.preventDefault()
    let send        = {...inputs}
        send.token  = Store.get("user").token
        send.uid    = parametros.id
    Functions.PostAsync("Administracion","setSystem",send,{},{name:"callbackContinue3",funct:callbackContinue3})
  }

  const callbackContinue3=(response)=>{
    context.socket.actualizar_comision()
    if (response.error!==undefined) {
      context.setModalShow({
        show:true,
        message:<div className="text-center h5">{response.error.label}</div>,
        size:""
      })
    }else {
      setReset(true)
      context.setModalShow({
        show:true,
        message:<div className="text-center">
                  <div>{response.message.label}</div>
                  <div className="btn btn-gray text-white mb-3 mt-3" onClick={()=>context.setModalShow({show:false})}>Continuar</div>
                </div>,
        size:""
      })
    }
  }


  return  <>{ver?<div className="Contenido-Home">
                    <div className="title-home mb-4">Comisiones</div>
                    <div className="row justify-content-center">
                      <div className="col-12 col-md-82">
                        <div className="card">
                          <div className="card-content">
                            <div className="card-body">
                              <div className="p-5">
                                <form onSubmit={onSubmit}>
                                  <div className="row">
                                    <div className="col-2 text-right">
                                      <i className="icon-crear-cuenta-bancaria ico-generico" />
                                    </div>
                                    <div className="col-10 pt-3 p-0">
                                      <div className="title-generico">Oferta Comercial</div>
                                      <div className="cuenta-tarjeta-home">llene el siguiente formulario</div>
                                    </div>
                                  </div>
                                  <div className="row mb-2 mt-4">
                                    <div className="col text-primary">
                                      <b className="p-0 m-0 text-bold">Transferencia</b>
                                    </div>
                                  </div>
                                  <div className="row mb-2">
                                    <div className="col">
                                        <div className="">
                                          Pagoslocales.com
                                        </div>
                                        {inputs.pagos_locales!==undefined?<NumberFormat
                                          defaultValue={inputs.pagos_locales!==undefined?inputs.pagos_locales:""}
                                          required='required'
                                          className="form-control"
                                          name="pagos_locales"
                                          placeholder="Pagoslocales.com"
                                          displayType={'input'}
                                          thousandSeparator=','
                                          decimalSeparator='.'
                                          onValueChange={(values) => {
                                            const { formattedValue, value } = values;
                                            let comision = {...inputs}
                                                comision['pagos_locales']  = parseFloat(value)
                                                setInputs(comision)
                                          }}
                                          renderText={(value, props) => <div {...props}>{value}</div>}
                                        />:false}
                                    </div>
                                  </div>
                                  <div className="row mb-2">
                                    <div className="col">
                                      <div className="">
                                        ACH
                                      </div>
                                      {inputs.ach!==undefined?<NumberFormat
                                        defaultValue={inputs.ach!==undefined?inputs.ach:""}
                                        required='required'
                                        className="form-control"
                                        name="ach"
                                        placeholder="ACH"
                                        displayType={'input'}
                                        thousandSeparator=','
                                        decimalSeparator='.'
                                        onValueChange={(values) => {
                                          const { formattedValue, value } = values;
                                          let comision = {...inputs}
                                              comision['ach']  = parseFloat(value)
                                              setInputs(comision)
                                        }}
                                        renderText={(value, props) => <div {...props}>{value}</div>}
                                      />:false}
                                    </div>
                                  </div>
                                  <div className="row mb-2">
                                    <div className="col">
                                      <div className="">
                                        IVA
                                      </div>
                                      <input  className="form-control"
                                              type="text"
                                              required={true}
                                              name="iva"
                                              placeholder="IVA"
                                              defaultValue={inputs.iva}
                                              onChange={onChange}
                                      />
                                    </div>
                                  </div>
                                  <div className="row mb-2 mt-4">
                                    <div className="col text-primary">
                                      <b className="p-0 m-0 text-bold">Costos</b>
                                    </div>
                                  </div>
                                  <div className="row mb-2">
                                    <div className="col">
                                      <div className="">
                                        Máxima transferencia
                                      </div>
                                      {inputs.maxima_transferencia!==undefined?<NumberFormat
                                        defaultValue={inputs.maxima_transferencia!==undefined?inputs.maxima_transferencia:""}
                                        required='required'
                                        className="form-control"
                                        name="maxima_transferencia"
                                        placeholder="Máxima transferencia"
                                        displayType={'input'}
                                        thousandSeparator=','
                                        decimalSeparator='.'
                                        onValueChange={(values) => {
                                          const { formattedValue, value } = values;
                                          let comision = {...inputs}
                                              comision['maxima_transferencia']  = parseFloat(value)
                                              setInputs(comision)
                                        }}
                                        renderText={(value, props) => <div {...props}>{value}</div>}
                                      />:false}
                                    </div>
                                  </div>

                                  <div className="row mb-2 mt-4">
                                    <div className="col text-primary">
                                      <b className="p-0 m-0 text-bold">Comisión Divisas</b>
                                    </div>
                                  </div>
                                  <div className="row mb-2">
                                    <div className="col">
                                      <div className="">
                                        PORCENTAJE INTERMEDIACIÓN
                                      </div>
                                      {inputs.porcentaje_intermediacion!==undefined?<NumberFormat
                                        defaultValue={inputs.porcentaje_intermediacion!==undefined?inputs.porcentaje_intermediacion:""}
                                        required='required'
                                        className="form-control"
                                        name="porcentaje_intermediacion"
                                        placeholder="Porcentaje intermediación"
                                        displayType={'input'}
                                        thousandSeparator=','
                                        decimalSeparator='.'
                                        onValueChange={(values) => {
                                          const { formattedValue, value } = values;
                                          let comision = {...inputs}
                                              comision['porcentaje_intermediacion']  = parseFloat(value)
                                              setInputs(comision)
                                        }}
                                        renderText={(value, props) => <div {...props}>{value}</div>}
                                      />:false}
                                    </div>
                                  </div>
                                  <div className="row mb-2">
                                    <div className="col">
                                      <div className="">
                                        Comisión USD
                                      </div>
                                      {inputs.comision_USD!==undefined?<NumberFormat
                                        defaultValue={inputs.comision_USD!==undefined?inputs.comision_USD:""}
                                        required='required'
                                        className="form-control"
                                        name="comision_USD"
                                        placeholder="Comisión USD"
                                        displayType={'input'}
                                        thousandSeparator=','
                                        decimalSeparator='.'
                                        onValueChange={(values) => {
                                          const { formattedValue, value } = values;
                                          let comision = {...inputs}
                                              comision['comision_USD']  = parseFloat(value)
                                              setInputs(comision)
                                        }}
                                        renderText={(value, props) => <div {...props}>{value}</div>}
                                      />:false}
                                    </div>
                                  </div>

                                  <div className="row mb-2">
                                    <div className="col">
                                      <div className="">
                                        Comisión EUR
                                      </div>
                                      {inputs.comision_EUR!==undefined?<NumberFormat
                                        defaultValue={inputs.comision_EUR!==undefined?inputs.comision_EUR:""}
                                        required='required'
                                        className="form-control"
                                        name="comision_EUR"
                                        placeholder="Comisión EUR"
                                        displayType={'input'}
                                        thousandSeparator=','
                                        decimalSeparator='.'
                                        onValueChange={(values) => {
                                          const { formattedValue, value } = values;
                                          let comision = {...inputs}
                                              comision['comision_EUR']  = parseFloat(value)
                                              setInputs(comision)
                                        }}
                                        renderText={(value, props) => <div {...props}>{value}</div>}
                                      />:false}
                                    </div>
                                  </div>
                                  <div className="row mb-2">
                                    <div className="col">
                                      <div className="">
                                        Comisión giro recibido
                                      </div>
                                      {inputs.comision_dd!==undefined?<NumberFormat
                                        defaultValue={inputs.comision_dd!==undefined?inputs.comision_dd:""}
                                        required='required'
                                        className="form-control"
                                        name="comision_dd"
                                        placeholder="Comisión giro recibido"
                                        displayType={'input'}
                                        thousandSeparator=','
                                        decimalSeparator='.'
                                        onValueChange={(values) => {
                                          const { formattedValue, value } = values;
                                          let comision = {...inputs}
                                              comision['comision_dd']  = parseFloat(value)
                                              comision.comision_iva_giro_recibido  = parseFloat(value) * 19/100
                                              setInputs(comision)
                                              setReset(true)
                                        }}
                                        renderText={(value, props) => <div {...props}>{value}</div>}
                                      />:false}
                                    </div>
                                  </div>

                                  <div className="row mb-2">
                                    <div className="col">
                                      <div className="">
                                        IVA Comisión giro recibido
                                      </div>
                                      <div className="simula_input text-left">
                                        {inputs.comision_iva_giro_recibido!==undefined?format (inputs.comision_iva_giro_recibido):""}
                                      </div>

                                    </div>
                                  </div>

                                  <div className="row mb-2">
                                    <div className="col">
                                      <div className="">
                                        Comisión administrativa
                                      </div>
                                      {inputs.comision_administrativa!==undefined?<NumberFormat
                                        defaultValue={inputs.comision_administrativa!==undefined?inputs.comision_administrativa:""}
                                        required='required'
                                        className="form-control"
                                        name="comision_administrativa"
                                        placeholder="Comisión administrativa"
                                        displayType={'input'}
                                        thousandSeparator=','
                                        decimalSeparator='.'
                                        onValueChange={(values) => {
                                          const { formattedValue, value } = values;
                                          let comision = {...inputs}
                                              comision['comision_administrativa']  = parseFloat(value)
                                              comision.comision_iva_administrativa  = parseFloat(value) * 19/100
                                              setInputs(comision)
                                              setReset(true)
                                        }}
                                        renderText={(value, props) => <div {...props}>{value}</div>}
                                      />:false}
                                    </div>
                                  </div>



                                  <div className="row mb-2">
                                    <div className="col">
                                      <div className="">
                                        IVA Comisión administrativa
                                      </div>
                                      <div className="simula_input text-left">
                                        {inputs.comision_iva_administrativa!==undefined?format (inputs.comision_iva_administrativa):""}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="row text-center mt-4 justify-content-center">
                                    <div className="col-8">
                                      <button type="submit" className={"btn btn-primary mb-3 mr-1"} >
                                        Guardar
                                      </button>
                                      <NavLink to={parametros.subID===undefined?"/":"/Administracion/Reportes/Usuarios"} className="btn btn-gray text-white mb-3">Cancelar</NavLink>
                                    </div>
                                  </div>
                                </form>
                                <Header title="Comentarios" classIcon="icon-mensaje-notificacion ico-generico" class="text-left"/>
                                <SubtituloSeparador title="Comentarios"/>
                                <div className="mt-2 p-3">
                                  {!reset?<Comentarios id={"Comisiones_"+inputs.usuario_id}/>:false}
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>:false}

          </>
}
export default App
