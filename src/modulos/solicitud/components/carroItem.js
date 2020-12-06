import React, {useState} from 'react';
import { FormGroup, Button } from 'reactstrap';
import InputField from '../../../_framework/_helpers/smart-table/inputs-form/InputField';

import _ from 'lodash';

//STYLES
import '../components/styles.css';

const CarroItem = ({ producto, setCarro, carro }) => {

    const { id, catalogo_descripcion, cantidad } = producto;   

    const handleDelete = (idProducto) => {    
        // ELIMINA AUTOMATICAMENTE LA CONDICION DEL ARRAY
        // SI SE ASIGNA CONST VARIABLE DEVUELVE LOS PRODUCTOS ELIMINADOS
         _.remove(carro, function(prod) { return prod.id == idProducto });   
        setCarro([...carro]);        
        console.log(carro);
    }

    return (
        <div className='row'>
            <div className='col-xl-8 mt-0 mb-0'>
                <FormGroup >
                    <label className='labels mb-0 '><strong>Nombre</strong></label>
                    <InputField type="text"
                        readOnly={true}
                        value={catalogo_descripcion}
                    />
                </FormGroup>
            </div>
            <div className='col-xl-2 mt-0 mb-0'>
                <FormGroup>
                    <label className='labels mb-0 '><strong>Cantidad</strong></label>
                    <InputField type="text"
                        readOnly={true}
                        value={cantidad}
                    />
                </FormGroup>
            </div>
            <div className='col-xl-2 mb-0 mt-3 d-inline-flex justify-content-center align-items-center align-middle'>
                <div className='form-group'>
                    <button className="btn btn-danger btn-circle btn-circle-sm m-1"
                        onClick={() => handleDelete(id)}
                    ><i className="fa fa-times"></i></button>
                </div>
            </div>
        </div>
    );
}

export default CarroItem;