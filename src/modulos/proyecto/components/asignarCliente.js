import React from 'react';
import AutoComplete from './autoComplete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';



// CSS
import './styles.css';
import 'sweetalert2/src/sweetalert2.scss'



// COMPONENTES
import CardCliente from './cardCliente';



const AsignarCliente = ({cliente, setCliente, clientes}) => { 

    if (Object.keys(clientes).length === 0) return <div className="padre">
        <div className='whirl double-up hijo'></div>
    </div>;
    return (
        <React.Fragment>            
            <div className="row">
                <div className="col text-center">
                    <h2>Datos del Cliente</h2>
                    <p>Busca un cliente y asocialo al proyecto.</p>
                    <div className="d-flex justify-content-center mb-3">
                        <div className="search-bar-container">
                            <AutoComplete
                                data={clientes}
                                onSelect={cliente => setCliente(cliente)}
                            />
                            <FontAwesomeIcon
                                icon={faSearch}
                                className="search-bar-icon"
                            />
                        </div>
                    </div>
                    {cliente && (
                        <div>
                            <CardCliente
                                clienteData={cliente}
                            />
                        </div>
                    )}
                </div>
            </div>            
        </React.Fragment>
    );
}

export default AsignarCliente;