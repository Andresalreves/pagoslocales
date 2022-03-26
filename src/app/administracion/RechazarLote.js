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

    useEffect(() => {
      getInit()
    },[params])

    const getInit=()=>{
      Functions.PostAsync("Maestros","get_tablas_maestras",{},{},{name:"callbackContinue",funct:callbackContinue})
    }

    const callbackContinue=(response)=>{
      setData(response)
    }

    const onSubmit=(e)=>{
        e.preventDefault()
        let send        = {...inputs}
            send.token  = Store.get("user").token
        Functions.PostAsync("Administracion","RechazarItemLote",send,{},{name:"callbackContinue2",funct:callbackContinue2})
    }
    const menssageAdvertencia=()=>{
        context.setModalShow({
            show:true,
            message:<div className="text-center">
                      <div>¿Quieres anular la operacion?</div>
                      <div className="row mt-3">
                        <div className="col text-center">
                          <div type="submit" className="btn btn-primary mr-2" onClick={onSubmit}>Anular</div>
                          <div className="btn btn-gray" onClick={()=>context.setModalShow({show:false})}>Cancelar</div>
                        </div>
                      </div>
                    </div>,
            size:""
          });
    }
    const callbackContinue2=(response)=>{
        context.setModalShow({
            show:false,
            message:<div className="text-center"></div>,
          });
        window.history.back()
    }

  return  <div className="Contenido-Home">
            <div className="row">
              <div className="col-md-12">
                <div className="title-home mb-4">Lote de pago</div>
              </div>
            </div>
            <div className="row mt-4">
                <div className="col-7 m-auto">
                    <div className="card border-card">
                        <div className="card-body">
                            <div className="col-md-11 ml-auto mr-auto mt-3">
                                <Header title="Proceso de rechazo" classIcon="icon-documento ico-generico" subtitle="completa los siguientes datos" />
                                <hr/>
                                <form className="mt-4">
                                    <Select
                                      required={true}
                                      data={(data.ma_motivos_rechazo_lote!==undefined?data.ma_motivos_rechazo_lote:[])}
                                      name="observacion_rechazo"
                                      selectDefault="Observación rechazo"
                                      onChange={onChange}
                                    />
                                    <div className="text-center mt-5">
                                        <div className="btn btn-primary mr-2" onClick={menssageAdvertencia}>Anular</div>
                                        <NavLink to="/Administracion/Lotes" className="btn btn-gray">Cancelar</NavLink>
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
