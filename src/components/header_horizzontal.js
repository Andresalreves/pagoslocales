const App=(props)=>{
  return  <div className="row text-left">
            <div  className={"col text-title  cursor-pointer border-bottom-rosa-x3 pb-2 pl-5"}>
              <i className="icon-listado-cuentas-internacionales text-rosa"/>
              <span className="text-white ml-2">{props.title}</span>
            </div>
          </div>
}

export default App
