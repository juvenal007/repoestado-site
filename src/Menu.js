const Menu = [
    {
        heading: 'Menu Principal',
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

        icon: 'fa fa-share',
        translate: 'sidebar.nav.ENVIAR',
        path: '/enviar-documento',
        boton: {
            nombre: 'ENVIAR',
            color: 'success'
        }
    },
    {

        icon: 'fa fa-reply',
        translate: 'sidebar.nav.RECIBIR',
        path: '/recibir-documento',
        boton: {
            nombre: 'RECIBIR',
            color: 'warning'
        }
    },
    {

        icon: 'fa fa-handshake',
        translate: 'sidebar.nav.TERMINAR',
        path: '/terminar-documento',
        boton: {
            nombre: 'TERMINAR',
            color: 'danger'
        }
    },
    {
        path: '/dashboard',
        icon: 'fa fa-inbox',
        translate: 'sidebar.nav.MIS_DOCUMENTOS',
        path: '/mis-documentos',
        boton: {
            nombre: 'MIS DOCUMENTOS',
            color: 'info'
        }
    },
    {
        heading: 'Administración',
        translate: 'sidebar.heading.COMPONENTS'
    },
    {
        name: 'Mantenedores',
        icon: 'fa fa-cubes',
        translate: 'sidebar.nav.mantenedores.MANTENEDORES',
        submenu: [
            {
                name: 'Usuarios',
                translate: 'sidebar.nav.mantenedores.USUARIO',
                path: '/administracion/usuario'
            },
            {
                name: 'Departamentos',
                translate: 'sidebar.nav.mantenedores.DEPARTAMENTO',
                path: '/administracion/departamento'
            },
            {
                name: 'Tipo Documento',
                translate: 'sidebar.nav.mantenedores.TIPO_DOCUMENTO',
                path: '/administracion/tipo-documento'
            },
        ]
    },
    {
        name: 'Busqueda Documentos',
        icon: 'fa fa-search',
        translate: 'sidebar.nav.busqueda_documentos.BUSQUEDA_DOCUMENTOS',
        submenu: [
            {
                name: 'Departamento',
                translate: 'sidebar.nav.busqueda_documentos.BUSCAR_DEPARTAMENTO',
                path: '/administracion/buscar-departamento'
            },
            {
                name: 'Usuario',
                translate: 'sidebar.nav.busqueda_documento.BUSCAR_USUARIO',
                path: '/administracion/buscar-usuario'
            },
            {
                name: 'Código',
                translate: 'sidebar.nav.busqueda_documentos.BUSCAR_CODIGO',
                path: '/administracion/buscar-codigo'
            },
        ]
    },
    {
        name: 'Reportes',
        icon: 'fa fa-calendar-check',
        translate: 'sidebar.nav.reportes.REPORTES',
        submenu: [
            {
                name: 'Solicitudes',
                translate: 'sidebar.nav.reportes.REPORTE_DOCUMENTO',
                path: '/administracion/reporte'
            },            
        ]
    },
];

export default Menu;
