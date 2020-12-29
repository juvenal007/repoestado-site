import React, { useState } from 'react'
import {
   Row,
   Col,
   Button,
   Card,
   Table,
} from "reactstrap";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import 'parsleyjs/dist/parsley.min.js';
import 'parsleyjs/dist/i18n/es';
import _ from "lodash";
import ToolTip from "../../../_framework/_helpers/tooltip/ToolTip";
import getApi from '../../../utils/api/index';


//COMPONENTES
import Estado from "./estado";
import Tiempo from "./tiempo";

const TablaDocumento = ({ showDocumentos, cargaEstados, documentos, handleRefresh }) => {

   // STATES DEL COMPONENTE
   const [idCard] = useState("card-id-" + new Date().getTime());
   const [user] = useState(JSON.parse(localStorage.getItem("user")));
   const [classRowActive] = useState(null);

   const [archivo, setArchivo] = useState({});

   const cargaEstadosCodigo = () => {
      if (!cargaEstados) {
         return `card card-default whirl double-up`;

      }
      else {
         return 'card card-default';
      }
   }

   const getArchivo = (id) => {
      const url = `archivo/ver_archivo/${id}`;
      getApi(url, "GET", null, (status, data, message) => {
         console.log(status, data, message);
         if (!status) {
            return console.log(message);
         }
         let url = `http://localhost:8000/`;
         window.open(`${url}${data.archivo_url}`);
      });
   };
   const getPdf = (id) => {
      const url = `archivo/ver_folio/${id}`;
      getApi(url, "GET", null, (status, data, message) => {
         console.log(status, data, message);
         if (!status) {
            return console.log(message);
         }
         let url = `http://localhost:8000/`;
         window.open(`${url}${data.archivo_url}`);
      });
   };
   const deleteDocumento = (id) => {
      const url = `documento/delete/${id}`;
      getApi(url, "DELETE", null, (status, data, message) => {
         console.log(status, data, message);
         if (!status) {
            return console.log(message);
         }
         handleRefresh();
      });
   };


   const onClickVerArchivo = (e, id) => {
      e.preventDefault();
      getArchivo(id);
   };
   const onClickVerPdf = (e, id) => {
      e.preventDefault();
      getPdf(id);
   };
   const onClickDelete = (e, id) => {
      e.preventDefault();
      deleteDocumento(id);
   };




   return (
      <React.Fragment>
         {showDocumentos ?
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
                           <Table hover responsive>
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
                              <tbody>{Object.keys(documentos).length > 0 ?
                                 documentos.map((item, index) => {
                                    return (
                                       <tr
                                          key={index}
                                       ><td className={"text-center"}><Link to={`../ver-estados/${item.id}`}>{item.docu_codigo}</Link></td>
                                          <td className={"text-center"}><Estado estado={item.docu_estado} /></td>
                                          <td className={"text-left bold"}>{item.docu_nombre}</td>
                                          <td className={"text-left"}>{item.docu_descripcion}</td>
                                          <td className={"text-center"}>{item.docu_fecha_ingreso}</td>
                                          <td className={"text-center"}>{item.docu_fecha_egreso
                                             ? item.docu_fecha_egreso
                                             : "Sin Datos"}</td>
                                          <td className={"text-center"}><Tiempo
                                             meses={item.diferenciaMeses}
                                             dias={item.diferenciaDias}
                                             horas={item.diferenciaHoras}
                                             minutos={item.diferenciaMinutos}
                                          /></td>
                                          <td className={"text-center"}><ToolTip
                                             idelement={v4()}
                                             placement={"top"}
                                             content={"Ver archivos"}
                                          ><Button
                                             key={index + "-button" + v4()}
                                             outline
                                             className="btn-table btn btn-xs mr-1"
                                             color="primary"
                                             type="button"
                                             id={"Tooltip-" + index}
                                             onClick={(e) => onClickVerArchivo(e, item.id)}
                                          ><em className={"fa fa-file-word"}></em></Button></ToolTip>
                                             <ToolTip
                                                idelement={v4()}
                                                placement={"top"}
                                                content={"Obtener FOLIO"}
                                             ><Button
                                                key={index + "-button" + v4()}
                                                outline
                                                className="btn-table btn btn-xs mr-1"
                                                color="danger"
                                                type="button"
                                                onClick={(e) => onClickVerPdf(e, item.id)}
                                             >
                                                   <em className={"fa fa-file-pdf"}></em>
                                                </Button></ToolTip>
                                             {user.usuario_tipo === 'ADMINISTRADOR' ?
                                                <ToolTip
                                                   idelement={v4()}
                                                   placement={"top"}
                                                   content={"Eliminar Documento"}
                                                ><Button
                                                   key={index + "-button" + v4()}
                                                   outline
                                                   className="btn-table btn btn-xs mr-1"
                                                   color="secondary"
                                                   type="button"
                                                   onClick={(e) => onClickDelete(e, item.id)}
                                                >
                                                      <em className={"fa fa-times"}></em>
                                                   </Button></ToolTip> : null}
                                          </td></tr>);
                                 }) : cargaEstados ? <tr>
                                    < td className='text-center' colSpan="8"><h3>Sin datos</h3></td>
                                 </tr> : null}
                              </tbody>
                           </Table>
                        </div>
                     </Card>
                  </Col>
               </Row>
            </div >
            : ''}
      </React.Fragment >
   );
}
TablaDocumento.propTypes = {
   showDocumentos: PropTypes.bool.isRequired,
   cargaEstados: PropTypes.bool.isRequired,
   documentos: PropTypes.array.isRequired
}

export default TablaDocumento;