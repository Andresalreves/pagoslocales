import React,{useState,useEffect} from 'react';
import Component from '../../components/items_seguridad';
import StateContext from '../../helpers/ContextState'
import Functions from "../../helpers/Functions";

const App=()=>{
  const [data, setData]       = useState({
                                            fraudes:[],
                                            usuarios:[],
                                            modulos:[],
                                            acciones:[],
                                          });
  const context               = React.useContext(StateContext);

  let items       =   [
    {
      label:"Intentos de Fraude",
      value:"0",
      url:'/Administracion/Reporte/NegociarDivisas',
      data:"fraudes"
    },
    {
      label:"Últimas Acciones",
      value:"2",
      url:'/Administracion/Seguridad/UltimasAcciones',
      data:"acciones"
    },
  ]

  useEffect(() => {
    context.socketIo.on("security_update", () => {
      getInit()
    });
  }, [context.socketIo]);

  useEffect(() => {
    getInit()
  }, []);

  const getInit=()=>{
    Functions.PostAsync("Security","get",{},{},{name:"callbackGetInit",funct:callbackGetInit})
  }

  const callbackGetInit=(response)=>{
    if (response) {
      setData(response)
    }
  }

  return  <div className="Contenido-Home">
            <div className="row">
              <div className="col-12 col-md-12">
                <div className="title-home mb-5">Departamento de Seguridad</div>
              </div>
            </div>
            <div className="row">
              {items.map((row,key)=>{
                return  <div className="col-12 col-md-6 listados mb-4" key={key}>
                          <Component title={row.label} data={data[row.data]} name={row.data}/>
                        </div>
              })}
            </div>
          </div>
}
export default App
