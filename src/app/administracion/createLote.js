import React,{useState,useEffect} from 'react';
import { NavLink,useHistory,useParams} from "react-router-dom";
import Functions from "../../helpers/Functions";
import Header from '../../components/header_forms_andres';
import Select from '../../screens/select';
import Store from "../../helpers/Store";
import StateContext from '../../helpers/ContextState';

const App=()=>{
    let history = useHistory();
    const [inputs, setInputs] = useState({});
    const [data, setData] = useState(false);
    const context = React.useContext(StateContext);
    const onChange=(e)=>{
        Functions.Inputs(e,inputs, setInputs);
    }
    useEffect(() => {
        getInit()
    },[])

    const Modal = ()=>{
        context.setModalShow({
            show:true,
            message:<div className="text-center">
                      Hola
                      <div className="row justify-content-center mt-2">
                        <div className="col-3" onClick={()=>context.setModalShow({show:false})}>
                          <div className="btn btn-primary btn-block">Reintentar</div>
                        </div>
                      </div>
                    </div>,
            size:""
          });
    }



    const getInit=()=>{
        Functions.PostAsync("Administracion","getCuentasBancariasAprobadasSelect",{estatus:2},{},{name:"callbackContinue",funct:callbackContinue})
    }
    const callbackContinue=(response)=>{
        setData(response);
    }

    const callbackContinue2=(response)=>{
        context.setModalShow({
            show:true,
            message:<div className="text-center ">
                      {response.message.label}
                      <div className="row justify-content-center mt-3">
                        <div className="col-12" onClick={()=>context.setModalShow({show:false})}>
                          <div className="btn btn-primary btn-block">CONTINUAR</div>
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

    const onSubmit=(e)=>{
        e.preventDefault()
        let send        = {...inputs}
            send.token  = Store.get("user").token
        Functions.PostAsync("Administracion","CrearLote",send,{},{name:"callbackContinue2",funct:callbackContinue2})
    }

  return  <div className="Contenido-Home">
            <div className="row">
              <div className="col-md-12">
                <div className="title-home mb-4" onClick={Modal}>Crear Lote</div>
              </div>
            </div>
            <div className="row mt-4">
                <div className="col-7 m-auto">
                    <div className="card border-card">
                        <div className="card-body">
                            <div className="col-md-11 ml-auto mr-auto mt-3">
                                <Header title="Nuevo Lote" classIcon="icon-documento ico-generico" subtitle="completa los siguientes datos" />
                                <hr/>
                                <form onSubmit={onSubmit} className="mt-4">
                                    <input  className="form-control"
                                        required={true}
                                        type="text"
                                        name="nombre_lote"
                                        placeholder="Nombre del lote"
                                        onChange={onChange}
                                        className="form-control"
                                    />
                                    <Select
                                        className="form-control mt-3"
                                        required={true}
                                        data={data.data!==undefined?data.data:[]}
                                        name="cuenta_bancaria"
                                        selectDefault="Cuenta bancaria"
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
