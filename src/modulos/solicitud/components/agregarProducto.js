import React, { useState, useEffect } from 'react';
import { Row, Col, Label, FormGroup, Button } from 'reactstrap';
import InputField from '../../../_framework/_helpers/smart-table/inputs-form/InputField';
import Select from 'react-select';
import getApi from '../../../utils/api/index';

import swal from 'sweetalert';

import '../components/styles.css';

import _ from 'lodash';

const AgregarProducto = ({ carro, setCarro }) => {

    // STATES DEL COMPONENTE
    const [dataProductos, setDataProductos] = useState([]);
    const [productos, setProductos] = useState([]);
    const [producto, setProducto] = useState({});
    const [cantidad, setCantidad] = useState(0);

    // CONTROLADORES DE LOADERS
    const [isReadyProducto, setIsReadyProducto] = useState(false);

    const handleChangeProducto = (e) => {
        setProducto({});
        const producto = dataProductos.filter(producto => producto.id === e.value)[0];
        setProducto(producto);
    }

    const handleChangeCantidad = (e) => {
        setCantidad(e.target.value);
    }

    const parseSelect = (data) => {
        let opciones = [];
        data.map((item, index) => {
            opciones.push({ value: item.id, label: item.catalogo_material + " | " + item.catalogo_descripcion });
        });
        return opciones;
    }

    useEffect(() => {
        setIsReadyProducto(false);
        const getProductos = () => {
            const url = `catalogo/list`;
            getApi(url, 'GET', null, (status, data, message) => {
                console.log(status, data, message);
                if (!status) {
                    return console.log(message);
                }
                setDataProductos(data);
                setProductos(parseSelect(data));
                setIsReadyProducto(true);
            });
        }
        getProductos();
    }, []);

    const handleClick = () => {
        if (Object.keys(producto).length === 0 || cantidad == 0) {
            swal({
                title: "Agregar Producto",
                text: 'Debe completar todos los datos',
                icon: "warning",
                dangerMode: true,
            });
            return null;
        }
        // RETORNAMOS LOS ITEMS DISTINTOS (ID != ID) Y ELIMINAMOS ATOMATICAMENTE EL ITEM RECIEN AGREGADO SI ES QUE EXISTE (ID == ID) SOBRANTE 
        let productosNuevos = _.remove(carro, function(prod) { return prod.id !== producto.id });
        console.log(productosNuevos);
        // AGREGAMOS LOS RESULTADOS DE LOS PRODUCTOS DE distinto id y agregamos la seleccion
        setCarro([
            ...productosNuevos, {               
                    ...producto, cantidad             
            }
        ]);
       setCantidad(0);
    }

    return (
        <React.Fragment>

            <div className='row'>
                <div className="col-xl-6 mt-1">
                    <Label for='productos' className='text-form mb-0'>Agregar Productos</Label>
                    <p className='mb-0 text-bold'>Productos</p>
                    <Select
                        id='productos'
                        key={producto.length}
                        name='productos'
                        placeholder='Seleccione Productos'
                        onChange={handleChangeProducto}
                        options={productos}
                        isLoading={!isReadyProducto}
                        loadingMessage={() => 'Cargando...'}
                        noOptionsMessage={() => 'Sin Resultados...'}
                    />
                </div>
                <div className='col-xl-4 mt-1'>
                    <Label for='productos' className='text-form mb-0'>Cantidad</Label>
                    <FormGroup>
                        <label className='labels mb-0 '><strong>Cantidad</strong></label>
                        <InputField type="number"
                            value={cantidad}
                            onChange={handleChangeCantidad}
                        />
                    </FormGroup>
                </div>
                <div className='col-xl-2 mt-1'>
                    <FormGroup className='mb-0 mt-0'>
                        <Button size="lg" color="success" className="btn-labeled btn-block p-4 boton-ancho mb-0"
                            onClick={() => handleClick()}
                        >
                            <span className="btn-label text-left"><i className="fa fa-plus"></i></span> Agregar
                    </Button>
                    </FormGroup>
                </div>
            </div>

        </React.Fragment>
    );
}

export default AgregarProducto;