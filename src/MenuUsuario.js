const MenuUsuario = [
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
];

export default MenuUsuario;