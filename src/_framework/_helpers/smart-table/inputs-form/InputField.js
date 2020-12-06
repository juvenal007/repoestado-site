/* Detecta SpA - CMMS Seguridad Electrónica
 *
 * archivo de entrada, con definicion de parametros generales
 *  
 * Version: 1.0.0
 * Author: @fullconectados
 */

import React, { Component } from 'react';
import { Input } from 'reactstrap';

import PropTypes from 'prop-types';

class InputField extends Component {
	static propTypes = {
		// Nombre del input
		name: PropTypes.string,

		// Indica si el control es requerido
		isRequired: PropTypes.bool,
	}

	static defaultProps = {
		isRequired: false,
		name: `name-field-${(new Date()).getTime()}`,
	}

	render() {
		const { isRequired, ...props } = this.props;
		return (
			<Input
				{...props}
				name={this.props.name}
				data-parsley-required={this.props.isRequired}
			/>
		);
	}
}

export default InputField;
