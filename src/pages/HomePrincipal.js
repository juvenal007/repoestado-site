import React from 'react';
import ContentWrapper from '../_layout/ContentWrapper';
import { Col } from 'reactstrap';

import '../styles/home.css';

// COMPONENTES
import Proyectos from './components/proyectos';

const HomePrincipal = () => {


    return (
        <ContentWrapper unwrap>
            <div className="bg-cover" style={{ backgroundImage: 'url(img/background_home3.jpg)' }}>
                <div className="p-4 text-center text-white">
                    <div className='padre'>
                        <span className="m-0 titulo">Ilustre Municipalidad de Pencahue</span>
                        <p className="m-0 sub-titulo">Dirección de la Municipalidad #5521</p>
                    </div>
                </div>
            </div>
        <div className='row p-3'>
        
                <Col xl="4" lg="6">
                    <Proyectos />
                </Col>
                <Col xl="4" lg="6">
                    <Proyectos />
                </Col>
                <Col xl="4" lg="6">
                    <Proyectos />
                </Col>
        
        </div>
           
        </ContentWrapper>
    );
}

export default HomePrincipal;

