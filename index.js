import express from 'express';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';

import usuarioRoutes from './routes/usuarioRoutes.js';
import propiedadesRoutes from './routes/propiedadesRoutes.js';
import appRoutes from './routes/appRoutes.js';
import apiRoutes from './routes/apiRoutes.js';
import db from './config/db.js';

// Crear la app
const app = express();

// Habilitar lectura de datos de formularios
app.use(express.urlencoded({ extended: true }));

// Habilitar cookie Parser
app.use(cookieParser());

// Habilitar csurf
app.use(csurf({ cookie: true }));

// Habilitar pug
app.set('view engine', 'pug');
app.set('views', './views');

// Carpeta pública
app.use(express.static('public'));
app.use(express.static('assets'));

// Routing
app.use('/', appRoutes);
app.use('/auth', usuarioRoutes);
app.use('/', propiedadesRoutes);
app.use('/api', apiRoutes);

// Definir un puerto
const port = process.env.PORT||3005;

// Función para inicializar la aplicación
const startApp = async () => {
    try {
        // Conexión a la base de datos
        await db.authenticate();
        await db.sync();
        console.log('Conexión exitosa a la bd');

        // Iniciar el servidor
        app.listen(port, () => {
            console.log(`El servidor se está ejecutando en el puerto ${port}`);
        });
    } catch (error) {
        console.error('Error conectando a la base de datos:', error);
        process.exit(1); // Salir de la aplicación si la conexión falla
    }
};

// Llamar a la función para iniciar
startApp();
