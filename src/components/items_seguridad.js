import { NavLink } from "react-router-dom";
const App=(props)=>{
  return <>
            <div className="card-seguridad borde-rosa-credit-cart">
              <div className="row">
                <div className="col-md-12">
                  <div className="saldo-mis-productos">
                    {props.title}
                  </div>
                  <div className="content row">
                    {props.data.length>0?<>
                        {props.data.map((row,key)=>{
                          return  <div  className="texto-imagen-perfil col-12 mb-3" key={key}>
                                    <div className="p-2 border h-1">
                                      <div className="subtitle-agregar-perfil">
                                        <NavLink  to={"Administracion/Seguridad/"+props.name+"/"+row.id} className="text-rosa">
                                          {row.title?row.title:" Monitorear "}
                                        </NavLink>
                                      </div>
                                      <div className="mt-1 mb-1"><NavLink to={row.url_user}><b>{row.user}</b></NavLink></div>
                                      <div className="">Result:<b>{row.messages}</b></div>
                                      <div className="">Fecha:<b>{row.date}</b></div>
                                      <div className="">Origen:<b>{row.origen}</b></div>
                                    </div>
                                  </div>

                        })}
                      </>:<div className="texto-imagen-perfil col-3 mb-3">
                            <div className="p-2">
                              No hay datos que mostrar
                            </div>
                          </div>
                      }

                  </div>
                </div>
              </div>
            </div>
          </>
}
export default App
