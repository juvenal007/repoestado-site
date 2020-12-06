import React, { useState, useEffect } from 'react';
import ContentWrapper from '../../_layout/ContentWrapper';
import { Row, Col, Label, FormGroup } from 'reactstrap';
import InputField from '../../_framework/_helpers/smart-table/inputs-form/InputField';
import Select from 'react-select';


import swal from 'sweetalert';
import getApi from '../../utils/api/index';
import { ToastContainer, toast } from 'react-toastify';
import $ from 'jquery';


import 'parsleyjs/dist/parsley.min.js';
import 'parsleyjs/dist/i18n/es';

//ESTILOS CSS
import '../../styles/custom.css';

// CARGA DE COMPONENTES
import AgregarProducto from './components/agregarProducto';
import Carro from './components/carro';


const Solicitud = (props) => {

  const [cliente, setCliente] = useState({
    rut: 'Sin datos',
    nombre: 'Sin datos',
    direccion: 'Sin datos',
    telefono: 'Sin datos'
  });

  //FORM
  const [idForm] = useState('form-id-' + (new Date()).getTime());

  // STATE DEL COMPONENTE
  const [centroCosto, setCentroCosto] = useState('');
  const [centroCostos, setCentroCostos] = useState([]);
  const [proyecto, setProyecto] = useState({ label: 'Seleccione Proyecto' });
  const [proyectos, setProyectos] = useState([]);
  const [solicitante, setSolicitante] = useState({
    solicitud_nombre_solicitante: ''
  });

  // STATE COMPONENTE CARRO
  const [carro, setCarro] = useState([]);

  // SETEO DE ESTADOS DE CARGAS    
  const [isReadyCentroCosto, setIsReadyCentroCosto] = useState(false);
  const [isReadyProyecto, setIsReadyProyecto] = useState(false);
  const [isReadyCliente, setIsReadyCliente] = useState(false);

  // ################# ERRORES DE LA API state ############## //
  const [msgErrors, setMsgErrors] = useState({});
  const [hasErrors, setHasErrors] = useState(false);
  const [typeError, setTypeError] = useState(1);







  // CAPTURAMOS EL EVENTO CUANDO CAMBIAN LOS NOMBRES DEL CAMPO SELECT
  const handleChangeSelectCentroCosto = e => {
    // SETEAMOS CENTRO DE COSTO CON LOS NUEVOS NOMBRES
    setCentroCosto({ id: e.value, nombre: e.label });
    // SETEAMOS PROYECTOS PARA QUE NOS APAREZCA SELECCIONE PROYECTO COMO EN EL INICIO
    setProyecto({
      label: 'Seleccione Proyecto'
    })
    setCliente({
      rut: 'Sin datos',
      nombre: 'Sin datos',
      direccion: 'Sin datos',
      telefono: 'Sin datos'
    })
    // SETEAMOS EL ARRAY DE PROYETOS A 0 PARA QUE VUELVA A CONSULTAR LOS DATOS Y APAREZCA MENSAJE DE CARGANDO O NO HAY DATOS
    setProyectos([]);
  }

  const handleChangeSelectProyecto = e => {
    setProyecto({ id: e.value, nombre: e.nombre });

  }

  const handleChangeSolicitante = e => {
    console.log(e.target.value);
    setSolicitante({
      ...solicitante,
      [e.target.name]: e.target.value
    });
  }



  useEffect(() => {
    if (proyecto.id !== undefined) {
      const getCliente = async () => {
        const url = `cliente/details/${proyecto.id}`;
        await getApi(url, 'GET', null, (status, data, message) => {
          console.log(status, data, message);
          if (!status) {
            return console.log(message);
          }
          console.log(data[0]);
          setCliente(data[0]);

        });
      }
      getCliente();
    }

  }, [proyecto]);

  // PARSEAMOS PARA SETEAR EL SELECT CON DATOS VALUE Y LABEL. PARA QUE MUESTRE LOS DATOS
  const parseSelect = (data) => {
    let opciones = [];
    data.map((item, index) => {
      opciones.push({ value: item.id, label: item.nombre });
    });
    return opciones;
  }



  // OBTENEMOS LOS CENTROS DE COSTOS APENAS CARGA LA PAGINA
  useEffect(() => {
    const getCentroCostos = () => {
      const url = `centro-costo/list`;
      getApi(url, 'GET', null, (status, data, message) => {
        console.log(status, data, message);
        if (!status) {
          return console.log(message);
        }
        setCentroCostos(parseSelect(data));
        setIsReadyCentroCosto(true);
      });
    }
    getCentroCostos();
  }, []);


  // DEFINIMOS LOS PROYECTOS APENAS HAY VALORES O CAMBIOS EN CENTRO DE COSTOS DEL SELECT ANTERIOR
  useEffect(() => {
    setIsReadyProyecto(false);
    const getProyectos = () => {
      const url = `proyecto/list/${centroCosto.id}`;
      getApi(url, 'GET', null, (status, data, message) => {
        console.log(status, data, message);
        if (!status) {
          return console.log(message);
        }
        setProyectos(parseSelect(data));
        setIsReadyProyecto(true);
      });
    }
    getProyectos();
  }, [centroCosto]);

  const validarForm = () => {
    if (Object.keys(centroCosto).length === 0 || Object.keys(proyecto).length === 0 || Object.keys(solicitante['solicitud_nombre_solicitante']).length === 0 || Object.keys(carro).length === 0 || cliente['nombre'] === 'Sin datos') {
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


  const onSubmit = e => {
    e.preventDefault();
    //VALIDAR DATOS  
    instanceValid();
    if (validarForm()) {
      swal({
        title: "Faltan Datos",
        text: 'Debe completar todos los datos',
        icon: "warning",
        dangerMode: true,
      });
      return null;
    }

    let datos = {
      proyecto: proyecto,
      solicitud_nombre_solicitante: solicitante['solicitud_nombre_solicitante'],
      carro: carro
    }

    getApi(`solicitud/store`, 'POST', datos, (status, data, message, re) => {
      if (status) {
        swal({
          title: "Solicitud Ingresada",
          text: 'Exito',
          icon: "success"
        });
        setTimeout(() => {
          window.open(data.pdf, "Diseño Web", "width=800, height=600")
        }, 2000);
      } else {
        toast(message, {
          type: "error",
          position: "bottom-center",
        });
        if (re.hasOwnProperty("type_error") && re.type_error === 'validation_error') {

          setHasErrors(true);
          setMsgErrors(data);//Mensaje de Error " Dato Incorrecto"
          setTypeError(1);

        } else {
          setHasErrors(true);
          setMsgErrors(message);//Mensaje de Error " Dato Incorrecto"
          setTypeError(2);
        }
      }

    });
  }

  const { rut, nombre, direccion, telefono } = cliente;

  return (
    <ContentWrapper>
      <div className="content-heading">
        <div className='text-bold'>SOLICITUD</div>
      </div>
      <div className="p-0">
        <Row className='d-flex justify-content-center mb-1'>
          <Col xl="12">
            <div className="card card-default">
              <div className="card-header">
                <div className="card-title">Ingrese los datos de solicitud de materiales.</div>
              </div>
              <div className="card-body">
                <form
                  id={idForm}
                >
                  <Row className='d-flex'>
                    <div className="col-xl-4">
                      <FormGroup>
                        <Label for='centroCosto' className='text-form mb-0 field-required'>Centro de Costo</Label>
                        <Select
                          key={centroCostos.length}
                          name='centro_costos_id'
                          placeholder='Seleccione Centro de Costo'
                          onChange={handleChangeSelectCentroCosto}
                          options={centroCostos}
                          isLoading={!isReadyCentroCosto}
                          loadingMessage={() => 'Cargando...'}
                          noOptionsMessage={() => 'Sin Resultados...'}
                          isRequired={true}
                        />
                      </FormGroup>
                    </div>
                    <div className="col-xl-4">
                      <FormGroup>
                        <Label for='proyecto' className='text-form mb-0 field-required'>Proyecto</Label>
                        <Select
                          key={proyecto.length}
                          name='proyectos_id'
                          value={proyecto.label}
                          placeholder='Seleccione Proyecto'
                          onChange={handleChangeSelectProyecto}
                          options={proyectos}
                          isLoading={!isReadyProyecto}
                          loadingMessage={() => 'Cargando...'}
                          noOptionsMessage={() => 'Sin Resultados...'}
                          isRequired={true}
                        />
                      </FormGroup>
                    </div>
                    <Col xl='4'>
                      <FormGroup className='mb-0'>
                        <Label className='text-form mb-0 field-required'>Datos Solicitante / Jefe de Obra</Label>
                        <InputField type="text"
                          placeholder='Ingrese Nombre'
                          name='solicitud_nombre_solicitante'
                          value={solicitante['solicitud_nombre_solicitante']}
                          onChange={handleChangeSolicitante}
                          isRequired={true}
                        />

                      </FormGroup>
                    </Col>
                    <div className="col-12 mt-2 mb-0">
                      <Label className='text-form mb-0'>Datos Cliente</Label>
                      <div className='row'>
                        <Col xl='2'>
                          <FormGroup className='mb-0'>
                            <label className='labels field-required'><strong>Rut</strong></label>
                            <InputField type="text"
                              readOnly={true}
                              value={rut}
                              isRequired={true}
                            />

                          </FormGroup>
                        </Col>
                        <Col xl='4'>
                          <FormGroup className='mb-0'>
                            <label className='labels field-required'><strong>Nombre</strong></label>
                            <InputField type="text"
                              readOnly={true}
                              value={nombre}
                              isRequired={true}
                            />
                          </FormGroup>
                        </Col>
                        <Col xl='4'>
                          <FormGroup className='mb-0'>
                            <label className='labels field-required'><strong>Dirección</strong></label>
                            <InputField type="text"
                              readOnly={true}
                              value={direccion}
                              isRequired={true}

                            />
                          </FormGroup>
                        </Col>
                        <Col xl='2'>
                          <FormGroup className='mb-0'>
                            <label className='labels field-required'><strong>Telefono</strong></label>
                            <InputField type="text"
                              readOnly={true}
                              value={telefono}
                              isRequired={true}
                            />
                          </FormGroup>
                        </Col>
                      </div>
                    </div>
                    <div className='col-12 mt-4'>
                      <div className="card card-default">
                        <div className="card-body">
                          <div className='row'>
                            <div className="col-12 mt-0 mb-0">
                              <AgregarProducto
                                carro={carro}
                                setCarro={setCarro}
                              />
                            </div>
                            <div className="col-12 mt-0 mb-0">
                              <Carro
                                carro={carro}
                                setCarro={setCarro}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='row mx-auto'>
                      <div className="col-12 mt-0 mb-0">
                        <button
                          className='btn btn-xl btn-success text-bold'
                          onClick={onSubmit}
                        >
                          <em className="fas fa-check"></em>&nbsp;AGREGAR SOLICITUD
                                                </button>

                      </div>
                    </div>
                  </Row>
                </form>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </ContentWrapper >
  );
}

export default Solicitud;