import React,{useState,useEffect} from 'react';
import Header from '../../components/header_forms_tipo2';
import { NavLink } from "react-router-dom";
import Store from "../../helpers/Store";
import Functions from "../../helpers/Functions";
import Config from "../../helpers/Config";
import ImgPerfil from '../../assets/images/No_image.png';
import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);

const test  = true

const App=()=>{
  const [data, setData] = useState(false);

  useEffect(() => {
    getInit()
  },[])

  const getInit=()=>{
    Functions.PostAsync("Administracion","getCuentaBancaria",{id:queryStringParams.id},{},{name:"callbackContinue",funct:callbackContinue})
  }

  const callbackContinue=(response)=>{
    setData(response.data)
  }

  return  <div className="Contenido-Home">
            <div className="title-home mb-4">Cuentas bancarias</div>
            <div className="row justify-content-center">
              <div className="col-12 col-md-8">
                <div className="card">
                  <div className="card-content">
                    <div className="card-body">
                      <Header title="Cuenta bancaria inscrita con éxito"
                              classIcon="icon-actualizado-completo ico-generico"
                              />
                      <div className="row justify-content-center mt-3">
                        <div className="col-12 col-md-6">
                          <b>Titular</b>
                          <div className="text-gray x1">{data.titular}</div>
                        </div>
                        <div className="col-12 col-md-4 text-right">

                        </div>
                      </div>
                      <div className="row justify-content-center mt-3">
                        <div className="col-12 col-md-6">
                          <b>Cuenta registrada</b>
                          <div className="text-gray x1">Cuenta {data.tipo_de_cuenta_string} <b className="text-dark">{data.numero_cuenta}</b></div>
                        </div>
                        <div className="col-12 col-md-4 text-right">

                        </div>
                      </div>
                      <div className="row justify-content-center mt-3">
                        <div className="col-12 col-md-6">
                          <b>Entidad Bancaria</b>
                          <div className="text-gray x1">{data.entidad_bancaria_string}</div>
                        </div>
                        <div className="col-12 col-md-4 text-right">

                        </div>
                      </div>
                      <div className="row text-center mt-4 justify-content-center">
                        <div className="col-6">
                          <div className="btn btn-outline-primary2 mb-3 mr-1">Descargar</div>
                          <NavLink to="/createCuentasBancarias" className="btn btn-primary mb-3 text-white">Nueva cuenta bancaria</NavLink>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
}
export default App
