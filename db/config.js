const mongoose = require('mongoose');
mongoose.set("strictQuery", false); //quitar DeprecationWarning


const dbConnection = async () => {
    try {

        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Base de datos online')
        
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos')
    }
}

/* mongoose.connect(process.env.MONGODB_CNN)
    .then(()=>{console.log('Base de datos online')})
    .catch(()=>{console.log('Error en la base de datos')}) */
module.exports = {
    dbConnection
}