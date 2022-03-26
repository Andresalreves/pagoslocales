import React,{useState,useEffect,useRef} from 'react';
import Functions from "../helpers/Functions";
import StateContext from '../helpers/ContextState';
const App=({modelo,metodo,funct})=>{
  const context         = React.useContext(StateContext);
  const [data, setData] = useState({});

  useEffect(() => {
    Functions.PostAsync(modelo,metodo,{},context,{name:"callback",funct:callback});
  },[]);

  const callback=(response)=>{
    if (response.data!==undefined) {
      setData(response.data)
      const Footer=()=>{
        return  <div className="pt-2 pb-2">
                  <div className="row bg-blue2">
                    <div className="col-12 col-sm-6 text-left">
                      TOTAL RECIBIDO
                    </div>
                    <div className="col-12 col-sm-3  text-right">
                      {response.data.total_resivido_con_comision_usd}
                    </div>
                    <div className="col-12 col-sm-3 text-right">
                      {response.data.total_resivido_con_comision_eur}
                    </div>
                  </div>
                </div>
      }
      funct(Footer)
    }
  }

  return  <>
            <div className="row saldo-mis-productos">
              <div className="col-12 col-sm-6 text-left">
                Concepto
              </div>
              <div className="col-12 col-sm-3 ">
                USD
              </div>
              <div className="col-12 col-sm-3 ">
                EUR
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-6 text-gray text-left">
                Reintegro divisas
              </div>
              <div className="col-12 col-sm-3 text-gray text-right">
                {data.total_valor_usd!==undefined?data.total_valor_usd:'0.00'}
              </div>
              <div className="col-12 col-sm-3 text-gray text-right">
                {data.total_valor_eur!==undefined?data.total_valor_eur:'0.00'}
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-6 text-gray text-left">
                Comisión SWIFT
              </div>
              <div className="col-12 col-sm-3 text-gray text-right">
                {data.comision_swift_usd!==undefined?data.comision_swift_usd:'0.00'}
              </div>
              <div className="col-12 col-sm-3 text-gray text-right">
                {data.comision_swift_eur!==undefined?data.comision_swift_eur:'0.00'}
              </div>
            </div>

          </>
}
export default App
