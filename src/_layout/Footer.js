import React, { Component } from 'react';

class Footer extends Component {

    render() {
        const year = new Date().getFullYear()
        return (
            <footer className="footer-container">
                <span>&copy; {year} - Ilustre Municipalidad de Pencahue.</span>
            </footer>
        );
    }

}

export default Footer;
