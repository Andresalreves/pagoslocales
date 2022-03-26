import React,{useState,useEffect} from 'react';
import StateContext from '../helpers/ContextState';
import Functions from '../helpers/Functions';
import { faPlus,faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from 'react-bootstrap/Spinner'


let start         = 0
let paginacion    = []
let total_rows    = 0;
let limit         = 0;
let filter        = "";
let label        = "";

const Component=(props)=>{

  const [loading, setLoading]  =   useState(false);

  const submit=()=>{
    setLoading(true)
    let data              =   {}
        data.token        =   props.context.Store.get("user").token
        data.label        =   label
        data.tabla        =   props.row
        Functions.PostAsync(props.modulo,props.metodo+"Add",data,props.context,{name:"callbackInit",funct:callbackInit})
  }

  const callbackInit=(data)=>{
    if (!data.response.error) {
      props.getInit()
    }
    setLoading(false)
  }

  const onChange=(e)=>{
    label=e.target.value
  }

  return  <>
            {!loading?<div className="row">
              <div className="col">
                <input type="text" name="label" className="form-control" placeholder="Label..." onChange={onChange} />
              </div>
              <div className="col">
                <div className="btn btn-primary btn-block" onClick={submit}>Guardar</div>
              </div>
            </div>:<>
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </>}
          </>
}

const App=(props)=>{
  const context                         =   React.useContext(StateContext);
  const [data, setData]                 =   useState([]);
  const [tablas, setTablas]                 =   useState([]);
  const [paginas, setPaginas]           =   useState([]);
  const [paginaActual, setPaginaActual] =   useState(1);
  const [loading, setLoading]           =   useState(false);

  function getInit(){
    setLoading(true)
    limit = parseInt(props.limit)
    if (paginaActual>1) {
      start = ((paginaActual-1)*limit)-1 ;
    }else {
      start = 0;
    }
    let data              =   {}
        data.token        =   context.Store.get("user").token
        data.tabla        =   props.tabla
        data.limit        =   limit
        data.start        =   start
        data.filter       =   filter
        Functions.PostAsync(props.modulo,props.metodo,data,context,{name:"callbackInit",funct:callbackInit})
  }

  function callbackInit(data){
    total_rows  =   parseInt(data.response.total_rows)
    paginacion  =   Math.ceil(total_rows/props.limit)
    setTablas(data.response.tablas)
    setData(data.response.data)
    let pages   = []
    for (var i = 0; i < paginacion; i++) {
      pages.push(i)
    }
    setPaginas(pages)
    setLoading(false)
  }

  useEffect(() => {
    getInit()
  },[paginaActual])

  const onChange=(e)=>{
    e.preventDefault()
    filter=e.target.value
    getInit()
  }

  const Delete=(table,row)=>{
    let data              =   {}
        data.token        =   context.Store.get("user").token
        data.id           =   row[Object.keys(row)[0]]
        data.key          =   Object.keys(row)[0]
        data.table        =   table
        Functions.PostAsync(props.modulo,props.metodo+"Delete",data,context,{name:"callbackDelete",funct:callbackDelete})
  }

  const callbackDelete=(data)=>{
    if (!data.response.error) {
      getInit()
    }
  }

  return  <>
            {!loading?<div className="row">
                        {props.title?<>
                                      <div className="col-6 h5 border-bottom pb-2">{props.title}</div>
                                      <div className="col-6 h5 border-bottom pb-2">
                                        <input type="text" className="form-control d-none" placeholder="Filtrar..." name="filter" onChange={onChange}/>
                                      </div>
                                    </>:<></>}
                        {tablas.map((row,key)=>{
                          if (row.label==='Root') {
                            return false;
                          }
                          return <div className="col-12 col-sm-4 mb-3 component-table" key={key}>
                                  <div className="card">
                                    <div className="card-body">
                                      <div className="row">
                                        <div className="col-12 mb-2">
                                          <div className="title">
                                            Maestro {row}
                                          </div>
                                        </div>
                                        {data[row]!==undefined?<>
                                          {data[row].map((row2,key2)=>{
                                            return  <div className="col-12" key={key2}>
                                                      <div className="title pl-3">
                                                        {row2.label} <FontAwesomeIcon className="cursor-pointer" onClick={()=>Delete(row,row2)} icon={faTrash}/>
                                                      </div>
                                                    </div>
                                          })}
                                          </>:<></>}
                                      </div>
                                    </div>
                                    <div className="card-footer text-right">
                                      <div className="row justify-content-end">
                                        <div className="col-12">
                                          <div className="border-left cursor-pointer" onClick={()=>{context.setModalShow({  show:true,
                                                                                                                            message:<Component {...props} context={context} row={row} getInit={getInit}/>,
                                                                                                                            size:"md",
                                                                                                                            header:{  show:true,
                                                                                                                                    label:"Tabla "+row
                                                                                                                                  }
                                                                                                                        })}}>
                                            <FontAwesomeIcon icon={faPlus}/>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                        })}
                        <div className="col-12 mt-3">
                          <nav aria-label="Page navigation example">
                            <ul className="pagination">
                              {
                                paginas.map((row,key)=>{
                                  let thisPage  = row+1
                                  return  <li key={key} className={thisPage===paginaActual?"page-item active":"page-item "} onClick={()=>{setPaginaActual(thisPage) }}>
                                            <a className={thisPage===paginaActual?"page-link text-white":"page-link "} href={"#"+thisPage}>{thisPage}</a>
                                          </li>
                                })
                              }
                            </ul>
                          </nav>
                        </div>
                      </div>:<div className="text-center">
                        <Spinner animation="border" role="status">
                          <span className="sr-only">Loading...</span>
                        </Spinner>
                      </div>}

          </>
}
export default App
