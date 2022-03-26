import Store from '../helpers/Store';
import pagoslocales from '../assets/images/logo_colores.svg';
import { NavLink } from "react-router-dom";
const App=(props)=>{
  return <div className={props.className===undefined?"col-12 col-md-6 mb-3":props.className}>
            <div className="card-credit">
              <div className="row">
                <div className="col-3 col-md-4">
                  <img src={pagoslocales} alt="visa pagos locales" />
                </div>
                <div className="col-9 col-md-8 text-right">
                  <div className="title_tarjeta-home"><b>Billetera Móvil {props.row.tipo_moneda}</b></div>
                  <div className="cuenta-tarjeta-home">{props.row.nro_cuenta} </div>
                  <div className="saldo-mis-productos">
                    {props.row.saldo_string}
                  </div>
                </div>
              </div>
              {Store.get("user").estatus==='2'?<div className="container-ver-detalle-home">
                <NavLink to={props.row.tipo_moneda==="COP"?`/Movimientos/DetalleBilletera/${props.row.id}`:`/Movimientos/USDDetalleBilletera/${props.row.id}`}>
                  <i className="icon-provisiones"><small className="ver-detalle-home">Ver detalle</small></i>
                </NavLink>
              </div>:false}
            </div>
          </div>
}
export default App
