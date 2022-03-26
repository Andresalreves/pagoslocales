import React,{useState,useEffect} from 'react';
import { NavLink,useHistory,useParams} from "react-router-dom";
import Functions from "../../helpers/Functions";
import Header from '../../components/header_forms_andres';
import Select from '../../screens/select';
import Store from "../../helpers/Store";
import StateContext from '../../helpers/ContextState';


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
    },[])

    const getInit=()=>{
        Functions.PostAsync("Administracion","getLotesDisponibles",{estatus:1},{},{name:"callbackContinue",funct:callbackContinue})
    }

    const callbackContinue=(response)=>{
        setData(response);
      }
    const onSubmit=(e)=>{
        e.preventDefault()
        let send        = {...inputs}
            send.id     = inputs.transferencias_id  
            send.token  = Store.get("user").token
        Functions.PostAsync("Administracion","AddLote",send,{},{name:"callbackContinue2",funct:callbackContinue2})
    }
    const callbackContinue2=(response)=>{
        context.setModalShow({
            show:true,
            message:<div className="text-center">
                      {response.message.label}
                      <div className="row justify-content-center mt-2">
                        <div className="col" onClick={()=>context.setModalShow({show:false})}>
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
                                <Header title="Proceso de aprobacion" classIcon="icon-documento ico-generico" subtitle="completa los siguientes datos" />
                                <hr/>
                                <form onSubmit={onSubmit} className="mt-4">
                                    <Select
                                        data={(data.data!==undefined?data.data:[])}
                                        name="lote_pago_id"
                                        selectDefault="Lote de pago"
                                        onChange={onChange}
                                    />
                                    <div className="text-center mt-5">
                                        <button type="submit" className="btn btn-primary mr-2">SIGUIENTE</button>
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
