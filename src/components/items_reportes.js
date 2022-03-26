import { NavLink } from "react-router-dom";
const App=(props)=>{
  return <>
            <div className="card-credit borde-rosa-credit-cart">
              <div className="row">
                <div className="col-md-9">
                  <div className="saldo-mis-productos">
                    {props.title}
                  </div>
                </div>
              </div>
              {props.url?<div className="container-ver-detalle-home">
                <i className="icon-ver-mas">
                  <small className="ver-detalle-home">
                    <NavLink className="text-gray" to={props.url}>
                      Ver reporte
                    </NavLink>
                  </small>
                </i>
              </div>:false}
            </div>
          </>
}
export default App
