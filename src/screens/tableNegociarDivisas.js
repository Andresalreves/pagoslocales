import React,{useState,useEffect} from 'react';
import Functions from '../helpers/Functions';
import StateContext from '../helpers/ContextState'
import TableResponsive from './table_responsive';
import Paginador from '../components/Paginador';
import PorcentajeDocumentos from '../components/PorcentajeDocumentos';


let paginacion    = []

let filter        = "";
let est           = 1;


const App=(props)=>{
  let limit ,limit2 = parseInt(props.limit);
  const context = React.useContext(StateContext);
  useEffect(() => {
    context.socketIo.on("UploadSoporteNew", () => {
      getInit()
    });
  }, [context.socketIo]);

  const [data, setData] = useState([]);

  const [paginas, setPaginas]               =   useState([]);
  const [paginaActual, setPaginaActual]     =   useState(1);
  const [open, setOpen]               =   useState(false);

  const getInit=()=>{
    setData([])
    let data_                  =   {}
        data_.limit            =   limit2
        data_.start            =   paginaActual.start
        data_.filter           =   filter
        data_.estatus          =   est
    Functions.PostAsync("Administracion","getNegociarDivisas",data_,{},{name:"callbackContinue",funct:callbackContinue})
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
    est = props.filter.estatus
    getInit()
  },[props.filter,paginaActual])

  const onChange=(e)=>{
    e.preventDefault()
    filter=e.target.value
    getInit()
  }

  const changeEstatus=(row,row3)=>{
    context.setModalShow({
      show:true,
      message:<div className="text-center h5">
                {props.filter.estatus===1 && row3.estatus!==9?"¿Desea desactivar esta cuenta?":row3.estatus===9?"¿Desea eliminar esta cuenta?":"¿Desea activar esta cuenta?"}
                <div className="row justify-content-center mt-3">
                  <div className="col-3" onClick={()=>{submitChangeEstatus(row,row3); context.setModalShow({show:false}); }}>
                    <div className="btn btn-primary btn-block">Si</div>
                  </div>
                </div>
                <div className="row justify-content-center mt-2">
                  <div className="col-3" onClick={()=>context.setModalShow({show:false})}>
                    <div className="btn btn-secondary btn-block">No</div>
                  </div>
                </div>
              </div>,
      size:""
    })
  }

  const submitChangeEstatus=(row,row3)=>{
    let data_ = {op_cuentas_bancarias_id:row.op_cuentas_bancarias_id,estatus:row3.estatus}
    Functions.PostAsync("Administracion","setEstatusCuentasBancarias",data_,{},{name:"callbackContinue4",funct:callbackContinue4})
  }

  const callbackContinue4=()=>{
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
                <TableResponsive data={data} columnas={props.td} keys="op_negociacion_id"/>
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
                                                    (row2.value!=="events")?<div className={row2.className}>{row2.value ==="porcentaje"?<PorcentajeDocumentos porcentaje={row[row2.value]}/>:row[row2.value]}</div>:<div className="d-flex justify-content-center">
                                                      {row2.icons.map((row3,key3)=>{
                                                        return  <div key={key3} className="p-1 " title={row3.label}>
                                                                  {row3.url!==undefined?<>
                                                                    {
                                                                      <row3.NavLink className="" to={row3.url+row.op_negociacion_id}>
                                                                        {row3.icon}
                                                                      </row3.NavLink>
                                                                    }
                                                                  </>:<>
                                                                    {
                                                                      <div onClick={()=>{changeEstatus(row,row3)}}>
                                                                        {row3.icon}
                                                                      </div>
                                                                    }
                                                                  </>}

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
