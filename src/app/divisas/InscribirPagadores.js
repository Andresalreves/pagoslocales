import React,{useState,useEffect} from 'react';
import { NavLink,useHistory, useParams } from "react-router-dom";
import Functions from "../../helpers/Functions";
import Store from "../../helpers/Store";
import Table from "../../screens/table";
import Header from "../../components/header_forms_andres";
import StateContext from '../../helpers/ContextState';
import Select from '../../screens/select';


const App=()=>{
    let history = useHistory();
    const parametros=useParams()
    const context = React.useContext(StateContext);
    const [tipo_pagador, setTipoPagador] = useState([]);
    const [info, setInfo] = useState(false);
    const [inputs, setInputs] = useState({});
    const [data, setData] = useState(false);
    const [ver, setVer] = useState(parametros.id===undefined?true:false);

    useEffect(() => {
      if (parametros.id!==undefined) {
        getInit2()
      }else {
        getInit()
      }
    },[])

    function getInit2(){
      let data  = {id:parametros.id}
      Functions.PostAsync("Divisas","getPagador",data,{},{name:"callbackGetInit2",funct:callbackGetInit2})
    }

    function callbackGetInit2(data){
      setInfo(data.data);
      setInputs(data.data)
      getInit()
    }

    function getInit(){
        let data        = {}
            data.token  = Functions.segment()
        Functions.PostAsync("Maestros","get_tablas_maestras",data,context,{name:"callbackGetInit",funct:callbackGetInit})
    }

    function callbackGetInit(data){
      setData(data);
      setVer(true)
    }
    const onSubmit=(e)=>{
        e.preventDefault();
        //return history.push("/Verificarpagador");
        let send={...inputs}
            send.token=Store.get("user").token
        Functions.PostAsync("Divisas","setPagadores",send,{},{name:"callbackSubmit",funct:callbackSubmit})
    }
    function callbackSubmit(response){
      if (response.data!==undefined && response.data.id!==undefined) {
        history.push("/Divisas/Verificarpagador/"+response.data.id);
      }
      if (response.error!==undefined && response.error.public) {
        context.setModalShow({
          show:true,
          message:<div className="text-center">
                    {response.error.label}
                    <div className="row justify-content-center mt-2">
                      <div className="col-12" onClick={()=>context.setModalShow({show:false})}>
                        <div className="btn btn-primary btn-block">Reintentar</div>
                      </div>
                    </div>
                  </div>,
          size:""
        })
        //history.push("/Verificarpagador/"+response.data.id);
      }
    }
    const onChange=(e)=>{
        Functions.Inputs(e,inputs, setInputs)
    }

  return  <>
              {ver?<div className="Contenido-Home">
            <div className="d-none d-lg-block d-sm-none">
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="title-home mb-4">Inscribir Pagadores</div>
                </div>
                <div className="col-12 col-md-6 text-center text-md-right mb-2">
                  <NavLink className="btn btn-primary" to="/Divisas/InscribirPagadoresMasivamente">
                    <i className="icon-agregar mr-1"/>Inscribir Pagadores Masivamente
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="row mt-0 mt-sm-4 ">
              <div className="col-12 col-md-7 m-auto">
                <div className="card border-card">
                  <div className="card-body">
                      <div className="col-md-8 ml-auto mr-auto mt-0 mt-sm-3">
                        <Header title="Nuevo pagador" subtitle="Inscribir pagador" classIcon="icon-nuevo-pagador ico-generico"/>
                        <form onSubmit={onSubmit} className="mt-4">
                            <div className="row mb-2">
                              <div className="col-12">
                                <input  className="form-control"
                                        type="text"
                                        required={true}
                                        name="pagador"
                                        placeholder="Tercero | Pagador"
                                        required={true}
                                        maxLength="22"
                                        defaultValue={(info.pagador!==undefined)?info.pagador:""}
                                        onChange={onChange}
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-12 ">
                                <Select
                                  required={true}
                                  data={(data.ma_tipo_pagador!==undefined?data.ma_tipo_pagador:[])}
                                  name="tipo_pagador"
                                  selectDefault="Tipo de pagador"
                                  defaultValue={info.tipo_pagador}
                                  onChange={onChange}
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-12 ">
                                <Select
                                  required={true}
                                  data={(data.ma_monedas!==undefined?data.ma_monedas:[])}
                                  name="moneda_pago"
                                  defaultValue={(info.moneda_pago!==undefined)?info.moneda_pago:""}
                                  selectDefault="Moneda de pago"
                                  onChange={onChange}
                                />
                              </div>
                            </div>
                            <div className="row mb-2">
                              <div className="col-12">
                                <input  name="nombre_cuenta"
                                        maxLength="15"
                                        required={true}
                                        className="form-control"
                                        placeholder="Nombre de la cuenta"
                                        defaultValue={(info.nombre_cuenta!==undefined)?info.nombre_cuenta:""}
                                        onChange={onChange}
                                        />
                              </div>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary mb-3 mt-3 mr-3 col-12 col-md-3">
                                    Siguiente
                                </button>
                                <NavLink to="/Divisas/Pagadores" className="btn btn-gray text-white col-12 col-md-3">Cancelar</NavLink>
                            </div>
                        </form>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>:false}</>
}
export default App
