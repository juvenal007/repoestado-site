import React, { useState } from 'react';
import { Row, Col, Label, FormGroup } from 'reactstrap';
import InputField from '../../../_framework/_helpers/smart-table/inputs-form/InputField';

import _ from 'lodash';

const CarroItem = ({ producto }) => {

  

    return (
        <Row className='d-flex'>
            <Col xl='3'>
                <FormGroup className='mt-0'>
                    <Label className='text-form mb-0 field-required'>Cantidad</Label>
                    <InputField type="number"
                        readOnly
                        placeholder='Cantidad'
                        value={'12'}                       
                    />
                </FormGroup>
            </Col>
            <Col xl='3'>
                <FormGroup>
                <Label className='text-form mb-0 field-required'>Detalle</Label>
                    <InputField type="number"
                        readOnly
                        placeholder='Cantidad'
                        value={'36323 Gear Desktop AMD Ryzen 3 3200G 8GB 1TB'}                       
                    />
                </FormGroup>
            </Col>
            <Col xl='3'>
                <FormGroup>
                    <Label className='text-form mb-0 field-required'>P. Unitario</Label>
                    <InputField type="number"
                        value={'223.521'}
                       /*  onChange={handleChangeEmision} */
                        isRequired={true}
                    />

                </FormGroup>
            </Col>
            <Col xl='3'>
            <FormGroup>
                    <Label className='text-form mb-0 field-required'>P. Total</Label>
                    <InputField type="number"
                        value={'670.563'}
                       /*  onChange={handleChangeEmision} */
                        isRequired={true}
                    />

                </FormGroup>
            </Col>           

        </Row>
    );
}

export default CarroItem;