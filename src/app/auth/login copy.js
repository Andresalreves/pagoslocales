import React,{useState,useEffect} from 'react';
import bg from '../../assets/images/new/fondo.png'
import logo from '../../assets/images/new/logo_belle.png'
import mujer from '../../assets/images/new/mujer-login.png'
import img1 from '../../assets/images/new/icon-usuario-login.svg'
import img2 from '../../assets/images/new/icon-contrasena-login.svg'
import img3 from '../../assets/images/new/icon-mostrar-login.svg'
import Functions from "../../helpers/Functions";
import Store from "../../helpers/Store";
import { NavLink } from "react-router-dom";

const App=(props)=>{
  const [h, setH] = useState(window.innerHeight);
  const [inputs, setInputs] = useState({});

  useEffect(() => {
    document.getElementById("root").style.height = h+"px";
    setH(window.innerHeight)
  },[h])

  const onChange=(e)=>{
    Functions.Inputs(e,inputs, setInputs)
  }

  const onSubmit=(e)=>{
    e.preventDefault()
    let data  = {...inputs}
    Functions.PostAsync("Users","loginPWA",data,{},{name:"callbackContinue",funct:callbackContinue})
  }

  const callbackContinue=(data)=>{
    if (data.error!==undefined) {
      props.setModalShow({
        show:true,
        message:<div className="text-center h5">{data.error}</div>,
        size:""
      })
    }else {
      props.setUser(data)
      Store.set("user",data.data)
      //console.log();
      //console.log(data);
      //props.setUser
    }
  }

  return  <div className="container-fluid login" style={{ height:{h},backgroundImage: `url(${bg})`,}}>
            <div className="row justify-content-center">
              <div className="col-12 col-md-8 mt-0 mt-sm-5 pt-5">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-12 col-md-5">
                        <div className="logo text-center">
                          <img className="col-7" src={logo} alt="Logo"/>
                        </div>
                        <div className="welcome text-center mt-3">
                          <h1>¡Bienvenidos!</h1>
                        </div>
                        <form onSubmit={onSubmit}>
                          <div className="mt-4">
                            <div className="input-group d-flex align-items-center">
                              <span className="input-group-addon">
                                  <i aria-hidden="true">
                                    <img src={img1} alt="login" />
                                  </i>
                              </span>
                              <input  className="form-control space"
                                      type="text"
                                      name="nombre_usuario"
                                      placeholder="Usuario"
                                      require="require"
                                      onChange={onChange}/>
                            </div>
                          </div>
                          <div className="mt-2">
                            <div className="input-group d-flex align-items-center">
                                <span className="input-group-addon">
                                     <i aria-hidden="true">
                                        <img src={img2} alt="password" />
                                     </i>
                                </span>
                                <input onChange={onChange} type="password" id="password" name="password" className="form-control space" placeholder="Contraseña" require="true"/>
                                <span className="input-group-addon">
                                     <i className="opcion" aria-hidden="true">
                                        <img src={img3} alt="olvide" />
                                     </i>
                                </span>
                            </div>
                          </div>
                          <div className="mt-2">
                            <button className=" form-control2 btn btn-primary btn-block" type="submit">
                              Iniciar sesión
                            </button>
                          </div>
                          <div className="mt-2 text-right">
                            <NavLink to="/recover" activeClassName="selected" className="contrasena">
                              Olvidé mi contraseña
                            </NavLink>
                          </div>
                        </form>
                      </div>
                      <div className="col-7 position-relative d-none d-sm-block">
                        <img src={mujer} className="col-122 mujer position-absolute" alt=""/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
}

export default App;
