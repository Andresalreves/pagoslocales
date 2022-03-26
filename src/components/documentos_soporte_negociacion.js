import React,{useState,useEffect} from 'react';
import StateContext from '../helpers/ContextState';
import Functions from '../helpers/Functions';
import Store from '../helpers/Store';

const limitUpload =   10000000;

let documents   =   [
  {
    label:"Factura de ventas",
    value:"factura_ventas",
  },
  {
    label:"Solicitud reintegro divisas",
    value:"solicitud_reintegro_divisas",
  },
  {
    label:"Solicitud operación incial",
    value:"colicitud_operacion_inicial",
  },
  {
    label:"Información operaciones de cambio",
    value:"informacion_operaciones_de_cambio",
  },
  {
    label:"Contrato",
    value:"contrato",
  },
  {
    label:"Otros",
    value:"otros",
  },
]

let inputs        = {}

//const test        = true

const App=(props)=>{
  const context             =   React.useContext(StateContext);

  const [files, setFiles] =   useState([]);
  const documentos        =   props.documents!==undefined?props.documents:documents;

  const upload=(event,label)=>{
    let file          =   event.target.files[0];

    if (file.type!=="application/pdf") {
      return context.setModalShow({
                              show:true,
                              message:<div className="text-center text-dark">Formato de archivo no permitido</div>
                            })
    }

    if (file.size>limitUpload) {
        context.setModalShow({
                                show:true,
                                message:<div className="text-center text-dark">El Archivo supera el límite permitido de {limitUpload/1000000}MB</div>
                              })
    }

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
  }

  const getFilesUsuario=()=>{
    Functions.PostAsync("Administracion","getFilesUsuarioNegociacion",{ usuario_id:props.usuario_id,
                                                                        unique:props.unique,
                                                                        params_id:props.params_id,
                                                                        variable:"negociar_divisas"
                                                                      },{},{name:"callbackFilesUsuario",funct:callbackFilesUsuario})
  }

  const callbackFilesUsuario=(response)=>{
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
                                      <div className="btn btn-primary mr-2 mb-2" onClick={()=>submitBorrar(row)}>Si</div>
                                      <div className="btn btn-gray" onClick={()=>context.setModalShow({show:false})}>No</div>
                                    </div>
                          })
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
    Functions.PostAsync("Administracion","deleteFilesUsuarioNegociacion",{soporte_usuario_id:row.soporte_usuario_id,
                                                                          params_id:props.params_id},{},{name:"callbackDeleteFilesUsuario",funct:callbackDeleteFilesUsuario})
  }

  const submitBloquear=(row)=>{
    Functions.PostAsync("Administracion","blockFiles",{
                                                        id:props.id,
                                                        modulo_token_prefijo:"ComentariosNegociacionDivisas_",
                                                        soporte_usuario_id:row.soporte_usuario_id,
                                                        params_id:props.params_id},{},{name:"callbackDeleteFilesUsuario",funct:callbackDeleteFilesUsuario})
  }

  const callbackDeleteFilesUsuario=(response)=>{
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
            {documentos.map((row,key)=>{
                return  <div className="row mb-3" key={key}>
                          <div className="col-12 col-sm-5 text-gray">
                            {row.label}
                          </div>
                          {files!==undefined && files[row.value]!==undefined?
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
                                { files[row.value]!==undefined  &&
                                  props.noDelete===undefined &&
                                  files[row.value].allow_delete==='1'?<>
                                  <span className="text-rosa cursor-pointer mr-2" onClick={()=>onClickDelete(files[row.value])}>
                                    <i className="icon-eliminar-tabla"/>
                                  </span>
                                </>:false}
                                {parseInt(Store.get("user").tipo_usuario_id)<4?<>
                                  { files[row.value]!==undefined  &&
                                    props.noDelete===undefined &&
                                    files[row.value].allow_delete==='1'?<>
                                    <span className="cursor-pointer" onClick={()=>onClickBlock(files[row.value])}>
                                      <i className="icon-check"/>
                                    </span>
                                    </>:<span className=" text-rosa">
                                      <i className="icon-check"/>
                                    </span>}
                                </>:false}
                              </div>
                            </>:<>
                              <div className="col-12 col-sm-3 text-gray border-bottom uploadFile position-relative">
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
                            </>
                          }
                        </div>
            })}
        </>
}
export default App
