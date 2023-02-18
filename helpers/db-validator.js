const Cat = require('../models/cat');

const existeCatPorId = async (  id ) => {
    const existeCat = await Cat.findById(id);
    if( !existeCat ){
        throw new Error(`El id no existe: ${id}`);
    }
}

module.exports = {
    existeCatPorId
}