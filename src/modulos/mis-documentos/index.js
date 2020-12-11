import React, { useEffect, useState } from "react";
import ContentWrapper from "../../_layout/ContentWrapper";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Tooltip,
  Label,
  FormGroup,
  Alert,
  Input,
  CustomInput,
  Button,
  Card,
  CardHeader,
  CardBody,
  Table,
  Badge,
} from "reactstrap";
import InputField from "../../_framework/_helpers/smart-table/inputs-form/InputField";
import Select from "react-select";
import getApi from "../../utils/api/index";

import { v4 } from "uuid";

import _ from "lodash";
import { toast } from "react-toastify";
import "parsleyjs/dist/parsley.min.js";
import ToolTip from "../../_framework/_helpers/tooltip/ToolTip";

//COMPONENTES
import Estado from "./components/estado";
import Tiempo from "./components/tiempo";

//ESTILOS CSS

import "../../styles/custom.css";

const MisDocumentos = (props) => {
  // STATE DE SMARTTABLE
  const [panelStyle, setPanelStyle] = useState("card-default");
  const [spinner, setSpinner] = useState("double-up");
  const [showLoading, setShowLoading] = useState(true);
  const [classCard, setClassCard] = useState(panelStyle + " whirl " + spinner);
  const [idCard] = useState("card-id-" + new Date().getTime());
  const [classRowActive, setClassRowActive] = useState(null);

  // STATE TOOLTIP
  const [tooltipOpen, setTooltipOpen] = useState(false);

  // STATE DEL COMPONENTE
  const [documentos, setDocumentos] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const handleRefresh = (done) => {
    const whirlClass = "whirl";
    if (done) {
      setClassCard(panelStyle + " " + spinner);
    } else {
      setClassCard(panelStyle + " " + whirlClass + " " + spinner);
    }
  };

  useEffect(() => {
    const getDocumentos = async () => {
      localStorage.setItem('historial', props.location.pathname);
      const url = `documento/list/mis-documentos/usuario/${user.id}`;
      getApi(url, "GET", null, (status, data, message) => {
        console.log(status, data, message);
        if (!status) {
          return console.log(message);
        }
        setDocumentos(data);
        handleRefresh(true);
      });
    };
    getDocumentos();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    let user = localStorage.getItem("user");
  };
  const onClickDelete = (e, id) => {
    e.preventDefault();
    let user = localStorage.getItem("user");
  };

  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <ContentWrapper>
      <div className="content-heading">
        <div className="text-form text-tittle">Mis Documentos</div>
      </div>
      <div className="p-0">
        <Row className="d-flex justify-content-center mb-1">
          <Col xl="12">
            <Card className={classCard} id={idCard}>
              <div className="card-header mb-0 pb-0">
                <div className="text-tittle-card mt-1">
                  <em className="fas fa-sync"></em>&nbsp;Detalle de Documentos.
                </div>
                <hr></hr>
              </div>

              <div className="card-body mt-0 pt-0">
                <br />
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
                  {Object.keys(documentos).length > 0 ?
                        documentos.map((item, index) => {
                      return (
                        <tr
                          key={index}
                          className={classRowActive === index ? "active" : ""}
                        >
                          <td className={"text-center"}>
                            <Link to={`ver-estados/${item.id}`}>{item.docu_codigo}</Link>
                          </td>
                          <td className={"text-center"}>
                            <Estado estado={item.docu_estado} />
                          </td>
                          <td className={"text-left bold"}>
                            {item.docu_nombre}
                          </td>
                          <td className={"text-left"}>
                            {item.docu_descripcion}
                          </td>
                          <td className={"text-center"}>
                            {item.docu_fecha_ingreso}
                          </td>
                          <td className={"text-center"}>
                            {item.docu_fecha_egreso
                              ? item.docu_fecha_egreso
                              : "Sin Datos"}
                          </td>
                          <td className={"text-center"}>
                            <Tiempo
                              meses={item.diferenciaMeses}
                              dias={item.diferenciaDias}
                              horas={item.diferenciaHoras}
                              minutos={item.diferenciaMinutos}
                            />
                          </td>
                          <td className={"text-center"}>
                            <ToolTip
                              idelement={v4()}
                              placement={"top"}
                              content={"Ver archivos"}
                            >
                              <Button
                                key={index + "-button" + v4()}
                                outline
                                className="btn-table btn btn-xs mr-1"
                                color="primary"
                                type="button"
                                id={"Tooltip-" + index}
                                onClick={(e) => onClickDelete(e, item.id)}
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
                                key={index + "-button" + v4()}
                                outline
                                className="btn-table btn btn-xs mr-1"
                                color="danger"
                                type="button"
                                onClick={(e) => onClickDelete(e, item.id)}
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
                                key={index + "-button" + v4()}
                                outline
                                className="btn-table btn btn-xs mr-1"
                                color="secondary"
                                type="button"
                                onClick={(e) => onClickDelete(e, item.id)}
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
                      );
                    })
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
      
    </ContentWrapper>
  );
};

export default MisDocumentos;
