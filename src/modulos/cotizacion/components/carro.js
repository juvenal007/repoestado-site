import React from 'react';


//COMPONENTES
import CarroItem from './carroItem';


const Carro = ({ carro ,setCarro }) => {

    // STATES DEL COMPONENTE 

    return (

        <div className='col-12'>
            <div className="card mt-0 mb-0">            
                <div className="card-body">
                    <div className='row'>
                        {carro.length === 0
                            ?
                            (
                                <React.Fragment>
                                    <div className='col-12'>
                                        <center>Sin Productos</center>
                                    </div>
                                </React.Fragment>
                            )
                            :
                            (
                                carro.map((producto, index) => {
                                    return (
                                        <div className='col-12'
                                        key={index}>
                                        <CarroItem
                                            key={index+'carro'}
                                            producto={producto}
                                            setCarro={setCarro}
                                            carro={carro}
                                        />
                                        </div>
                                    )
                                })
                            )
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Carro;