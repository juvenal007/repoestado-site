import React, { useEffect, useState } from 'react';
import ContentWrapper from '../../_layout/ContentWrapper';
import { Row, Col, Label, FormGroup, Alert, Input, CustomInput, Button, Card, CardHeader, CardBody, Table } from 'reactstrap';
import InputField from '../../_framework/_helpers/smart-table/inputs-form/InputField';
import Select from 'react-select';
import getApi from '../../utils/api/index';

import _ from 'lodash';
import { toast } from 'react-toastify';


//COMPONENTES

import swal from 'sweetalert';


const EnviarDocumento = () => {

   // STATE LOADERS
   const [isReadyTipoDoc, setIsReadyTipoDoc] = useState(false);
   const [isReadyDestDepto, setIsReadyDestDepto] = useState(false);
   const [isReadyDestUser, setIsReadyDestUser] = useState(true);
   const [dataValue, setdataValue] = useState('');

   // SHOW DESTINATARIOS
   const [showDestinatarios, setShowDestinatarios] = useState(false);

   // STATE DEL COMPONENTE DOCUMENTOS
   const [documentos, setDocumentos] = useState([]);
   const [selectData, setSelectData] = useState([]);
   const [documento, setDocumento] = useState('');

   // SATATE DEL COMPONENTE DESTINATARIOS

   // DOCUMENT0
   const [nombre, setNombre] = useState('');
   const [descripcion, setDescripcion] = useState('');

   // DEPARTAMENTO
   const [destinatarioDepartamento, setDestinatarioDepartamento] = useState([]);
   const [selectDestinatarioDepartamentos, setSelectDestinatarioDepartamentos] = useState([]);
   const [departamento, setDepartamento] = useState('');

   // USUARIOS
   const [selectDestinatarioUsuarios, setSelectDestinatarioUsuarios] = useState([]);
   const [usuario, setUsuario] = useState('');
   const [usuarios, setUsuarios] = useState([]);

   // ARCHIVO
   const [fileDoc, setFileDoc] = useState(undefined);
   const [extension, setExtension] = useState('.pdf,.docx,.xlsx,.txt,.rar');
   const [labelFile, setLabelFile] = useState('Elegir Archivo');
   const [sizeFile, setSizeFile] = useState(0);
   const [fileName, setFileName] = useState('');

   const limpiarEnviar = () => {
      setNombre('');
      setDescripcion('');
      setLabelFile('Elegir Archivo');
      setdataValue('');      
   }


   // STATE GLOBAL DEL DESTINATARIO   
   const [destinatariosUsuarios, setDestinatariosUsuarios] = useState([]);
  

   // PARSEO DE LA DATA PARA LOS REACT SELECT
   const parseSelect = (data) => {
      let opciones = [];
      data.map((item, index) => {
         opciones.push({ value: item.id, label: item.tipo_documento_nombre });
      });
      return opciones;
   }
   const parseSelectDepto = (data) => {
      let opciones = [];
      data.map((item, index) => {
         opciones.push({ value: item.id, label: item.depto_nombre });
      });
      return opciones;
   }
   const parseSelectUser = (data) => {
      let opciones = [];
      data.map((item, index) => {
         opciones.push({ value: item.id, label: `${item.usuario_nombre} ${item.usuario_ape_paterno}` });
      });
      return opciones;
   }


   useEffect(() => {
      const mostrarDestinatario = async () => {
         setShowDestinatarios(false);
         if (documento.nombre === 'MEMORÁNDUM' || documento.nombre === 'CIRCULAR' || documento.nombre === 'OTRO') {
            setShowDestinatarios(false);
            getDestinatariosDepto();
         }
      }
      const getDocumentos = async () => {
         const url = `tipo-documento/list`;
         getApi(url, 'GET', null, (status, data, message) => {
            console.log(status, data, message);
            if (!status) {
               return console.log(message);
            }
            setDocumentos(data);
            setSelectData(parseSelect(data));
            setIsReadyTipoDoc(true);
         });
      }
      const getDestinatariosDepto = async () => {
         setIsReadyDestDepto(false);
         const url = `departamento/list`;
         getApi(url, 'GET', null, (status, data, message) => {
            console.log(status, data, message);
            if (!status) {
               return console.log(message);
            }
            setDestinatarioDepartamento(data);
            setSelectDestinatarioDepartamentos(parseSelectDepto(data));
            setIsReadyDestDepto(true);
            getDestinatariosUsuarios();
         });
      }
      const getDestinatariosUsuarios = async () => {
         setIsReadyDestUser(false);
         const url = `usuario/list/${departamento.id}`;
         getApi(url, 'GET', null, (status, data, message) => {
            console.log(status, data, message);
            if (!status) {
               return console.log(message);
            }
            setUsuarios(data);
            setSelectDestinatarioUsuarios(parseSelectUser(data));
            setIsReadyDestUser(true);
         });
      }
      getDocumentos();
      mostrarDestinatario();
   }, [documento, departamento]);

   const handleChangeDepartamento = e => {
      setUsuario({ label: 'Seleccione Usuario' });
      setIsReadyDestUser(false);
      setUsuarios([]);
      setSelectDestinatarioUsuarios([]);
      setDepartamento({ id: e.value, nombre: e.label });
   }

   const handleChangeDocumento = e => {
      setDocumento({ id: e.value, nombre: e.label });
      setdataValue(e.label);
      setUsuarios([]);      
      setDepartamento({});
      setUsuario({ label: 'Seleccione Usuario' });
      setSelectDestinatarioDepartamentos([]);
      setSelectDestinatarioUsuarios([]);
      setDestinatariosUsuarios([]);
      
   }

   const handleChangeUsuario = e => {
      setUsuario({ id: e.value, nombre: e.label });
   }


   const onClickUsuario = () => {
      if (Object.keys(usuario).length === 0 || usuario.label === 'Seleccione Usuario') {
         return null;
      }
      let usuarioCompleto = _.filter(usuarios, function (user) { return user.id === usuario.id })[0];
      let usuariosNuevos = _.remove(destinatariosUsuarios, function (user) { return user.id !== usuarioCompleto.id });
      setDestinatariosUsuarios([
         ...usuariosNuevos, {
            id: usuarioCompleto.id,
            nombre: usuarioCompleto.usuario_nombre,
            departamento_id : usuarioCompleto['departamento'].id,
            departamento: usuarioCompleto['departamento'].depto_nombre
         }
      ]);
   }

   const onClickDeleteUsuario = (e, id) => {
      let usuariosFiltrados = _.filter(destinatariosUsuarios, function (user) { return user.id !== id });
      setDestinatariosUsuarios([
         ...usuariosFiltrados
      ]);
   }

   const onSubmit = e => {
      e.preventDefault();

      if(nombre.length === 0 || descripcion.length === 0 || fileName.length === 0 || dataValue.length === 0)
      {
         swal({
            title: 'Error',
            text: 'Faltan Datos',
            icon: "error",
         });
         return null;
      }

      let user = window.localStorage.getItem('user');
      let url = `/documento/store`;
      let formData = new FormData();
      formData.set('file', fileDoc[0]);
      formData.set('extension', extension);
      formData.set('size', sizeFile);
      formData.set('fileName', fileName);
      formData.set('tipo_documento', documento.nombre);
      formData.set('id_documento', documento.id);
      formData.set('user', user);
      formData.set('nombre_documento', nombre);
      formData.set('descripcion_documento', descripcion);
      formData.set('destinatarios', JSON.stringify(destinatariosUsuarios));

      console.log(fileDoc);
      getApi(url, 'MULTIPART', formData, (status, data, message) => {   
         limpiarEnviar();
         if (status) {
            
            swal({
               title: "Aceptado.",        
               text: message,
               icon: "success",
            });
            window.open(data.url_completa, "Diseño Web", "width=800, height=600");
         } else {     
            swal({
               title: 'Error',
               text: message,
               icon: "error",
            });
         }
      });
   }
   useEffect(() => {
      console.log("FILE DOC: " + fileDoc);
   }, [fileDoc])

   const uploadFile = evt => {
      let files = evt.target.files;
      if (Object.keys(files).length > 0) {
         if (files[0].size > 20971520) {
            swal({
               text: "El tamaño maximo permitido es de 20MB!",
               icon: "info",
            });
            return;
         }
         let size = getFileSize(files[0]);
         setSizeFile(size);
         setFileDoc(files);
         setFileName(files[0].name);
         setLabelFile(files[0].name + ' (' + size + ')');
      }
   }


   const getFileSize = file => {
      let size = file.size;
      if (size === 0) return '0 Bytes';

      const k = 1024;
      const dm = 0;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      const i = Math.floor(Math.log(size) / Math.log(k));
      return parseFloat((size / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
   }
   const handleChangeNombre = e => {
      setNombre(e.target.value);      
   }
   const handleChangeDescripcion = e => {
      setDescripcion(e.target.value);
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
                        <div className="text-tittle-card mt-1"><em className="fas fa-sync"></em>&nbsp;Crear Documento.</div>
                        <hr></hr>
                     </div>
                     <div className='container'>
                        <div className="card-body mt-0">
                           <form onSubmit={onSubmit} className="form-horizontal">
                              <FormGroup row>
                                 <label className="col-xl-2 col-form-label text-input">Tipo Documento</label>
                                 <div className="col-xl-4">
                                    <Select
                                       styles={{
                                          menu: provided => ({ ...provided, zIndex: 9999 })
                                       }}
                                       placeholder='Seleccione Tipo Archivo'
                                       onChange={handleChangeDocumento}
                                       options={selectData}
                                       isLoading={!isReadyTipoDoc}
                                       loadingMessage={() => 'Cargando...'}
                                       noOptionsMessage={() => 'Sin Resultados...'}
                                       isRequired={true}                                       
                                    />
                                    <span className="form-text text-grey">Ingrese el tipo de documento.</span>
                                 </div>
                                 <label className="col-xl-1 col-form-label text-input">Nombre</label>
                                 <div className="col-xl-5">
                                    <Input onChange={handleChangeNombre} type="text" placeholder="Nombre" value={nombre} />
                                    <span className="form-text text-grey">Ingrese el nombre principal del documento.</span>
                                 </div>
                              </FormGroup>
                              <FormGroup row>
                                 <label className="col-xl-2 col-form-label text-input">Archivo</label>
                                 <div className="col-xl-10">
                                    <CustomInput accept={extension} onChange={evt => uploadFile(evt)} className='FileInput' label={labelFile} type="file" id="file" name="file" />
                                    <span className="form-text text-grey">Formatos permitidos PDF, Word, Excel, Txt - <span className='text-bold'>Limite maximo 20 MB.</span></span>
                                 </div>
                              </FormGroup>
                              <FormGroup row className='mb-2'>
                                 <label className="col-xl-2 col-form-label text-input">Descripción</label>
                                 <div className="col-xl-10">
                                    <textarea onChange={handleChangeDescripcion} rows="10" className="form-control note-editor note-editor-margin borde-grey" value={descripcion}></textarea>
                                    <span className="form-text text-grey">Ingrese una breve descripción del archivo adjunto - <span className='text-bold'>Limite maximo 200 caracteres.</span></span>
                                 </div>
                              </FormGroup>
                              {showDestinatarios &&
                                 <React.Fragment>
                                    <hr></hr>
                                    <FormGroup row className='mt-2'>
                                       <label className="col-xl-2 col-form-label text-input">Departamentos</label>
                                       <div className="col-xl-3">
                                          <Select
                                             className='form-control-rounded'
                                             styles={{
                                                menu: provided => ({ ...provided, zIndex: 9999 })
                                             }}
                                             placeholder='Seleccione Departamento'
                                             onChange={handleChangeDepartamento}
                                             options={selectDestinatarioDepartamentos}
                                             isLoading={!isReadyDestDepto}
                                             loadingMessage={() => 'Cargando...'}
                                             noOptionsMessage={() => 'Sin Resultados...'}
                                             isRequired={true}
                                          />
                                       </div>
                                       <label className="col-xl-1 col-form-label text-input">Usuarios</label>
                                       <div className="col-xl-4">
                                          <Select
                                             className='form-control-rounded'
                                             styles={{
                                                menu: provided => ({ ...provided, zIndex: 9999 })
                                             }}
                                             placeholder='Seleccione Usuario'
                                             onChange={handleChangeUsuario}
                                             value={usuario.label}
                                             options={selectDestinatarioUsuarios}
                                             isLoading={!isReadyDestUser}
                                             loadingMessage={() => 'Cargando...'}
                                             noOptionsMessage={() => 'Sin Resultados...'}
                                             isRequired={true}
                                          />
                                       </div>
                                       <div className='col-xl-2 mt-1'>
                                          <Button block onClick={onClickUsuario} color='info'>Agregar</Button>
                                       </div>
                                    </FormGroup>
                                    <FormGroup row>
                                       <label className="col-xl-2 col-form-label text-input">Destinatarios</label>
                                       <div className="col-xl-10">
                                          <Card className="card-default">
                                             <CardHeader className='pt-3 pb-0'> <div className="text-tittle-card"><em className="fas fa-sync"></em>&nbsp;Usuarios</div></CardHeader>
                                             <hr className='mb-0'></hr>
                                             <CardBody className='pt-0'>
                                                {/* START table-responsive */}
                                                <Table responsive>
                                                   <thead>
                                                      <tr>
                                                         <th>Borrar</th>
                                                         <th>Nombre</th>
                                                         <th>Departamento</th>
                                                      </tr>
                                                   </thead>
                                                   <tbody>
                                                      {destinatariosUsuarios.length === 0 ?
                                                         (
                                                            <React.Fragment>
                                                               <tr className='text-center'>
                                                                  <td colSpan='3'>Sin Datos</td>
                                                               </tr>
                                                            </React.Fragment>
                                                         ) :
                                                         (destinatariosUsuarios.map((usuario, index) => {
                                                            let id = usuario.id;
                                                            return (
                                                               <tr key={index}>
                                                                  <td>
                                                                     <Button
                                                                        key={index + "-button"}
                                                                        outline
                                                                        className="btn-table btn btn-xs"
                                                                        color="danger"
                                                                        type="button"
                                                                        onClick={e => onClickDeleteUsuario(e, id)}>
                                                                        <em className={'fa fa-trash-alt'}></em>
                                                                     </Button>
                                                                  </td>
                                                                  <td>{usuario.nombre}</td>
                                                                  <td>{usuario.departamento}</td>
                                                               </tr>
                                                            );
                                                         }))
                                                      }
                                                   </tbody>
                                                </Table>
                                                {/* END table-responsive */}
                                             </CardBody>
                                          </Card>
                                       </div>
                                    </FormGroup>
                                 </React.Fragment>
                              }
                              <hr></hr>
                              <FormGroup row className='mb-2 justify-content-center'>
                               
                                 <div className="col-xl-6">
                                    <Button block className='text-bold' size="xl" onClick={onSubmit} color='success'>Enviar Documento</Button>
                                 </div>

                              </FormGroup>
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

export default EnviarDocumento;