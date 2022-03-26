const App=(props)=>{
  return  <div className='d-flex align-items-center w-100'>
            {props.classIcon!==undefined? <div className={props.class?props.class:'text-right'}>
                                            <i className={props.classIcon}/>
                                          </div>:false}
            <div className="pt-sm-3 p-0 d-flex flex-wrap ">
              <div className="title-generico w-100">{props.title}</div>
              {props.subtitle?<>
                <div className="cuenta-tarjeta-home w-100">{props.subtitle}</div>
              </>:false}
              {props.estado!==undefined?<>
                <div className={"estatus"+(props.data!==undefined && props.data.estatus_string!==undefined?props.data.estatus_string:props.estado)}>
                  <i className=" icon-activo-on"></i>
                  {(props.data!==undefined && props.data.estatus_string!==undefined)?props.data.estatus_string:props.estado}
                </div>
              </>:false}
            </div>
            <div className="pr-3 p-0 ml-auto">
              {props.NavLink!==undefined?<props.NavLink  to={props.to} className="x5 text-gray cursor-pointer">
                X
              </props.NavLink>:false}
              {props.history!==undefined?<div  onClick={()=>{window.history.back()}} className="x5 text-gray cursor-pointer">
                X
              </div>:false}
            </div>
          </div>
}
export default App
