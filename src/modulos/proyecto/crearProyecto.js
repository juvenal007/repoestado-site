import React, { useState, useEffect } from 'react';
import ContentWrapper from '../../_layout/ContentWrapper';
import getApi from '../../utils/api/index';

import { Button } from 'reactstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import $ from 'jquery';
import 'parsleyjs/dist/parsley.min.js';
import 'parsleyjs/dist/i18n/es';



// COMPONENTES
import AsignarCliente from './components/asignarCliente';
import InputCliente from './components/inputProyecto';

const CrearProyecto = (props) => {


    const [idCentroCosto] = useState(props.match.params.id);
    const [clientes, setClientes] = useState('');
    const [idForm] = useState('form-id-' + (new Date()).getTime(),);


    // ################# DATOS state ############## //
    const [cliente, setCliente] = useState('');
    const [centroCosto, setCentroCosto] = useState('');
    const [proyecto, setProyecto] = useState({
        nombre: '',
        direccion: '',
        descripcion: '',
        telefono_ad: '',
    });


    // ################# ERRORES DE LA API state ############## //
    const [msgErrors, setMsgErrors] = useState({});
    const [hasErrors, setHasErrors] = useState(false);
    const [typeError, setTypeError] = useState(1);

    useEffect(() => {
        const getDatosClientes = async () => {
            const url = `cliente/list/`;
            getApi(url, 'GET', null, (status, data, message) => {
                console.log(status, data, message);
                if (!status) {
                    return console.log(message);
                }
                setClientes(data);
            });
        }
        const getCentrodeCostos = async () => {
            const url = `/centro-costo/details/${idCentroCosto}`;
            getApi(url, 'GET', null, (status, data, message) => {
                console.log(status, data, message);
                if (!status) {
                    return console.log(message);
                }
                setCentroCosto(data[0]);
                console.log(data);
            });
        }

        getCentrodeCostos();
        getDatosClientes();

    }, []);

    const validarForm = () => {
        if (proyecto.nombre === '' || proyecto.direccion === '' || proyecto.descripcion === '' || proyecto.telefono_ad === '' || idCentroCosto === '' || Object.keys(cliente).length === 0) {
            return true;
        } else {
            return false;
        }
    }

    const instanceValid = () => {
        const instance = $('#' + idForm).parsley({
            errorsContainer: function (el) {
                return el.$element.closest('.form-group');
            },
            errorClass: 'is-invalid',
        });
        instance.validate();
        if (!instance.isValid())
            return null;
    }



    const onClickSave = () => {

        instanceValid();
        if (validarForm()) {
            Swal.fire(
                'Debe Completar todos los datos',
                'Cliente agregado a proyecto con exito',
                'success'
            );
            return null;
        }

        const url = `proyecto/store/`;

        let datos = {
            nombre: proyecto.nombre,
            direccion: proyecto.direccion,
            descripcion: proyecto.descripcion,
            telefono_ad: proyecto.telefono_ad,
            centro_costos_id: parseInt(idCentroCosto, 10),
            clientes_id: cliente.id
        }

        getApi(url, 'POST', datos, (status, data, message, re) => {
            console.log(status, data, message);
            if (!status) {
                console.log(message);
            }
            console.log(re);
            console.log(data);
            Swal.fire(
                message,
                'Cliente agregado a proyecto con exito',
                'success'
            );
            props.history.push(`/administracion/centro-costos/proyecto/${idCentroCosto}`);
        });
    }
    const clickReturn = () => {
        props.history.push(`/administracion/centro-costos/proyecto/${idCentroCosto}`);
    }


    if (Object.keys(centroCosto).length === 0) return <div className="padre">
        <div className='whirl double-up hijo'></div>
    </div>;

    return (
        <ContentWrapper >
            <div className="content-heading">
                <div>Centro Costos: {centroCosto.nombre}</div>
                <div className="ml-auto">
                    <button className={"btn btn-info"} onClick={() => clickReturn()}>Regresar</button>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <InputCliente
                        proyecto={proyecto}
                        setProyecto={setProyecto}
                        idForm={idForm}
                    />
                </div>
                <div className="col-12">
                    <AsignarCliente
                        cliente={cliente}
                        clientes={clientes}
                        setCliente={setCliente}
                    />
                </div>
                <div className='col-12'>
                    <div className="d-flex justify-content-center mt-3">
                        <Button
                            color="primary"
                            size="lg"
                            className='boton-asociar-cliente'
                            onClick={() => onClickSave()}
                        >GUARDAR</Button>
                    </div>
                </div>
            </div>

        </ContentWrapper >
    );
}

export default CrearProyecto;