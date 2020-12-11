import React, {useEffect} from 'react';
import ContentWrapper from '../../_layout/ContentWrapper';
import SmartTable from '../../_framework/_helpers/smart-table/table/SmartTable';
import config from './config';
import { Row, Col, Label, FormGroup, Alert, Input, CustomInput, Button, Card, CardHeader, CardBody, Table } from 'reactstrap';
import Select from 'react-select';

const Usuario = () => {

    return (
        <ContentWrapper>
            <div className="content-heading">
                <div>Documentos</div>
            </div>   
         <div className="p-0">
            <Row className='d-flex justify-content-center mb-1'>
               <Col xl="12">
                  <div className="card card-default">                    
                     <div className='container'>
                        <div className="card-body mt-0">
                         <div className='row'>
                            <div className='col-xl-12'>
                            <FormGroup row>
                                 <label className="col-xl-2 col-form-label text-input">Tipo Documento</label>
                                 <div className="col-xl-4">
                                    <Select
                                       styles={{
                                          menu: provided => ({ ...provided, zIndex: 9999 })
                                       }}
                                       placeholder='Seleccione Tipo Archivo'                                       
                                       options={[]}
                                       isLoading={false}
                                       loadingMessage={() => 'Cargando...'}
                                       noOptionsMessage={() => 'Sin Resultados...'}
                                       isRequired={true}
                                    />
                                    <span className="form-text text-grey">Ingrese el tipo de documento.</span>
                                 </div>
                                 <label className="col-xl-1 col-form-label text-input">Nombre</label>
                                 <div className="col-xl-5">
                                    <Input onChange={''} type="text" placeholder="Nombre" />
                                    <span className="form-text text-grey">Ingrese el nombre principal del documento.</span>
                                 </div>
                              </FormGroup>
                            </div>
                         </div>
                        </div>
                     </div>

                  </div>
               </Col>
            </Row>
         </div>
            <SmartTable
                dtColumns={config.columns}
                edit_btn={config.edit_btn}
                delete_btn={config.delete_btn}
                add_btn={config.add_btn}
                actions_custom={config.actions_custom}
                list_data={config.list} // url con la data
                pk_key="id" // pk de las lineas
                model_p="Documentos" // titulo grilla
                model_s="Documento" // titulo form
            />
        </ContentWrapper>
    );
}

export default Usuario;