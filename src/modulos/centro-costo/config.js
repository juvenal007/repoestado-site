import config from '../../utils/config';

const CONFIG = {
	list: config.CENTRO_COSTO.list,
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
			field: 'nombre',
			isRequired: true,
		},
		{
			title: 'Dirección',
			field: 'direccion',
			isRequired: true,
		},
	],
	edit_btn:
	{
		title: 'Editar Centro de Costo',
		path: config.CENTRO_COSTO.edit,
		field: 'id',
		icon: 'icon-pencil',
	},
	delete_btn:
	{
		title: 'Eliminar Centro de Costo',
		path: config.CENTRO_COSTO.delete,
		field: 'id',
		icon: 'icon-trash',
	},
	add_btn:
	{
		title: 'Agregar Centro de Costo',
		path: config.CENTRO_COSTO.add,
		icon: 'icon-plus',
	},
	actions_custom: [
		{
			title: 'Ver Proyectos',
			icon: 'icon-eye',
			color: 'primary',
			path: '/administracion/centro-costos/proyecto',
			field_fk: 'id'
		}
	]
};

export default CONFIG;