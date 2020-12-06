import config from '../../utils/config';

const CONFIG = {
	list: config.CLIENTE.list,
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
			title: 'Rut',
			field: 'rut',
			isRequired: true,
		},
		{
			title: 'Nombre',
			field: 'nombre',
			isRequired: true,
		},
		{
			title: 'Apellido',
			field: 'apellido_paterno',
			isRequired: true,
		},
		{
			title: 'Apellido Materno',
			field: 'apellido_materno',
			isRequired: true,
			show:false
		},
		{
			title: 'Telefono',
			field: 'telefono',
			isRequired: true,
		},		
		{
			title: 'Dirección',
			field: 'direccion',
			isRequired: true,
		},
		{
			title: 'Genero',
			field: 'genero',
			isRequired: true,
		},
		
	],
	edit_btn:
	{
		title: 'Editar Cliente',
		path: config.CLIENTE.edit,
		field: 'id',
		icon: 'icon-pencil',
	},
	delete_btn:
	{
		title: 'Eliminar Cliente',
		path: config.CLIENTE.delete,
		field: 'id',
		icon: 'icon-trash',
	},
	add_btn:
	{
		title: 'Agregar Cliente',
		path: config.CLIENTE.add,
		icon: 'icon-plus',
	},
	actions_custom: [
		{
			title: 'Ver Cliente',
			icon: 'icon-eye',
			color: 'primary',
			path: '/administracion/cliente/ver-cliente',
			field_fk: 'id'
		}
	]
};

export default CONFIG;