import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import Propuesta from './Propuesta.js';

const Mensaje = db.define('mensajes', {
    mensaje: {
        type: DataTypes.STRING(200),
        allowNull: true // Permitir que el mensaje sea nulo
    },
    propuestaID: {
        type: DataTypes.UUID,
        allowNull: true, // Permitir que la propuestaID sea nula
        references: {
            model: Propuesta,
            key: 'id'
        }
    }
}, {
    timestamps: true
});

export default Mensaje;
