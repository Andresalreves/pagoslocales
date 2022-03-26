import React,{useState,useEffect} from 'react';
import { NavLink,useHistory, useParams } from "react-router-dom";
import Functions from "../../helpers/Functions";
import Header from "../../components/header_forms_andres";
import StateContext from '../../helpers/ContextState';
import Select from '../../screens/select';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'


const App=()=>{
    let history = useHistory();
    const parametros=useParams()
    const context = React.useContext(StateContext);
    const [data, setData]           =   useState(false);
    const [info, setInfo]           =   useState(false);
    const [inputs, setInputs]       =   useState({});
    const [bancos, setBancos]       =   useState([]);
    const [ver, setVer]             =   useState(parametros.id===undefined?true:false);
    const [pasaporte,setPasaporte]  =   useState(true);
    const [openBanco,setOpenBanco]  =   useState(false);
    const [display, setDisplay]     =   useState(false);


    useEffect(() => {
      if (parametros.id!==undefined) {
        getInit2()
      }else {
        getInit()
      }
    },[])

    function getInit2(){
        let data  = {id:parametros.id}
        Functions.PostAsync("Transferir","GetCuenta",data,{},{name:"callbackGetInit2",funct:callbackGetInit2})
    }

    function callbackGetInit2(data){
      if (data.data!==undefined) {
        setInfo(data.data);
        setInputs(data.data)
      }
      getInit()
    }

    function getInit(){
        let data        = {}
            data.token  = Functions.segment()
        Functions.PostAsync("Maestros","get_tablas_maestras",data,context,{name:"callbackGetInit",funct:callbackGetInit})
    }

    function callbackGetInit(data){
      if (data.ma_bancos!==undefined) {
        let items_ = []
            data.ma_bancos.map((row,key)=>{
              return items_.push({id:row.value,name:row.label})
            })
            setBancos(items_)
      }

      setData(data)
      setVer(true)
    }

    const onSubmit=(e)=>{
        e.preventDefault();
        let send  = {...inputs}
        Functions.PostAsync("Transferir","setCuentaDestino",send,{},{name:"callbackSubmit",funct:callbackSubmit})
    }

    const callbackSubmit=(response)=>{

      if (response.data!==undefined && response.data.id!==undefined) {
        history.push("/Transferir/VerificarDatosCuenta/"+response.data.id);
      }

      if (response.message!==undefined && response.message.public!==undefined) {
        return context.setModalShow({
          show:true,
          message:<>
                    <div className="m-auto text-center">
                      <i className="icon-configuracion icon-mesage"></i>
                      <h6 className="mt-2"><b>Atención</b></h6>
                      <div className="text-center ml-auto mr-auto w-50 mt-2">
                        {response.message.label}
                      </div>
                      <div className="w-100 text-center mt-4 mb-1">
                        <button type="button" className="btn btn-primary" onClick={()=>context.setModalShow({show:false})}>Reintentar</button>
                      </div>
                    </div></>,
          size:"md"
        })
      }
    }

    const onChange=(e)=>{
      if(e.target.name ==='tipo_identificacion'){
        let elemento = document.getElementById("nro_identificacion");
            elemento.value=""
        if(e.target.value ==='3'){
          setPasaporte(true);
        }else{
          setPasaporte(false);
        }
      }
      Functions.Inputs(e,inputs, setInputs);
    }


    const handleOnSearch = (string, results) => {
      setDisplay(false)
      // onSearch will have as the first callback parameter
      // the string searched and for the second the results.
      //console.log(string, results)
    }

    const handleOnHover = (result) => {
      // the item hovered
      //console.log(result)
    }

    const handleOnSelect = (item) => {
      // the item selected
      let inputs_={...inputs}
          inputs_.entidad_bancaria  = item.id
          setInputs(inputs_)
          if (item.id==="38") {
            setDisplay(true)
          }else {
            setDisplay(false)
          }
    }

    const handleOnFocus = () => {
      //console.log('Focused')
    }

    const formatResult = (item) => {
      return item;
     // return (<p dangerouslySetInnerHTML={{__html: '<strong>'+item+'</strong>'}}></p>); //To format result as html
    }

  return  <>
            {ver?<div className="Contenido-Home">
              <div className="row">
                <div className="col-md-6">
                  <div className="title-home mb-4">Crear cuenta destino</div>
                </div>
                <div className="col text-right">
                  <NavLink className="btn btn-primary" to="/Transferir/CreateCuentasMasivas">
                    + Inscribir masivamente
                  </NavLink>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-12 col-md-7 m-auto">
                  <div className="card border-card">
                    <div className="card-body">
                        <div className="col-md-8 ml-auto mr-auto mt-3">
                          <Header title="Datos de cuenta" subtitle="Inscribir cuentas" classIcon="icon-nuevo-reporte ico-generico"/>
                          <form onSubmit={onSubmit} className="mt-4">
                              <div className="row mb-2">
                                <div className="col-12">
                                  <input  className="form-control"
                                          type="text"
                                          required={true}
                                          name="titular"
                                          placeholder="Titular"
                                          defaultValue={(info.titular!==undefined)?info.titular:""}
                                          onChange={onChange}
                                          event='sololetras'
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-12 ">
                                  <Select
                                    required={true}
                                    data={(data.ma_tipo_identificacion!==undefined?data.ma_tipo_identificacion:[])}
                                    name="tipo_identificacion"
                                    selectDefault="Tipo de identificación"
                                    defaultValue={(info.tipo_identificacion!==undefined)?info.tipo_identificacion:""}
                                    onChange={onChange}
                                  />
                                </div>
                              </div>
                              <div className="row mb-2">
                                <div className="col-12">
                                  <input  name="nro_identificacion"
                                          id="nro_identificacion"
                                          required={true}
                                          className="form-control"
                                          placeholder="Numero de identificacion"
                                          defaultValue={(info.nro_identificacion!==undefined)?info.nro_identificacion:""}
                                          onChange={onChange}
                                          event={pasaporte?'':'solonumeros'}
                                          />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-12 ">
                                  <Select
                                    required={true}
                                    data={(data.ma_tipo_proveedor!==undefined?data.ma_tipo_proveedor:[])}
                                    name="tipo_cuenta"
                                    defaultValue={(info.tipo_cuenta!==undefined)?info.tipo_cuenta:""}
                                    selectDefault="Tipo"
                                    onChange={onChange}
                                  />
                                </div>
                              </div>
                              <div className="row mb-0">
                                <div className="col-12">
                                  {info.ma_banco_string===undefined || openBanco?<ReactSearchAutocomplete
                                    placeholder="Entidad bancaria"
                                    className="form-control"
                                    items={bancos}
                                    onSearch={handleOnSearch}
                                    onHover={handleOnHover}
                                    onSelect={handleOnSelect}
                                    onFocus={handleOnFocus}
                                    formatResult={formatResult}
                                  />:<div className="ReactSearchAutocomplete-result-default" onClick={()=>setOpenBanco(true)}>
                                        <div className="wrapper">
                                          <div className="row pt-1">
                                            <div className="col-1">
                                              <svg className="sc-bdVaJa eOPJCx search-icon" width="20" height="20" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
                                            </div>
                                            <div className="col">
                                              <div className="frjscc">{info.ma_banco_string}</div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                  }
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-12 ">
                                  <Select
                                    required={true}
                                    data={(data.ma_tipo_cuentas_bancarias!==undefined?data.ma_tipo_cuentas_bancarias:[])}
                                    name="ma_tipo_cuentas_bancarias_id"
                                    defaultValue={(info.ma_tipo_cuentas_bancarias_id!==undefined)?info.ma_tipo_cuentas_bancarias_id:""}
                                    selectDefault="Tipo de cuenta"
                                    onChange={onChange}
                                  />
                                </div>
                              </div>

                              <div className="row mb-2">

                                <div className="col-12">
                                  {
                                    display?<>
                                      <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                          <span className="input-group-text" id="basic-addon3">{display?"01":false}</span>
                                        </div>
                                        <input  name="nro_cuenta"
                                                required={true}
                                                maxLength={10}
                                                className="form-control"
                                                placeholder="Numero de cuenta"
                                                defaultValue={(info.nro_cuenta!==undefined)?info.nro_cuenta:""}
                                                onChange={onChange}
                                                event='solonumeros'
                                                />
                                      </div>
                                      </>:<>
                                      <input  name="nro_cuenta"
                                              required={true}
                                              className="form-control"
                                              placeholder="Numero de cuenta"
                                              defaultValue={(info.nro_cuenta!==undefined)?info.nro_cuenta:""}
                                              onChange={onChange}
                                              event='solonumeros'
                                              />
                                    </>
                                  }
                                </div>
                              </div>
                              <div className="text-center">
                                  <button type="submit" className="btn btn-primary mb-sm-3 mt-sm-3 mr-sm-3 col-md-12 mb-3">
                                      Siguiente
                                  </button>
                                  <NavLink to="/Transferir/Transferir" className="btn btn-gray text-white col-md-12 ">Cancelar</NavLink>
                              </div>
                          </form>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>:false}
        </>
}
export default App
