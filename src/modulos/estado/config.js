import config from '../../utils/config';

const CONFIG = {
	list: config.ESTADO.list,
	columns: [
		{
			title: 'Id',
			field: 'id',
			align: 'text-center',
			is_pk: true,
			isRequired: true,
			show: false
		},
		{
			title: 'Estado',
			field: 'estado',
			isRequired: true,
		},
		{
			title: 'Descripcion',
			field: 'estado_descripcion',
			isRequired: true,
		},		
	],
	edit_btn:
	{
		title: 'Editar Estado',
		path: config.ESTADO.edit,
		field: 'id',
		icon: 'icon-pencil',
	},
	delete_btn:
	{
		title: 'Eliminar Estado',
		path: config.ESTADO.delete,
		field: 'id',
		icon: 'icon-trash',
	},
	add_btn:
	{
		title: 'Agregar Estado',
		path: config.ESTADO.add,
		icon: 'icon-plus',
	},
};

export default CONFIG;