import React,{useState,useEffect} from 'react';
import Header from '../../components/header_forms_andres';
import { NavLink, useParams,useHistory } from "react-router-dom";
import Functions from "../../helpers/Functions";
import Config from "../../helpers/Config";
import Store from "../../helpers/Store";
import DocumentosSoporte from "../../components/documentos_soporte";
import SubtituloSeparador from "../../components/subtitulos_separadores";
import Comentarios from "../comentarios/index";
import Select from '../../screens/select';
import StateContext from '../../helpers/ContextState';
import EditInput from '../../components/EditInput';


const documents   =   [
  {
    public:false,
    label:"Soporte Consulta",
    value:"soporte_consulta_VerificarDatosCuentaAprobar",
  },
  {
    docID:"4",
    public:true,
    label:"Cámara Comercio",
    value:"Camara_Comercio",
  },
  {
    public:true,
    label:"Cédula ciudadanía",
    value:"cedula_ciudadania",
  },
  {
    public:true,
    label:"RUT",
    value:"RUT",
  },
  {
    public:true,
    label:"Certificación Bancaria",
    value:"Certificacion_Bancaria",
  },
  {
    public:true,
    label:"KYC - Conocimiento cliente",
    value:"KYC",
  },
  {
    public:true,
    label:"Contrato de mandato",
    value:"Contrato_mandato",
  },
]

