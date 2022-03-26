import React,{useState,useEffect} from 'react';
import StateContext from '../helpers/ContextState';
import Functions from '../helpers/Functions';
import Store from '../helpers/Store';

const limitUpload =   1000000;

let documents   =   [
  {
    label:"Hoja de vida",
    value:"funcionario_hoja_de_vida",
  },
  {
    label:"Afiliaciones",
    value:"funcionario_afiliaciones",
  },
  {
    label:"Documentos Soporte",
    value:"funcionario_documento_soporte",
  },
  {
    label:"Otros",
    value:"funcionario_otros",
  },
]

let inputs        = {}

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

    let reader        =   new FileReader();
    reader.onload       =   function() {
      if (file.size<limitUpload) {
        let inputs_={...inputs}
            inputs_.file  =   { src:reader.result,
                                lastModified:file.lastModified,
                                size:file.size,
                                type:file.type,
                                name:event.target.name,
                                label:label,
                                file_name:file.name
                              }

        let data            =   inputs_
            data.file       =   (Object.is(inputs_.file,inputs_.file))?JSON.stringify(inputs_.file):""
            data.user       =   Store.get("user").token
            data.id         =   props.id
            data.name       =   event.target.name
            data.label      =   label
            data.params_id  =   props.params_id
            Functions.PostAsync("Administracion","UploadSoporteFuncionario",data,{},{name:"callbackContinueSend",funct:callbackContinueSend})
      }else {
        context.setModalShow({
                                show:true,
                                message:<div className="text-center text-dark">El Archivo supera el límite permitido de {limitUpload/1000000}MB</div>
                              })
      }
    }
    reader.readAsDataURL(file);
  }
  const callbackContinueSend=(data)=>{
    props.setReset(true)
    getFilesUsuario()
  }

  const getFilesUsuario=()=>{
    Functions.PostAsync("Administracion","getFilesUsuarioFuncionario",{usuario_id:props.id,unique:props.unique},{},{name:"callbackFilesUsuario",funct:callbackFilesUsuario})
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
                                      <div className="btn btn-primary mr-2" onClick={()=>submitBorrar(row)}>Si</div>
                                      <div className="btn btn-gray" onClick={()=>context.setModalShow({show:false})}>No</div>
                                    </div>
                          })
  }

  const submitBorrar=(row)=>{
    Functions.PostAsync("Administracion","deleteFilesUsuarioNegociacion",{soporte_usuario_id:row.soporte_usuario_id,
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
                                  <a  className="text-rosa mr-2"
                                      href={files[row.value]!==undefined?files[row.value].url:"#"} target="_blank">
                                    <i className="icon-descargar-pdf cursor-pointer"/>
                                  </a>
                                </>:false}
                                {files[row.value]!==undefined?<>
                                  <span className="text-rosa cursor-pointer" onClick={()=>onClickDelete(files[row.value])}>
                                    <i className="icon-eliminar-tabla"/>
                                  </span>
                                </>:false}
                              </div>
                            </>:<>
                              <div className="col-12 col-sm-3 text-gray border-bottom uploadFile position-relative">
                                <input type="file" name={row.value} className="inputfile position-absolute" onChange={(e)=>upload(e,row.label)} />
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
