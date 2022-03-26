import React,{useState,useEffect} from 'react';
import StateContext from '../../helpers/ContextState';
import Functions from '../../helpers/Functions';
import Store from '../../helpers/Store';
import Grabador from './grabador';
import  { faTrash,faImage,faUpload,faFilePdf,faFile,faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import  { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  imgDefault from '../../assets/images/design/avatar.png';
import  queryString from 'query-string';
const   queryStringParams = queryString.parse(window.location.search);
const   HtmlToReactParser = require('html-to-react').Parser;
let     htmlToReactParser = new HtmlToReactParser();

const limitUpload = 1000000;
let   audio       = false;

const App =(props)=>{
  const context             =   React.useContext(StateContext);
  const modulo              =   Functions.segments_modulos(queryStringParams.app);
  const [data, setData]     = useState([]);
  const [inputs, setInputs] = useState({});
  const [blockTextarea, setBlockTextarea] = useState(false);
  const [openEditDescription, setOpenEditDescription] = useState(false);
  const [verMas, setVerMas]       = useState({});
  const [mensajeArchivoAdjunto, setMensajeArchivoAdjunto]     = useState(false);
  const [visible, setVisible]     = useState(false);

  useEffect(() => {
    getInit()
  },[props.reset,props.id,openEditDescription])

  useEffect(() => {
    context.socketIo.on("actualizaComentarios", () => {
      getInit()
    });
  }, [context.socketIo]);

  const getInit=()=>{
    let data            =   {}
        data.app        =   JSON.stringify(modulo)
        data.id         =   props.id
        data.usuario_id         =   props.usuario_id
        Functions.PostAsync("Comentarios","get",data,context,{name:"callbackContinue",funct:callbackContinue})
  }

  const callbackContinue=(response)=>{
    setData(response.data)
  }

  const onChange=(e)=>{
    e.preventDefault()
    let inputs_={...inputs}
        inputs_[e.target.name]=e.target.value
        setInputs(inputs_)
  }

  const onSubmit=(e)=>{
    e.preventDefault()

    let data            =   {...inputs}
        data.file       =   (Object.is(inputs.file,inputs.file))?JSON.stringify(inputs.file):""
        data.app        =   JSON.stringify(modulo)
        data.user       =   Store.get("user").token
        data.id         =   props.id
        if (audio) {
          data.audio    =   JSON.stringify(audio)
        }
        if (data.mensaje!==undefined) {
          setBlockTextarea(true)
          Functions.PostAsync("Comentarios","set",data,context,{name:"callbackContinueSend",funct:callbackContinueSend})
        }else {
          setBlockTextarea(false)
          return context.setModalShow({
                                        show:true,
                                        message:<div className="text-center text-dark">El mensaje no debe ir vacío</div>
                                      })
        }

  }

  const callbackContinueSend=(data)=>{
    getInit()
    audio=false
    setBlockTextarea(false)
    setMensajeArchivoAdjunto(false)
    setVisible(false)
    setInputs({})
  }

  const upload=(event)=>{
    let file          =   event.target.files[0];
    let reader        =   new FileReader();

    reader.onload       =   function() {
      if (file.size<limitUpload) {
        let inputs_={...inputs}
            inputs_.file  =   { src:reader.result,
                                name:file.name,
                                lastModified:file.lastModified,
                                size:file.size,
                                type:file.type,
                              }

        let data            =   inputs_
            data.file       =   (Object.is(inputs_.file,inputs_.file))?inputs_.file:""
            data.app        =   JSON.stringify(modulo)
            data.user       =   Store.get("user").token
            data.id         =   props.id
            setInputs(data)
            if (inputs_.file!==undefined && inputs_.file.name!==undefined) {
              setMensajeArchivoAdjunto(inputs_.file.name)
            }
            //Functions.PostAsync("Comentarios","set",data,context,{name:"callbackContinueSend",funct:callbackContinueSend})
      }else {
        context.setModalShow({
                                show:true,
                                message:<div className="text-center text-danger">El Archivo supera el límite permitido de {limitUpload/1000000}MB</div>
                              })
      }
    }
    reader.readAsDataURL(file);
  }

  const openFileTab=(url)=>{
    return window.open(url, '_blank').focus();
  }

  const openFile=(url)=>{

    context.setModalShow({
                            show:true,
                            message:<iframe id="inlineFrameExample"
                                            title="Iframe ProgramandoWeb"
                                            width="100%"
                                            height="400"
                                            src={url}>
                                        </iframe>
                          })
  }

  // const setAudio=(data)=>{
  //   audio = {
  //             src:data,
  //             type:"ogg",
  //           }
  // }

  const deleteAudio=(id_)=>{
    context.setModalShow({
                            show:true,
                            size:"",
                            message:<div className="text-center">
                                      <div className="mb-3">¿Está seguro que desea eliminar este mensaje?</div>
                                      <div className="btn btn-primary2 mr-1 mb-2" onClick={()=>submitDeleteAudio(id_)}>Si</div>
                                      <div className="btn btn-gray" onClick={()=>context.setModalShow({show:false,size:"sm",message:""})}>No</div>
                                    </div>
                          })
  }

  const submitDeleteAudio=(id_)=>{

    context.setModalShow({show:false,size:"sm",message:""})

    let data            =   {}
        data.user       =   Store.get("user").token
        data.id         =   id_
        Functions.PostAsync("Comentarios","deleteAudio",data,context,{name:"callbackDeleteAudio",funct:callbackDeleteAudio})
  }

  const callbackDeleteAudio=()=>{
    getInit()
    audio=false
  }
  const enviar_audio=(base64data,tada)=>{
    let data            =   {}
        data.app        =   JSON.stringify(modulo)
        data.user       =   Store.get("user").token
        data.id         =   props.id
        data.audio      =   JSON.stringify({  src:base64data,
                                              name:"notadevoz",
                                              lastModified:"2020202020",
                                              size:1000,
                                              type:"ogg",
                                            })
        Functions.PostAsync("Comentarios","setAudio",data,context,{name:"callbackSetAudio",funct:callbackSetAudio})

  }

  const callbackSetAudio=(data)=>{
    getInit()
  }

  const Reproductor=(props)=>{
    return <audio controls volume="0.5">  <source src={props.src} type="audio/ogg"/></audio>
  }

  const onDoubleClick=(e,row,name)=>{
    setOpenEditDescription(openEditDescription?false:row)
  }

  const onChangeEditOnline=(e,row)=>{
    let inputs_                 =   {};
        inputs_[e.target.name]  =   e.target.value
        inputs_.user            =   context.Store.get("user").token
        inputs_.app             =   JSON.stringify(modulo)
        inputs_.id              =   row.mensaje_token
        Functions.PostAsync("Comentarios","setItemsOnline",inputs_,context,{name:"callbackEditOnline",funct:callbackEditOnline})
  }

  const callbackEditOnline=(dataR)=>{
    //console.log(dataR);
  }

  const openText=(key)=>{
    let vermas_       = {...verMas}
        vermas_[key]  = (vermas_[key]===undefined || vermas_[key]===false)?true:false
        setVerMas(vermas_)
  }

  const handleVisible=()=>{
    let data            =   {...inputs}
    let option          =   visible?false:true
        data.visible    =   option
        setInputs(data)
        setVisible(option)
  }

  return  <><div className="Container-observaciones">
            <div className="container-input-observaciones">
              {!blockTextarea?<textarea
                name="mensaje"
                  disabled={blockTextarea}
                  required="required"
                  placeholder=""
                  className="form-control"
                  onChange={onChange}></textarea>:<pre className="p-3">Enviando mensaje...</pre>}
            </div>
            <div className="opciones-Observaciones">
              <form onSubmit={onSubmit}>
                <div className="row">
                  <div className="col-1 text-right p-0 d-none">
                    <Grabador
                              enviar_audio={enviar_audio}
                              modulo={modulo}
                    />
                  </div>
                  <div className="col-1 p-0 text-right">
                    <div className={!blockTextarea?"uploadFile position-relative":"uploadFile position-relative disabled"}>
                      <input type="file" accept="application/pdf" className="inputfile position-absolute" onChange={upload} />
                      <i className="icon-link-documento" />
                    </div>
                  </div>
                  {mensajeArchivoAdjunto?<div className="col-6 p-0 text-left h6 text-rosa pt-2">
                    {mensajeArchivoAdjunto}
                  </div>:false}
                  <div className="col-1 text-left">
                    {parseInt(Store.get("user").tipo_usuario_id)<4?<>
                      <FontAwesomeIcon
                                        title={!visible?"Activar comentario al usuario":"Desactivar comentario al usuario"}
                                        icon={faEyeSlash}
                                        className={visible?" icon-comentarios inside-button text-rosa cursor-pointer":" icon-comentarios inside-button text-gray cursor-pointer"}
                                        onClick={handleVisible}/>
                    </>:false}

                  </div>
                  <div className="col-10 text-right">
                    <button type="submi0t" className="btn btn-primary mr-2">
                      Enviar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {data.map((row,key)=>{
            let icon  = ""
            if (row.attachment) {
              switch (row.attachmentExtension) {
                case "pdf":
                  icon  = <div className="cursor-pointer" onClick={()=>openFileTab(row.attachment)} href={row.attachment}><FontAwesomeIcon className="icon-comentarios" icon={faFilePdf}/></div>
                break;
                case "jpg":
                case "jpeg":
                case "gif":
                case "png":
                  icon  = <div className="cursor-pointer" onClick={()=>openFile(row.attachment)} href={row.attachment}>
                             <img className="col-2" src={row.attachment} alt="pgrw"/>
                          </div>
                break;
                default:
                  icon  = <div className="cursor-pointer" onClick={()=>openFile(row.attachment)} href={row.attachment}><FontAwesomeIcon className="icon-comentarios" icon={faFile}/></div>
                break
              }
            }
            return <div className="row mt-3" key={key}>
                      <div className="col">
                        <div className="comentario-observacion">
                            <div className="img-comentario">
                                <img src={(row.foto)?row.foto:imgDefault} alt={row.nombres + " " + row.apellidos}/>
                            </div>
                            <div className={"texto-observacion"}>
                              <div className={verMas[key]===undefined || verMas[key]===false?"texto-observacion-close":""}>
                                { parseInt(Store.get("user").tipo_usuario_id)<=3 && row.visible==='1'?<FontAwesomeIcon  icon={faEyeSlash}className={"icon-comentarios inside-button text-rosa cursor-pointer"}/>:<FontAwesomeIcon  icon={faEyeSlash}className={"icon-comentarios inside-button text-gray"}/>}
                                <b className="ml-2">{row.nombres} {row.apellidos}</b>
                                <small className="ml-2 label text-gray">{row.fecha}</small>
                                <small className="ml-2 label text-rosa">{row.mensaje_id}</small>
                                <br/>
                                {htmlToReactParser.parse(row.mensaje)}
                                {row.attachment!==undefined && row.attachment!=="0"?<div>
                                  {icon}
                                </div>:false}
                                {row.ogg!==undefined && row.ogg!=="0"?<Reproductor src={row.ogg}/>:false}
                              </div>
                              {row.mensaje.length>340?<div className="text-right">
                                <div className="btn btn-primary2 btn-sm" onClick={()=>openText(key)}>{verMas[key]===undefined || verMas[key]===false?"Abrir ":"Cerrar "} Texto completo</div>
                              </div>:false}
                            </div>
                            {Store.get("user").tipo_usuario_id==='1' || Store.get("user").tipo_usuario_id==="2"?<div className="acciones-comentarios" >
                              <i className="icon-eliminar  cursor-pointer" onClick={()=>deleteAudio(row.mensaje_token)}></i>
                            </div>:false}
                        </div>
                      </div>
                    </div>
          })}
        </>
}
export default App
