import React, { useEffect, useState } from 'react';
import ContentWrapper from '../../_layout/ContentWrapper';
import { Row, Col, Label, FormGroup, Alert } from 'reactstrap';
import InputField from '../../_framework/_helpers/smart-table/inputs-form/InputField';
import Select from 'react-select';
import getApi from '../../utils/api/index';



//COMPONENTES
import Carro from './components/carro';

import swal from 'sweetalert';
import SmartTable from '../../_framework/_helpers/smart-table/table/SmartTable';
import config from './config';




const Cotizacion = () => {
    
 


    // STATE DEL COMPONENTE

    // PROVEEDOR
    const [proveedors, setProveedors] = useState([]);
    const [proveedorsSelect, setProveedorsSelect] = useState([]);
    const [proveedor, setProveedor] = useState({});


    const [codigo, setCodigo] = useState('');
    const [fechaEmision, setFechaEmision] = useState('');
    const [fechaVigencia, setFechaVigencia] = useState('');

    // LOADER PROVEEDOR
    const [isReadyProveedor, setIsReadyProveedor] = useState(false);

    // SOLICITUD
    const [solicitud, setSolicitud] = useState({});

    //CARRO Y PRODUCTOS
    const [carro, setCarro] = useState([]);
    const [producto, setProducto] = useState({});

    const parseSelect = (data) => {
        let opciones = [];
        data.map((item, index) => {
            opciones.push({ value: item.id, label: item.proveedor_nombre });
        });
        return opciones;
    }

    useEffect(() => {
        const getProveedores = () => {
            const url = `proveedor/list`;
            getApi(url, 'GET', null, (status, data, message) => {
                console.log(status, data, message);
                if (!status) {
                    return console.log(message);
                }
                setProveedorsSelect(parseSelect(data));
                setProveedors(data);
                setIsReadyProveedor(true);

            });
        }
        getProveedores();
    }, []);

    const handleChangeProveedor = e => {
        setProveedor({ id: e.value, nombre: e.label });
        console.log(proveedor);
    }

    const handleChangeCodigo = e => {
        setCodigo(e.target.value);
        console.log(e.target.value);
    }
    const handleChangeEmision = e => {
        setFechaEmision(e.target.value);
        console.log(e.target.value);
    }
    const handleChangeVigencia = e => {
        setFechaVigencia(e.target.value);
        console.log(e.target.value);
    }

    const clickSolicitud = e => {
        e.preventDefault();
        console.log(solicitud);
    }

    const onSubmit = e => {
        e.preventDefault();
    }

    return (
        <ContentWrapper>
            
            <div className="content-heading">
                <div className='text-bold'>COTIZACIÓN</div>
            </div>
            <div className="p-0">
                <Row className='d-flex justify-content-center mb-1'>
                    <Col xl="12">
                        <div className="card card-default">
                            <div className="card-header mb-0">
                                <div className="card-title">Ingrese los datos de la cotización.</div>
                            </div>
                            <div className="card-body mt-0">
                                <form>
                                    <Row className='d-flex'>
                                        <Col xl='3'>
                                            <FormGroup className='mt-0'>
                                                <Label className='text-form mb-0 field-required'>Codigo Cotización</Label>
                                                <InputField type="number"
                                                    placeholder='Codigo Cotización'
                                                    value={codigo}
                                                    onChange={handleChangeCodigo}
                                                    isRequired={true}
                                                />

                                            </FormGroup>
                                        </Col>
                                        <Col xl='3'>
                                            <FormGroup>
                                                <Label className='text-form mb-0 field-required'>Proveedor</Label>
                                                <Select
                                                    placeholder='Seleccione Proveedor'
                                                    onChange={handleChangeProveedor}
                                                    options={proveedorsSelect}
                                                    isLoading={!isReadyProveedor}
                                                    loadingMessage={() => 'Cargando...'}
                                                    noOptionsMessage={() => 'Sin Resultados...'}
                                                    isRequired={true}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col xl='3'>
                                            <FormGroup>
                                                <Label className='text-form mb-0 field-required'>Fecha Emisión</Label>
                                                <InputField type="date"
                                                    value={fechaEmision}
                                                    onChange={handleChangeEmision}
                                                    isRequired={true}
                                                />

                                            </FormGroup>
                                        </Col>
                                        <Col xl='3'>
                                            <FormGroup>
                                                <Label className='text-form mb-0 field-required'>Fecha Vigencia</Label>
                                                <InputField type="date"
                                                    value={fechaVigencia}
                                                    onChange={handleChangeVigencia}
                                                    isRequired={true}
                                                />
                                            </FormGroup>
                                        </Col>


                                        <Col xl='3 '>
                                            <div className='row'>
                                                <div className='col-8'>
                                                    <FormGroup>
                                                        <Label className='text-form mb-0 field-required'>Codigo Solicitud</Label>
                                                        <InputField type="number"
                                                            placeholder='Codigo Solicitud'
                                                            value={solicitud}
                                                            onChange={e => setSolicitud(e.target.value)}
                                                            isRequired={true}
                                                        />
                                                    </FormGroup>
                                                </div>
                                                <div className='col-4 d-flex justify-content-center align-items-end'>
                                                    <FormGroup>
                                                        <button
                                                            className='btn btn-block btn-info text-bold pr-5 pl-5'
                                                            onClick={clickSolicitud}
                                                        >
                                                            <em className="fas fa-search"></em>
                                                        </button>
                                                    </FormGroup>
                                                </div>
                                            </div>
                                        </Col>

                                        <Col xl='3'>
                                            <FormGroup>
                                                <Label className='text-form mb-0'>Cliente</Label>
                                                <InputField type="text"
                                                    placeholder='Nombre Cliente'
                                                    readOnly
                                                    value={codigo}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col xl='3'>
                                            <FormGroup>
                                                <Label className='text-form mb-0'>Proyecto</Label>
                                                <InputField type="text"
                                                    placeholder='Proyecto'
                                                    readOnly
                                                    value={codigo}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col xl='3'>
                                            <FormGroup>
                                                <Label className='text-form mb-0'>Centro Costo</Label>
                                                <InputField type="text"
                                                    placeholder='Centro de Costos'
                                                    readOnly
                                                    value={codigo}
                                                />
                                            </FormGroup>
                                        </Col>

                                        <div className='col-12 mt-1'>
                                            <div className="card card-default">
                                                <div className="card-header mb-0">
                                                    <div className="text-form">Carro de productos</div>
                                                </div>
                                                <div className="card-body">
                                                    <div className='row'>
                                                        <div className="col-12 mt-0 mb-0">
                                                            <Carro
                                                                carro={carro}
                                                                setCarro={setCarro}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className='row mx-auto mt-3'>
                                            <div className="col-12 mt-0 mb-0">
                                                <button
                                                    className='btn btn-xl btn-success text-bold'
                                                    onClick={onSubmit}
                                                >
                                                    <em className="fas fa-check"></em>&nbsp;AGREGAR COTIZACION
                                                </button>
                                            </div>
                                        </div>
                                    </Row>




                                </form>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>

        </ContentWrapper>
    );
}

export default Cotizacion;