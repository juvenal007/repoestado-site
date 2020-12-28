import React, { useEffect, useState } from 'react';
import ContentWrapper from '../../../_layout/ContentWrapper';
import { FormGroup, Row, Col, Button } from 'reactstrap';
import InputField from '../../../_framework/_helpers/smart-table/inputs-form/InputField';
import Select from 'react-select';

import getApi from '../../../utils/api/index';
import $ from 'jquery';
import _ from 'lodash';
import swal from 'sweetalert';




//ESTILOS CSS
import 'parsleyjs/dist/parsley.min.js';
import 'parsleyjs/dist/i18n/es';
import "../../../styles/custom.css";



const Usuario = (props) => {

   const [selectData, setSelectData] = useState([]);
   const [isReady, setIsReady] = useState(false);
   const [idForm] = useState('form-id-' + (new Date()).getTime());

   //STATE DEL COMPONENTE
   const [usuario, setUsuario] = useState('');
   const [usuario_rut, setUsuarioRut] = useState('');
   const [usuario_nombre, setUsuario_nombre] = useState('');
   const [usuario_ape_paterno, setUsuario_ape_paterno] = useState('');
   const [usuario_ape_materno, setUsuario_ape_materno] = useState('');
   const [usuario_correo, setUsuario_correo] = useState('');
   const [usuario_telefono, setUsuario_telefono] = useState('');
   const [usuario_funcion, setUsuario_funcion] = useState('');
   const [usuario_anexo, setUsuario_anexo] = useState('');
   const [departamento_id, setDepartamento_id] = useState('');
   const [usuario_tipo, setUsuario_tipo] = useState('USUARIO');

   // STATE DE ERRORES
   const [hasErrors, setHasErrors] = useState(false);
   const [msgErrors, setMsgErrors] = useState({});
   const [typeError, setTypeError] = useState(1);


   const parseSelectDepto = (data) => {
      let opciones = [];
      data.map((item, index) => {
         opciones.push({ value: item.id, label: item.depto_nombre });
      });
      return opciones;
   }

   useEffect(() => {
      const getDepartamentos = () => {
         localStorage.setItem('historial', props.location.pathname);
         const url = `departamento/list`;
         getApi(url, "GET", null, (status, data, message) => {
            console.log(status, data, message);
            if (!status) {
               return console.log(message);
            }
            setSelectData(parseSelectDepto(data));
            setIsReady(true);
         });
      };
      getDepartamentos();
   }, []);

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

   const datosVacios = () => {
      if (usuario.length === 0 || usuario_rut.length === 0 || usuario_nombre.length === 0 || usuario_ape_paterno.length === 0 ||
         usuario_ape_materno.length === 0 || usuario_correo.length === 0 || usuario_telefono.length === 0 || usuario_funcion.length === 0 ||
         usuario_anexo.length === 0 || departamento_id.length === 0 || usuario_tipo.length === 0) {
         return true;
      }
      else{
         return false;
      }
   
   }

   const onSubmit = (e) => {
      e.preventDefault();

      let datos = {
         usuario: usuario,
         usuario_rut: usuario_rut,
         usuario_nombre: usuario_nombre,
         usuario_ape_paterno: usuario_ape_paterno,
         usuario_ape_materno: usuario_ape_materno,
         usuario_correo: usuario_correo,
         usuario_telefono: usuario_telefono,
         usuario_funcion: usuario_funcion,
         usuario_anexo: usuario_anexo,
         departamento_id: departamento_id,
         usuario_tipo: usuario_tipo
      }

      //VALIDAR DATOS  
      instanceValid();

      if (datosVacios()) {
         swal({
            title: 'Faltanb Datos',
            text: 'Ingrese Datos del Usuario',
            icon: "error",
         });
         return null;
      }

      const url = `/usuario/store`;
      getApi(url, 'POST', datos, (status, data, message, re) => {
         console.log(status, data, message, re);
         if (status) {
            swal({
               title: "Correcto",
               text: message,
               icon: "success"
            });
         } /* else {
            swal({
               title: "Error",
               text: message,
               icon: "error"
            });
         } */
    
      });
   }

   const ErrorMsg = () => {
      if (typeError === 2) {
          return (
              <div className="messages">
                  <div className="alert alert-danger">
                      <strong>Error interno</strong>
                      <pre>{JSON.stringify(msgErrors, null, 2)}</pre>
                  </div>
              </div>
          )
      } else {
          return (
              <div className="messages">
                  <div className="alert alert-danger">
                      <strong>Información faltante</strong>
                      <ul>
                          {
                              Object.keys(msgErrors).map((i) => {
                                  return (<li key={i}>{msgErrors[i]} </li>)
                              })
                          }
                      </ul>
                  </div>
              </div>
          )
      }
   }

   return (

      <ContentWrapper>
         <div className="content-heading">
            <div className='text-form text-tittle'>Usuarios</div>
         </div>
         <div className="p-0">
            <Row className='d-flex justify-content-center mb-1'>
               <Col xl="12">
                  <div className="card card-default">
                     <div className="card-header mb-0">
                        <div className="text-tittle-card mt-1"><em className="fas fa-sync"></em>&nbsp;Crear Usuario.</div>
                        <hr></hr>
                     </div>
                     <div className='container fluid'>
                        <div className="card-body mt-0">
                        {hasErrors && <ErrorMsg />}
                           <form onSubmit={onSubmit} className="form-horizontal" id={idForm}>
                              <FormGroup row className='justify-content-center'>
                                 <label className="col-xl-2 col-form-label text-input field-required">Usuario</label>
                                 <div className="col-xl-5">
                                    <InputField onChange={(e) => {
                                       setUsuario(e.target.value);
                                    }} type="text" placeholder="Usuario" isRequired={true} />
                                 </div>
                              </FormGroup>
                              <FormGroup row className='justify-content-center'>
                                 <label className="col-xl-2 col-form-label text-input field-required">Rut</label>
                                 <div className="col-xl-5">
                                    <InputField onChange={(e) => {
                                       setUsuarioRut(e.target.value);
                                    }} type="text" placeholder="Rut" isRequired={true} />
                                 </div>
                              </FormGroup>
                              <FormGroup row className='justify-content-center'>
                                 <label className="col-xl-2 col-form-label text-input field-required">Nombre</label>
                                 <div className="col-xl-5">
                                    <InputField onChange={(e) => {
                                       setUsuario_nombre(e.target.value);
                                    }} type="text" placeholder="Nombre" isRequired={true} />

                                 </div>
                              </FormGroup>
                              <FormGroup row className='justify-content-center'>
                                 <label className="col-xl-2 col-form-label text-input field-required">Apellido Materno</label>
                                 <div className="col-xl-5">
                                    <InputField onChange={(e) => {
                                       setUsuario_ape_paterno(e.target.value);
                                    }} type="text" placeholder="Apellido Materno" isRequired={true} />
                                 </div>
                              </FormGroup>
                              <FormGroup row className='justify-content-center'>
                                 <label className="col-xl-2 col-form-label text-input field-required">Apellido Paterno</label>
                                 <div className="col-xl-5">
                                    <InputField onChange={(e) => {
                                       setUsuario_ape_materno(e.target.value);
                                    }} type="text" placeholder="Apellido Paterno" isRequired={true} />
                                 </div>
                              </FormGroup>
                              <FormGroup row className='justify-content-center'>
                                 <label className="col-xl-2 col-form-label text-input field-required">Función</label>
                                 <div className="col-xl-5">
                                    <InputField onChange={(e) => {
                                       setUsuario_funcion(e.target.value);
                                    }} type="text" placeholder="Función" isRequired={true} />
                                 </div>
                              </FormGroup>
                              <FormGroup row className='justify-content-center'>
                                 <label className="col-xl-2 col-form-label text-input field-required">Correo electrónico</label>
                                 <div className="col-xl-5">
                                    <InputField onChange={(e) => {
                                       setUsuario_correo(e.target.value);
                                    }} type="text" placeholder="Correo electrónico" isRequired={true} />
                                 </div>
                              </FormGroup>
                              <FormGroup row className='justify-content-center'>
                                 <label className="col-xl-2 col-form-label text-input field-required">Anexo</label>
                                 <div className="col-xl-5">
                                    <InputField onChange={(e) => {
                                       setUsuario_anexo(e.target.value);
                                    }} type="text" placeholder="Anexo" isRequired={true} />
                                 </div>
                              </FormGroup>
                              <FormGroup row className='justify-content-center'>
                                 <label className="col-xl-2 col-form-label text-input field-required">Teléfono</label>
                                 <div className="col-xl-5">
                                    <InputField onChange={(e) => {
                                       setUsuario_telefono(e.target.value);
                                    }} type="text" placeholder="Teléfono" isRequired={true} />
                                 </div>
                              </FormGroup>
                              <FormGroup row className='justify-content-center'>
                                 <label className="col-xl-2 col-form-label text-input field-required">Departamento</label>
                                 <div className="col-xl-5">
                                    <Select
                                       styles={{
                                          menu: provided => ({ ...provided, zIndex: 9999 })
                                       }}
                                       placeholder='Seleccione Departamento'
                                       onChange={(e) => {
                                          setDepartamento_id(e.value);
                                       }}
                                       options={selectData}
                                       isLoading={!isReady}
                                       loadingMessage={() => 'Cargando...'}
                                       noOptionsMessage={() => 'Sin Resultados...'}
                                       isRequired={true}
                                    />
                                 </div>
                              </FormGroup>
                              <FormGroup row className='justify-content-center'>
                                 <label className="col-xl-2 col-form-label text-input field-required">Tipo Usuario</label>
                                 <div className="col-xl-5">
                                    <Select
                                       styles={{
                                          menu: provided => ({ ...provided, zIndex: 9999 })
                                       }}
                                       placeholder='Seleccione Tipo Usuario'
                                       onChange={(e) => {
                                          setUsuario_tipo(e.value);
                                       }}
                                       options={[{
                                          value: 'USUARIO',
                                          label: 'USUARIO'
                                       },
                                       {
                                          value: 'ADMINISTRADOR',
                                          label: 'ADMINISTRADOR'
                                       }]}
                                       loadingMessage={() => 'Cargando...'}
                                       noOptionsMessage={() => 'Sin Resultados...'}
                                       isRequired={true}
                                    />
                                 </div>
                              </FormGroup>
                              <FormGroup row className='mb-4 mt-4 justify-content-center'>
                                 <div className="col-xl-6">
                                    <Button block className='text-bold' size="xl" onClick={onSubmit} color='success'>Crear Usuario</Button>
                                 </div>
                              </FormGroup>
                           </form>
                        </div>
                     </div>
                  </div>
               </Col>
            </Row>
         </div>
      </ContentWrapper >
   );
}

export default Usuario;