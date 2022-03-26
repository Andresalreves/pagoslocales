const App=(props)=>{
  return  <div className='row'>
            {props.classIcon!==undefined? <div className={props.class?props.class:'col-2 text-right'}>
                                            <i className={props.classIcon}/>
                                          </div>:false}
            <div className="col-10 col-sm-6 pt-2 pt-sm-3 p-0">
              <div className="title-generico">{props.title}</div>
              <div className="cuenta-tarjeta-home">{props.subtitle}</div>
            </div>
            <div className="col-12 col-sm-3 pt-3 p-0 text-right x5">
              {props.NavLink!==undefined?<props.NavLink  to={props.to} className="x5 text-gray cursor-pointer">
                X
              </props.NavLink>:false}
            </div>
          </div>
}
export default App
