import React from 'react';
import ContentWrapper from '../_layout/ContentWrapper';
import { Container, Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import '../styles/home.css';
import FlotChart from './Flot';
import { ChartSpline, ChartArea, ChartBar, ChartBarStacked, ChartDonut, ChartLine, ChartPie } from './ChartFlot.setup.js';
// COMPONENTES
import Proyectos from './components/proyectos';

const HomePrincipal = () => {


    return (
        <ContentWrapper unwrap>
            <div className="bg-cover" style={{ backgroundImage: 'url(img/background.jpg)' }}>
                <div className="p-4 text-center text-white">
                    <div className='padre'>
                        <span className="m-0 titulo">Ilustre Municipalidad de Pencahue</span>
                        <p className="m-0 sub-titulo">Dirección de la Municipalidad #5521</p>
                    </div>
                </div>
            </div>
            <div className="row pt-3 pl-3 pr-3">
                <div className="col-xl-3">
                    {/* START card- */}
                    <div className="card border-0">
                        <div className="row row-flush">
                            <div className="col-4 bg-green text-center d-flex align-items-center justify-content-center rounded-left">
                                <em className="fa fa-users fa-2x"></em>
                            </div>
                            <div className="col-8">
                                <div className="card-body text-center">
                                    <h4 className="mt-0">47</h4>
                                    <p className="mb-0 text-muted">Usuarios</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* END card- */}
                </div>
                <div className="col-xl-3">
                    {/* START card- */}
                    <div className="card border-0">
                        <div className="row row-flush">
                            <div className="col-4 bg-green text-center d-flex align-items-center justify-content-center rounded-left">
                                <em className="fa fa-music fa-2x"></em>
                            </div>
                            <div className="col-8">
                                <div className="card-body text-center">
                                    <h4 className="mt-0">504</h4>
                                    <p className="mb-0 text-muted">Archivos</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* END card- */}
                </div>
                <div className="col-xl-3">
                    {/* START card- */}
                    <div className="card border-0">
                        <div className="row row-flush">
                            <div className="col-4 bg-green text-center d-flex align-items-center justify-content-center rounded-left">
                                <em className="fas fa-code-branch fa-2x"></em>
                            </div>
                            <div className="col-8">
                                <div className="card-body text-center">
                                    <h4 className="mt-0">8</h4>
                                    <p className="mb-0 text-muted">Departamentos</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* END card- */}
                </div>
                <div className="col-xl-3">
                    {/* START card- */}
                    <div className="card border-0">
                        <div className="row row-flush">
                            <div className="col-4 bg-green text-center d-flex align-items-center justify-content-center rounded-left">
                                <em className="fa fa-inbox fa-2x"></em>
                            </div>
                            <div className="col-8">
                                <div className="card-body text-center">
                                    <h4 className="mt-0">365</h4>
                                    <p className="mb-0 text-muted">Documentos</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* END card- */}
                </div>
            </div>
            <div className='row pt-0 pl-3 pr-3'>
                <Col xl="4" lg="6">
                    <Card className="card-default">
                        <CardHeader>Departamentos con documentos pendientes</CardHeader>
                        <CardBody>
                            <FlotChart options={ChartBar.options} data={ChartBar.data} className="flot-chart" height="250px" />
                        </CardBody>
                    </Card>
                </Col>
                <Col xl="4" lg="6">
                    <Card className="card-default">
                        <CardHeader>Pie</CardHeader>
                        <CardBody>
                            <FlotChart options={ChartPie.options} data={ChartPie.data} className="flot-chart" height="250px" />
                        </CardBody>
                    </Card>
                </Col>
                <Col xl="4" lg="6">
                    <div className="card card-default">
                        <div className="card-header">
                            <div className="card-title">Ultimos Documentos</div>
                        </div>
                        {/* START list group */}
                        <div className="list-group">
                            {/* START list group item */}
                            <div className="list-group-item">
                                <div className="media">
                                    <div className="align-self-start mr-2">
                                        <span className="fa-stack">
                                            <em className="fa fa-circle fa-stack-2x text-purple"></em>
                                            <em className="fas fa-cloud-upload-alt fa-stack-1x fa-inverse text-white"></em>
                                        </span>
                                    </div>
                                    <div className="media-body text-truncate">
                                        <p className="mb-1"><a className="text-purple m-0" href="">Documento 1</a>
                                        </p>
                                        <p className="m-0">
                                            <small><a href="">Documento.pdf</a>
                                            </small>
                                        </p>
                                    </div>
                                    <div className="ml-auto">
                                        <small className="text-muted ml-2">152kb</small>
                                    </div>
                                </div>
                            </div>
                            {/* END list group item */}
                            {/* START list group item */}
                            <div className="list-group-item">
                                <div className="media">
                                    <div className="align-self-start mr-2">
                                        <span className="fa-stack">
                                            <em className="fa fa-circle fa-stack-2x text-info"></em>
                                            <em className="far fa-file-alt fa-stack-1x fa-inverse text-white"></em>
                                        </span>
                                    </div>
                                    <div className="media-body text-truncate">
                                        <p className="mb-1"><a className="text-info m-0" href="">Documento 2</a>
                                        </p>
                                        <p className="m-0">
                                            <small><a href="">Documento.pdf</a>
                                            </small>
                                        </p>
                                    </div>
                                    <div className="ml-auto">
                                        <small className="text-muted ml-2">56kb</small>
                                    </div>
                                </div>
                            </div>
                            {/* END list group item */}
                            {/* START list group item */}
                            <div className="list-group-item">
                                <div className="media">
                                    <div className="align-self-start mr-2">
                                        <span className="fa-stack">
                                            <em className="fa fa-circle fa-stack-2x text-danger"></em>
                                            <em className="fa fa-exclamation fa-stack-1x fa-inverse text-white"></em>
                                        </span>
                                    </div>
                                    <div className="media-body text-truncate">
                                        <p className="mb-1"><a className="text-danger m-0" href="">Documento 3</a>
                                        </p>
                                        <p className="m-0">  <small><a href="">Documento.pdf</a>
                                        </small>
                                        </p>
                                    </div>
                                    <div className="ml-auto">
                                        <small className="text-muted ml-2">18Mb</small>
                                    </div>
                                </div>
                            </div>
                            {/* END list group item */}
                            {/* START list group item */}
                            <div className="list-group-item">
                                <div className="media">
                                    <div className="align-self-start mr-2">
                                        <span className="fa-stack">
                                            <em className="fa fa-circle fa-stack-2x text-success"></em>
                                            <em className="far fa-clock fa-stack-1x fa-inverse text-white"></em>
                                        </span>
                                    </div>
                                    <div className="media-body text-truncate">
                                        <p className="mb-1"><a className="text-success m-0" href="">Documento 4</a>
                                        </p>
                                        <p className="m-0">
                                            <small><a href="">Documento.pdf</a>
                                            </small>
                                        </p>
                                    </div>
                                    <div className="ml-auto">
                                        <small className="text-muted ml-2">6kb</small>
                                    </div>
                                </div>
                            </div>
                            {/* END list group item */}
                        </div>
                        {/* END list group */}
                        {/* START card footer */}
                        <div className="card-footer"><a className="text-sm" href="">Load more</a></div>
                        {/* END card-footer */}
                    </div>
                </Col>
            </div>

        </ContentWrapper>
    );
}

export default HomePrincipal;

