/* Detecta SpA - CMMS Seguridad Electrónica
 *
 * archivo de entrada, con definicion de parametros generales
 *  
 * Version: 1.0.0
 * Author: @fullconectados
 */

import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import InputField from './InputField';

class InputSwitch extends Component {
    static propTypes = {
    	// Indica el estatus del input
    	isChecked: PropTypes.bool,

    	// Nombre del input
    	name: PropTypes.string,

    }

    static defaultProps = {
    	isChecked: false,
    	name: `name-field-${(new Date()).getTime()}`,
    }

    state = {

    	// Save status of control
    	checked: '',
    }

    handleChange = (e, item) => {
			//console.log("RCO_ITEM",item);
    	const value = e.target.checked;
    	this.setState({ checked: (value) ? 'checked' : '' });
    	if (this.props.hasOwnProperty('event')) {
    		if (this.props.event.length > 2) {
    			this.props.event(e, item, value);
    		} else {
    			this.props.event(e, item);
    		}
    	}
	}
	

    componentDidMount() {
    	this.setState({ checked: (this.props.isChecked) ? 'checked' : '' });
    }


    render() {
    	return (
    		<Fragment>
    			<label className="switch">
    				<InputField
    					type="checkbox"
    					onChange={e => this.handleChange(e, this.props.item)}
    					checked={this.state.checked}
    					name={this.props.name}
    				/>
    				<span />
    			</label>
    		</Fragment>
    	);
    }
}

export default InputSwitch;
