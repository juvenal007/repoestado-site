import React, { useState, useEffect } from 'react';
import { Badge } from 'reactstrap';

const Estado = ({ estado }) => {


    const [color, setColor] = useState('');

    useEffect(() => {
        switch (estado) {
            case 'ENVIADO':
                setColor('info')
                break;
            case 'EN PROCESO':
                setColor('warning')
                break;
            case 'TERMINADO':
                setColor('success')
                break;
            default:
                setColor('primary');
                break;
        }
    }, [estado]);

    return (
        <Badge className="float-center" color={color}>{estado}</Badge>
    );

}

export default Estado;