import React,{useState,useEffect} from 'react';
import { NavLink, useHistory,  useParams  } from "react-router-dom";
import Functions from "../../helpers/Functions";
import OptionCard from "../../components/OptionCard";
import StateContext from '../../helpers/ContextState';
import Store from "../../helpers/Store";


const App=()=>{
    let history = useHistory();
    const parametros=useParams();
    const [data, setData] = useState({});
    const [ver, setVer] = useState(parametros.id===undefined?true:false);
    const context = React.useContext(StateContext);

    useEffect(() => {
      getInit()
    },[])

    function getInit(){
      let send={id:parametros.id}
      Functions.PostAsync("Transferir","getTransferencia",send,context,{name:"callbackGetInit",funct:callbackGetInit})
    }

    function callbackGetInit(response){
      if (response.data!==undefined) {
        setData(response.data)
        setVer(true)
      }
    }

    function onSubmit( e ){
        e.preventDefault();
        let send={
                    id:parametros.id,
                    estatus:1,
                    concepto:data.concepto,
                  }
            send.token  = Store.get("user").token

        if (data.descripcion==='TRANSFERENCIA A BOLSILLO' ) {
          Functions.PostAsync("Transferir","setCambioEstatusTransferenciaBolsillos",send,{},{name:"callbackSubmit",funct:callbackSubmit});
          return console.log(data.descripcion);
        }else if ( data.descripcion==='RETIRO DE BOLSILLO' ) {
          Functions.PostAsync("Transferir","setCambioEstatusTransferenciaBolsillosRetiro",send,{},{name:"callbackSubmit",funct:callbackSubmit});
          return console.log(data.descripcion);
        }else {
          send.estatus = 2;
          Functions.PostAsync("Transferir","setCambioEstatusTransferencia",send,{},{name:"callbackSubmit",funct:callbackSubmit});
        }

    }

    function callbackSubmit(response){
      if(response.message!==undefined && response.message.label!==undefined){
        history.push("/Transferir/ConfirmacionTransferencia/"+response.id);
      }
      if (response.error!==undefined && response.error.public){
        context.setModalShow({
            show:true,
            message:<div className="text-center h5">
                        {response.error.label}
                        <div className="row justify-content-center mt-2">
                        <div className="col-3" onClick={()=>context.setModalShow({show:false})}>
                            <div className="btn btn-primary btn-block">Reintentar</div>
                        </div>
                        </div>
                    </div>,
            size:""
        })
            //history.push("/Verificarpagador/"+response.data.id);
        }
    }
  return    <>
              {ver?<form><div className="Contenido-Home">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title-home mb-4">Verifica la transferencia</div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-12 col-md-7 m-auto">
                        <div className="card border-card">
                            <div className="card-body">
                                <div className="items-verificacion row justify-content-between m-sm-4">
                                    <OptionCard OptionIndicator="1" TextOptionIndicator="Preparación"/>
                                    <OptionCard OptionIndicator="2" TextOptionIndicator="Verificación" myclass="optionActive"/>
                                    <OptionCard OptionIndicator="3" TextOptionIndicator="Confirmación"/>
                                </div>
                                <div className="col-md-10 ml-auto mr-auto mt-3">
                                    <div className="col-md-12 mt-2 pl-0 d-flex">
                                        <div>
                                            <div className="label"><b>Cuenta de Origen</b></div>
                                            <div className="label text-gray">
                                              <b>
                                                {data.bolsillo && data.descripcion==='RETIRO DE BOLSILLO'?<>
                                                    {data.bolsillo.tipo} {data.bolsillo.nombre_bolsillo}
                                                  </>:data.bolsillo && data.descripcion==='TRANSFERENCIA A BOLSILLO'?<>
                                                    {data.tipo_cuentas_string_emergente} {data.nro_cuenta_destino}
                                                  </>:<>
                                                  {data.cuenta_origen_string}
                                                </>}
                                              </b>
                                            </div>
                                        </div>
                                        <div className="cambiar">
                                          <NavLink to={"/Transferir/Transferir/"+parametros.id} className="cambiar">Cambiar <i className="icon-cambiar ml-2"></i></NavLink>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-2 pl-0 d-flex">
                                        <div>
                                            <div className="label"><b>Cuenta de destino</b></div>
                                            <div className="label text-gray">
                                              <b>
                                                {data.bolsillo && data.descripcion==='RETIRO DE BOLSILLO'?<>
                                                    {data.tipo_cuenta_destino} {data.nro_cuenta_destino}
                                                  </>:data.bolsillo && data.descripcion==='TRANSFERENCIA A BOLSILLO'?<>
                                                    {data.bolsillo.tipo} {data.bolsillo.nombre_bolsillo}
                                                  </>:<>
                                                  {data.cuenta_destino_string}
                                                </>}
                                              </b>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-2 pl-0 d-flex">
                                        <div>
                                            <div className="label"><b>Valor a transferir</b></div>
                                            {data.saldo_positivo_string!==undefined?<>
                                              <div className="label text-gray"><b>
                                                {data.saldo_positivo_string} COP</b></div>
                                            </>:false}
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-2 pl-0 d-none ">
                                        <div>
                                            <div className="label"><b>GMF TRANSACCIONAL</b></div>
                                            {data.relacion!==undefined && data.relacion.TRANSACCION?<>
                                              <div className="label text-gray"><b>
                                                {data.relacion.GMF.label} COP</b></div>
                                            </>:false}
                                        </div>
                                    </div>

                                    <div className="col-md-12 mt-2 pl-0 d-flex">
                                        <div>
                                            <div className="label"><b>Costo de la transferencia</b></div>
                                            {data.bolsillo && (data.descripcion==='RETIRO DE BOLSILLO' || data.descripcion==='TRANSFERENCIA A BOLSILLO')?<>
                                              <div className="label text-gray">
                                                <b>
                                                  0.00 COP
                                                </b>
                                              </div>
                                              </>:<>
                                              {data.costo_transferencia!==undefined?<>
                                                <div className="label text-gray"><b>
                                                  {data.costo_transferencia} COP</b></div>
                                              </>:false}
                                            </>}

                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-2 pl-0 d-flex">
                                        <div>
                                            <div className="label"><b>IVA</b></div>
                                            {data.bolsillo && (data.descripcion==='RETIRO DE BOLSILLO' || data.descripcion==='TRANSFERENCIA A BOLSILLO')?<>
                                            <div className="label text-gray">
                                              <b>
                                                0.00 COP
                                              </b>
                                            </div>
                                              </>:<>
                                              {data.iva_!==undefined?<>
                                                <div className="label text-gray"><b>
                                                  {data.iva_} COP</b></div>
                                              </>:false}
                                            </>}

                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-2 pl-0 d-none ">
                                        <div>
                                            <div className="label"><b>Concepto</b></div>
                                            <div className="label text-gray"><b>{data.concepto}</b></div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-2 pl-0 d-flex">
                                        <div>
                                            <div className="label"><b>Observación</b></div>
                                            <div className="label text-gray"><b>{data.observacion}</b></div>
                                        </div>
                                    </div>
                                    <div className="text-center mt-4">
                                        <button type="button" className="btn btn-primary mb-3 mr-1" onClick={onSubmit}>Transferir</button>
                                        <NavLink to="/Transferir/transferir" className="btn btn-gray text-white mb-3">Volver</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div></form>:false}
          </>
}
export default App
