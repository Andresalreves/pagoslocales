import React,{useState} from 'react';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StateContext from '../helpers/ContextState';

let limitUpload = 1000000;
const input       = {};

const App=(props)=>{

  const context   =   React.useContext(StateContext);
  const [imagen, setImage] = useState(false);

  const upload=(event)=>{
    let file          =   event.target.files[0];

    if (  file.type!=="image/jpeg" &&
          file.type!=="image/gif" &&
          file.type!=="image/png") {
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
            <div className="card uploadFile position-relative dashed">
              <input type="file" className="inputfile position-absolute" onChange={upload} accept="image/*" />
              <div className="card-body p-2 pr-5 pl-5">
                <div className="title-agregar-perfil">
                  <FontAwesomeIcon icon={faPlus} className="mr-1"/>
                  Agregar
                </div>
                <div className="subtitle-agregar-perfil">{props.title}</div>
                <div className="texto-imagen-perfil">{props.textFileAllow}</div>
                {imagen?<><img src={imagen.src} className="img-fluid" alt="Previo"/></>:false}
              </div>
            </div>
          </div>
}
export default App
