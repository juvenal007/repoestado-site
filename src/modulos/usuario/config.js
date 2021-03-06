import config from '../../utils/config';

const CONFIG = {
	list: config.USUARIO.list_all,
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
			field: 'usuario_nombre',
			isRequired: true,
		},
		{
			title: 'Apellido Paterno',
			field: 'usuario_ape_paterno',
			isRequired: true,
		},
		{
			title: 'Apellido Materno',
			field: 'usuario_ape_materno',
			isRequired: true,
			show:false
		},
		{
			title: 'Correo',
			field: 'usuario_correo',
			isRequired: true,
		},		
		{
			title: 'Telefono',
			field: 'usuario_telefono',
			isRequired: true,
		},
		{
			title: 'Funcion',
			field: 'usuario_funcion',
			isRequired: true,
		},
		{
			title: 'Departamento',
			field: 'departamento_txt',		
			type: 'tags',
			align: 'text-center',
			color: 'info'
		},
		{
			title: 'Tipo',
			field: 'usuario_tipo',		
			type: 'tags',
			align: 'text-center',
			color: 'dark'
		},
				
	],
	edit_btn:
	{
		title: 'Editar Usuario',
		path: config.USUARIO.edit,
		field: 'id',
		icon: 'icon-pencil',
	},
	delete_btn:
	{
		title: 'Eliminar Usuario',
		path: config.USUARIO.delete,
		field: 'id',
		icon: 'icon-trash',
	},
	add_btn:
	{
		title: 'Agregar Usuario',
		path: '/administracion/usuarios/agregar-usuario',
		icon: 'icon-plus',
		modal: false
	},
};

export default CONFIG;