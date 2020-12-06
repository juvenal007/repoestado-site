import config from '../../utils/config';

const CONFIG = {
	list: config.PROYECTO.list,
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
		{
			title: 'Descripcion',
			field: 'descripcion',
			isRequired: true,
		},		
		{
			title: 'Telefono',
			field: 'telefono_ad',
			isRequired: true,
		},		
		
	],
	edit_btn:
	{
		title: 'Editar Centro de Costo',
		path:  config.PROYECTO.edit,
        field: 'id',
		icon: 'icon-pencil',
	},
	delete_btn:
	{
		title: 'Eliminar Centro de Costo',
		path: config.PROYECTO.delete,
		field: 'id',
		icon: 'icon-trash',
	},
	add_btn:
	{
		title: 'Agregar Centro de Costo',
		path:  '/administracion/proyecto/crear-proyecto',
		icon:  'icon-plus',
	},
	actions_custom: [
		{
			title: 'Ver Cliente',
			icon: 'icon-user',
			color: 'primary',
			path: '/administracion/proyecto/ver-cliente',
			field_fk: 'id'
		}
	]
};

export default CONFIG;