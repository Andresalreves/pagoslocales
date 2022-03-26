import React,{useState,useEffect} from 'react';
// import { faPlus } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StateContext from '../helpers/ContextState';
import Config from '../helpers/Config';


let limitUpload = 1000000;
const input       = {};

const App=(props)=>{

  const context   =   React.useContext(StateContext);
  const [imagen, setImage] = useState(false);
  const [download, setDownload] = useState(false);

  useEffect(() => {
    setDownload(props.defaultValue)
  },[props.defaultValue])

  const upload=(event)=>{
    let file          =   event.target.files[0];

    if (file.type!=="application/pdf") {
      return context.setModalShow({
                              show:true,
                              message:<div className="text-center text-dark">Formato de archivo no permitido</div>
                            })
    }


    let reader        =   new FileReader();
    if (props.maxSizeFile!==undefined) {
      limitUpload     =   parseInt(props.maxSizeFile)
    }
    reader.onload       =   function() {
      if (file.size<limitUpload) {
        let input_        =   {...input}
            input_        =   { src:reader.result,
                                name:file.name,
                                lastModified:file.lastModified,
                                size:file.size,
                                type:file.type,
                              }

            if (props.setUpload!==undefined) {
              setImage(input_)
              props.setUpload(input_)
              //props.setUpload(event.target.files[0])
            }
      }else {
        context.setModalShow({
                                show:true,
                                message:<div className="text-center text-danger">El Archivo supera el límite permitido de {limitUpload/1000000}MB</div>
                              })
      }
    }
    reader.readAsDataURL(file);
  }

  return  <div className="uploadImg">
            <div className="uploadFile ">
              <div className="row text-gray">
                <div className="col-1 border-bottom">
                  <i className="icon-listado text-gray x3"/>
                </div>
                <div className="col-5 border-bottom position-relative">
                  <input accept="application/pdf" type="file" className="inputfile position-absolute" onChange={upload} />
                  {!imagen?<div className="text-gray x2">Seleccionar archivo</div>:<div className="text-rosa x2">{(imagen.name.length>20)?imagen.name.substr(0,15)+' ...':imagen.name}</div>}
                </div>
                <div className="col-6">
                  {download && download!==undefined?<div style={{zIndex:10000}}><a href={download}><i className="icon-descargar-pdf x3 cursor-pointer mr-2 text-rosa"/></a> <a href={Config.ConfigApirest}><i className="icon-eliminar-tabla x3 cursor-pointer text-rosa"/></a></div>:false}
                  {!imagen?<div className={download===undefined?"x1":"d-none"}>Archivo aún no seleccionado</div>:<div style={{zIndex:10000}}><i className="icon-listado x3 cursor-pointer mr-2 text-rosa"/> <i className="icon-listado x3 cursor-pointer text-rosa"/></div>}
                </div>
              </div>
            </div>
          </div>
}
export default App
