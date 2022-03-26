import React,{useState,useEffect} from 'react';
import StateContext from '../helpers/ContextState';
import Functions from '../helpers/Functions';
import Store from '../helpers/Store';
import Loading from '../components/Loading';


const limitUpload =   10000000;

let documents     =   [
  {
    label:"Soporte Consulta",
    value:"sarlaft",
  },
  {
    label:"Conocimiento cliente (KYC)",
    value:"conocimiento_cliente",
  },
  {
    label:"Contrato nacional",
    value:"contrato_nacional",
  },
  {
    label:"Contrato internacional",
    value:"contrato_internacional",
  },
  {
    label:"RUT",
    value:"rut",
  },
  {
    label:"Cámara de comercio",
    value:"camara_comercio",
  },
  {
    label:"Documento de identificación",
    value:"documento_de_identificacion",
  },
  {
    label:"Composición accionaria",
    value:"composicion_accionaria",
  },
  {
    label:"Declaración de renta",
    value:"declaracion_renta",
  },
  {
    label:"Estados financieros",
    value:"estados_financieros",
  },
  {
    label:"Tarjeta profesional contador",
    value:"tarjeta_profesional_contador",
  },
  {
    label:"Documento identificación contador",
    value:"documento_identificacion_contador",
  },
  {
    label:"Otros",
    value:"otros",
  },
]

let documents2     =   [
  {
    label:"Soporte Consulta",
    value:"sarlaft",
  },
  {
    label:"Conocimiento cliente (KYC)",
    value:"conocimiento_cliente",
  },
  {
    label:"Contrato nacional",
    value:"contrato_nacional",
  },
  {
    label:"Contrato internacional",
    value:"contrato_internacional",
  },
  {
    label:"Documento de identificación",
    value:"documento_de_identificacion",
  },
  {
    label:"RUT",
    value:"rut",
  },
  // {
  //   label:"SARLAFT",
  //   value:"sarlaft",
  // },
  {
    label:"Otros",
    value:"otros",
  },
]

let inputs        = {}



