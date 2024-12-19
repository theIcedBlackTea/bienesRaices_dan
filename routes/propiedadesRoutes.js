import express from 'express';
import { body } from 'express-validator';
import { admin, crear, guardar, agregarImagen, almacenarImagen, editar, guardarCambios, eliminar, mostrarPropiedad, enviarMensaje, verMensajes, cambiarEstado, responderMensaje, obtenerConversaciones } from '../controllers/propiedadesController.js';
import protegerRuta from '../middleware/protegerRuta.js';
import upload from '../middleware/subirImagen.js';
import identificarUsuario from '../middleware/identificarUsuario.js';

const router = express.Router();

router.get('/mis-propiedades', protegerRuta, admin);
router.get('/propiedades/crear', protegerRuta, crear);
router.post('/propiedades/crear', protegerRuta,
    body('titulo').notEmpty().withMessage('El Título del Anuncio es Obligatorio'),
    body('descripcion')
        .notEmpty().withMessage('La Descripción no puede ir vacia')
        .isLength({ max: 200 }).withMessage('La descripcion es muy larga'),
    body('categoria').isNumeric().withMessage('Selecciona una categoria'),
    body('precio').isNumeric().withMessage('Selecciona un rango de precio'),
    body('habitaciones').isNumeric().withMessage('Selecciona la cantidad de habitaciones'),
    body('estacionamiento').isNumeric().withMessage('Selecciona la cantidad de estacionamientos'),
    body('wc').isNumeric().withMessage('Selecciona la cantidad de wc'),
    body('tipo')
    .notEmpty().withMessage('Selecciona si la propiedad es en venta o renta')
    .isIn(['venta', 'renta']).withMessage('El tipo de propiedad no es válido'),
guardar);

router.get('/propiedades/agregar-imagen/:id',
    protegerRuta,
    agregarImagen
);

router.post('/propiedades/agregar-imagen/:id',
    protegerRuta,
    upload.single('imagen'),
    almacenarImagen
);

router.get('/propiedades/editar/:id',
    protegerRuta,
    editar
);

router.post('/propiedades/editar/:id',
    protegerRuta,
    body('titulo').notEmpty().withMessage('El Título del Anuncio es Obligatorio'),
    body('descripcion')
        .notEmpty().withMessage('La Descripción no puede ir vacia')
        .isLength({ max: 200 }).withMessage('La descripcion es muy larga'),
    body('categoria').isNumeric().withMessage('Selecciona una categoria'),
    body('precio').isNumeric().withMessage('Selecciona un rango de precio'),
    body('habitaciones').isNumeric().withMessage('Selecciona la cantidad de habitaciones'),
    body('estacionamiento').isNumeric().withMessage('Selecciona la cantidad de estacionamientos'),
    body('wc').isNumeric().withMessage('Selecciona la cantidad de wc'),
    body('lat').notEmpty().withMessage('Ubica la propiedad en el mapa'),
    guardarCambios
);

router.post('/propiedades/eliminar/:id',
    protegerRuta,
    eliminar
);

router.put('/propiedades/:id',
    protegerRuta,
    cambiarEstado
);

//? Area publica
router.get('/propiedad/:id',
    identificarUsuario,
    mostrarPropiedad
);

//? Almacenar los mensajes y propuestas
router.post('/propiedad/:id', 
    identificarUsuario,
    body('mensaje').isLength({ min: 10 }).withMessage('El Mensaje no puede ir vacio o es muy corto'),
    body('propuesta').optional().isNumeric().withMessage('La propuesta debe ser un número'),
    enviarMensaje
);

//? Ver los mensajes
router.get('/mensajes/:id',
    protegerRuta,
    verMensajes
);

//? Responder a los mensajes
router.post('/mensajes/responder/:id',
    protegerRuta,
    responderMensaje
);

//? Ver mis conversaciones
router.get('/mis-conversaciones',
    protegerRuta,
    obtenerConversaciones
);

export default router;
