
import React, { useState } from 'react';
import { Badge } from 'reactstrap';

const Tiempo = ({ meses, dias, horas, minutos }) => {

    const [mesesTiempo] = useState(meses);
    const [diasTiempo] = useState(dias);
    const [horasTiempo] = useState(horas);
    const [minutosTiempo] = useState(minutos);

    const tiempoRestante = () => {
        if (mesesTiempo === 0) {
            if (diasTiempo == 0 ) {
                return (
                    <Badge className="float-center" color='primary'>{horasTiempo>1?horasTiempo+' Horas':horasTiempo+' Hora'}, {minutosTiempo>1?minutosTiempo+' Minutos':minutosTiempo+' Minuto'}</Badge>
                );
            } else {
                return (
                    <Badge className="float-center" color='primary'>{diasTiempo>1?diasTiempo+' Días':diasTiempo+' Día'}, {horasTiempo>1?horasTiempo+' Horas':horasTiempo+' Hora'}, {minutosTiempo>1?minutosTiempo+' Minutos':minutosTiempo+' Minuto'}</Badge>
                )               
            }
        } else {
            if (diasTiempo == 0) {
                return (
                    <Badge className="float-center" color='primary'>{mesesTiempo>1?mesesTiempo+' Meses':mesesTiempo+' Mes'}, {horasTiempo>1?horasTiempo+' Horas':horasTiempo+' Hora'}, {minutosTiempo>1?minutosTiempo+' Minutos':minutosTiempo+' Minuto'}</Badge>
                );
            } else {
                return (
                    <Badge className="float-center" color='primary'>{mesesTiempo>1?mesesTiempo+' Meses':mesesTiempo+' Mes'}, {diasTiempo>1?diasTiempo+' Días':diasTiempo+' Día'}, {horasTiempo>1?horasTiempo+' Horas':horasTiempo+' Hora'}, {minutosTiempo>1?minutosTiempo+' Minutos':minutosTiempo+' Minuto'}</Badge>
                )              
            }
        }
    }
    return (
        <div>
            {
                tiempoRestante()
            }
        </div>
    );
}

export default Tiempo;