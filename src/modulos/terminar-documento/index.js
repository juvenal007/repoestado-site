import React, { useEffect, useState } from 'react';
import ContentWrapper from '../../_layout/ContentWrapper';
import { Row, Col, Label, FormGroup, Alert, Input, CustomInput, Button, Card, CardHeader, CardBody, Table } from 'reactstrap';
import InputField from '../../_framework/_helpers/smart-table/inputs-form/InputField';
import Select from 'react-select';
import getApi from '../../utils/api/index';

import $ from 'jquery';
import _ from 'lodash';
import swal from 'sweetalert';

//COMPONENTES

import '../../styles/custom.css';
import 'parsleyjs/dist/parsley.min.js';
import 'parsleyjs/dist/i18n/es';

const TerminarDocumento = () => {

   // STATE DEL COMPONENTE
   const [codigo, setCodigo] = useState('');
   const [idForm] = useState('form-id-' + (new Date()).getTime());

   // ################# ERRORES DE LA API state ############## //
   const [msgErrors, setMsgErrors] = useState({});
   const [hasErrors, setHasErrors] = useState(false);
   const [typeError, setTypeError] = useState(1);

   const recibirDocumento = (e) => {
      setCodigo(e.target.value);
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

   const onSubmit = (e) => {
      e.preventDefault();

      let user = localStorage.getItem('user');

      let datos = {
         usuario: user,
         docu_codigo: codigo
      }

      //VALIDAR DATOS  
      instanceValid();

      if (datos.docu_codigo.length === 0) {
         swal({
            title: 'Completar Datos',
            text: 'Ingrese Código de documento',
            icon: "error",
         });
         return null;
      }

      const url = `estado/store/terminado`;
      getApi(url, 'POST', datos, (status, data, message, re) => {
         console.log(status, data, message, re);
         if (status) {
            swal({
               title: "Correcto",
               text: message,
               icon: "success"
            });
         } else {
            swal({
               title: "Error",
               text: message,
               icon: "error"
            });
         }
         setCodigo('');
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
                           <form onSubmit={onSubmit} className="form-horizontal" id={idForm}>
                              <div className='container'>
                                 <FormGroup row>
                                    <label className="offset-xl-1 col-xl-1 col-form-label text-input">Código</label>
                                    <div className="col-xl-8">
                                       <InputField
                                          onChange={recibirDocumento}
                                          value={codigo}
                                          type="text"
                                          placeholder="Codigo documento"
                                          isRequired={true}
                                          autoFocus={true}
                                       />
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