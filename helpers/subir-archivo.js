const path = require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivo = ( files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '' ) => {

    return new Promise((resolve, reject) => {

        const { archivo } = files;

        //Validación de las extensiones del archivo
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];


        if (!extensionesValidas.includes(extension)) {
            return reject(`La extensión ${extension} no es permitida, extensiones permitidas: ${extensionesValidas}`);

        }

        //Nombre temporal para identificar el nombre de las imagenes
        const nombreTemp = uuidv4() + '.' + extension;

        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }

            resolve( nombreTemp );
        });
    })

}


module.exports = {
    subirArchivo
}