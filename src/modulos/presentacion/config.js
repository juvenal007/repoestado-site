import config from '../../utils/config';

const CONFIG = {
	list: config.PRESENTACION.list,
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
			field: 'archivo_nombre',
			isRequired: true,			
		},
		{
			title: 'Extension',
			field: 'archivo_extension',
			isRequired: true,
		},		
		
	],
	edit_btn:
	{
		title: 'Editar Tipo',
		path: config.PRESENTACION.edit,
		field: 'id',
		icon: 'icon-pencil',
	},
	delete_btn:
	{
		title: 'Eliminar Tipo',
		path: config.PRESENTACION.delete,
		field: 'id',
		icon: 'icon-trash',
	},
	add_btn:
	{
		title: 'Agregar Tipo',
		path: config.PRESENTACION.add,
		icon: 'icon-plus',
	},
};

export default CONFIG;