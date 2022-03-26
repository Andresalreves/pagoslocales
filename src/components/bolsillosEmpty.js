import { NavLink } from "react-router-dom";
const App=(props)=>{
  return  <div className={"col-12 col-md-3 cursor-pointer pl-0 " + props.className}>
            <div className="card-credit rosa-bolsillo">
              <NavLink className="btn-btn-primary-mr-5" to="/bolsillo/create">
                <div className="text-center ">
                  <div className="text-white pt-4 pb-4">
                    <div className="text-center">
                      <i className="icon-agregar"/>
                    </div>
                    <b>Crea tu primer Bolsillo</b>
                  </div>
                </div>
              </NavLink>
            </div>
          </div>

}
export default App
