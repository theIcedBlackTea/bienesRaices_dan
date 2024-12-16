import { Propiedad, Precio, Categoria } from "../models/index.js";

const propiedades = async (req, res) => {
   
    const { tipo } = req.query;

    const where = {};
    if (tipo) {
        where.tipo = tipo; 
    }

    const propiedades = await Propiedad.findAll({
        where, 
        include: [
            { model: Precio, as: 'precio' },
            { model: Categoria, as: 'categoria' }
        ]
    });

    res.json(propiedades);
};

export {
    propiedades
};
