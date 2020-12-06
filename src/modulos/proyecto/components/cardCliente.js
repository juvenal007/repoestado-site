import React from 'react';
import { Row, Col, Table } from 'reactstrap';


const CardCliente = ({ clienteData }) => {

    const { rut, nombre, apellido_paterno, apellido_materno, telefono, direccion,
        genero } = clienteData;

    return (
        <div className="p-3">
            <Row className='d-flex justify-content-center mb-3'>
                <Col xl="12">
                    <div className="card card-default">
                        <div className="card-body">                            
                            <div className="text-center">
                                <h3 className="mt-0">{`${nombre} ${apellido_paterno}`}</h3>
                                <p>{rut}</p>
                                <p>{direccion}</p>
                            </div>
                            <hr />
                            <Table striped bordered hover responsive>
                                <tbody className="text-left">                                    
                                    <tr>
                                        <td className="font-weight-bold">Nombre Completo: </td>
                                        <td>{`${nombre} ${apellido_paterno} ${apellido_materno}`} </td>    
                                    </tr>
                                    <tr>
                                        <td className="font-weight-bold">Telefono:</td>
                                        <td>{telefono}</td>
                                    </tr>  
                                    <tr>
                                        <td className="font-weight-bold">Género:</td>
                                        <td>{genero}</td>
                                    </tr>  
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );


}

export default CardCliente;


