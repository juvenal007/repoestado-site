import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = props => (
    <div className="abs-center wd-xl">
        <div className="text-center mb-4">
            <div className="text-lg mb-3">404</div>
            <p className="lead m-0">Pagina no Existe.</p>
            <p>o puede que no tengas acceso a este sitio.</p>
        </div>       
        <ul className="list-inline text-center text-sm mb-4">
            <li className="list-inline-item">
                <Link to="/home-principal" className="text-muted"><h2> VOLVER A INICIO</h2></Link>
            </li>          
        </ul>
        <div className="p-3 text-center">
            <span className="mr-2">&copy;</span>
            <span>2020</span>
            <span className="mx-2">-</span>
            <span>RepoEstado V0.2</span>
            <br/>
            <span>Ilustre Municipalidad de Pencahue.</span>
        </div>
    </div>
)

export default NotFound;

