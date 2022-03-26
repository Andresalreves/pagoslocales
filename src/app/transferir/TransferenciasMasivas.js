import React,{useState,useEffect} from 'react';
import { NavLink,useHistory } from "react-router-dom";
import Header from '../../components/header_forms_andres';
import UploadFile from '../../components/uploadFileExcel'
import Functions from "../../helpers/Functions";
import Loading from "../../components/Loading";
import Select from '../../screens/select';
import Alert from 'react-bootstrap/Alert'
import StateContext from '../../helpers/ContextState';
import Store from '../../helpers/Store';
import Config from "../../helpers/Config";


let resultado = {
                  valor_transferir:0,
                  valor_transferencia:0,
                  iva:0,
                  gmf:0,
                  valor_comision:0,
                  valor_iva:0,
                  valor_gmf_t:0,
                  valor_a_transferir_t:0,
                }

let data_static=[]
const Table=(props)=>{
  const [data, setData]                     = useState([]);
  const [totalOperaciones, setTotalOperaciones] = useState(0);
  const [totalesheader, setTotalesheader]   = useState(resultado);

  useEffect(() => {
    setData_()
  },[props.data])

  useEffect(() => {
    props.setTotalOperaciones(totalOperaciones)
  },[totalOperaciones])

  const setData_=(key_,estatus_)=>{
    let items = []
        let totalesheader_      =   {...resultado}
        let totalOperaciones_   =   0
        props.data.cuentas.map((row,key)=>{
          let row__ = {}
          if (key_!==undefined && estatus_!==undefined) {
            row__                   =   data_static[key]
            if (key===key_) {
              row__.estatus_actual  =   estatus_
            }
          }else {
            row__                 =   row
            row__.estatus_actual  =   (row[10]==='Inscrita')?2:(row[10]==='No inscrita' || row[10]==='En revisión')?9:1
          }


          if (row__.estatus_actual===2) {
            totalesheader_.valor_comision           +=  parseFloat(props.data.costo_t_string[key])
            totalesheader_.valor_iva                +=  parseFloat(props.data.iva_t_string[key])
            totalesheader_.valor_gmf_t              +=  parseFloat(props.data.gmf_t_string[key])
            totalesheader_.valor_a_transferir_t     +=  parseFloat(props.data.cuentas[key][8])
            totalOperaciones_++
          }
          return items.push(row__)
        })
        setTotalOperaciones(totalOperaciones_)
        setTotalesheader(totalesheader_)
        props.setSaldoDisponible(props.data.saldo_cuenta)
        props.setTotalOperacion(totalesheader_.valor_comision+ totalesheader_.valor_iva+totalesheader_.valor_gmf_t+totalesheader_.valor_a_transferir_t)
    data_static =    items
    setData(items)
    let inputs_       = {...props.inputs}
        inputs_.items = items
    props.setInputs(inputs_)
  }


  const handleClickEstatus=(key,estatus)=>{
    setData_(key,estatus)
  }


  return  <>
            <div className="col-md-12 ml-auto mr-auto mt-3">
              <div className="row pb-3 pt-3">
                <div className="col-12 mb-3 h3 ">Verificar Datos</div>
              </div>
            </div>
            <div className="col-md-12 ml-auto mr-auto ">
              <div className="row">

                <div className="col-12 col-sm-6">
                  <div className="label"><b>Cuenta Origen</b></div>
                  <div className="label text-gray">
                    {props.data.cuenta_origen.tipo} {props.data.cuenta_origen.nro_cuenta} (<b>{props.data.cuenta_origen.tipo_moneda}</b>)
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="label"><b>Total valor comisión</b></div>
                  <div className="label text-gray">
                    {Functions.format(totalesheader.valor_comision,2)} COP
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 ml-auto mr-auto mt-3">
              <div className="row">
                <div className="col-12 col-sm-6">
                  <div className="label"><b>Total operaciones</b></div>
                  <div className="label text-gray">{totalOperaciones}/{props.data.operaciones}</div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="label"><b>Total iva</b></div>
                  <div className="label text-gray">
                    {Functions.format(totalesheader.valor_iva ,2)} COP
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 ml-auto mr-auto mt-3">
              <div className="row">
                <div className="col-12 col-sm-6">
                  <div className="label"><b>Total valor a transferir</b></div>
                  <div className="label text-gray">
                    {Functions.format(totalesheader.valor_a_transferir_t ,2)} COP
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="label"><b>Total GMF</b></div>
                  <div className="label text-gray">
                    {Functions.format(totalesheader.valor_gmf_t,2)} COP
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 ml-auto mr-auto mt-3">
              <div className="row">
                <div className="col-12 col-sm-6">
                  <div className="label"><b>Saldo disponible en su billetera</b></div>
                  <div className="label text-gray">
                    {props.data.saldo_cuenta_string}
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="label"><b>Total valor operación</b></div>
                  <div className="label text-gray">
                    {Functions.format(totalesheader.valor_a_transferir_t + totalesheader.valor_iva + totalesheader.valor_comision+ totalesheader.valor_gmf_t,2)} COP
                  </div>
                </div>
              </div>
            </div>
            {(totalesheader.valor_a_transferir_t + totalesheader.valor_iva + totalesheader.valor_comision+ totalesheader.valor_gmf_t)>props.data.saldo_cuenta?<>
              <div className="col-md-12 ml-auto mr-auto mt-3">
                <div className="row">
                  <div className="col-12">
                    <Alert variant={"danger"}>
                      <div className="pl-3  pt-2 text-dark h6">
                        ¡Atención!
                      </div>
                      <div className="pl-3 pb-2 text-dark">
                        El saldo actual en su billetera, es inferior al monto a tranferir
                      </div>
                    </Alert>
                  </div>
                </div>
              </div>
            </>:false}
            <div className="col-md-12 ml-auto mr-auto mt-3">
              <div className="row">
                <div className="col-12">
                  <hr/>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Estado</th>
                        <th>Cuenta destino</th>
                        <th>Valor transferir</th>
                        <th>Valor transferencia</th>
                        <th>IVA</th>
                        <th>GMF</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length>0?<>
                        {data.map((row,key)=>{
                          return  <tr key={key}>
                                    <td >
                                      <div className={row[11]===2?"text-success text-center":"text-danger text-center"}>
                                        {row[10]}
                                      </div>
                                    </td>
                                    <td className="text-center">
                                      {row[5]}
                                    </td>
                                    <td className="text-right">
                                      {row[12]}
                                    </td>
                                    <td className="text-right">
                                      {props.data.costo_t[key]}
                                    </td>
                                    <td className="text-right">
                                      {props.data.iva_t[key]}
                                    </td>
                                    <td className="text-right">
                                      {props.data.gmf_t[key]}
                                    </td>
                                    <td className="text-center">
                                      {row.estatus_actual===2?<>
                                          <i className={" icon-activo-on mr-1 cursor-pointer text-success "} onClick={()=>handleClickEstatus(key,1)}/>
                                      </>:row.estatus_actual===1?<>
                                          <i className={" icon-activo-on mr-1 cursor-pointer text-danger "} onClick={()=>handleClickEstatus(key,2)}/>
                                      </>:
                                      <>

                                      </>}
                                    </td>
                                  </tr>
                        })}
                    </>:<tr>
                      <td colSpan="4" className="text-center">
                        No hay registros
                      </td>
                    </tr>}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
}

