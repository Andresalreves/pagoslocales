const App=(props)=>{
  return  <div className="row">
            {props.classIcon!==undefined? <div className="col-3 col-sm-2 text-sm-right">
                                            <i className={props.classIcon}/>
                                          </div>:false}
            <div className="col-8 col-sm-10 pt-sm-3 p-0">
              {props.classIcon===undefined?<div className="title-generico mt-2 pl-4">{props.title}</div>:<div className="title-generico mt-2">{props.title}</div>}
              {props.subtitle!==undefined?<div className="cuenta-tarjeta-home">{props.subtitle}</div>:false}
              {props.estatus!==undefined?<div className="cuenta-tarjeta-home"><i className={props.estatus==="2"?"icon-inactivo-off text-success":"icon-inactivo-off text-danger"}/><span className={props.estatus==="2"?"text-success":"text-danger"}>{props.estatus_string}</span></div>:false}
            </div>
            <div className={props.classIcon===undefined?"col-1 col-sm-1 pt-sm-3 p-0 text-right x5":"col-1 col-sm-1 pt-sm-3 p-0 text-right x5"}>
              {props.NavLink!==undefined?<props.NavLink  to={props.to} className="x5 text-gray cursor-pointer">
                X
              </props.NavLink>:false}
            </div>
          </div>
}
export default App
