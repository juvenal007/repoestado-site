/* Detecta SpA - CMMS Seguridad Electrónica
 *
 * archivo de entrada, con definicion de parametros generales
 *  
 * Version: 1.0.0
 * Author: @fullconectados
 */
import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';

// Importamos el select react avanzado
import Select from 'react-select';
// import config from '../../config/configurations';

class SelectReact extends Component {
    static propTypes = {
    	// Nombre del control
    	name: PropTypes.string,

    	// Indica el tipo de lista [1=select2, 2=react-select, 3=tradicional]
    	theme: PropTypes.number,

    	// Lista de opciones del select (Puede venir en formato objeto o array)
    	options: PropTypes.oneOfType(
    		[
    			PropTypes.array,
    			PropTypes.object,
    		],
    	),

    	// Campos para tomar de una lista ajax (Puede venir en formato objeto o array)
    	fields: PropTypes.array,

    	// Valor por defecto
    	defaultValue: PropTypes.oneOfType(
    		[
    			PropTypes.number,
    			PropTypes.string,
    		],
    	),

    	// Indica el texto del valor vacio de la lista
    	valueEmpty: PropTypes.string,

    	// Indica si el campo es requerido
		isRequired: PropTypes.bool,
		
		// Indica si es Multiple
		isMulti: PropTypes.bool,
    }

    static defaultProps = {
    	name: `select-name-${(new Date()).getTime()}`,
    	theme: 2,
    	type: 1,
    	options: [],
    	defaultValue: null,
    	valueEmpty: 'Seleccione un elemento',
		isRequired: false,
		isMulti: false,
    }

    state = {
    	currentValue: null,
    	readyForRender: false,
    	keys_select: [],
    }

    handleChange = (e, item) => {
		if(this.props.isMulti){
			let valor = '';
			e.forEach(item => {
				valor = valor+item.value+',';
			});
			valor = valor.substring(0,valor.length-1);
			this.setState({ currentValue: valor });
			if (this.props.hasOwnProperty('event')) this.props.event(e, item, valor);
		}else{

			let valor = (e===null)?'':e.value;
			this.setState({ currentValue: valor });
			if (this.props.hasOwnProperty('event')) this.props.event(e, item, valor);
			
		}
    }

    formatSelect = (list) => {
    	const new_list = [];
    	const field_id = this.state.keys_select[0];
    	const field_label = this.state.keys_select[1];

		for (var key in list){
			new_list.push({[field_id]: key, [field_label]: list[key]});
		}
    	
    	return new_list;
    }

    componentDidMount = () => {
    	this._init();
    	this.setState({
    		currentValue: this.props.defaultValue,
    	});
    }

    _init = () => {
    	let field_id = 'value';
    	let field_label = 'label';
    	if (this.props.theme === 1) {
    		field_id = 'id';
    		field_label = 'text';
    	}
    	this.setState({
    		keys_select: [field_id, field_label],
    		readyForRender: true,
    	});
    }

    getPosiitionSelect = (options, value) => {
    	let pos = null;
    	let field_id = null;
    	if (this.props.type === 2) {
    		field_id = this.props.fields[0];
    	}

    	// Si es un array lo tramtamos como tal
    	if (Array.isArray(options)) {
    		options.forEach((item, key) => {
    			let k = item.value;
    			if (this.props.type === 2) {
    				k = item[field_id];
    			}
    			if (k === value) {
    				pos = key;
    				return false;
    			}
    		});
    	} else {
			let i = 0;
			let key;
    		for (key in options) {
    			let k = key;
    			if (this.props.type === 2) {
    				k = key[field_id];
    			}
    			if (k.toString() === value.toString()) {
    				pos = i;
    				break;
    			}
    			i++;
    		}
    	}
    	return pos;
    }

    render() {
    	let list_options = [];
		let current_row = [];
		let optionSelected = [];
    	if (this.state.readyForRender) {
			list_options = this.formatSelect(this.props.options);
			if(this.props.isMulti){
				let valores = this.props.defaultValue.split(',');
				valores.forEach(element =>{
					current_row = this.getPosiitionSelect(this.props.options, element);
					optionSelected.push(list_options[current_row])
				})
			}else{
				if (Object.keys(this.props.options).length > 0) {
					current_row = this.getPosiitionSelect(this.props.options, this.props.defaultValue);
					optionSelected = list_options[current_row];
				}
			}
        }
    	return (
    		<Fragment>
    			{this.state.readyForRender
                && (
				<Select
					name="select-name"
					value={optionSelected}
					onChange={e => this.handleChange(e, this.props.item)}
					options={list_options}
					placeholder={this.props.valueEmpty}
					isClearable={!this.props.isRequired}
					data-parsley-required={this.props.isRequired}
					isMulti={this.props.isMulti}
					// styles={config._STYLE_REACT_SELECT_}
					/>
				)
    			}
    		</Fragment>
    	);
    }
}

export default SelectReact;
