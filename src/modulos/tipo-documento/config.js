import config from '../../utils/config';

const CONFIG = {
	list: config.TIPO_DOCUMENTO.list_all,
	columns: [
		{
			title: 'Id',
			field: 'id',
			align: 'text-center',
			is_pk: true,
			isRequired: true,
			show:false
		},	
		{
			title: 'Nombre',
			field: 'tipo_documento_nombre',
			isRequired: true,
		},
		{
			title: 'Descripcion',
			field: 'tipo_documento_descripcion',
			isRequired: true,
		},		
		
	],
	edit_btn:
	{
		title: 'Editar Tipo',
		path: config.TIPO_DOCUMENTO.edit,
		field: 'id',
		icon: 'icon-pencil',
	},
	delete_btn:
	{
		title: 'Eliminar Tipo',
		path: config.TIPO_DOCUMENTO.delete,
		field: 'id',
		icon: 'icon-trash',
	},
	add_btn:
	{
		title: 'Agregar Tipo',
		path: config.TIPO_DOCUMENTO.add,
		icon: 'icon-plus',
	},
};

export default CONFIG;