const App=()=>{
  let history = useHistory();
  const [uploadHojaVida, setUploadHojaVida] = useState(false);
  const [data, setData]   = useState(false);
  const [data2, setData2] = useState(false);
  const [cuentas, setCuentas] = useState([]);
  const [inputs, setInputs] = useState({});
  const [totalOperaciones, setTotalOperaciones] = useState(0);

  const [saldoDispoible, setSaldoDisponible] = useState(0);
  const [totalOperacion, setTotalOperacion] = useState(0);
  const context             =   React.useContext(StateContext);


  useEffect(() => {
    let send  = {file:JSON.stringify(uploadHojaVida),name:"uploadHojaVida"}
    Functions.PostAsync("Transferir","GetMisCuentas",send,{},{name:"callbackInit",funct:callbackInit})
  },[])

  const callbackInit=(response)=>{
    if (response.data!==undefined) {
      setCuentas(response.data);
    }
  }

  useEffect(() => {
    if (uploadHojaVida) {
      setData(true)
      let send  = {file:JSON.stringify(uploadHojaVida),name:"uploadHojaVida",cuenta_origen:inputs.cuenta_origen}
      Functions.PostAsync("Transferir","UploadTransferenciasMasivas",send,{},{name:"callbackUpload",funct:callbackUpload})
    }
  },[uploadHojaVida])

  const callbackUpload=(response)=>{
    if (response.error !== undefined && response.error.public===true) {
      setData(false)
      return context.setModalShow({
                              show:true,
                              message:  <div className="text-center text-dark">
                                          {response.error.label}
                                        </div>
                            })
    }
    setData(response.data)
  }

  const Campos = () =>{
    context.setModalShow({
      show:true,
      message:  <div className="text-center text-dark">
                  Por favor debe diligenciar todos los campos.
                </div>
    })
  }

  const handleOnSubmit=()=>{
    Store.set("ProcesarTransferenciasMasivas",{data:data,inputs:inputs})
    Functions.PostAsync("Transferir","ProcesarTransferenciasMasivas",{data:JSON.stringify(data),inputs:JSON.stringify(inputs)},{},{name:"callbackProcesarCuentasMasivas",funct:callbackProcesarCuentasMasivas})
  }

  const callbackProcesarCuentasMasivas=(response)=>{
    if (response.transferencias_efectivas!==undefined) {
      context.socketIo.connect()
      context.socketIo.emit('ConfirmacionTransferencia');
      //history.push("/Transferir/Transferir");
      history.push("/Transferir/TransferenciaMasivaExitosa/"+response.token);
      // return context.setModalShow({
      //                         show:true,
      //                         message:<div className="text-center text-dark">Se han completado {response.transferencias_efectivas.length} transferencias</div>
      //                       })


    }
  }

  const onChange=(e)=>{
    Functions.Inputs(e,inputs, setInputs)
  }

  return  <div className="Contenido-Home">
            <div className="row">
              <div className="col-md-12">
                <div className="title-home mb-4">Transferencia masivamente</div>
              </div>
            </div>
            <div className="row mt-4">
                <div className="col-12 m-auto">
                    <div className="card border-card">
                        <div className="card-body">
                          {console.log(data)}
                          {!data?<div className="col-md-11 ml-auto mr-auto mt-3">
                              <Header title="Documento de Transferencia" classIcon="icon-documento ico-generico" subtitle="Transferir a cuentas masivamente" />
                              <hr/>
                              <div className="row mb-3">
                                <div className="col-12 text-center">
                                  Descarga el formato para transferencias masivas <a href={Config.ConfigApirest+"images/transferencias_masivas_2022.xlsx"} className="text-rosa">Aquí</a>
                                </div>
                              </div>
                              <form className="mt-4">
                                <div className="row mb-3">
                                  <div className="col-12 text-left mb-3">
                                    <div className="text-gray ml-3">
                                      <Select
                                        required={true}
                                        data={cuentas}
                                        name="cuenta_origen"
                                        selectDefault="Cuenta Origen"
                                        onChange={onChange}
                                      />
                                    </div>
                                  </div>
                                  {inputs.cuenta_origen!==undefined?<>

                                    <div className="col-12 col-md-4 text-left">
                                      <div className="text-gray ml-3">
                                        Formato de cuentas
                                      </div>
                                    </div>
                                    <div className="col-12 col-md-8">
                                      <UploadFile
                                            required={true}
                                            upload={uploadHojaVida}
                                            setUpload={setUploadHojaVida}
                                            title={"Seleccione archivo"}
                                      />
                                    </div>

                                  </>:false}
                                </div>
                                <div className="text-center mt-3">
                                    <div onClick={Campos} className="btn btn-primary mr-2 col-12 col-md-3 mb-3">Siguiente</div>
                                    <NavLink to="/Transferir/Transferir" className="btn btn-gray col-12 col-md-3 mb-3">Cancelar</NavLink>
                                </div>
                              </form>
                          </div>:data===true?<Loading/>:!data2?<Table data={data}
                                                                      setTotalOperaciones={setTotalOperaciones}
                                                                      setSaldoDisponible={setSaldoDisponible}
                                                                      setTotalOperacion={setTotalOperacion}
                                                                      setInputs={setInputs}
                                                                      inputs={inputs}
                                                                      />:false}
                          <div className="col-md-10 ml-auto mr-auto mt-3">
                            <div className="row mt-3">
                              <div className="col">
                                <div className="Importante mt-4 text-gray">
                                  <b>Importante:</b> Estimado(a) cliente, te informamos que esta operación será reflejada en la cuenta del remitente el día de hoy si el pago fue realizado antes de las 15:00 Horas (03:00 PM) o el día de mañana si se realizó después de esta hora. Si realizaste la transferencia en día no hábil, cursará el primer ciclo ACH del siguiente día hábil. Cómo medida de seguridad te recordamos la importancia de cambiar periódicamente tus claves de acceso.
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col">
                              <div className="text-center mt-4">
                                  <div onClick={handleOnSubmit} className={totalOperaciones>0 && saldoDispoible>totalOperacion?"btn btn-primary2 mb-3 mr-1":"btn btn-outline-primary2 disabled mb-3 mr-1"}>Procesar</div>
                                  {!data2?<NavLink to="/Transferir/Transferir" className="btn btn-gray text-white mb-3">Cancelar</NavLink>:false}
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
           </div>
}
export default App
