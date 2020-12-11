import React, { useEffect, useState } from 'react';
import ContentWrapper from '../../_layout/ContentWrapper';
import { Row, Col } from 'reactstrap';
import Historial from './components/historial';
import getApi from '../../utils/api/index';
import { v4 } from "uuid";
//COMPONENTES

import '../../styles/custom.css';
import '../../styles/home.css';

const VerEstado = (props) => {

    const [idUrl] = useState(props.match.params.id_documento);
    const [estados, setEstados] = useState([]);
    const [documento, setDocumento] = useState({});

    // COMPONENTES DE CARGA
    const [cargaEstados, setCargaEstados] = useState(false);
    const [classCard, setClassCard] = useState('card card-default whirl double-up');
    useEffect(() => {
        const getEstados = async () => {
            const url = `/estado/list/${idUrl}`;
            getApi(url, "GET", null, (status, data, message) => {
                console.log(status, data, message);
                if (!status) {
                    return console.log(message);
                }
                setEstados(data.estados);
                setDocumento(data.documento);
                setCargaEstados(true);
            });
        };
        getEstados();
    }, []);

    const cargaEstadosCodigo = () => {
        if (!cargaEstados) {
            return `card card-default whirl double-up`;

        }
        else {
            return 'card card-default';
        }
    }
    const clickReturn = () => {
        let url = localStorage.getItem('historial');
        props.history.push(`${url}`);
    }

    return (
        <ContentWrapper>
            <div className="content-heading ">
                <div className='text-form text-tittle'>Historial de Estados</div>
                <div className="ml-auto">
                    <button className={"btn btn-info"} onClick={() => clickReturn()}>Regresar</button>
                </div>
            </div>
            <div className="p-0">
                <Row className='d-flex justify-content-center mb-1'>
                    <Col xl="12">
                        <div className={cargaEstadosCodigo()}>
                            <div className="card-header mb-0">
                                <div className="text-tittle-card mt-1"><em className="fas fa-sync"></em>&nbsp;Estados</div>
                                <hr></hr>
                            </div>
                            <div className='container'>
                                <div className="card-body mt-0">
                                    {cargaEstados && <Historial
                                        estados={estados}
                                        documento={documento}
                                        key={v4()}
                                    />}
                                </div>
                            </div>

                        </div>
                    </Col>
                </Row>
            </div>
        </ContentWrapper>
    );
}

export default VerEstado;