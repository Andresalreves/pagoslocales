import React,{useState,useEffect} from 'react';
import Header from '../../components/header_forms_tipo4';
import { NavLink,useParams } from "react-router-dom";
import Store from "../../helpers/Store";
import Functions from "../../helpers/Functions";
import Config from "../../helpers/Config";
import ImgPerfil from '../../assets/images/No_image.png';
import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);

const test  = true

const App=()=>{
  let params = useParams();
  const [data, setData] = useState(false);
  const [ver, setVer] = useState(false);

  useEffect(() => {
    getInit()
  },[])

  const getInit=()=>{
    Functions.PostAsync("Administracion","getCuentaBancaria",{id:params.id},{},{name:"callbackContinue",funct:callbackContinue})
  }

  const callbackContinue=(response)=>{

    if (response.error!==undefined) {
      console.log(response);
      //setData(response.data)
      //setVer(true)
    }

    if (response.message!==undefined) {
      console.log(response);
      //setData(response.data)
      //setVer(true)
    }

    if (response.data!==undefined) {
      setData(response.data)
      setVer(true)
    }

  }

  const handleActivar=()=>{
    let data_ = {op_cuentas_bancarias_id:params.id,estatus:1}
    Functions.PostAsync("Administracion","setEstatusCuentasBancarias",data_,{},{name:"callbackContinue2",funct:callbackContinue2})
  }

  const callbackContinue2=(response)=>{
    document.location.href  =    Config.ConfigAppUrl+"CuentaBancariaResult?id="+params.id
  }

  return  <>{ver?<div className="Contenido-Home">
                    <div className="row justify-content-center">
                      <div className="col-12 col-md-8">
                        <div className="card">
                          <div className="card-content">
                            <div className="card-body">
                              <Header title="Resumen"
                                      subtitle={data.fecha}
                                      estatus={data.estatus}
                                      estatus_string={data.estatus_string}
                                      classIcon="icon-cuenta-bancaria-inactiva ico-generico"
                                      />
                              <hr/>
                              <div className="row justify-content-center mt-3">
                                <div className="col-12 col-md-6">
                                  <b>Entidad bancaria</b>
                                  <div className="text-gray x1">{data.entidad_bancaria_string}</div>
                                </div>
                                <div className="col-12 col-md-4">
                                  <b>Titular</b>
                                  <div className="text-gray x1">{data.titular}</div>
                                </div>
                              </div>
                              <div className="row justify-content-center mt-3">
                                <div className="col-12 col-md-6">
                                  <b>Tipo de cuenta</b>
                                  <div className="text-gray x1">{data.tipo_de_cuenta_string}</div>
                                </div>
                                <div className="col-12 col-md-4">
                                  <b>Número de cuenta</b>
                                  <div className="text-gray x1">{data.numero_cuenta}</div>
                                </div>

                              </div>
                              <div className="row text-center mt-4 justify-content-center">
                                <div className="col-6">
                                  <div className="btn btn-outline-primary2 mb-3 mr-1">Descargar</div>
                                  <NavLink to="/Administracion/CuentasBancarias" className="btn btn-gray mb-3 text-white">Volver</NavLink>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>:false}

        </>
}
export default App
