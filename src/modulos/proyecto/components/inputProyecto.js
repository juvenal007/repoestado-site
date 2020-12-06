import React, { useState } from 'react';
import { Row, Col, FormGroup, CardTitle } from "reactstrap";
import InputField from '../../../_framework/_helpers/smart-table/inputs-form/InputField';

const InputProyecto = ({ proyecto, setProyecto, idForm }) => {

    const [isValid, setIsValid] = useState(true);
    
   
    


    const actualizarProyecto = e => {
        setProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        });
    }

    const { nombre, direccion, descripcion, telefono_ad } = proyecto;

 

    return (
        <React.Fragment>
            <div className="card card-default">
                <form id={idForm}>
                    <div className="card-body">
                        <CardTitle tag="h3">Datos del proyecto</CardTitle>
                        <div className='row'>
                            <Col xl='3'>
                                <FormGroup>
                                    <label className='field-required required'><strong>NOMBRE</strong></label>
                                    <InputField type="text"
                                        placeholder="Ingrese Nombre"
                                        name='nombre'
                                        onChange={actualizarProyecto}
                                        isRequired={true}
                                        autoFocus={true}
                                        invalid={!isValid}
                                        isRequired={true}
                                        autoComplete='off'
                                        // filter="rut"
                                        onClick={() => { setIsValid(true) }}
                                        value={nombre}
                                    />

                                </FormGroup>
                            </Col>
                            <Col xl='3'>
                                <FormGroup>
                                    <label className='field-required required'><strong>DIRECCION</strong></label>
                                    <InputField type="text"
                                        placeholder="Ingrese Direccion"
                                        name='direccion'
                                        onChange={actualizarProyecto}
                                        isRequired={true}
                                        autoFocus={true}
                                        invalid={!isValid}
                                        isRequired={true}
                                        autoComplete='off'
                                        // filter="rut"
                                        onClick={() => { setIsValid(true) }}
                                        value={direccion}
                                    />
                                </FormGroup>
                            </Col>
                            <Col xl='3'>
                                <FormGroup>
                                    <label className='field-required required'><strong>DESCRIPCION</strong></label>
                                    <InputField type="text"
                                        placeholder="Ingrese Descripcion"
                                        name='descripcion'
                                        onChange={actualizarProyecto}
                                        isRequired={true}
                                        autoFocus={true}
                                        invalid={!isValid}
                                        isRequired={true}
                                        autoComplete='off'
                                        // filter="rut"
                                        onClick={() => { setIsValid(true) }}
                                        value={descripcion}
                                    />
                                </FormGroup>
                            </Col>
                            <Col xl='3'>
                                <FormGroup>
                                    <label className='field-required required'><strong>TELEFONO</strong></label>
                                    <InputField type="text"
                                        placeholder="Ingrese Telefono"
                                        name='telefono_ad'
                                        onChange={actualizarProyecto}
                                        isRequired={true}
                                        autoFocus={true}
                                        invalid={!isValid}
                                        isRequired={true}
                                        autoComplete='off'
                                        // filter="rut"
                                        onClick={() => { setIsValid(true) }}
                                        value={telefono_ad}
                                    />
                                </FormGroup>
                            </Col>
                        </div>
                    </div>
                </form>
            </div>
        </React.Fragment >
    );
}

export default InputProyecto;