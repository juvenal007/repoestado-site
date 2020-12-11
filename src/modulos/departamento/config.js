import config from '../../utils/config';

const CONFIG = {
	list: config.DEPARTAMENTO.list_all,
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
			field: 'depto_nombre',
			isRequired: true,
		},
		{
			title: 'Descripción',
			field: 'depto_descripcion',
			isRequired: true,
		},
		{
			title: 'Telefono',
			field: 'depto_telefono',
			isRequired: true,
			show:false
		},
		{
			title: 'Anexo',
			field: 'depto_anexo',
			isRequired: true,
		},				
	],
	edit_btn:
	{
		title: 'Editar Departamento',
		path: config.DEPARTAMENTO.edit,
		field: 'id',
		icon: 'icon-pencil',
	},
	delete_btn:
	{
		title: 'Eliminar Departamento',
		path: config.DEPARTAMENTO.delete,
		field: 'id',
		icon: 'icon-trash',
	},
	add_btn:
	{
		title: 'Agregar Departamento',
		path: config.DEPARTAMENTO.add,
		icon: 'icon-plus',
	},
};

export default CONFIG;