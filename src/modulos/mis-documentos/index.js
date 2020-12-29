import React, { useEffect, useState } from "react";
import ContentWrapper from "../../_layout/ContentWrapper";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Button,
  Card,
  Table,
} from "reactstrap";
import getApi from "../../utils/api/index";

import { v4 } from "uuid";

import _ from "lodash";
import "parsleyjs/dist/parsley.min.js";
import ToolTip from "../../_framework/_helpers/tooltip/ToolTip";

//COMPONENTES
import TablaDocumento from '../buscar-departamento/components/tabla-documento';

//ESTILOS CSS

import "../../styles/custom.css";

const MisDocumentos = (props) => {

  // STATE DE SMARTTABLE 
  const [showDocumentos, setShowDocumentos] = useState(true);
  const [cargaEstados, setCargaEstados] = useState(false);
  const [isReady, setIsReady] = useState(false);


  // STATE TOOLTIP
  const [tooltipOpen, setTooltipOpen] = useState(false);

  // STATE DEL COMPONENTE
  const [documentos, setDocumentos] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));


  useEffect(() => {
    localStorage.setItem('historial', props.location.pathname);
    setIsReady(false);
    setCargaEstados(false);
    const getDocumentos = () => {
      const url = `documento/list/mis-documentos/usuario/${user.id}`;
      getApi(url, "GET", null, (status, data, message) => {
        console.log(status, data, message);
        if (!status) {
          return console.log(message);
        }        
        setDocumentos(data);
        setIsReady(true);
        setCargaEstados(true);
      });
    };
    getDocumentos();
  }, []);

  const handleRefresh = () => {
    setIsReady(false);
    setCargaEstados(false);
    const getDocumentos = () => {
      const url = `documento/list/mis-documentos/usuario/${user.id}`;
      getApi(url, "GET", null, (status, data, message) => {
        console.log(status, data, message);
        if (!status) {
          return console.log(message);
        }        
        setDocumentos(data);
        setIsReady(true);
        setCargaEstados(true);
      });
    };

    getDocumentos();
  }


  return (
    <ContentWrapper>
      <div className="content-heading">
        <div className="text-form text-tittle">Mis Documentos</div>
      </div>
      <div className="p-0">
        <TablaDocumento
          showDocumentos={showDocumentos}
          cargaEstados={cargaEstados}
          documentos={documentos}       
          handleRefresh={handleRefresh}  
        />
      </div>

    </ContentWrapper>
  );
};

export default MisDocumentos;
