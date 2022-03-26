import React,{useState,useEffect} from 'react';
import { NavLink } from "react-router-dom";
import Store from "../../helpers/Store";
import Functions from "../../helpers/Functions";
import Config from "../../helpers/Config";
import Select from '../../screens/select';
import StateContext from '../../helpers/ContextState'
let send;
const App=()=>{
  const context = React.useContext(StateContext);

  const [data, setData] = useState(false);
  const [inputs, setInputs] = useState(false);
  const [Years, setYears] = useState([]);
  const [Meses, setMeses] = useState([]);
  //const [active, setActive] = useState(false);
  //const [botonActivo, setBotonActivo] = useState(false);

  useEffect(() => {
    getInit()
  },[])

  const getInit=()=>{
    send    = {token:Store.get("user").token}
    Functions.PostAsync("Maestros","get_tablas_maestras",send,{},{name:"callbackContinue",funct:callbackContinue});
    Functions.PostAsync("Resumen","GetYears/COP",send,{},{name:"callbackContinue",funct:callbackGetYears});
  }

  const callbackContinue=(response)=>{
    setData(response)
  }
  
  const callbackGetYears = (response) =>{
    setYears(Object.values(response.data));
  }
  const callbackGetMonths = (response) =>{
    setMeses(Object.values(response.data));
  }

  const onChange=(e)=>{
    if(e.target.name === 'year'){
      send.year = e.target.value;
      Functions.PostAsync("Resumen","GetMonths/COP",send,{},{name:"callbackContinue",funct:callbackGetMonths})
    }
    Functions.Inputs(e,inputs, setInputs)
  }

  const onSubmit=(e)=>{
    e.preventDefault()
    let params = '';
    let send        = {...inputs}
        send.token  = Store.get("user").token
    window.open(Config.ConfigApirest+'PDF/Resumen/ReporteGastos/token:'+send.token+'/tipo:'+send.tipo+'/year:'+send.year+'/formato:'+send.formato+'/tipo:'+send.tipo+'/mes:'+send.mes);
  }

  const callbackContinue3=(response)=>{
    if (response.error!==undefined) {
      context.setModalShow({
        show:true,
        message:<div className="text-center h5">{response.error.label}</div>,
        size:""
      })
    }else {
      context.setModalShow({
        show:true,
        message:<div className="text-center h5">
                  {response.message.label}
                  <div><a href={Config.ConfigAppUrl+"bolsillos"} className="btn btn-gray text-white mb-3 mt-3">Continuar</a></div>
                </div>,
        size:""
      })
      setTimeout(function(){document.location.href  =  Config.ConfigAppUrl+"CuentasBancarias" }, 3000);
    }
  }


  return  <div className="Contenido-Home">
            <div className="title-home mb-4">Gastos</div>
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
                              <div className="title-generico">Visualizar Gastos</div>
                              <div className="cuenta-tarjeta-home">Seleccione los siguientes datos</div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <Select
                                required={true}
                                data={[{label:"Transferencia ACH",value:"ACH"},{label:"Comisión reintegro giros",value:"comision_giro_recibido"},{label:"IVA comisión reintegro giros",value:"comision_iva_giro_recibido"},{label:"Comisión Administrativa",value:"comision_administrativa"},{label:"IVA Comisión Administrativa",value:"comision_iva_administrativa"},{label:"IVA",value:"IVA"},{label:"GMF",value:"GMF"},{label:"Comisiones",value:"Comisiones"}]}
                                name="tipo"
                                selectDefault="Tipo"
                                onChange={onChange}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
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

                          {/*<div className="row">
                            <div className="col">
                              <Select
                                required={true}
                                data={[]}
                                name="fecha"
                                selectDefault="Fecha"
                                onChange={onChange}
                              />
                            </div>
                          </div>*/}

                          <div className="row">
                            <div className="col">
                              <Select
                                required={true}
                                data={(data.ma_formatos!==undefined?data.ma_formatos:[])}
                                name="formato"
                                selectDefault="Formato de descarga"
                                onChange={onChange}
                              />
                            </div>
                          </div>
                          <div className="row text-center mt-4 justify-content-center">
                            <div className="col-12">
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
