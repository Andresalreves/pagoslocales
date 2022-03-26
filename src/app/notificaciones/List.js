import React,{useState,useEffect} from 'react';
import Functions from "../../helpers/Functions";
import Constants from "../../helpers/Constants";
import StateContext from '../../helpers/ContextState';
import FormNotificaciones from "../../components/FormNotificaciones";


const App=()=>{
  const context = React.useContext(StateContext);
  const [selection, setSelection] = useState({
                                                label:"Home",
                                                url:"/"
                                              });
  const [data, setData]     = useState({});
  const [reset, setReset]     = useState(false);



  useEffect(() => {
    setReset(true)
  },[selection])

  useEffect(() => {
    if (reset) {
      setReset(false)
    }
  },[reset])

  useEffect(() => {
    getInit()
  },[])

  const getInit=()=>{
    Functions.PostAsync("Notificaciones","getFormNotificaciones",{},context,{name:"callbackInit",funct:callbackInit})
  }

  const callbackInit=(response)=>{
    if (response.data!==undefined) {
      setData(response.data)
    }
  }

  const handleDelete=(row)=>{
    let send  = {id:row.token}
    Functions.PostAsync("Notificaciones","delFormNotificaciones",send,context,{name:"callbackDel",funct:callbackDel})
  }

  const callbackDel=(response)=>{
    getInit()
  }

  return  <div className="Contenido-Home">
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="title-home mb-4">Notificaciones</div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-3">
                <div className="card">
                  <div className="card-body">
                    {Constants.Modulos.map((row,key)=>{
                      return  <div  className={row.label===selection.label?" cursor-pointer text-rosa":" cursor-pointer "}
                                    key={key}
                                    onClick={()=>setSelection(row)}>
                                {row.label}
                              </div>
                    })}
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-9 listados">
                <div className="card">
                  <div className="card-header text-white">
                    <b>Crear notificación {selection.label}</b>
                  </div>
                  <div className="card-body">
                    {!reset?<>
                      <FormNotificaciones {...context} row={selection} getInit={getInit}/>
                    </>:false}

                  </div>
                </div>

                <div className="card mt-3">
                  <div className="card-header text-white">
                    <b>Mensajes guardados</b>
                  </div>
                  <div className="card-body">
                    {!reset?<>
                      {data[selection.url]!==undefined?<>
                          {data[selection.url].map((row2,key2)=>{
                            return  <div key={key2} className="mb-2 border-bottom pb-1 bg-gray position-relative">
                                      <div className="p-3">
                                        <div className="h7"><b>ID:{row2.label}</b></div>
                                        <div className="h7"><b>Título: {row2.title}</b></div>
                                        <div className="h7">{row2.texto}</div>
                                        <div className="h7">{row2.alias}</div>
                                        <div className="h7 position-absolute position-absolute-delete cursor-pointer" onClick={()=>handleDelete(row2)}>
                                          x
                                        </div>
                                      </div>
                                    </div>
                          })}
                      </>:false}
                    </>:false}
                  </div>
                </div>
              </div>
            </div>
          </div>
}
export default App
