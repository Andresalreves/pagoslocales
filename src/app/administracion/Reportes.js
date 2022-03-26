import Component from '../../components/items_reportes';
const App=()=>{

  let items       =   [
    {
      label:"Usuarios",
      value:"0",
      url:'/Administracion/Reportes/Usuarios'
    },
    {
      label:"Pagadores",
      value:"5",
      url:'/Administracion/Pagadores'
    },
    {
      label:"Reporte de pagos",
      value:"3",
      url:'/Administracion/Reporte/ReportePago'
    },
    {
      label:"Negociación de divisas",
      value:"13",
      url:'/Administracion/Reporte/NegociarDivisas'
    },
    {
      label:"Aprobación de cuentas",
      value:"8",
      url:'/Administracion/Reporte/AprobacionCuentas'
    },
    {
      label:"Órdenes pagos nacionales",
      value:"1",
      url:'/Administracion/Reporte/OrdenesNacionales'
    },
    {
      label:"Órdenes pagos internacionales",
      value:"2",
      url:'/Administracion/OrdenesNacionales'
    },
    {
      label:"Movimientos",
      value:"4",
      url:'/Administracion/OrdenesNacionales'
    },
    {
      label:"Iva",
      value:"6",
      url:'/Administracion/OrdenesNacionales'
    },
    {
      label:"Comisiones",
      value:"7",
      url:'/Administracion/OrdenesNacionales'
    },
    {
      label:"Estado de cuenta",
      value:"8",
      url:'/Administracion/Reporte/ReporteEstadosCuenta'
    },
    {
      label:"Emails",
      value:"9",
      url:'/Administracion/Emails'
    },
    {
      label:"Notificaciones",
      value:"10",
      url:'/Administracion/Notificaciones'
    },
    {
      label:"Bandeja mensajes",
      value:"11",
      url:'/Bandeja'
    },

  ]

  return  <div className="Contenido-Home">
            <div className="row">
              <div className="col-12 col-md-12">
                <div className="title-home mb-5">Reportes de pagos</div>
              </div>
            </div>
            <div className="row">
              {items.map((row,key)=>{
                return  <div className="col-12 col-md-3 listados mb-4" key={key}>
                          <Component title={row.label} url={row.url}/>
                        </div>
              })}
            </div>
          </div>
}
export default App
