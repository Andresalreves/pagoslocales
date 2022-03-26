const App=(props)=>{
  return  <div className="row">
            {props.classIcon!==undefined? <div className="col-2 col-sm-2 text-right">
                                            <i className={props.classIcon}/>
                                          </div>:false}
            <div className="col-8 col-sm-8 pt-sm-3 pt-2 p-0">
              {props.classIcon===undefined?<div className="title-generico mt-2 pl-4">{props.title}</div>:<div className="title-generico mt-2">{props.title}</div>}
            </div>
            <div className={props.classIcon===undefined?"col-12 col-sm-3 pt-3 p-0 text-right x5":"col-12 col-sm-3 pt-3 p-0 text-right x5"}>
              {props.NavLink!==undefined?<props.NavLink  to={props.to} className="x5 text-gray cursor-pointer">
                X
              </props.NavLink>:false}
            </div>
          </div>
}
export default App