const App=()=>{
  const context = React.useContext(StateContext);
  let history               =   useHistory();
  const parametros          =   useParams()
  const [inputs, setInputs] =   useState({});
  const [data, setData]     =   useState(false);
  const [data2, setData2]   =   useState(false);
  const [reset, setReset]                         =   useState(false);
  const [activeSave, setActiveSave]               =   useState(false);
  const [documentsSupports, setDocumentsSupports] =   useState([]);

  useEffect(() => {

    if (data) {
      let documentsSupports_  = []
      documents.map((row,key)=>{
        if (parseInt(context.user.tipo_usuario_id)<=3 && (row.docID===undefined || (row.docID!==undefined && row.docID===data.tipo_identificacion))) {
          documentsSupports_.push({
            label:row.label,
            value:row.value,
          })
        }

        if (parseInt(context.user.tipo_usuario_id)>3 && row.public && row.docID===undefined) {
          documentsSupports_.push({
            label:row.label,
            value:row.value,
          })
        }else if (parseInt(context.user.tipo_usuario_id)>3 && row.public && row.docID===data.tipo_identificacion) {
          documentsSupports_.push({
            label:row.label,
            value:row.value,
          })
        }


      })
      setDocumentsSupports(documentsSupports_)
    }
  },[data])

  useEffect(() => {
    if (reset) {
      setReset(false)
    }
  },[reset])

  useEffect(() => {
    getInit()
  },[parametros.id])

  function getInit(){
      let data  = {id:parametros.id}
      Functions.PostAsync("Transferir","getCuenta",data,context,{name:"callbackGetInit",funct:callbackGetInit})
  }
  function callbackGetInit(response){
    if (response.data!==undefined) {
      setData(response.data)
      getInit2()
    }
  }

  function onSubmit( e ){
      e.preventDefault()
      let data  = {id:parametros.id,estatus:inputs.estatus}
      if (inputs.estatus==='2') {
        Functions.PostAsync("Transferir","setStatusCuentaFuncionario",data,{},{name:"callbackSubmit",funct:callbackSubmit})
      }else {
        Functions.PostAsync("Transferir","setStatusCuentaFuncionarioRechazada",data,{},{name:"callbackSubmit",funct:callbackSubmit})
      }
  }

  function callbackSubmit(response){
    if (response.message!==undefined && response.message.label!==undefined) {
      context.socket.actualizar_notificacion()
      context.setModalShow({
        show:true,
        message:<div className="text-center">
                  <div>{response.message.label}</div>
                  <div className="row justify-content-center mt-2">
                    <div className="col" onClick={()=>{context.setModalShow({show:false}); history.push("/Administracion/AprobacionCuentas")}}>
                      <div className="btn btn-primary btn-block mt-3">Continuar</div>
                    </div>
                  </div>
                </div>,
        size:""
      });
      context.setModalShow({show:false});
      setTimeout(function(){
        history.push("/Administracion/AprobacionCuentas");
      }, 2000);
      //history.push("/AprobacionCuentas");
    }
  }

  function getInit2(){
      let data        = {}
          data.token  = Functions.segment()
      Functions.PostAsync("Maestros","get_tablas_maestras",data,{},{name:"callbackGetInit2",funct:callbackGetInit2})
  }

  function callbackGetInit2(data){
    setData2(data)
  }

  const onChange=(e)=>{
    Functions.Inputs(e,inputs, setInputs)
  }

  return    <div className="Contenido-Home">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title-home mb-4">Aprobación de cuenta</div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-12 m-auto">
                        <div className="card border-card">
                            <div className="card-body">
                                <div className="col-md-10 ml-auto mr-auto mt-3">
                                  <div className="row">
                                    <div className="col-md-6 mt-2 pl-0">
                                      <div className="label"><b>Titular</b></div>
                                      <div className="labels text-gray">
                                          <EditInput  input={data}
                                                      name="titular"
                                                      replace={data.titular}
                                                      placeholder="Titular"
                                                      module="Administracion"
                                                      component="setData"
                                                      table="cuentas"
                                                      keys="token"
                                                      keyValue="id"
                                                      id={data}
                                                      getInit={getInit}
                                          />
                                      </div>
                                    </div>
                                    <div className="col-md-6 mt-2 pl-0 ">
                                      <div className="label"><b>Usuario</b></div>
                                      <div className="label text-gray">
                                        {(data!==undefined)?data.nombres:false} {(data!==undefined)?data.apellidos:false} ({(data!==undefined)?data.celular:false})
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-6 mt-2 pl-0 ">
                                      <div className="label"><b>Identificación</b></div>
                                      <div className="label text-gray">
                                        {(data!==undefined)?data.tipo_identificacion_string:false} <b>{(data!==undefined)?data.nro_identificacion:false}</b>
                                      </div>
                                    </div>
                                    <div className="col-md-6 mt-2 pl-0 ">
                                      <div className="label"><b>Fecha de solicitud</b></div>
                                      <div className="label text-gray">
                                        {(data!==undefined)?data.fecha_solicitud_string:false}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-6 mt-2 pl-0 ">
                                      <div className="label"><b>Cuenta registrada</b></div>
                                      <div className="label text-gray">
                                        {(data!==undefined)?<>CUENTA {data.tipo_cuentas_bancarias_string}</>:false} | {(data!==undefined)?data.tipo_cuenta_bancaria_string:false} <b>{(data!==undefined)?data.nro_cuenta:false}</b>
                                      </div>
                                    </div>
                                    <div className="col-md-6 mt-2 pl-0 ">
                                      <div className="label"><b>Hora de solicitud</b></div>
                                      <div className="label text-gray">
                                        {(data!==undefined)?data.hora_solicitud:false}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row mb-5">
                                    <div className="col-md-6 mt-2 pl-0 ">
                                      <div className="label"><b>Entidad bancaria</b></div>
                                      <div className="label text-gray">
                                        {(data!==undefined)?data.ma_banco_string:false}
                                      </div>
                                    </div>
                                    <div className="col-md-6 mt-2 pl-0 ">
                                      <div className="label"><b>Tipo tercero</b></div>
                                      <div className="label text-gray">
                                        {(data!==undefined)?data.tipo_cuenta_string:false}
                                      </div>
                                    </div>
                                  </div>
                                  {parseInt(context.user.tipo_usuario_id)<4?<>
                                    <Header title="Documentos de soporte"
                                            subtitle="Suba los siguientes documentos de soporte"
                                            classIcon="icon-documento ico-generico"
                                            class="text-left"
                                    />
                                    <hr/>
                                    <div className="mt-2">
                                      {data!==undefined && parametros.id!==undefined?<DocumentosSoporte
                                                                                          setActiveSave={setActiveSave}
                                                                                          setReset={setReset}
                                                                                          title="Soporte Consulta"
                                                                                          extra="VerificarDatosCuentaAprobar"
                                                                                          documents={documentsSupports}
                                                                                          noDelete={(parseInt(context.user.tipo_usuario_id)<4)?false:true}
                                                                                          id={"VerDocumentosCuentasBancarias_"+parametros.id}/>:false}
                                    </div>
                                  </>:<>

                                    <div className="mt-2">
                                      {data!==undefined && parametros.id!==undefined?<DocumentosSoporte
                                                                                        setReset={setReset}
                                                                                        setActiveSave={setActiveSave}
                                                                                        extra="VerificarDatosCuentaAprobar"
                                                                                        documents={documentsSupports}
                                                                                        id={"VerDocumentosCuentasBancarias_"+parametros.id}/>:false}
                                    </div>

                                  </>}


                                  <Header title="Comentarios" subtitle="" classIcon="icon-mensaje-notificacion ico-generico" class="text-left"/>
                                  {data!==undefined?<Comentarios reset={reset} id={"VerDocumentosCuentasBancarias_"+parametros.id} usuario_id={Store.get("user").token}/>:false}
                                  {data!==undefined && data.estatus!==undefined && parseInt(data.estatus)===1 && parseInt(context.user.tipo_usuario_id)<4?<>
                                    <div className="mt-3">
                                      <Header title="Gestionar" subtitle="" classIcon="icon-documento ico-generico" class="text-left"/>
                                    </div>
                                    <form onSubmit={onSubmit}>
                                      <div className="row mb-5">
                                        <div className="col-md-10 mt-2 pl-0 ">
                                          {activeSave && parseInt(context.user.tipo_usuario_id)<4?<Select
                                            required={true}
                                            data={(data2.ma_aprueba_no_aprueba!==undefined?data2.ma_aprueba_no_aprueba:[])}
                                            name="estatus"
                                            selectDefault="Estado"
                                            onChange={onChange}
                                          />:<div className="p-5"><h3 className="text-rosa">Importante</h3><br/>No se puede aprobar una cuenta sin antes cargar el Soporte de consulta</div>}


                                        </div>
                                      </div>
                                      <div className="row text-center mt-4 justify-content-md-center">
                                        <div className="col-12 col-sm-6">
                                          {activeSave?<button type="submit" className="btn btn-primary mb-3 mr-1">Guardar</button>:false}
                                          <a target="_blank" href={Config.ConfigApirest+"PDF/Transferir/getCuenta?id="+parametros.id+"&token="+Store.get("user").token} className="btn btn-outline-primary2 mb-3 mr-1">Descargar</a>
                                          <NavLink to="/Administracion/AprobacionCuentas" className="btn btn-gray mb-3 mr-1">Cancelar</NavLink>
                                        </div>
                                      </div>
                                    </form>
                                  </>:<div className="row text-center mt-4">
                                        <div className="col-12">
                                          <a target="_blank" href={Config.ConfigApirest+"PDF/Transferir/getCuenta?id="+parametros.id+"&token="+Store.get("user").token} className="btn btn-outline-primary2 mb-3 mr-1">Descargar</a>
                                          <button onClick={()=>history.goBack()} className="btn btn-gray mb-3 mr-1">Volver</button>
                                        </div>
                                      </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
}
export default App
