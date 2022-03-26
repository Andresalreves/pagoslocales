import React,{useState,useEffect} from 'react';
import { NavLink,useHistory, useParams } from "react-router-dom";
import Functions from "../../helpers/Functions";
import Constants from "../../helpers/Constants";
import Store from "../../helpers/Store";
import Table from "../../screens/table";
import Header from "../../components/header_forms_andres";
import StateContext from '../../helpers/ContextState';
import Select from '../../screens/select';


const estados=[{
  label:"Activo",
  value:"2"
},{
  label:"Inactivo",
  value:"9"
},]

const App=()=>{
    let history = useHistory();
    const parametros=useParams()
    const context = React.useContext(StateContext);
    const [tipo_pagador, setTipoPagador] = useState([]);
    const [info, setInfo] = useState({});
    const [inputs, setInputs] = useState({});
    const [data, setData] = useState(false);
    const [ver, setVer] = useState(true);
    const [reset, setReset] = useState(false);

    useEffect(() => {
      if (reset) {
        setReset(false)
      }
    },[reset])

    useEffect(() => {
      setReset(true)
    },[info])

    useEffect(() => {
      if (parametros.id!==undefined) {
        let send={id:parametros.id}
        Functions.PostAsync("Configuracion","getDelegarFuncion",send,context,{name:"callbackGetInit2",funct:callbackGetInit2})
      }
    },[])

    const callbackGetInit2=(response)=>{


      // if (response.data!==undefined) {
      //   setInputs(response.data)
      // }

      if (response.privilegios!==undefined) {
        let inputs_ = {...response.data}
            Object.entries(response.privilegios).map((row,key)=>{
              return inputs_[row[0]]=row[1]
            })
            setInputs(inputs_)
            setInfo(response.privilegios)
      }


    }

    const onChange=(e)=>{
        Functions.Inputs(e,inputs, setInputs)
    }

    const onSubmit=(e)=>{
        e.preventDefault();
        let send={...inputs}
        Functions.PostAsync("Configuracion","setDelegarFuncionesEdit",send,{},{name:"callbackSubmit",funct:callbackSubmit})

    }

    const callbackSubmit=(data)=>{
      if (data.message!==undefined) {
        history.push('/Configuracion/DelegarFunciones')
        return context.setModalShow({
          show:true,
          message:<>
                    <div className="m-auto text-center">
                      <i className="icon-configuracion icon-mesage"></i>
                      <h6 className="mt-2"><b>Atención</b></h6>
                      <div className="text-center ml-auto mr-auto w-50 mt-2">
                        {data.message.label}
                      </div>
                      <div className="w-100 text-center mt-4 mb-1">
                        <button type="button" className="btn btn-primary" onClick={()=>context.setModalShow({show:false})}>Continuar</button>
                      </div>
                    </div></>,
          size:""
        })
      }
    }

    const handleSet=(e,row)=>{
      let inputs_             = {...inputs}
      if (e.target.checked) {
        inputs_[row.url]  =   row.label
      }else {
        delete(inputs_[row.url])
      }
      setInputs(inputs_)
    }

  return  <>
              {ver?<div className="Contenido-Home">
            <div className="row d-none d-sm-block">
              <div className="col-md-12">
                <div className="title-home mb-4">Delegar funciones</div>
              </div>
            </div>
            <div className="row mt-0 mt-sm-4 ">
              <div className="col-12 col-md-7 m-auto">
                <div className="card border-card">
                  <div className="card-body">
                      <div className="col-md-8 ml-auto mr-auto mt-0 mt-sm-3">
                        <Header title="Delegación de funciones" subtitle="Inscribir auxiliar" classIcon="icon-nuevo-pagador ico-generico"/>
                        <form onSubmit={onSubmit} className="mt-4">
                            <div className="row mb-0">
                              <div className="col-12">
                                <Select
                                    defaultValue={(inputs.estatus!==undefined)?inputs.estatus:""}
                                    className="form-control mt-3"
                                    required={true}
                                    data={estados}
                                    name="estatus"
                                    selectDefault="Estado"
                                    onChange={onChange}
                                />
                              </div>
                            </div>
                            <div className="row mb-2">
                              <div className="col-12">
                                <input  className="form-control"
                                        type="text"
                                        required={true}
                                        name="funcionario"
                                        placeholder="Nombre del funcionario auxiliar"
                                        required={true}
                                        maxLength="30"
                                        defaultValue={(inputs.funcionario!==undefined)?inputs.funcionario:""}
                                        onChange={onChange}
                                />
                              </div>
                            </div>
                            <div className="row mb-2">
                              <div className="col-12">
                                <input  className="form-control"
                                        type="email"
                                        readOnly={(inputs.email!==undefined && parametros.id!=="0")?true:false}
                                        required={true}
                                        name="email"
                                        placeholder="Correo electrónico"
                                        required={true}
                                        defaultValue={(inputs.email!==undefined)?inputs.email:""}
                                        onChange={onChange}
                                />
                              </div>
                            </div>

                            <div className="row mb-2">
                              <div className="col-12">
                                Funciones disponibles
                              </div>
                            </div>
                            {!reset?<>
                              {Constants.Modulos.map((row,key)=>{


                                  return  <div className="row mb-2" key={key}>
                                              <div className="col-12">
                                                Módulo <b>{row.label}</b> {row.items===undefined?<>
                                                  <input defaultChecked={info[row.url]!==undefined?true:false} type="checkbox" onClick={(e)=>handleSet(e,row)}/>
                                                </>:<><input defaultChecked={info[row.url]!==undefined?true:false} type="checkbox" onClick={(e)=>handleSet(e,row)}/> :<div className="row">
                                                  {row.items.map((row2,key2)=>{
                                                      if ( row2.label!=="Delegar funciones") {
                                                        return <div  key={key2} className="col-6 ml-5 pl-4">* <b>{row2.label}</b> <input defaultChecked={info[row2.url]!==undefined?true:false} type="checkbox" onClick={(e)=>handleSet(e,row2)} /></div>
                                                      }else {
                                                        return false
                                                      }
                                                  })}
                                                </div></>}
                                              </div>
                                          </div>


                              })}

                            </>:false}



                            <div className="text-center">
                                <button type="submit" className="btn btn-primary mb-3 mt-3 mr-3 col-12 col-md-3">
                                    Siguiente
                                </button>
                                <NavLink to="/Configuracion/DelegarFunciones" className="btn btn-gray text-white col-12 col-md-3">Cancelar</NavLink>
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
