import React,{useState,useEffect} from 'react';
//import { Redirect } from 'react-router-dom';
import Functions from '../helpers/Functions';
import StateContext from '../helpers/ContextState'
import TableResponsive from './table_responsive';

let start         = 0
let paginacion    = []
let limit         = 50;
let filter        = "";
let est           = 1;
let update        = false

const App=(props)=>{
  const context = React.useContext(StateContext);
  const [data, setData] = useState([]);
  const [paginas, setPaginas]               =   useState([]);
  const [paginaActual, setPaginaActual]     =   useState(1);
  const [open, setOpen]                     =   useState(false);
  const [estatusActual, setEstatusActual]   =   useState(est);


  useEffect(() => {
    context.socketIo.on("TableUsuarios", () => {
      getInit()
    });
  }, [context.socketIo]);


  const getInit=()=>{
    setData([])
    let data_                  =   {}
        data_.limit            =   limit
        data_.start            =   start
        data_.filter           =   filter
        data_.estatus          =   est
        setEstatusActual(est)
    Functions.PostAsync(props.modelo,props.metodo,data_,{},{name:"callbackContinue",funct:callbackContinue})
  }

  const callbackContinue=(response)=>{
    let trows       =  (response.data.total_rows!==undefined)?parseInt(response.data.total_rows):0;
        limit       =   parseInt(props.limit)
        paginacion  =   Math.ceil(trows/limit)

    setData(response.data)
    //setTotal_rows(response.data.total_rows)

    let pages   = []
    for (var i = 0; i < paginacion; i++) {
      pages.push(i)
    }
    setPaginas(pages)
    setOpen(true)
  }

  useEffect(() => {
    est = props.filter.estatus
    getInit()
  },[props.filter])

  const onChange=(e)=>{
    e.preventDefault()
    filter  = e.target.value
    getInit()
  }

  // const PeticionServer=(e)=>{
  //   const modelo = e.target.attributes.modelo.nodeValue;
  //   const metodo = e.target.attributes.metodo.nodeValue;
  //   const id = e.target.attributes.registro_id.nodeValue;
  //   Functions.PostAsync(modelo,metodo,{usuario_id:id},{},{name:"callbackRedirect",funct:callbackRedirect})
  // }

  // const callbackRedirect=(e)=>{
  //   //console.log(e.redirect);
  //   document.location.href=e.redirect;
  //   //return <Redirect to={"'"+e.redirect+"'"}/>;
  // }

  const DenegarCuenta=(row)=>{
    context.setModalShow({
      show:true,
      message:  <div className="text-center">
                  <div className="">¿Quieres denegar la verificación del usuario?</div>
                  <div className="row justify-content-center mt-3">
                    <div className="col-12">
                      <div className="btn btn-primary btn-block" onClick={()=>onSubmitEstatus(row,9)}>Sí</div>
                    </div>
                    <div className="col-12 mt-3">
                      <div className="btn btn-gray btn-block" onClick={()=>context.setModalShow({show:false,})}>No</div>
                    </div>
                  </div>
                </div>,
      size:""
    })
  }

  const AprobarCuenta=(row)=>{
    context.setModalShow({
      show:true,
      message:  <div className="text-center">
                  <div className="">¿Quieres verificar el usuario?</div>
                  <div className="row justify-content-center mt-3">
                    <div className="col-12">
                      <div className="btn btn-primary btn-block" onClick={()=>onSubmitEstatus(row,2)}>Sí</div>
                    </div>
                    <div className="col-12 mt-3">
                      <div className="btn btn-gray btn-block" onClick={()=>context.setModalShow({show:false,})}>No</div>
                    </div>
                  </div>
                </div>,
      size:""
    })
  }

  const onSubmitEstatus=(row,estatus)=>{
    context.socket.lista_clientes_conectados()

    context.setModalShow({show:false,})
    let data_                  =   {}
        data_.usuario_id       =   row.usuario_id
        data_.estatus          =   estatus
        update                 =   row
    Functions.PostAsync(props.modelo,"VerificarCuenta",data_,{},{name:"callbackSubmitEstatus",funct:callbackSubmitEstatus})
  }

  const callbackSubmitEstatus=(response)=>{
    context.socket.emit_socket(
                                {
                                  event:"actualizar_estado_clientes",
                                  data:update,
                                }
                               )

    // context.socket(
    //                 {
    //                   event:"actualizar_estado_clientes",
    //                   data:update,
    //                 }
    //               )
    if (response.message!==undefined) {
      context.setModalShow({
        show:true,
        message:  <div className="text-center">
                    <div className="">{response.message.label}</div>
                    <div className="row justify-content-center mt-3">
                      <div className="col-12">
                        <div className="btn btn-primary btn-block" onClick={()=>context.setModalShow({show:false,})}>
                          Continuar
                        </div>
                      </div>
                    </div>
                  </div>,
        size:""
      })
    }
    getInit()
  }
  return  <>

              <div className="row">
                <div className="col-12 col-sm-8 h5 "></div>
                <div className="col h5 ">
                  <div className="input-group-2 mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="icon-buscar"/>
                      </span>
                    </div>
                    <input  type="text"
                            className="form-control-filter"
                            placeholder="Buscar"
                            name="filter"
                            onChange={onChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 d-block d-sm-none">
                  <TableResponsive data={data} columnas={props.td} AprobarCuenta={AprobarCuenta} DenegarCuenta={DenegarCuenta} keys="token"/>
                </div>
                <div className="col-12 d-none d-lg-block d-md-block d-sm-block">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          {props.td.length>0?<>
                            {props.td.map((row,key)=>{
                              return <th key={key} className={props.td.length===key+1?"text-center":""}>
                                      {row.label}
                                     </th>
                            })}
                          </>:false}
                        </tr>
                      </thead>
                      {open?<tbody>
                        {data.length===0?<>
                          <tr>
                            <td colSpan={props.td.length} className="text-center">
                              No existen datos
                            </td>
                          </tr>
                          </>:<>
                          {
                            data.map((row,key)=>{
                              return  <tr key={key}>
                                        {
                                          props.td.map((row2,key2)=>{
                                            return <td key={key2}>
                                                    {
                                                      (row2.value!=="events")?<div className={row2.className}>{row[row2.value]}</div>:<div className="d-flex justify-content-center">
                                                        {row2.icons.map((row3,key3)=>{
                                                          return  <div key={key3} className="p-1 " title={row3.label}>
                                                                    {
                                                                      row3.url!==undefined&&row3.event ===undefined?<>
                                                                      {
                                                                        <row3.NavLink className="" to={row3.url+row.token+""}>
                                                                          {row3.icon}
                                                                        </row3.NavLink>
                                                                      }
                                                                    </>:row3.event!==undefined && row3.event==="AprobarCuenta" && (estatusActual===1 || estatusActual===9)?<>
                                                                      {
                                                                        <div onClick={()=>{AprobarCuenta(row)}}>
                                                                          {row3.icon}
                                                                        </div>
                                                                      }
                                                                    </>:row3.event!==undefined && row3.event==="DenegarCuenta" && (estatusActual===1 || estatusActual===2)?<>
                                                                      {
                                                                        <div onClick={()=>{DenegarCuenta(row)}}>
                                                                          {row3.icon}
                                                                        </div>
                                                                      }
                                                                    </>:false}

                                                                </div>
                                                        })}
                                                      </div>
                                                    }
                                                   </td>
                                          })
                                        }
                                      </tr>
                            })
                          }
                        </>}
                      </tbody>:false}
                    </table>
                  </div>
                </div>
                <div className="col-12 mt-3">
                  <div className="d-flex flex-row-reverse">

                      <nav aria-label="Page navigation example" className="text-right">
                        <ul className="pagination pagination-table pr-3">
                          {
                            paginas.map((row,key)=>{
                              let thisPage  = row+1
                              return  <li key={key} className={thisPage===paginaActual?"page-item active":"page-item "} onClick={()=>{setPaginaActual(thisPage) }}>
                                        <a className={thisPage===paginaActual?"page-link text-white mr-1":"page-link text-white mr-1"} href={"#"+thisPage}>{thisPage}</a>
                                      </li>
                            })
                          }
                        </ul>
                      </nav>

                  </div>
                </div>
              </div>

          </>
}
export default App
