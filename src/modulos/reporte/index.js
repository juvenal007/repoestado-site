import React from 'react';
import ContentWrapper from '../../_layout/ContentWrapper';
import { Button, Col, Row } from 'reactstrap';

import '../../styles/custom.css';

import swal from 'sweetalert';

const Reporte = () => {

    const reporteExcel = () => {
        console.log('REPORTE EXCEL');
        let url = `http://localhost:8000/api/`;
         window.open(`${url}documento/export`);
    }

    return (
        <ContentWrapper>
            <Row className='d-flex justify-content-center mb-1'>
                <Col xl="12">
                    <div className="card card-default">
                        <div className="card-header mb-0">
                            <div className="text-tittle-card mt-1"><em className="fas fa-sync"></em>&nbsp;Reporte Documentos Pendientes.</div>
                            <hr></hr>
                        </div>
                        <div className='container'>
                            <div className="card-body mt-0">
                                <div className='container'>
                                    <Button block className='text-bold mb-5' size="xl" onClick={reporteExcel} color='success'>Exportar a Excel</Button>
                                </div>
                            </div>
                        </div>

                    </div>

                </Col>
            </Row>
        </ContentWrapper>
    );
}

export default Reporte;