import { NavLink } from "react-router-dom";
//import pagoslocales from '../assets/images/logo_colores.svg';
const App=(props)=>{

  return <div className={props.off!==undefined?"col-12 col-md-6 mb-3  filter-me":props.className!==undefined?props.className:"col-12 col-md-6 mb-3"}>
            <div className="card-credit borde-rosa-credit-cart">
              <NavLink className="p-2 meta-card-home" to={"/Bolsillos/Editar/"+props.row.id}>
              <div className="row">
                <div className="col-2 ">
                  <i className="icon-vacaciones bolsillos-icon"></i>
                </div>
                <div className="col-10">
                  <div className="saldo-mis-productos">
                    {props.row.nombre_bolsillo}
                  </div>
                  <div className="cuenta-tarjeta-home">{props.row.saldo_string} COP</div>
                </div>
              </div>
              <div className="mt-2 text-center row justify-content-center">
                <div className="d-flex monto-bolsillo">{props.row.saldo_string}</div>
              </div>
              <input className="mt-20 styled-slider slider-progress"
                    type="range"
                    defaultValue={props.row.saldo}
                    min="0"
                    max={props.row.meta_bolsillo}
                    title={props.row.saldo}/>
              <div className="meta-card-home text-right">Meta {props.row.meta_bolsillo_string}</div>
              </NavLink>
              <div className="container-ver-detalle-home">
                <NavLink className="p-2 meta-card-home" to={"/Bolsillos/Detalle/"+props.row.id}>
                  <i className="icon-provisiones"><small className="ver-detalle-home">Ver mis movimientos</small></i>
                </NavLink>
              </div>
            </div>
          </div>
}
export default App
