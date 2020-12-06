/* Detecta SpA - CMMS Seguridad Electrónica
 *
 * 
 *  
 * Version: 1.0.0
 * Author: @fullconectados
 */

import React, { Component } from 'react';
import { Tooltip } from 'reactstrap';
import PropTypes from 'prop-types';

class ToolTip extends Component {
	static propTypes = {
		idelement: PropTypes.string,
	}

	static defaultProps = {
		idelement: 'id4tooltip',
	}

	state = {
		_id: `${this.uniqid()}_${this.props.idelement}_${(new Date()).getTime()}`,
		tooltipOpen: false,
	}

	toggle = () => this.setState({ tooltipOpen: !this.state.tooltipOpen })

	uniqid() {
		this.funcName = 'uniqid';
		const ts = String(new Date().getTime()); let i = 0; let
			out = '';
		for (i = 0; i < ts.length; i += 2) {
			out += Number(ts.substr(i, 2)).toString(36);
		}
		return (`d${out}`);
	}


	render() {
		return [
			(!this.props.children.props.hasOwnProperty('disabled') || this.props.children.props.disabled === false)
				? (
					<Tooltip {...this.props} isOpen={this.state.tooltipOpen} toggle={this.toggle} target={this.state._id} key="1">
						{this.props.content}
					</Tooltip>
				)
				: null,
			React.cloneElement(React.Children.only(this.props.children), {
				id: this.state._id,
				key: '2',
			}),
		];
	}
}

export default ToolTip;
