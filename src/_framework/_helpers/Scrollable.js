/* Detecta SpA - CMMS Seguridad Electrónica
 *
 * 
 *  
 * Version: 1.0.0
 * Author: @fullconectados
 */

// SLIMSCROLL
// -----------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
// Slimscroll
import 'jquery-slimscroll';

/**
 * Wrapper for jquery-slimscroll plugin
 */
const Scrollable = props => {

    const init = node =>
        $(node).slimScroll({
            height: props.height
        });

    return (
        <div ref={init} {...props}>
            {props.children}
        </div>
    )

}

Scrollable.propTypes = {
    /** height of the element */
    height: PropTypes.string
}

Scrollable.defaultProps = {
  height: 250
};

export default Scrollable