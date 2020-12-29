import React, { useState, useEffect } from "react";
import Tiempo from "./tiempo";
import { v4 } from "uuid";

const Historial = ({ estados, documento }) => {
  const [historial] = useState(estados);
  const [document] = useState(documento);

  return (
    <ul className="timeline">
      {historial.map((item, index) => {
        if (index % 2 == 0) {
          if (index === 0) {
            return (
              <React.Fragment key={v4()}>
                <li
                  className="timeline-separator text-input"
                  data-datetime={`${item.estado_nombre}: ${item.estado_fecha_ingreso} Hrs`}
                ></li>
                <li>
                  <div className="timeline-badge success mb-5">
                    <em className="fa fa-flag"></em>
                  </div>
                  <div className="timeline-card">
                    <div className="popover left">
                      <h4 className="popover-header">
                        {`${item["usuario"].usuario_nombre.substr(0, 10)} ${item["usuario"].usuario_ape_paterno}`}
                        {item.estado_nombre === 'TERMINADO' ? null : <span className="float-right">
                          {item.diferenciaMinutos && (
                            <Tiempo
                              meses={item.diferenciaMeses}
                              dias={item.diferenciaDias}
                              horas={item.diferenciaHoras}
                              minutos={item.diferenciaMinutos}
                            />
                          )}
                        </span>}
                      </h4>
                      <div className="arrow"></div>
                      <div className="popover-body">
                        <p>
                          {`Nombre documento: ${item["documento"].docu_nombre}`}
                          <br />
                          {`Descripción: ${item["documento"].docu_descripcion}`}
                          <br />
                          {document.tipo_documento &&
                            `Tipo Documento: ${document.tipo_documento.tipo_documento_nombre}`}
                          <br />
                          {`Código: ${item["documento"].docu_codigo}`}
                          <br />
                          <small>
                            {`Usuario: ${item["usuario"].usuario_nombre} ${item["usuario"].usuario_ape_paterno}`}
                            <br />
                            {`Anexo: ${item["usuario"].usuario_anexo}`}
                            <br />
                            {`Departamento: ${item["departamento"].depto_nombre}`}
                            <br />
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              </React.Fragment>
            );
          } else {
            return (
              <React.Fragment key={v4()}>
                <li
                  className="timeline-separator text-input"
                  data-datetime={`${item.estado_nombre}: ${item.estado_fecha_ingreso} Hrs`}
                ></li>
                <li>
                  <div className="timeline-badge primary mb-5">
                    <em className="fa fa-envelope-open"></em>
                  </div>
                  <div className="timeline-card">
                    <div className="popover left">
                      <h4 className="popover-header">
                        {`${item["usuario"].usuario_nombre} ${item["usuario"].usuario_ape_paterno}`}
                        {item.estado_nombre === 'TERMINADO' ? null : <span className="float-right">
                          {item.diferenciaMinutos && (
                            <Tiempo
                              meses={item.diferenciaMeses}
                              dias={item.diferenciaDias}
                              horas={item.diferenciaHoras}
                              minutos={item.diferenciaMinutos}
                            />
                          )}
                        </span>}
                      </h4>
                      <div className="arrow"></div>
                      <div className="popover-body">
                        <p>
                          {`Nombre documento: ${item["documento"].docu_nombre}`}
                          <br />
                          {`Descripción: ${item["documento"].docu_descripcion}`}
                          <br />
                          {document.tipo_documento &&
                            `Tipo Documento: ${document.tipo_documento.tipo_documento_nombre}`}
                          <br />
                          {`Código: ${item["documento"].docu_codigo}`}
                          <br />
                          <small>
                            {`Usuario: ${item["usuario"].usuario_nombre} ${item["usuario"].usuario_ape_paterno}`}
                            <br />
                            {`Anexo: ${item["usuario"].usuario_anexo}`}
                            <br />
                            {`Departamento: ${item["departamento"].depto_nombre}`}
                            <br />
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              </React.Fragment>
            );
          }
        } else {
          return (
            <React.Fragment key={v4()}>
              <li
                className="timeline-separator text-input"
                data-datetime={`${item.estado_nombre}: ${item.estado_fecha_ingreso} Hrs`}
              ></li>
              {/* START timeline item */}
              <li className="timeline-inverted">
                <div className="timeline-badge warning mb-5">
                  <em className="fa fa-envelope-open"></em>
                </div>
                <div className="timeline-card">
                  <div className="popover right">
                    <h4 className="popover-header">
                      {`${item["usuario"].usuario_nombre} ${item["usuario"].usuario_ape_paterno}`}
                      {item.estado_nombre === 'TERMINADO' ? null : <span className="float-right">
                        {item.diferenciaMinutos && (
                          <Tiempo
                            meses={item.diferenciaMeses}
                            dias={item.diferenciaDias}
                            horas={item.diferenciaHoras}
                            minutos={item.diferenciaMinutos}
                          />
                        )}
                      </span>}
                    </h4>
                    <div className="arrow"></div>
                    <div className="popover-body">
                      <p>
                        {`Nombre documento: ${item["documento"].docu_nombre}`}
                        <br />
                        {`Descripción: ${item["documento"].docu_descripcion}`}
                        <br />
                        {document.tipo_documento &&
                          `Tipo Documento: ${document.tipo_documento.tipo_documento_nombre}`}
                        <br />
                        {`Código: ${item["documento"].docu_codigo}`}
                        <br />
                        <small>
                          {`Usuario: ${item["usuario"].usuario_nombre} ${item["usuario"].usuario_ape_paterno}`}
                          <br />
                          {`Anexo: ${item["usuario"].usuario_anexo}`}
                          <br />
                          {`Departamento: ${item["departamento"].depto_nombre}`}
                          <br />
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            </React.Fragment>
          );
        }
      })}

      {/* END timeline item */}

      <li className="timeline-end">
        <a className="timeline-badge">
          <em className="fa fa-plus"></em>
        </a>
      </li>
    </ul>
  );
};

export default Historial;
