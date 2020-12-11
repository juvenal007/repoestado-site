const PATH_GLOBALS = {
    BASE_URL_API : process.env.REACT_APP_BASE_API_URL || 'http://localhost:8000/api/',
    USUARIO : {
        list_all : 'usuario/list_all',
        list : 'usuario/list',
        add : 'usuario/store',
        edit : 'usuario/update',
        delete : 'usuario/delete',
        detail : 'usuario/detail',
        pluck : 'usuario/pluck',
    },
    DEPARTAMENTO : {
        list_all : 'departamento/list_all',
        list : 'departamento/list',
        add : 'departamento/store',
        edit : 'departamento/update',
        delete : 'departamento/delete',
        detail : 'departamento/detail',
        pluck : 'departamento/pluck',
    },
    PRESENTACION : {
        list_all : 'archivo/list_all',
        list : 'archivo/list',
        add : 'archivo/store',
        edit : 'archivo/update',
        delete : 'archivo/delete',
        detail : 'archivo/detail',
        pluck : 'archivo/pluck',
    },
    TIPO_DOCUMENTO : {
        list_all : 'tipo-documento/list_all',
        list : 'tipo-documento/list',
        add : 'tipo-documento/store',
        edit : 'tipo-documento/update',
        delete : 'tipo-documento/delete',
        detail : 'tipo-documento/detail',
        pluck : 'tipo-documento/pluck',
    },
    DOCUMENTO : {
        list_all : 'documento/list_all',
        list : 'documento/list',
        add : 'documento/store',
        edit : 'documento/update',
        delete : 'documento/delete',
        detail : 'documento/detail',
        pluck : 'documento/pluck',
    },
    PROYECTO : {
        //agregar / ALFINAL YA QUE TRAE DATOS POR ID EN LA URL  proyectos/1, proyectos/2 etc..
        list : 'proyecto/list/',
        add : 'proyecto/store',
        edit : 'proyecto/update',
        delete : 'proyecto/delete',
        detail : 'proyecto/detail',
        pluck : 'proyecto/pluck',
    },   
    __DATATABLES_OPTIONS__: {
        'paging': true, // Table pagination
        'ordering': true, // Column ordering
        'info': true, // Bottom left status text
        responsive: false,
        stateSave: false,
        "order": [],
        // Text translation options
        // Note the required keywords between underscores (e.g _MENU_)
        language: {
            sSearch: '<em class="fa fa-search"></em>',
            sLengthMenu: '_MENU_ registros por página',
            info: 'Mostrando página _PAGE_ de _PAGES_',
            zeroRecords: 'Sin registros - lo sentimos',
            infoEmpty: 'No hay registros disponibles',
            infoFiltered: '(filtered from _MAX_ total records)',
            oPaginate: {
                sNext: '<em class="fa fa-caret-right"></em>',
                sPrevious: '<em class="fa fa-caret-left"></em>'
            }
        },
        columnDefs: [{
            orderable: false,
            targets: "no-sort"
        }]
    }
}

export default Object.freeze(Object.assign({}, PATH_GLOBALS));