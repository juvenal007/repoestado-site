import React, { useState, useEffect } from 'react';
import ContentWrapper from '../../_layout/ContentWrapper';
import SmartTableProyecto from '../../_framework/_helpers/smart-table/table/SmartTableProyecto';
import config from './config';
import getApi from '../../utils/api/index';




const Proyecto = (props) => {

    const [idCentroCosto] = useState(props.match.params.id);
    const [centroCosto, setCentroCosto] = useState('');

    useEffect(() => {
        const getCentrodeCostos = async () => {
            const url = `/centro-costo/details/${idCentroCosto}`;
            getApi(url, 'GET', null, (status, data, message) => {
                console.log(status, data, message);
                if (!status) {
                    return console.log(message);
                }
                setCentroCosto(data[0]);
                console.log(data);
            });
        }
        getCentrodeCostos();
    }, []);

    const { nombre, direccion } = centroCosto;


    // PARA HACER UNA MUTACIÓN DENTRO DE UN HOOK, DEBEMOS DECLARAR UNA ARROW FUNCTION
    // LUEGO REALIZAR LA MUTACIÓN CON LOS DATOS ANTERIORES Y MODIFICAR 
    // LO QUE QUERAMOS, EN ESTE CASO EL PATH DE LA URL   

    const [add_btn] = useState(() => {
        const state = {
            ...config.add_btn,
            path: `${config.add_btn.path}/${props.match.params.id}`
        }
        return state;
    });
    const [idUrl] = useState(props.match.params.id);

    const clickReturn = () => {
        props.history.push(`/administracion/centro-costo`);
    }

    if (Object.keys(centroCosto).length === 0) return <div className="page-loader padre">
        <div className='whirl double-up hijo'></div>
    </div>;

    return (
        <ContentWrapper>
            <div className="content-heading">
                <div>Proyectos del Centro de Costos: {nombre}</div>
                <div className="ml-auto">
                    <button className={"btn btn-info"} onClick={() => clickReturn()}>Regresar</button>
                </div>
            </div>

            <SmartTableProyecto
                dtColumns={config.columns}git sta
                edit_btn={config.edit_btn}
                delete_btn={config.delete_btn}
                add_btn={add_btn}
                list_data={config.list + idUrl} // url con la data
                actions_custom={config.actions_custom} // ASIGNAR CLIENTE
                pk_key="id" // pk de las lineas
                model_p="Proyectos" // titulo grilla
                model_s="Proyecto" // titulo form
            />
        </ContentWrapper>
    );
}

export default Proyecto;