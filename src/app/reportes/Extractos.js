import React,{useState,useEffect} from 'react';
import { NavLink } from "react-router-dom";
import Store from "../../helpers/Store";
import Functions from "../../helpers/Functions";
import Config from "../../helpers/Config";
import Select from '../../screens/select';
import StateContext from '../../helpers/ContextState'

const App=()=>{
  const context = React.useContext(StateContext);

  const [data, setData] = useState(false);
  const [inputs, setInputs] = useState(false);
  const [Cuentas, setCuentas] = useState([]);
  const [Years, setYears] = useState([]);
  const [Meses, setMeses] = useState([]);
  //const [botonActivo, setBotonActivo] = useState(false);

  useEffect(() => {
    getInit()
  },[])

  const getInit=()=>{
    let send    = {token:Store.get("user").token}
    Functions.PostAsync("Resumen","Reporte_cuentas",send,{},{name:"callbackContinue",funct:callbackContinueCuentas});
    Functions.PostAsync("Maestros","get_tablas_maestras",send,{},{name:"callbackContinue",funct:callbackContinue});
  }

  const callbackContinue=(response)=>{
    setData(response)
    //let send    = {token:Store.get("user").token}
    //Functions.PostAsync("Bolsillo","GetMisBolsillos",send,{},{name:"callbackContinue2",funct:callbackContinue2})
  }
  const callbackContinueCuentas=(response)=>{
    setCuentas(response.data);
    //let send    = {token:Store.get("user").token}
    //Functions.PostAsync("Bolsillo","GetMisBolsillos",send,{},{name:"callbackContinue2",funct:callbackContinue2})
  }

  const callbackGetYears = (response) =>{
    setYears(Object.values(response.data));
  }
  const callbackGetMonths = (response) =>{
    setMeses(Object.values(response.data));
  }

  const onChange=(e)=>{
    let send    = {token:Store.get("user").token}
    if(e.target.name === 'cuenta'){
      send.cuenta = e.target.value;
      Functions.PostAsync("Resumen","GetYears",send,{},{name:"callbackContinue",funct:callbackGetYears})
    }else if(e.target.name === 'year'){
      send.cuenta = inputs.cuenta;
      send.year = e.target.value;
      Functions.PostAsync("Resumen","GetMonths",send,{},{name:"callbackContinue",funct:callbackGetMonths})
    }
    Functions.Inputs(e,inputs, setInputs)
  }

  const onSubmit=(e)=>{
    e.preventDefault()
    let send        = {...inputs}
        send.token  = Store.get("user").token
    window.open(Config.ConfigApirest+'PDF/Resumen/GenerarExtracto/token:'+send.token+'/cuenta:'+send.cuenta+'/year:'+send.year+'/formato:'+send.formato+'/tipo:'+send.tipo+'/mes:'+send.mes);
  }

  return  <div className="Contenido-Home">
            <div className="title-home mb-4">Extractos</div>
            <div className="row justify-content-center">
              <div className="col-12 col-md-8">
                <div className="card">
                  <div className="card-content">
                    <div className="card-body">
                      <form onSubmit={onSubmit}>
                        <div className="p-5">
                          <div className="row">
                            <div className="col-2 text-right">
                              <i className="icon-crear-cuenta-bancaria ico-generico" />
                            </div>
                            <div className="col-10 pt-3 p-0">
                              <div className="title-generico">Generar Extractos</div>
                              <div className="cuenta-tarjeta-home">Seleccione los siguientes datos</div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <Select
                                required={true}
                                data={Cuentas}
                                name="cuenta"
                                selectDefault="Cuenta"
                                onChange={onChange}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              {console.log(Years)}
                              <Select
                                required={true}
                                data={Years}
                                name="year"
                                selectDefault="Año"
                                onChange={onChange}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <Select
                                required={true}
                                data={Meses}
                                name="mes"
                                selectDefault="Mes"
                                onChange={onChange}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <Select
                                required={true}
                                data={(data.ma_formatos!==undefined?data.ma_formatos:[])}
                                name="formato"
                                selectDefault="Formato"
                                onChange={onChange}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <Select
                                required={true}
                                data={[{value:'1',label:'Descargar',key:'1'},{label:'Enviar al correo',value:'2',key:'2'}]}
                                name="tipo"
                                selectDefault="Descargar"
                                onChange={onChange}
                              />
                            </div>
                          </div>
                          <div className="row text-center mt-4 justify-content-center">
                            <div className="col">
                              <button type="submit" className={"btn btn-primary mb-3 mr-1"} >
                                Generar
                              </button>
                              <NavLink to="/" className="btn btn-gray text-white mb-3">Cancelar</NavLink>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
}
export default App
