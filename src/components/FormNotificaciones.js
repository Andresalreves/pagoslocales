import React,{useState,useEffect} from 'react';
import Functions from "../helpers/Functions";
import logo from "../assets/images/design/android-chrome-192x192.png";

const App=(props)=>{

  const [inputs, setInputs] = useState({url:props.row.url});
  const [url, setUrl]       = useState("");

  useEffect(() => {
    setUrl(props.row.url)
  },[])

  const onChange=(e)=>{
    Functions.Inputs(e,inputs, setInputs)
  }

  const onSubmit=(e)=>{
    e.preventDefault();
    document.getElementById("myForm").reset();
    let send  = {...inputs}
    Functions.PostAsync("Notificaciones","setFormNotificaciones",send,{},{name:"callbackSubmit",funct:callbackSubmit})
  }

  const callbackSubmit=(response)=>{
    if (response.error===undefined) {
      props.setModalShow({
        show:false,
        message:<></>,
        size:"lg"
      })
      props.getInit()
      setInputs({})
      setUrl("")
    }
  }

  return  <form className="row" onSubmit={onSubmit} id="myForm">
            <div className="col-12 h5">
              Creación de Notificaciones
            </div>
            <div className="col-12 col-sm-4 text-left ">
              <div className="p-2 border">
                <div className="h7">
                  <b>Tiene 3 notificaciones nuevas</b>
                </div>
                <div className="row">
                  <div className="col-4 pr-0 pt-0">
                    <img src={logo} alt="" className="img-fluid"/>
                  </div>
                  <div className="col h7 p-0 pt-2">
                    {(inputs.texto)?inputs.texto:"Mensaje o notificación..."}
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary col-12 mt-3">Guardar</button>
            </div>
            <div className="col-12 col-sm-8 text-left">
              <div className="row">
                <div className="col-12 col-sm-12 mb-3">
                  <input  className="form-control"
                          type="text"
                          required={true}
                          name="label"
                          placeholder="Identificador"
                          defaultValue={(inputs.label!==undefined)?inputs.label:""}
                          onChange={onChange}

                  />
                </div>
                <div className="col-12 col-sm-12 mb-3">
                  <input  className="form-control"
                          type="text"
                          name="url"
                          placeholder="Módulo"
                          value={url}
                          readOnly
                  />
                </div>
                <div className="col-12 mb-3">
                  <input  className="form-control"
                          type="text"
                          name="alias"
                          placeholder="URL"
                          onChange={onChange}
                  />
                </div>
                <div className="col-12 mb-3">
                  <input  className="form-control"
                          type="text"
                          required={true}
                          name="title"
                          placeholder="Título (sólo se verá en la campanita arribas)"
                          defaultValue={(inputs.texto!==undefined)?inputs.texto:""}
                          onChange={onChange}
                  />
                </div>
                <div className="col-12 mb-3">
                  <input  className="form-control"
                          type="text"
                          required={true}
                          name="texto"
                          placeholder="Texto"
                          defaultValue={(inputs.texto!==undefined)?inputs.texto:""}
                          onChange={onChange}
                  />
                </div>
              </div>
            </div>
          </form>
}
export default App
