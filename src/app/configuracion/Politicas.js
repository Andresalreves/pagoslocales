import React,{useState,useEffect} from 'react';
import Bolsillo from '../../components/bolsillos';
import BolsilloEmpty from '../../components/bolsillosEmpty';
import BolsilloCreate from '../../components/bolsillosCreate';
import { NavLink } from "react-router-dom";
import Store from "../../helpers/Store";
import Functions from "../../helpers/Functions";
import Config from "../../helpers/Config";
import Select from '../../screens/select';
import StateContext from '../../helpers/ContextState'

const test  = true

const App=()=>{
  const context = React.useContext(StateContext);

  const [data, setData] = useState(false);
  const [dataBolsillo, setDataBolsillo] = useState(false);
  const [inputs, setInputs] = useState(false);
  const [active, setActive] = useState(false);
  const [botonActivo, setBotonActivo] = useState(false);

  useEffect(() => {
    getInit()
  },[])

  const getInit=()=>{
    let send    = {token:Store.get("user").token}
    Functions.PostAsync("Maestros","get_tablas_maestras",send,{},{name:"callbackContinue",funct:callbackContinue})
  }

  const callbackContinue=(response)=>{
    setData(response)
    let send    = {token:Store.get("user").token}
    //Functions.PostAsync("Bolsillo","GetMisBolsillos",send,{},{name:"callbackContinue2",funct:callbackContinue2})
  }

  const callbackContinue2=(response)=>{
    setDataBolsillo(response.data)
  }

  const onChange=(e)=>{
    Functions.Inputs(e,inputs, setInputs)
  }

  const onSubmit=(e)=>{
    e.preventDefault()
    let send        = {...inputs}
        send.token  = Store.get("user").token
    Functions.PostAsync("Administracion","setCreateCuentaBancaria",send,{},{name:"callbackContinue3",funct:callbackContinue3})
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
            <div className="title-home mb-4 text-rosa">Políticas de servicios</div>
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="card">
                  <div className="card-content">
                    <div className="card-body">
                      <form onSubmit={onSubmit}>
                        <div className="p-5">
                          <div className="row mb-2">
                            <div className="col">
                            David Patiño en cumpdivmiento de la Ley 1581 de 2012, el decreto 1377 de 2013 y el Decreto 886 de 2014, twlpro adopta la presente POLÍTICA DE TRATAMIENTO DE DATOS PERSONALES Y PRIVACIDAD, la cual regula la recolección, almacenamiento, tratamiento, protección y administración de los datos que twlpro obtenga de sus cdiventes, proveedores, empleados y demás personas con las cuales twlpro tenga o llegue a tener alguna relación de cualquier naturaleza, con el fin de readivzar el debido tratamiento a la información proporcionada de cualquier registro de datos personales, consulta o reclamación, twlpro comprende por protección de datos personales, todas aquellas medidas tomadas a nivel físico, técnico y jurídico, para prevenir cualquier intento de acceder a ella por personal no autorizado, así como su adecuada conservación.
                            <br/>
                            <br/>
                            twlpro podrá modificar la presente política, con el fin de adecuarla a cambios en la legislación y jurisprudencia vigentes y adaptarla a prácticas de industria, en ese evento, anunciará en su página web www.twlpro.com, la introducción de tales cambios con la debida anticipación.
                            <br/><br/>

                            La información que divbre y voluntariamente los cdiventes, proveedores, empleados, contratistas, subcontratistas, asociados o cualquier otra persona suministre a twlpro por cualquier medio, es introducida en sus bases de datos, de las cuales twlpro es responsable.
                            <br/>
                            <br/>
                            twlpro trata los datos personales de forma adecuada y segura, cumpdivendo todos los requisitos de ley, twlpro podrá hacer uso de esta información al:
                            <br/>
                            <br/>
                              <div className="row">
                                <div className="col-12">
                                  <div className="pl-5 mb-2">
                                    a) Ejecutar cualquier tipo de relación contractual con cdiventes, proveedores, trabajadores e incluso aspirantes a alguna vacante.
                                  </div>
                                  <div className="pl-5 mb-2">
                                    b) Proveer los servicios y/o productos contratados.
                                  </div>
                                  <div className="pl-5 mb-2">
                                    c) Evaluar la cadivdad del servicio.
                                  </div>
                                  <div className="pl-5 mb-2">
                                    d) Readivzar estudios internos sobre tendencias de consumo, niveles de satisfacción y hábitos de los usuarios.
                                  </div>
                                  <div className="pl-5 mb-2">
                                    e) Evaluar la cadivdad del servicios y/o producto.
                                  </div>
                                  <div className="pl-5 mb-2">
                                    f) Soportar procesos de auditoria externa.
                                  </div>
                                  <div className="pl-5 mb-2">
                                    g) Suministrar, compartir, ceder, enviar o entregar sus datos personales y de contacto a empresas fidivales, vinculadas, adivados comerciales o subordinadas de twlpro ubicadas en Colombia o en cualquier otro país en el evento que dichas compañías requieran la información para los fines indicados en este documento.
                                  </div>
                                  <div className="pl-5 mb-2">
                                    h) Enviar al correo electrónico, dirección física, número celular o dispositivo móvil, vía mensaje de texto (SMS y/o MMS), Skype, Whatsapp o a través de cualquier otro medio análogo o digital, incluida cualquier tipo de app o red social que busque impulsar, ejecutar o informar de manera general, llevar a cabo campañas promocionales o cualquier estrategia de carácter comercial o pubdivcitarios, adelantados por twlpro para sí mismo o para terceras personas.
                                  </div>
                                </div>
                              </div>
                              <div className="text-gray mt-4">
                                <b>Identificación del responsable del tratamiento de datos personales y privacidad:</b>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 col-md-6">
                              <div className="label"><b>Razón social</b></div>
                              <div className="label text-gray">TWL Group International S.A.S.</div>
                            </div>
                            <div className="col-12 col-md-6">
                              <div className="label"><b>Email</b></div>
                              <div className="label text-gray">info@twlpro.com</div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 col-md-6">
                              <div className="label"><b>Nit</b></div>
                              <div className="label text-gray">900972959 - 2</div>
                            </div>
                            <div className="col-12 col-md-6">
                              <div className="label"><b>Teléfono</b></div>
                              <div className="label text-gray">032 387 6411</div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 col-md-6">
                              <div className="label"><b>Página aplicativo</b></div>
                              <div className="label text-gray">www.twlpro.com</div>
                            </div>
                            <div className="col-12 col-md-6">

                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 col-md-6">

                            </div>
                            <div className="col-12 col-md-6 text-right">
                              <NavLink to="/" className="btn btn-outline-primary2 mr-0 mr-sm-1 col-12 col-md-4 mb-2">
                                Cerrar
                              </NavLink>
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
