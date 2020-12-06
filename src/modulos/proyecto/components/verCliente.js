import React, { useState, useEffect } from 'react';
import ContentWrapper from '../../../_layout/ContentWrapper';
import getApi from '../../../utils/api/index';

// CSS
import './styles.css';
import 'sweetalert2/src/sweetalert2.scss'


// COMPONENTES
import CardCliente from './cardCliente';

const VerCliente = (props) => {

    const [cargando, setCargando] = useState(true);
    const [idProyecto] = useState(props.match.params.id);
    const [proyecto, setProyecto] = useState('');
    const [cliente, setCliente] = useState("");
    const [centroCostoId, setCentroCostoId] = useState('');


    useEffect(() => {
        const getDatosCliente = async () => {
            const url = `cliente/proyecto_details/${idProyecto}`;
            getApi(url, 'GET', null, (status, data, message) => {
                console.log(status, data, message);
                if (!status) {
                    return console.log(message);
                }
                console.log('RESULTADOS DE LA DATA:' + JSON.stringify(data[0]));
                //LEER JSON DENTRO DE EL NIVEL CLIENTE
                setCliente(data[0]['cliente']);
                setCentroCostoId(data[0]['centro_costos'].id);
                setProyecto(data[0]);
            });
        }
        getDatosCliente();
    }, []);

    const clickReturn = () => {
        props.history.push(`/administracion/centro-costos/proyecto/${centroCostoId}`);
    }



    if (Object.keys(centroCosto).length === 0) return <div className="page-loader padre">
        <div className='whirl double-up hijo'></div>
    </div>;
    return (
        <ContentWrapper >
            <div className="content-heading">
                <div>{`Nombre Proyecto: ${proyecto.nombre} - Estado: En Proceso`}</div>
                <div className="ml-auto">
                    <button className={"btn btn-info"} onClick={() => clickReturn()}>Regresar</button>
                </div>
            </div>

            <div className="row">
                <div className="col text-center">
                    <h2>{`Proyecto: ${proyecto.nombre}`}</h2>
                    <p>{`${proyecto.direccion}`}</p>
                    <div>
                        <CardCliente
                            clienteData={cliente}
                        />
                    </div>

                </div>
            </div>

        </ContentWrapper>

    );
}

export default VerCliente;