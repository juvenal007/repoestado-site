import React, { useEffect, useState } from 'react';
import ContentWrapper from '../../_layout/ContentWrapper';
import { Row, Col, Label, FormGroup, Alert, Input, CustomInput, Button, Card, CardHeader, CardBody, Table } from 'reactstrap';
import InputField from '../../_framework/_helpers/smart-table/inputs-form/InputField';
import Select from 'react-select';
import getApi from '../../utils/api/index';

import _ from 'lodash';
import { toast } from 'react-toastify';


//COMPONENTES

import '../../styles/custom.css';

const TerminarDocumento = () => {

   // STATE DEL COMPONENTE
   const [codigo, setCodigo] = useState('');


   const recibirDocumento = (e) => {
      setCodigo(e.target.value);
   }  
 
   const onSubmit = (e) => {
      e.preventDefault();

      let user = localStorage.getItem('user');

      let datos = {
         usuario: user,
         docu_codigo: codigo
      }

      const url = `estado/store/terminado`;
      getApi(url, 'POST', datos, (status, data, message, re) => {
         console.log(status, data, message);
         if (!status) {
            return console.log(message);
         }
         console.log(re);      
      });

   }

   return (
      <ContentWrapper>

         <div className="content-heading">
            <div className='text-form text-tittle'>Documentos</div>
         </div>
         <div className="p-0">
            <Row className='d-flex justify-content-center mb-1'>
               <Col xl="12">
                  <div className="card card-default">
                     <div className="card-header mb-0">
                        <div className="text-tittle-card mt-1"><em className="fas fa-sync"></em>&nbsp;Terminar Documento.</div>
                        <hr></hr>
                     </div>
                     <div className='container'>
                        <div className="card-body mt-0">
                           <form onSubmit={onSubmit} className="form-horizontal">
                              <div className='container'>
                                 <FormGroup row>
                                    <label className="offset-xl-1 col-xl-1 col-form-label text-input">Código</label>
                                    <div className="col-xl-8">
                                       <Input onChange={recibirDocumento} type="text" placeholder="Codigo documento" />
                                       <span className="form-text text-grey">Ingrese el código del documento.</span>
                                    </div>
                                 </FormGroup>
                                 <FormGroup row className='mb-2 justify-content-center'>
                                  
                                    <div className="col-xl-6">
                                       <Button block className='text-bold mt-4' size="xl" onClick={onSubmit} color='danger'>Terminar Documento</Button>
                                    </div>
                                 </FormGroup>
                              </div>
                           </form>
                        </div>
                     </div>

                  </div>
               </Col>
            </Row>
         </div>

      </ContentWrapper>
   );
}

export default TerminarDocumento;