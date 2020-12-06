/* Detecta SpA - CMMS Seguridad Electrónica
 *
 * archivo de entrada, con definicion de parametros generales
 *  
 * Version: 1.0.0
 * Author: @fullconectados
 */
import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { SketchPicker } from 'react-color';
import InputField from './InputField';

class InputColor extends Component {
    static propTypes = {
    	// Indica si se muestra el boton con el icono
    	showIcon: PropTypes.bool,

    	// Indica el icono a mostrar en el input
    	iconClass: PropTypes.string,

    	// Indica el tamaño del icono
    	iconSize: PropTypes.string,

    	// Indica si el calbio de color se refleja en el icono
    	inlineColor: PropTypes.bool,

    	// Indica si el input es solo lectura o editable manualmente
    	allowEdit: PropTypes.bool,

    	// Indica el estatus del input
    	isChecked: PropTypes.bool,

    	// Indica si el control es requerido
    	isRequired: PropTypes.bool,
    }

    static defaultProps = {
    	showIcon: true,
    	iconClass: 'fa fa-palette',
    	iconSize: 'fa-1x',
    	inlineColor: true,
    	allowEdit: false,
    	isRequired: false,
    	name: `name-field-${(new Date()).getTime()}`,
    }

    state = {
    	// Toggle box color
    	displayColorPickerInput: false,

    	// Save color value
    	color: '',
    }

    colorpickerInputHandleClick = () => {
    	this.setState({ displayColorPickerInput: !this.state.displayColorPickerInput });
    };

    colorpickerInputHandleClose = () => {
    	this.setState({ displayColorPickerInput: false });
    };

    handleChange = (e, item) => {
    	if (e.hasOwnProperty('hex') && this.validHex(e.hex)) {
    		this.setState({ color: e.hex });
    		if (this.props.hasOwnProperty('event')) this.props.event(e, item);
    	}
    }

    componentDidMount() {
    	if (!this.props.hasOwnProperty('color') || this.props.color !== '') {
    		this.setState({ color: this.props.color });
    	}
    }

    validHex(str) {
    	const regexp = /[0-9A-Fa-f]{6}/g;
    	str = str.replace('#', '');
    	return regexp.test(str);
    }

    render() {
    	// used for color picker
    	const popover = {
    		position: 'absolute',
    		zIndex: '302',
    	};

    	const cover = {
    		position: 'fixed',
    		top: '0px',
    		right: '0px',
    		bottom: '0px',
    		left: '0px',
    	};

    	const colorInput = {
    		color: this.state.color,
    	};

    	const cursorBtn = {
    		cursor: 'pointer',
    	};

    	return (
    		<Fragment>
    			{this.props.showIcon
    				? (
    					<InputGroup className="colorpicker-component demo-colorpicker">
    					<InputField
    						value={this.state.color}
    						onChange={(e) => { this.handleChange(e, this.props.item); }}
    						onFocus={this.colorpickerInputHandleClick}
    						readOnly={!this.props.allowEdit}
    						name={this.props.name}
    						isRequired={this.props.isRequired}
    					/>
    					<InputGroupAddon addonType="append" onClick={this.colorpickerInputHandleClick} style={cursorBtn}>
    						<InputGroupText>
    							<i className={`${this.props.iconClass} ${this.props.iconSize}`} style={this.props.inlineColor ? colorInput : null} />
    						</InputGroupText>
    					</InputGroupAddon>
    					</InputGroup>
    				)
    				: (
    					<InputGroup className="colorpicker-component demo-colorpicker">
    					<InputField
    						value={this.state.color}
    						onChange={(e) => { this.handleChange(e, this.props.item); }}
    						onFocus={this.colorpickerInputHandleClick}
    						readOnly={!this.props.allowEdit}
    						name={this.props.name}
    						isRequired={this.props.isRequired}
    					/>
    					</InputGroup>
    				)
    			}

    			{ this.state.displayColorPickerInput
    				? (
    					<div style={popover}>
    					<div style={cover} onClick={this.colorpickerInputHandleClose} />
    					<SketchPicker color={this.state.color} onChange={(color) => { this.handleChange(color, this.props.item); }} />
    					</div>
    				)
    				: null }
    		</Fragment>
    	);
    }
}

export default InputColor;
