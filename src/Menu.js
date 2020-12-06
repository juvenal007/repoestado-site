const Menu = [
    {
        heading: 'Main Navigation',
        translate: 'sidebar.heading.HEADER'
    },
    {
        name: 'Home',
        path: '/dashboard',
        icon: 'icon-grid',
        translate: 'sidebar.nav.HOME',
        path: '/home-principal'
    },
    {       
        path: '/dashboard',
        icon: 'fa fa-share',
        translate: 'sidebar.nav.MENU',
        path: '/enviar-documento', 
        boton: {
            nombre: 'ENVIAR',
            color:'success'
        }     
    },
    {       
        path: '/dashboard',
        icon: 'fa fa-reply',
        translate: 'sidebar.nav.MENU',
        path: '/recibir-documento', 
        boton: {
            nombre: 'RECIBIR',
            color:'warning'
        }     
    },
    {       
        path: '/dashboard',
        icon: 'fa fa-handshake',
        translate: 'sidebar.nav.MENU',
        path: '/terminar-documento', 
        boton: {
            nombre: 'TERMINAR',
            color:'danger'
        }     
    },
    {       
        path: '/dashboard',
        icon: 'fa fa-handshake',
        translate: 'sidebar.nav.MENU',
        path: '/mis-documentos', 
        boton: {
            nombre: 'MIS DOCUMENTOS',
            color:'info'
        }     
    },
    {
        name: 'Administración',
        icon: 'fa fa-cubes',
        translate: 'sidebar.nav.MENU',       
        submenu: [
            {
                name: 'Usuarios',
                translate: 'sidebar.nav.SUBMENU',
                path: '/administracion/centro-costo'
            },
            {
                name: 'Departamentos',
                translate: 'sidebar.nav.SUBMENU',
                path: '/administracion/cliente'
            },
            {
                name: 'Documentos',
                translate: 'sidebar.nav.SUBMENU',
                path: '/administracion/proveedor'
            },           
        ]
    },
    {
        name: 'Reportes',
        icon: 'fa fa-calendar-check',
        translate: 'sidebar.nav.MENU',
        submenu: [
            {
                name: 'Solicitudes',
                translate: 'sidebar.nav.SUBMENU',
                path: '/administracion/solicitud'
            },
            {
                name: 'Cotizaciones',
                translate: 'sidebar.nav.SUBMENU',
                path: '/administracion/cotizacion'
            },
        ]
    },   
];

export default Menu;
