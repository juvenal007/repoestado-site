import React, { useEffect, useState } from "react";
import ContentWrapper from "../../_layout/ContentWrapper";
import {
  FormGroup,
} from "reactstrap";
import Select from "react-select";
import getApi from "../../utils/api/index";
import { v4 } from "uuid";


import _ from "lodash";
import "parsleyjs/dist/parsley.min.js";


// COMPONENTES
import TablaDocumento from './components/tabla-documento';

//ESTILOS CSS

import "../../styles/custom.css";

const BuscarPorDepartamento = (props) => {

  // STATE DE SMARTTABLE 
  const [cargaEstados, setCargaEstados] = useState(false);


  // STATE DEL COMPONENTE
  const [documentos, setDocumentos] = useState([]);
  const [selectDepartamentos, setSelectDepartamentos] = useState([]);

  // MOSTRAR DEPARTAMENTOS
  const [showDocumentos, setShowDocumentos] = useState(false);
  const [isReady, setIsReady] = useState(false);


  const parseSelectDepto = (data) => {
    let opciones = [];
    data.map((item, index) => {
      opciones.push({ value: item.id, label: item.depto_nombre });
    });
    return opciones;
  }

  useEffect(() => {
    localStorage.setItem('historial', props.location.pathname);
    setIsReady(false);
    setShowDocumentos(false);
    setCargaEstados(false);
    const getDepartamentos = async () => {
      const url = `/departamento/list_all`;
      getApi(url, "GET", null, (status, data, message) => {
        console.log(status, data, message);
        if (!status) {
          return console.log(message);
        }
        setSelectDepartamentos(parseSelectDepto(data));
        setIsReady(true);
      });
    };
    getDepartamentos();
  }, []);

  const getDocumentos = (departamento_id) => {
    const url = `/documento/list/mis-documentos/departamento/${departamento_id}`;
    getApi(url, "GET", null, (status, data, message) => {
      console.log(status, data, message);
      if (!status) {
        return console.log(message);
      }
      setDocumentos(data);
      setCargaEstados(true);
    });
  };

  const handleChange = e => {
    setCargaEstados(false);
    setShowDocumentos(true);
    getDocumentos(e.value);
  }



  return (
    <ContentWrapper>
      <div className="content-heading">
        <div className="text-form text-tittle">Mis Documentos</div>
      </div>
      <div className="row">
        <div className="col text-center">
          <h2>Buscar documentos por Departamento</h2>
          <p>Busca un departamento y visualiza su lista de documentos.</p>
          <FormGroup row className='mb-2 justify-content-center'>
            <div className="col-xl-6">
              <Select
                className='mb-3'
                styles={{
                  menu: provided => ({ ...provided, zIndex: 9999 })
                }}
                placeholder='Seleccione Tipo Archivo'
                onChange={handleChange}
                options={selectDepartamentos}
                isLoading={!isReady}
                loadingMessage={() => 'Cargando...'}
                noOptionsMessage={() => 'Sin Resultados...'}
                isRequired={true}
              />
            </div>
          </FormGroup>
        </div>
      </div>
      <TablaDocumento
        key={v4()}
        showDocumentos={showDocumentos}
        cargaEstados={cargaEstados}
        documentos={documentos}
      />
    </ContentWrapper>
  );
};

export default BuscarPorDepartamento;
