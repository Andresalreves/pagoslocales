import React,{useState,useEffect} from 'react';
import Functions from '../helpers/Functions';
import StateContext from '../helpers/ContextState'
import TableResponsive from './table_responsive';
import Paginador from '../components/Paginador';
import PorcentajeDocumentos from '../components/PorcentajeDocumentos';


let paginacion    = []
let filter        = "";
let update        = false


const App=(props)=>{
  let limit ,limit2 = parseInt(props.limit);
  const context = React.useContext(StateContext);
  const [data, setData] = useState([]);
  const [paginas, setPaginas]               =   useState([]);
  const [paginaActual, setPaginaActual]   =   useState({label: 1, start: 0});
  const [open, setOpen]                   =   useState(false);

  useEffect(() => {
    context.socketIo.on("table_verificar_cuentas_bancarias", () => {
      getInit()
    });
  }, [context.socketIo]);

  const getInit=()=>{
    setData([])
    let data_                  =   {}
        data_.limit            =   limit2
        data_.start            =   paginaActual.start
        data_.filter           =   filter
        data_.estatus          =   props.filter===undefined?"any":props.filter.estatus
    Functions.PostAsync(props.modelo,props.metodo,data_,{},{name:"callbackContinue",funct:callbackContinue})
  }

  const callbackContinue=(response)=>{
    let trows       =  (response.data.total_rows!==undefined)?parseInt(response.data.total_rows):0;
        limit       =   parseInt(props.limit)
        paginacion  =   Math.ceil(trows/limit)
        setData(response.data.rows)
        /*cambio*/
        let pages           =   []
        let ultimo          =   0
        for (var i = 0; i < paginacion; i++) {
          ultimo=limit2*(i)
          pages.push({label:i+1,start:ultimo})
        }
        setPaginas(pages)
    setOpen(true)
  }

  useEffect(() => {
    filter=""
  },[])

  /*cambio*/
  useEffect(() => {
    getInit()
  },[paginaActual,props.filter])

  const onChange=(e)=>{
    e.preventDefault()
    filter=e.target.value
    getInit()
  }

  const PeticionServer=(e)=>{
    const modelo = e.target.attributes.modelo.nodeValue;
    const metodo = e.target.attributes.metodo.nodeValue;
    const id = e.target.attributes.registro_id.nodeValue;
    Functions.PostAsync(modelo,metodo,{usuario_id:id},{},{name:"callbackRedirect",funct:callbackRedirect})
  }

  const callbackRedirect=(e)=>{
    //console.log(e.redirect);
    document.location.href=e.redirect;
    //return <Redirect to={"'"+e.redirect+"'"}/>;
  }

  const changeEstatus=(row)=>{

    context.setModalShow({
      show:true,
      message:  <div className="text-center">
                  <div className="">
                    {props.filter.estatus===2?"¿Desea desactivar este usuario?":"¿Desea activar este usuario?"}
                  </div>
                  <div className="row justify-content-center mt-3">
                    <div className="col-12">
                      <div className="btn btn-primary" onClick={()=>onSubmitEstatus(row,props.filter.estatus===2?9:2)}>Si</div>
                      <div className="btn btn-gray" onClick={()=>context.setModalShow({show:false})}>No</div>
                    </div>
                  </div>
                </div>,
      size:""
    })
  }


  const onSubmitEstatus=(row,estatus)=>{
    context.socket.lista_clientes_conectados()
    context.setModalShow({show:false,})
    let data_                  =   {...row}
        data_.estatus          =   estatus
        update                 =   row
    Functions.PostAsync(props.modelo,props.metodo+"Status",data_,{},{name:"callbackSubmitEstatus",funct:callbackSubmitEstatus})
  }

  const callbackSubmitEstatus=(response)=>{
    context.socketIo.emit("TableUsuarios",{})
    context.socket.emit_socket(
                                {
                                  event:"actualizar_estado_clientes",
                                  data:update,
                                }
                               )


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
                          name="filter" onChange={onChange}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 d-block d-sm-none">
                <TableResponsive data={data} columnas={props.td} keys="id"/>
              </div>
              <div className="col-12 d-none d-lg-block d-md-block d-sm-block">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        {props.td.length>0?<>
                          {props.td.map((row,key)=>{
                            return <th key={key} className={row.className}>
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
                                          return <td key={key2} style={{width: row2.classNameTD}}>
                                                  {
                                                    (row2.value!=="events")?<div className={row2.value==="estatus_string"?row2.className+row[row2.value]:row2.className}>{row2.value ==="porcentaje"?<PorcentajeDocumentos porcentaje={row[row2.value]}/>:row[row2.value]}</div>:<div className="d-flex justify-content-center">
                                                      {row2.icons.map((row3,key3)=>{
                                                        return  <div key={key3} className="p-1 " title={row3.label}>
                                                                  {
                                                                    row3.event_andres!==undefined&&row3.url===undefined?<>
                                                                    <div>
                                                                      <i className={row3.icon} onClick={PeticionServer} modelo={row3.modelo} metodo={row3.metodo} registro_id={row.funcionario_id} />
                                                                    </div>
                                                                    </>:row3.url!==undefined&&row3.event ===undefined?<>
                                                                    {
                                                                      <row3.NavLink className="" to={row3.url+row.id}>
                                                                        {row3.icon}
                                                                      </row3.NavLink>
                                                                    }
                                                                  </>:row.estatus==="2" && row3.event==='DenegarCuenta'?<>
                                                                    {
                                                                      <div onClick={()=>{changeEstatus(row)}}>
                                                                        {row3.icon}
                                                                      </div>
                                                                    }
                                                                  </>:row.estatus==="9" && row3.event==='AprobarCuenta'?<>
                                                                    {
                                                                      <div onClick={()=>{changeEstatus(row)}}>
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
                <Paginador paginas={paginas} paginaActual={paginaActual} setPaginaActual={setPaginaActual}/>
              </div>
            </div>
          </>
}
export default App
