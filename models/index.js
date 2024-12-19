import { Sequelize } from 'sequelize';
import db from '../config/db.js';
import Propiedad from './Propiedad.js';
import Precio from './Precio.js';
import Categoria from './Categoria.js';
import Usuario from './Usuario.js';
import Mensaje from './Mensaje.js';
import Respuesta from './Respuesta.js';
import Propuesta from './Propuesta.js';

Propiedad.belongsTo(Precio, { foreignKey: 'precioID' });
Propiedad.belongsTo(Categoria, { foreignKey: 'categoriaID' });
Propiedad.hasMany(Mensaje, { foreignKey: 'propiedadID' });
Propiedad.belongsTo(Usuario, { foreignKey: 'usuarioID' });
Usuario.hasMany(Propiedad, { foreignKey: 'usuarioID' });

Mensaje.belongsTo(Propiedad, { foreignKey: 'propiedadID' });
Mensaje.belongsTo(Usuario, { foreignKey: 'usuarioID' });
Mensaje.belongsTo(Propuesta, { foreignKey: 'propuestaID' }); // Nueva asociación
Mensaje.hasMany(Respuesta, { foreignKey: 'mensajeID' });

Respuesta.belongsTo(Mensaje, { foreignKey: 'mensajeID' });
Respuesta.belongsTo(Usuario, { foreignKey: 'usuarioID' });
Respuesta.belongsTo(Propiedad, { foreignKey: 'propiedadID' });

Propiedad.hasMany(Respuesta, { foreignKey: 'propiedadID' });
Usuario.hasMany(Respuesta, { foreignKey: 'usuarioID' });

Propuesta.belongsTo(Propiedad, { foreignKey: 'propiedadID' });
Propuesta.belongsTo(Usuario, { foreignKey: 'usuarioID' });

Propiedad.hasMany(Propuesta, { foreignKey: 'propiedadID' });
Usuario.hasMany(Propuesta, { foreignKey: 'usuarioID' });

export {
    Propiedad,
    Precio,
    Categoria,
    Usuario,
    Mensaje,
    Respuesta,
    Propuesta
};
