import React, { useEffect, useState } from "react";
import ContentWrapper from "../../_layout/ContentWrapper";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  FormGroup,
  Button,
  Card,
  Table,
} from "reactstrap";
import InputField from "../../_framework/_helpers/smart-table/inputs-form/InputField";
import getApi from "../../utils/api/index";

import { v4 } from "uuid";

import $ from 'jquery';
import _ from 'lodash';
import swal from 'sweetalert';

import 'parsleyjs/dist/parsley.min.js';
import 'parsleyjs/dist/i18n/es';
import ToolTip from "../../_framework/_helpers/tooltip/ToolTip";

//COMPONENTES
import Estado from "./components/estado";
import Tiempo from "./components/tiempo";

//ESTILOS CSS

import "../../styles/custom.css";

const BuscarPorCodigo = (props) => {

  // STATE DE SMARTTABLE
  const [showLoading, setShowLoading] = useState(true);
  const [cargaEstados, setCargaEstados] = useState(false);
  const [idCard] = useState("card-id-" + new Date().getTime());
  const [classRowActive, setClassRowActive] = useState(null);
  const [idForm] = useState('form-id-' + (new Date()).getTime());

  // STATE TOOLTIP
  const [tooltipOpen, setTooltipOpen] = useState(false);

  // STATE DEL COMPONENTE
  const [documento, setDocumento] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [codigo, setCodigo] = useState('');
  const [urlHistorial, setUrlHistorial] = useState('');

  // MOSTRAR DEPARTAMENTOS
  const [showDepartamentos, setShowDepartamentos] = useState(false);
  const [isReadyDepto, setIsReadyDepto] = useState(false);


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

  useEffect(()=>{
    localStorage.setItem('historial', props.location.pathname);
  },[])



  const onSubmit = (e) => {
    e.preventDefault();

    instanceValid();
    setShowDepartamentos(true);
    if (codigo.length === 0) {
      swal({
        title: 'Completar Datos',
        text: 'Ingrese Código de documento',
        icon: "error",
      });
      setShowDepartamentos(false);
      return null;
    }
    getDocumentos(codigo);

  };
  const onClickDelete = (e, id) => {
    e.preventDefault();
    let user = localStorage.getItem("user");
  };

  const getDocumentos = (codigo) => {
    const url = `/documento/details/${codigo}`;
    getApi(url, "GET", null, (status, data, message) => {
      console.log(status, data, message);
      if (!status) {
        swal({
          title: "Error",
          text: message,
          icon: "error"
       }); 
       setCodigo('');
       setShowDepartamentos(false);
       return null;
      }
      setDocumento(data)
      setCargaEstados(true);
    });
  };

  const handleChangeCodigo = e => {
    setCodigo(e.target.value);
    console.log(e.target.value);
  }



  const cargaEstadosCodigo = () => {
    if (!cargaEstados) {
      return `card card-default whirl double-up`;

    }
    else {
      return 'card card-default';
    }
  }

  return (
    <ContentWrapper>
      <div className="content-heading">
        <div className="text-form text-tittle">Mis Documentos</div>
      </div>
      <div className="row">
        <div className="col text-center">
          <h2>Buscar documentos por Código</h2>
          <p>Inserta un código y busca el documento.</p>
          <form onSubmit={onSubmit} className="form-horizontal" id={idForm}>
            <FormGroup row className='mb-2 justify-content-center'>
              <div className="col-xl-6">
                <InputField
                className='mb-3'
                  placeholder={'Ingresa un código'}
                  value={codigo}
                  onChange={handleChangeCodigo}
                  autoFocus={true}
                  isRequired={true}
                />
              </div>
            </FormGroup>
          </form>
        </div>
      </div>
      {showDepartamentos ?
        <div className="p-0">
          <Row className="d-flex justify-content-center mb-1">
            <Col xl="12">
              <Card className={cargaEstadosCodigo()} id={idCard}>
                <div className="card-header mb-0 pb-0">
                  <div className="text-tittle-card mt-1">
                    <em className="fas fa-sync"></em>&nbsp;Detalle de Documentos.
                </div>
                  <hr></hr>
                </div>
                <div className="card-body mt-0 pt-0">               
                  <Table
                    hover
                    responsive
                  >
                    <thead>
                      <tr>
                        <th className="text-center">Código</th>
                        <th className="text-center">Estado</th>
                        <th className="text-center">Nombre</th>
                        <th className="text-center">Descripción</th>
                        <th className="text-center">Fecha Ingreso</th>
                        <th className="text-center">Fecha Egreso</th>
                        <th className="text-center">Tiempo Total</th>
                        <th className="text-center">Opciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(documento).length > 0 ?
                        <React.Fragment>
                          <tr
                            key={documento.id}
                            className={classRowActive === documento.id ? "active" : ""}
                          >
                            <td className={"text-center"}>
                              <Link to={`../ver-estados/${documento.id}`}>{documento.docu_codigo}</Link>
                            </td>
                            <td className={"text-center"}>
                              <Estado estado={documento.docu_estado} />
                            </td>
                            <td className={"text-left bold"}>
                              {documento.docu_nombre}
                            </td>
                            <td className={"text-left"}>
                              {documento.docu_descripcion}
                            </td>
                            <td className={"text-center"}>
                              {documento.docu_fecha_ingreso}
                            </td>
                            <td className={"text-center"}>
                              {documento.docu_fecha_egreso
                                ? documento.docu_fecha_egreso
                                : "Sin Datos"}
                            </td>
                            <td className={"text-center"}>
                              <Tiempo
                                meses={documento.diferenciaMeses}
                                dias={documento.diferenciaDias}
                                horas={documento.diferenciaHoras}
                                minutos={documento.diferenciaMinutos}
                              />
                            </td>
                            <td className={"text-center"}>
                              <ToolTip
                                idelement={v4()}
                                placement={"top"}
                                content={"Ver archivos"}
                              >
                                <Button
                                  key={documento.id + "-button" + v4()}
                                  outline
                                  className="btn-table btn btn-xs mr-1"
                                  color="primary"
                                  type="button"
                                  id={"Tooltip-" + documento.id}
                                  onClick={(e) => onClickDelete(e, documento.id)}
                                >
                                  <em className={"fa fa-file-word"}></em>
                                </Button>
                              </ToolTip>
                              <ToolTip
                                idelement={v4()}
                                placement={"top"}
                                content={"Obtener FOLIO"}
                              >
                                <Button
                                  key={documento.id + "-button" + v4()}
                                  outline
                                  className="btn-table btn btn-xs mr-1"
                                  color="danger"
                                  type="button"
                                  onClick={(e) => onClickDelete(e, documento.id)}
                                >
                                  <em className={"fa fa-file-pdf"}></em>
                                </Button>
                              </ToolTip>
                              <ToolTip
                                idelement={v4()}
                                placement={"top"}
                                content={"Agregar Documentos"}
                              >
                                <Button
                                  key={documento.id + "-button" + v4()}
                                  outline
                                  className="btn-table btn btn-xs mr-1"
                                  color="secondary"
                                  type="button"
                                  onClick={(e) => onClickDelete(e, documento.id)}
                                >
                                  <em className={"fa fa-edit"}></em>
                                </Button>
                              </ToolTip>
                              {/* ELIMINAR SOLO SI ES ADMINISTRADOR */}
                              {/*  <Button
                                         key={index + "-button"}
                                         outline
                                         className="btn-table btn btn-xs"
                                         color="danger"
                                         type="button"
                                         onClick={e => onClickDelete(e, item.id)}>
                                         <em className={'fa fa-trash-alt'}></em>
                                      </Button> */}
                            </td>
                          </tr>
                        </React.Fragment>
                        
                        :
                        <tr>
                        <td className='text-center' colSpan="8"><h3>Sin datos</h3></td>
                      </tr>
                      }
                    </tbody>
                  </Table>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
        : ''}
    </ContentWrapper>
  );
};

export default BuscarPorCodigo;
