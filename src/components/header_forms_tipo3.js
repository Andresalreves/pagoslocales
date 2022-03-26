const App=(props)=>{
  return  <div className="row">
            <div className="col-1 pt-3 p-0 ">

            </div>
            <div className="col-10 pt-3 p-0 pb-2">
              {props.classIcon===undefined?<div className="title-generico mt-2">{props.title}</div>:<div className="title-generico mt-2">{props.title}</div>}
            </div>
            <div className="col-1 pt-3 p-0 ">

            </div>
            <div className="col-1 pt-3 p-0 ">

            </div>
            <div className="col-8 pt-3 p-0 ">
              <div className="border"></div>
            </div>
          </div>
}
export default App
