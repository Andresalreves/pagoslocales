import React,{useState} from 'react';
import UploadImg from '../../components/uploadImg'
import Functions from "../../helpers/Functions";
const App=()=>{
  const [upload, setUpload] = useState(false);
  const [inputs, setInputs] = useState({});

  const onChange=(e)=>{
    Functions.Inputs(e,inputs, setInputs)
  }

  const onSubmit=(e)=>{
    e.preventDefault()
  }

  return  <form onSubmit={onSubmit}>
            <div className="p-5">
              <div className="card">
                <div className="card-body bg-gray2 border-none">
                  <div className="p-3">
                    <div className="title-form">
                      <h1>Agregar Empresa</h1>
                    </div>
                    <div className="subtitle-forms">
                      Creación de Afiliados
                    </div>
                    <div className="title-info-forms">
                      Información basica empresa
                    </div>
                    <div className="row">
                      <div className="col-12 col-md-4 mb-3">
                        <UploadImg
                            upload={upload}
                            setUpload={setUpload}
                            title={"Logo de perfil"}
                            maxSizeFile="1000000"
                            textFileAllow="El tamaño de la imagen no puede superar 1MB solo los tipos PNG, GIF y JPG son soportados."
                        />
                      </div>
                      <div className="col-12 col-md-4 mb-3">
                         <div className="titulo-superior mt-3">Tipo de identificacion*</div>
                         <div className="row">
                           <div className="col text-center">
                              <label>
                                <span className="mr-1">
                                  <span className="titulo-radio-button-empresa">NIT</span>
                                </span>
                                <input type="radio" name="tipo_identificacion" value="NIT" className="tipo_identificacion"/>
                              </label>
                           </div>
                           <div className="col text-center">
                              <label>
                                <span className="mr-1">
                                  <span className="titulo-radio-button-empresa">C.C</span>
                                </span>
                                <input type="radio" name="tipo_identificacion" value="Cédula Ciudadanía" className="tipo_identificacion"/>
                              </label>
                           </div>
                           <div className="col text-center">
                              <label>
                                <span className="mr-1">
                                  <span className="titulo-radio-button-empresa">Pasaporte</span>
                                </span>
                                <input type="radio" name="tipo_identificacion" value="Pasaporte" className="tipo_identificacion"/>
                              </label>
                           </div>
                        </div>
                        <div className="mt-3">
                          <div className="input-group2 input-group-sm mt-4">

                              <input onChange={onChange} type="hidden" className="new-input col-md-3" name="identificacion_ext" id="identificacion_ext" placeholder="DV" maxlength="1" />
                          </div>
                          <input onChange={onChange} type="text" className="new-input" name="identificacion" id="identificacion" placeholder="Número de Identificación" maxlength="12" require="require"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </form>
}
export default App
