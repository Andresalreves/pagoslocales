import React,{useState,useEffect,useRef} from 'react';
import Functions from "../helpers/Functions";
import StateContext from '../helpers/ContextState';
const App=({modelo,metodo,funct})=>{
  const context         = React.useContext(StateContext);
  const [data, setData] = useState([]);

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
                      {response.resumen.USD}
                    </div>
                    <div className="col-12 col-sm-3 text-right">
                      {response.resumen.EUR}
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
                Plataformas
              </div>
              <div className="col-12 col-sm-3 ">
                USD
              </div>
              <div className="col-12 col-sm-3 ">
                EUR
              </div>
            </div>
            {
              data.length>0?<>
                {data.map((row,key)=>{
                  return  <div className="row" key={key}>
                            <div className="col-12 col-sm-6 text-gray text-left">
                              {row.pagador}
                            </div>
                            <div className="col-12 col-sm-3 text-gray text-right">
                              {row.valor_usd_string}
                            </div>
                            <div className="col-12 col-sm-3 text-gray text-right">
                              {row.valor_eur_string}
                            </div>
                          </div>
                })}
                </>:<div>Sin Resultados</div>
            }
          </>
}
export default App
