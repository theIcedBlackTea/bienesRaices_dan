import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import Propiedad from './Propiedad.js';
import Usuario from './Usuario.js';

const Propuesta = db.define('propuestas', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    propuesta: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    propiedadID: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Propiedad,
            key: 'id' //llave foránea a propiedades a través del id
        }
    },
    usuarioID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id' //llave foránea a usuario también usando el id
        }
    }
}, {
    timestamps: true
});

export default Propuesta;
