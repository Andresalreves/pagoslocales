

<div className='contenedor-dinero pb-2 px-0 pt-0 max-heigt-overflow'>
    <div className='title-cuadro-intermedio bg-blue text-white p-2'>
      <b>Resumen reintegro Divisas</b>
    </div>
  <div className='p-4'>
    <table className='table_divisas_x_plataforma mb-5'>
      <thead>
        <tr>
          <td className='text-left w-50'><b className='saldo-mis-productos'>Concepto</b></td>
          <td><b className='saldo-mis-productos w-25'>USD</b></td>
          <td><b className='saldo-mis-productos w-25'>EUR</b></td>
        </tr>
      </thead>
      <tbody className='text-gray'>
        <tr>
          <td className='text-left w-50'>Reintegro divisas</td>
          <td className='text-right w-25'>{resumen.total_valor_usd!==undefined?resumen.total_valor_usd:'0'}</td>
          <td className='text-right w-25'>{resumen.total_valor_eur!==undefined?resumen.total_valor_eur:'0'}</td>
        </tr>
        <tr>
          <td className='text-left w-50'>Comisión SWIFT</td>
          <td className='text-right w25'>{resumen.comision_swift_usd!==undefined?resumen.comision_swift_usd:'0'}</td>
          <td className='text-right w-25'>{resumen.comision_swift_eur!==undefined?resumen.comision_swift_eur:'0'}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div className="footer-container-divisas-plataforma px-4 pt-2 pb-2 bg-blue2 text-white">
    <div className='p-2'>
      <table className="table_divisas_x_plataforma">
        <tbody>
          <tr>
            <td className="text-left w-50"><b>Total dinero recibido</b></td>
            <td className="w-25 text-right"><b>{resumen.total_resivido_con_comision_usd!=undefined?resumen.total_resivido_con_comision_usd:'0'}</b></td>
            <td className="w-25 text-right"><b>{resumen.total_resivido_con_comision_eur!=undefined?resumen.total_resivido_con_comision_eur:'0'}</b></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>






















<div className='col-lg-6'>
  <div className='contenedor-dinero p-0'>
  <div className='title-cuadro-intermedio bg-blue text-white p-2'>
    <b>Recepción divisas por plataforma</b>
  </div>
    <div className='p-3 h-recepcion-divisas'>
      <div>
          <table className='table_divisas_x_plataforma mb-4'>
            <thead>
              <tr>
                <td className='text-left w-50'><b className='saldo-mis-productos'>Plataformas</b></td>
                <td><b className='saldo-mis-productos w-25'>USD</b></td>
                <td><b className='saldo-mis-productos w-25'>EUR</b></td>
              </tr>
            </thead>
            <tbody>
              {divisas_x_plataforma!==undefined && divisas_x_plataforma.length>0?<>
                {divisas_x_plataforma.map((v, k) => {
                  return <tr key={k}>
                      <td className='text-left w-50'>{v.abonado_pagador}</td>
                      <td className='text-right w-25'>{v.abonado_saldo_dolares!==undefined?v.abonado_saldo_dolares:' - '}</td>
                      <td className='text-right w-25'>{v.abonado_saldo_euros!==undefined?v.abonado_saldo_euros:' - '}</td>
                    </tr>
                })}</>:false
              }
            </tbody>
          </table>
          <div className='text-white footer-container-divisas-plataforma px-3 pt-2 pb-2 bg-blue'>
            <table className='table_divisas_x_plataforma'>
              <tbody>
                <tr>
                  <td className='text-left w-50 pl'><b>TOTAL RECIBIDO</b></td>
                  <td className='w-25 text-right'><b>{resumen.total_monto_aprobados_dolares}</b></td>
                  <td className='w-25 text-right'><b>{resumen.total_monto_aprobados_euros}</b></td>
                </tr>
              </tbody>
            </table>
          </div>
      </div>
    </div>
  </div>
</div>
