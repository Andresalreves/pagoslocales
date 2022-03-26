const exportar  = {
  Development : 'Ingeeniar™',
  Title:'Mi Selección',
  LogoSm:'./images/ico-md.png',
  View:'Title',
  Modulos:[
    {
      public:true,
      label:'Home',
      url:'/',
      ico:'icon-casa'
    },
    {
      public:true,
      label:'Transferir',
      url:'/Transferir/Transferir',
      ico:'icon-transferir'
    },
    {
      public:true,
      label:'Mis movimientos',
      url:'/Movimientos/Movimientos',
      ico:'icon-mis-movimientos'
    },
    {
      public:true,
      label:'Mis bolsillos',
      url:'/Bolsillos/Bolsillos',
      ico:'icon-mis-bolsillos'
    },
    {
      public:true,
      label:'Divisas',
      url:'/Divisas',
      ico:'icon-divisas',
      items:[
        {
          public:true,
          label:'Pagadores',
          url:'/Divisas/Pagadores',
        },
        {
          public:true,
          label:'Reportar pago',
          url:'/Divisas/ReportarPago',
        },
        {
          public:true,
          label:'Operaciones',
          url:'/Divisas/Operaciones',
        }
      ]
    },
    {
      public:true,
      label:'Reportes',
      url:'/Reportes',
      ico:'icon-cuenta-bancaria-inactiva',
      items:[
        {
          public:true,
          label:'Gestión Cuentas',
          url:'/Reportes/Usuarios',
        },
        {
          public:true,
          label:'Extractos',
          url:'/Reportes/Extractos',
        },
        {
          public:true,
          label:'Movimientos',
          url:'/Reportes/Movimientos',
        },
        {
          public:true,
          label:'Relación Pagos',
          url:'/Reportes/RelacionPagos',
        },
        {
          public:true,
          label:'Gastos',
          url:'/Reportes/Gastos',
        },
      ]
    },
    {
      public:true,
      label:'Configuración',
      url:'/Configuracion',
      ico:'icon-configuracion',
      items:[
        {
          empresas:true,
          public:true,
          label:'Delegar funciones',
          url:'/Configuracion/DelegarFunciones',
        },
        {
          public:true,
          label:'Cambiar clave',
          url:'/Configuracion/Cambiar_clave',
        },
        // {
        //   public:true,
        //   label:'Actualización datos',
        //   url:'/Configuracion/ActualizacionDatos',
        // },
        // {
        //   public:true,
        //   label:'Necesito ayuda',
        //   blank:'https://api.whatsapp.com/send?phone=573115000926&text=Hola,%20necesito%20ayuda%20respecto%20a%20',
        //   url:'#',
        // },
        {
          public:true,
          label:'Costos',
          url:'/Configuracion/Costos',
        },{
          public:true,
          label:'Políticas de servicio',
          url:'/Configuracion/Politicas',
        }
      ]
    },
    {
      public:true,
      label:'Administración',
      url:'/Administracion',
      ico:'icon-administracion',
      items:[
        {
          public:true,
          label:'Home',
          ico:'icon-casa',
          url:'/',
        },
        {
          public:true,
          label:'Usuarios',
          ico:'icon-administracion',
          url:'/Administracion/Usuarios',
        },
        {
          public:true,
          label:'Reportes de pagos',
          ico:'icon-reporte-pago',
          url:'/Administracion/ReportePago',
        },
        {
          public:true,
          label:'Negociar divisas',
          ico:'icon-divisas',
          url:'/Administracion/NegociarDivisas'
        },
        {
          public:true,
          label:'Aprobación cuentas',
          ico:'icon-resumen',
          url:'/Administracion/AprobacionCuentas',
        },
        {
          public:true,
          label:'Órdenes nacionales',
          ico:'icon-datos-bolsillos',
          url:'/Administracion/OrdenesNacionales',
        },
        {
          public:true,
          label:'Lote de pago',
          ico:'icon-reporte-pago',
          url:'/Administracion/Lotes',
        },
        {
          public:true,
          label:'Comisiones',
          ico:'icon-configuracion',
          url:'/Administracion/Comisiones',
        },
        {
          public:true,
          label:'Cuentas Bancarias',
          ico:'icon-comercial',
          url:'/Administracion/CuentasBancarias',
        },
        {
          public:true,
          label:'Reintegros',
          ico:'icon-comercial',
          url:'/',
        },
        {
          public:true,
          label:'Funcionarios',
          ico:'icon-gerencia',
          url:'/Administracion/Funcionarios',
        },
        {
          public:true,
          label:'Reportes',
          ico:'icon-reportes',
          url:'/Administracion/Reportes',
        },
        {
          public:true,
          label:'Seguridad',
          ico:'icon-gerencia',
          url:'/Administracion/Seguridad',
        },
      ]
    }
  ]
}


export default  exportar
