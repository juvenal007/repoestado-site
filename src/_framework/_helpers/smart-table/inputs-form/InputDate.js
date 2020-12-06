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
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';
require('moment/locale/es');

class InputDate extends Component {
    static propTypes = {
    	// Indica si se muestra el boton con el icono
    	showIcon: PropTypes.bool,

    	// Valor del componente
    	defaultValue: PropTypes.string,

    	// Indica el icono a mostrar en el input
    	iconClass: PropTypes.string,

    	// Indica el tamaño del icono
    	iconSize: PropTypes.string,

    	// Formato de fecha
    	dateFormat: PropTypes.oneOfType([
    		PropTypes.string,
    		PropTypes.bool,
    	]),

    	// Formato de hora
    	timeFormat: PropTypes.oneOfType([
    		PropTypes.string,
    		PropTypes.bool,
    	]),

    	// Indica si el input es solo lectura o editable manualmente
    	allowEdit: PropTypes.bool,

    	// Indica si el control es requerido
    	isRequired: PropTypes.bool,

    	// Nombre del input
		name: PropTypes.string,
		
		type: PropTypes.number,
    }

    static defaultProps = {
    	showIcon: false,
    	iconClass: 'fa fa-calendar-alt',
    	iconSize: 'fa-1x',
    	dateFormat: 'YYYY-MM-DD',
    	timeFormat: 'HH:mm',
    	allowEdit: false,
    	defaultValue: '',
    	isRequired: false,
		name: `name-field-${(new Date()).getTime()}`,
		type: 1
    }

    state = {
    	currentValue: null,
    	readyForRender: false,
		format: 'YYYY-MM-DD HH:mm', // default
		moment: moment()
    }


    handleChange = (e, item) => {
		let valor = '';
		if(moment(e,this.state.format,true).isValid()){
			valor = moment(e).format(this.state.format);
		}else{
			valor = e;
		}
        valor = valor.trim();
        this.setState({ currentValue: valor });
        if (this.props.hasOwnProperty('event')) {
            if (this.props.event.length > 2) {
                this.props.event(moment(e), item, valor);
            } else {
                this.props.event(moment(e), item);
            }
        }
        
    }

    componentDidMount() {
    	let format = (!this.props.dateFormat) ? '' : this.props.dateFormat;
    	format += (!this.props.timeFormat) ? '' : ` ${this.props.timeFormat}`;
    	this.setState({
    		currentValue: this.props.defaultValue,
    		readyForRender: true,
    		format,
    	});
    }


    render() {
    	const cursorBtn = {
    		cursor: 'pointer',
		};
		

    	const renderInputCustom = (props, openCalendar) => (
    		<InputGroup>
    			<input
    				{...props}
    				readOnly={!this.props.allowEdit}
    				data-parsley-required={this.props.isRequired}
					name={this.props.name}
					autoComplete={'off'}
    			/>
    			<InputGroupAddon addonType="append" onClick={openCalendar} style={cursorBtn}>
    				<InputGroupText>
    					<i className={`${this.props.iconClass} ${this.props.iconSize}`} />
    				</InputGroupText>
    			</InputGroupAddon>
    		</InputGroup>
    	);

    	const renderInputSimple = props => (
    		<input
    			{...props}
    			readOnly={!this.props.allowEdit}
    			data-parsley-required={this.props.isRequired}
				name={this.props.name}
				autoComplete={'off'}
    		/>
		);

    	return (
    		<Fragment>
    			{this.state.readyForRender
                && (
					<Fragment>
					{ this.props.showIcon ? 
						(
						<Datetime
							closeOnSelect
							dateFormat={this.props.dateFormat}
							timeFormat={this.props.timeFormat}
							value={this.state.currentValue}
							onChange={e => this.handleChange(e, this.props.item)}
							renderInput={renderInputCustom}
							locale={'es'}
							pickerOptions={{
								showTodayButton:true
							}}
							{...this.props}
							/>
						):(
						<Datetime
							closeOnSelect
							dateFormat={this.props.dateFormat}
							timeFormat={this.props.timeFormat}
							value={this.state.currentValue}
							locale={'es'}
							onChange={e => this.handleChange(e, this.props.item)}
							inputProps={{ readOnly: !this.props.allowEdit }}
							renderInput={renderInputSimple}
							{...this.props}
							/>
						)
					}
					</Fragment>
                )
    			}
    		</Fragment>
    	);
    }
}

export default InputDate;
