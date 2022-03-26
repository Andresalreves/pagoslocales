import React,{useState,useEffect} from 'react';
import StateContext from '../helpers/ContextState';
import Functions from '../helpers/Functions';
import Store from '../helpers/Store';
import Loading from '../components/Loading';

const limitUpload =   10000000;

let documents   =   [
  {
    label:"Soporte Operación",
    value:"soporte_operacion",
  },
]

let inputs        = {}

//const test        = true

const App=(props)=>{
  const context             =   React.useContext(StateContext);

  const [files, setFiles] =   useState([]);
  const documentos        =   props.documents!==undefined?props.documents:documents;

  const [loading, setLoading] =   useState(false);

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
    if (props.setFiles!==undefined) {
      props.setFiles(files)
    }
    getFilesUsuario()
    setLoading(false)
  }

  const getFilesUsuario=()=>{
    Functions.PostAsync("Administracion","getFilesUsuarioReportePago",{id:props.id},{},{name:"callbackFilesUsuario",funct:callbackFilesUsuario})
  }

  const callbackFilesUsuario=(response)=>{
    setFiles(response.data)
    if (props.setFiles!==undefined) {
      props.setFiles(response.data)
    }
  }

  useEffect(() => {
    getFilesUsuario()
  },[])

  const onClickDelete=(row)=>{
    context.setModalShow({
                            show:true,
                            message:<div className="text-center">
                                      <div className="text-dark mb-2">¿Está seguro que desea eliminar este archivo?</div>
                                      <div className="btn btn-primary" onClick={()=>submitBorrar(row)}>Si</div>
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

  const submitBloquear=(row)=>{
    Functions.PostAsync("Administracion","blockFiles",{ modulo_token_prefijo:"VerificarDatosReporte_",
                                                        soporte_usuario_id:row.soporte_usuario_id,
                                                        params_id:props.params_id},{},{name:"callbackDeleteFilesUsuario",funct:callbackDeleteFilesUsuario})
  }

  const submitBorrar=(row)=>{
    Functions.PostAsync("Administracion","deleteFilesUsuarioReportePago",{soporte_usuario_id:row.soporte_usuario_id,
                                                                          params_id:props.params_id},{},{name:"callbackDeleteFilesUsuario",funct:callbackDeleteFilesUsuario})
  }

  const callbackDeleteFilesUsuario=(response)=>{
    props.setReset(true)
    if (props.setFiles!==undefined) {
      props.setFiles(files)
    }
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
                            {files!==undefined && files[row.value]!==undefined?
                              <>
                                <div className="col-12 col-sm-4 text-rosa border-bottom">
                                  <i className="icon-link-documento"/> {row.label}
                                </div>
                                <div className="col-12 col-sm-4">
                                  {files[row.value]!==undefined?<>
                                    <span className="text-rosa mr-2"
                                      onClick={()=>open(files[row.value]!==undefined?files[row.value].url:"#")}>
                                      <i className="icon-descargar-pdf cursor-pointer"/>
                                    </span>
                                  </>:false}
                                  {files[row.value]!==undefined && props.noDelete===undefined && files[row.value].allow_delete==='1'?<>
                                    <span className="text-rosa cursor-pointer" onClick={()=>onClickDelete(files[row.value])}>
                                      <i className="icon-eliminar-tabla"/>
                                    </span>
                                  </>:false}
                                  {parseInt(Store.get("user").tipo_usuario_id)<4?<>
                                    { files[row.value]!==undefined  &&
                                      props.noDelete===undefined &&
                                      files[row.value].allow_delete==='1'?<>
                                      <span className="cursor-pointer ml-2" onClick={()=>onClickBlock(files[row.value])}>
                                        <i className="icon-check"/>
                                      </span>
                                      </>:<span className="text-rosa ml-2">
                                        <i className="icon-check"/>
                                      </span>}
                                  </>:false}
                                </div>
                              </>:<>
                                <div className="col-12 col-sm-4 text-gray border-bottom uploadFile position-relative">
                                  <input  type="file"
                                          name={row.value}
                                          accept="application/pdf"
                                          className="inputfile position-absolute"
                                          onChange={(e)=>upload(e,row.label)} />
                                  <i className="icon-link-documento text-gray"/> Seleccionar archivo
                                </div>
                                <div className="col-12 col-sm-5 text-gray">
                                  Archivo aún no seleccionado
                                </div>
                              </>
                            }
                          </div>
              })}
            </>}
        </>
}
export default App
