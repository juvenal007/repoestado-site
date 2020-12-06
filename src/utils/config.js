const PATH_GLOBALS = {
    BASE_URL_API : process.env.REACT_APP_BASE_API_URL || 'http://localhost:8000/api/',
    CENTRO_COSTO : {
        list : 'centro-costo/list',
        add : 'centro-costo/store',
        edit : 'centro-costo/update',
        delete : 'centro-costo/delete',
        detail : 'centro-costo/detail',
        pluck : 'centro-costo/pluck',
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