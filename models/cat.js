
const {Schema, model} = require('mongoose');

const CatSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del gato es obligatorio']
    },
    edad: {
        type: Number,
        required: [true, 'La edad del gato es oblgatoria'],
    },
    genero: {
        type: String,
        required: [true, 'La genero del gato es oblgatoria'],
        enum: ['macho', 'hembra']
    },
    img: {
        type: String,
    },
    estado: {
        type: Boolean,
        default: true
    },
    
});

CatSchema.methods.toJSON = function() {
    //Se desectructura el objeto y se saca __v y _id, 
    //luego se hace una copia del objeto y eso es lo que se retorna
    const { __v, _id, ...cat} = this.toObject();
    cat.uid = _id;
    return cat
}


module.exports = model( 'Cat', CatSchema);