import React, { useEffect, useState } from "react";
import ContentWrapper from "../../_layout/ContentWrapper";
import { FormGroup } from "reactstrap";
import InputField from "../../_framework/_helpers/smart-table/inputs-form/InputField";
import getApi from "../../utils/api/index";
import swal from 'sweetalert';
import $ from 'jquery';
import _ from 'lodash';
//COMPONENTES
import TablaDocumento from '../buscar-departamento/components/tabla-documento';

//ESTILOS CSS

import "../../styles/custom.css";

const BuscarPorCodigo = (props) => {

  // STATE DE SMARTTABLE
  const [cargaEstados, setCargaEstados] = useState(false);


  // STATE DEL COMPONENTE
  const [documentos, setDocumentos] = useState([]);
  const [codigo, setCodigo] = useState('');
  const [idForm] = useState("form-id-" + new Date().getTime());


  // MOSTRAR DEPARTAMENTOS
  const [showDocumentos, setShowDocumentos] = useState(false);

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

  useEffect(() => {
    localStorage.setItem('historial', props.location.pathname);
  }, [])



  const onSubmit = (e) => {
    e.preventDefault();

    instanceValid();
    setShowDocumentos(true);
    if (codigo.length === 0) {
      swal({
        title: 'Completar Datos',
        text: 'Ingrese Código de documento',
        icon: "error",
      });
      setShowDocumentos(false);
      return null;
    }
    getDocumentos(codigo);

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
        setShowDocumentos(false);
        return null;
      }    
      let documentos = [];
        documentos.push(data);     
        console.log(documentos);
        setDocumentos(documentos);
      setCargaEstados(true);
    });
  };

  const handleChange = e => {
    setCodigo(e.target.value);
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
                  onChange={handleChange}
                  autoFocus={true}
                  isRequired={true}
                />
              </div>
            </FormGroup>
          </form>
        </div>
      </div>
      <TablaDocumento
        showDocumentos={showDocumentos}
        cargaEstados={cargaEstados}
        documentos={documentos}
      />
    </ContentWrapper>
  );
};

export default BuscarPorCodigo;
