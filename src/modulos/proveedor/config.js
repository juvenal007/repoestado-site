import config from '../../utils/config';

const CONFIG = {
	list: config.PROVEEDOR.list,
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
			title: 'Rut',
			field: 'proveedor_rut',
			isRequired: true,
		},
		{
			title: 'Nombre',
			field: 'proveedor_nombre',
			isRequired: true,
		},
		{
			title: 'Giro',
			field: 'proveedor_giro',
			isRequired: true,
		},
		{
			title: 'Razón Social',
			field: 'proveedor_razon_social',
			isRequired: true,
		},
		{
			title: 'Telefono',
			field: 'proveedor_telefono',
			isRequired: true,
		},	
		{
			title: 'Dirección',
			field: 'proveedor_direccion',
			isRequired: true,
		},	
		{
			title: 'Ciudad',
			field: 'proveedor_ciudad',
			isRequired: true,
		},
		{
			title: 'Email',
			field: 'proveedor_email',
			isRequired: true,
		},
		{
			title: 'Apellido',
			field: 'proveedor_apellido_paterno',
			isRequired: true,
			show: false
		},
		{
			title: 'Apellido Materno',
			field: 'proveedor_apellido_materno',
			isRequired: true,
			show: false
		},	
	],
	edit_btn:
	{
		title: 'Editar Proveedor',
		path: config.PROVEEDOR.edit,
		field: 'id',
		icon: 'icon-pencil',
	},
	delete_btn:
	{
		title: 'Eliminar Proveedor',
		path: config.PROVEEDOR.delete,
		field: 'id',
		icon: 'icon-trash',
	},
	add_btn:
	{
		title: 'Agregar Proveedor',
		path: config.PROVEEDOR.add,
		icon: 'icon-plus',
	},
	actions_custom: [
		{
			title: 'Ver Proveedor',
			icon: 'icon-eye',
			color: 'primary',
			path: '/administracion/proveedores',
			field_fk: 'id'
		}
	]
};

export default CONFIG;