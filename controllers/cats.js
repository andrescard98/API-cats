const { request, response } = require('express');

const Cat = require('../models/cat');


const catsGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;

    const query = { estado: true };

    if (isNaN(limite)) {
        return res.json({
            msg: "El limite no es un numero"
        })
    }

    if (isNaN(desde)) {
        return res.json({
            msg: "Desde donde comienza el paremetro no es un numero"
        })
    }
    /* const cats = await Cat.find(query)
        .skip(Number(desde))
        .limit(Number(limite))

    const total = await Cat.countDocuments(query); */

    const [total, cats] = await Promise.all([
        //promesa para contar los gatos
        Cat.countDocuments(query),
        //promesa para los parametros de la request
        Cat.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        cats
    })

};

const catsPut = async (req, res = response) => {
    const {id} = req.params;

    const{ _id, ...resto } = req.body;

    const cat = await Cat.findByIdAndUpdate( id, resto );

    res.json(cat)

}

const catsPost = async (req = request, res = response) => {
    /* console.log({
        body: req.body
    }); */
    const { nombre, edad, genero, img } = req.body;
    const cat = new Cat({ nombre, edad, genero, img });

    //Guardar en DB
    await cat.save();

    res.json({
        cat
    });
};

const catsDelete = async (req = request, res = response) => {
    const {id} = req.params;

    const cat = await Cat.findByIdAndUpdate(id, {estado: false});

    res.json( cat );

}


module.exports = {
    catsGet,
    catsPost,
    catsPut,
    catsDelete
}