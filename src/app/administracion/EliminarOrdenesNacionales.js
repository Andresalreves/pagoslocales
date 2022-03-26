import React,{useState,useEffect} from 'react';
import { NavLink,useHistory,useParams} from "react-router-dom";
import Functions from "../../helpers/Functions";
import Header from '../../components/header_forms_andres';
import Select from '../../screens/select';
import Store from "../../helpers/Store";
import StateContext from '../../helpers/ContextState';

const test      = true;
const opciones  = [ {label:"Listado de funcionarios activos",value:1},
                    {label:"Listado de funcionarios inactivos",value:0}];


const App=()=>{
    let params = useParams();
    let history = useHistory();
    const [inputs, setInputs] = useState(params);
    const [data, setData] = useState(false);
    const context = React.useContext(StateContext);
    const onChange=(e)=>{
        Functions.Inputs(e,inputs, setInputs);
    }
    const onSubmit=(e)=>{
        e.preventDefault()
        let send        = {...inputs}
            send.token  = Store.get("user").token
        Functions.PostAsync("Administracion","RechazarOrdenNacional",send,{},{name:"callbackContinue2",funct:callbackContinue2})
    }
    const menssageAdvertencia=()=>{
        context.setModalShow({
            show:true,
            message:<div className="text-center h5">
                        <h3>¿Quieres anular la operacion?</h3>
                      <div className="mt-2">
                        <div className="col-4 m-auto text-center">
                          <div type="submit" className="btn btn-primary btn-block" onClick={onSubmit}>Anular</div>
                        </div>
                        <div className="col-4 m-auto text-center" onClick={()=>context.setModalShow({show:false})}>
                          <div className="btn btn-gray btn-block mt-2">Cancelar</div>
                        </div>
                      </div>
                    </div>,
            size:""
          });
    }
    const callbackContinue2=(response)=>{
        context.setModalShow({
            show:true,
            message:<div className="text-center h5">
                      {response.message.label}
                      <div className="row justify-content-center mt-2">
                        <div className="col-3" onClick={()=>context.setModalShow({show:false})}>
                          <div className="btn btn-primary btn-block">Continuar</div>
                        </div>
                      </div>
                    </div>,
            size:""
          });
            //setTimeout(function(){
                //context.setModalShow({show:false})
                history.push("/Administracion/OrdenesNacionales");
            //}, 1000);
    }

  return  <div className="Contenido-Home">
            <div className="row">
              <div className="col-md-12">
                <div className="title-home mb-4">Órdenes nacionales</div>
              </div>
            </div>
            <div className="row mt-4">
                <div className="col-7 m-auto">
                    <div className="card border-card">
                        <div className="card-body">
                            <div className="col-md-11 ml-auto mr-auto mt-3">
                                <Header title="Proceso de anulación" classIcon="icon-documento ico-generico" subtitle="completa los siguientes datos" />
                                <hr/>
                                <form className="mt-4">
                                    <input  className="form-control"
                                            type="text"
                                            required={true}
                                            name="observacion_rechazo"
                                            onChange={onChange}
                                            placeholder="Razones de su anulación"
                                    />
                                    <div className="text-center mt-5">
                                        <div className="btn btn-primary mr-2" onClick={menssageAdvertencia}>Anular</div>
                                        <NavLink to="/Administracion/OrdenesNacionales" className="btn btn-gray">Cancelar</NavLink>
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