const App=(props)=>{
  const context               =   React.useContext(StateContext);
  const [files, setFiles]     =   useState([]);
  const [loading, setLoading] =   useState(false);
  const documentos            =   props.documents!==undefined?props.documents:(props.user.razon_social!==undefined&&props.user.razon_social!=='')?documents:documents2;


  const upload=(event,label)=>{
    let file          =   event.target.files[0];

    if (file.type!=="application/pdf") {
      return context.setModalShow({
                              show:true,
                              message:<div className="text-center text-dark">Formato de archivo no permitido</div>
                            })
    }

    if (file.size>limitUpload) {
      return context.setModalShow({
                                show:true,
                                message:<div className="text-center text-dark">El Archivo supera el límite permitido de {limitUpload/1000000}MB</div>
                              })
    }

    setLoading(true)

    let data            =   inputs
        data.id         =   props.id
        data.name       =   event.target.name
        data.user       =   Store.get("user").token
        data.token      =   Store.get("user").token
        data.file       =   file
        data.label      =   label
        Functions.PostAsync("Administracion","UploadSoporteNew",data,{},{name:"callbackContinueSend",funct:callbackContinueSend})
  }

  const callbackContinueSend=(data)=>{
    props.setReset(true)
    getFilesUsuario()
    setLoading(false)
  }

  const getFilesUsuario=()=>{
    Functions.PostAsync("Administracion","getFilesUsuario",{usuario_id:props.id,unique:props.unique,extra:props.extra},{},{name:"callbackFilesUsuario",funct:callbackFilesUsuario})
  }

  const callbackFilesUsuario=(response)=>{
    if (  props.setActiveSave!==undefined &&
          response.data!==undefined &&
          response.data.soporte_consulta_VerificarDatosCuentaAprobar!==undefined) {
          props.setActiveSave(true)
    }

    if (  props.setActiveSave!==undefined &&
          response.data!==undefined &&
          response.data[props.require]!==undefined) {
          props.setActiveSave(true)
    }


    setFiles(response.data)
  }

  useEffect(() => {
    getFilesUsuario()
  },[])

  const onClickDelete=(row)=>{
    context.setModalShow({
                            show:true,
                            message:<div className="text-center">
                                      <div className="text-dark mb-2">¿Está seguro que desea eliminar este archivo?</div>
                                      <div className="btn btn-primary mr-2" onClick={()=>submitBorrar(row)}>Si</div>
                                      <div className="btn btn-gray" onClick={()=>context.setModalShow({show:false})}>No</div>
                                    </div>
                          })
  }

  const submitBloquear=(row)=>{
    Functions.PostAsync("Administracion","blockFiles",{ modulo_token_prefijo:(props.modulo_token_prefijo)?props.modulo_token_prefijo:"VerDocumentosCuentasBancarias_",
                                                        soporte_usuario_id:row.soporte_usuario_id,
                                                        params_id:props.params_id},{},{name:"callbackDeleteFilesUsuario",funct:callbackDeleteFilesUsuario})
  }

  const onClickBlock=(row)=>{
    context.setModalShow({
                            show:true,
                            message:<div className="text-center">
                                      <div className="text-dark mb-2">¿Está seguro que desea bloquear este archivo?</div>
                                      <div className="btn btn-primary mr-2" onClick={()=>submitBloquear(row)}>Si</div>
                                      <div className="btn btn-gray" onClick={()=>context.setModalShow({show:false})}>No</div>
                                    </div>
                          })
  }

  const submitBorrar=(row)=>{
    Functions.PostAsync("Administracion","deleteFilesUsuario",{id:props.id,soporte_usuario_id:row.soporte_usuario_id},{},{name:"callbackDeleteFilesUsuario",funct:callbackDeleteFilesUsuario})
  }

  const callbackDeleteFilesUsuario=(response)=>{
    if(props.setActiveSave!==undefined){
      props.setActiveSave(false)
    }
    props.setReset(true)
    context.setModalShow({
                            show:true,
                            message:<div className="text-center text-dark">
                                      {response.message.label}
                                    </div>
                          })
    getFilesUsuario()
  }

  const open=(url)=>{
    window.open(url)
  }

  return  <>
            {loading?<Loading/>:<>
              {documentos.map((row,key)=>{
                  return  <div className="row mb-3" key={key}>
                            <div className="col-12 col-sm-3 text-gray">
                              {row.label}
                            </div>
                            {files!==undefined && files[row.value]!==undefined && !loading?
                              <>
                                <div className="col-12 col-sm-4 text-rosa border-bottom">
                                  <i className="icon-link-documento"/> {row.label}
                                </div>
                                <div className="col-12 col-sm-3">
                                  {files[row.value]!==undefined?<>
                                    <span className="text-rosa mr-2"
                                      onClick={()=>open(files[row.value]!==undefined?files[row.value].url:"#")}>
                                      <i className="icon-descargar-pdf cursor-pointer"/>
                                    </span>
                                  </>:false}

                                  { files[row.value]!==undefined &&
                                    files[row.value].allow_delete==='1'  &&
                                    (props.noDelete===undefined || (props.noDelete!==undefined && props.noDelete===false))?<>
                                    <span className="text-rosa cursor-pointer" onClick={()=>onClickDelete(files[row.value])}>
                                      <i className="icon-eliminar-tabla"/>
                                    </span>
                                  </>:false}

                                  {parseInt(Store.get("user").tipo_usuario_id)<4?<>
                                    { files[row.value]!==undefined  &&
                                      files[row.value].allow_delete==='1'?<>
                                      <span className="cursor-pointer ml-2" onClick={()=>onClickBlock(files[row.value])}>
                                        <i className="icon-check"/>
                                      </span>
                                      </>:<span className=" text-rosa ml-2">
                                        <i className="icon-check"/>
                                      </span>}
                                  </>:false}

                                </div>
                              </>:((files!==undefined && files[row.value]===undefined) || (files===undefined)) && !loading?<>
                                <div className="col-12 col-sm-5 text-gray border-bottom uploadFile position-relative">
                                  <input  type="file"
                                          name={row.value}
                                          accept="application/pdf"
                                          className="inputfile position-absolute"
                                          onChange={(e)=>upload(e,row.label)} />
                                  <i className="icon-link-documento text-gray"/> Seleccionar archivo
                                </div>
                                <div className="col-12 col-sm-4 text-gray">
                                  Archivo aún no seleccionado
                                </div>
                              </>:loading && loading[row.value]!==undefined?<>
                                <Loading/>
                              </>:false
                            }

                          </div>
              })}
            </>}
        </>
}
export default App
