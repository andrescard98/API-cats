const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL);

const { response, request } = require("express");
const { subirArchivo } = require("../helpers/subir-archivo");
const Cat = require('../models/cat');

const cargarArchivo = async (req, res = response) => {

    try {
        //Imagenes
        const nombre = await subirArchivo(req.files, undefined, 'imgs');
        res.json({ nombre });

    } catch (msg) {
        res.status(400).json({ msg });
    }

}

const actualizarImagen = async (req = request, res = response) => {

    const { id } = req.params;

    let modelo;

    modelo = await Cat.findById(id);

    try {
        if(!modelo) {
            return res.status(400).json({
                msg: `No existe un gato con el id ${id}`
            });
        }
    } catch (error) {
        return res.status(400).json({msg:'No existe un gato con el id'});
    }


    //Limpiar imágenes previas
    if ( modelo.img ){
        //Hay que borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', 'imgs', modelo.img);
        if( fs.existsSync(pathImagen)){
            fs.unlinkSync(pathImagen);
        }
    }


    const nombre = await subirArchivo(req.files, undefined, 'imgs');
    modelo.img = nombre;

    await modelo.save();

    res.json({modelo});
}

const actualizarImagenCloudinary = async (req = request, res = response) => {

    const { id } = req.params;

    let modelo;

    modelo = await Cat.findById(id);

    try {
        if(!modelo) {
            return res.status(400).json({
                msg: `No existe un gato con el id ${id}`
            });
        }
    } catch (error) {
        return res.status(400).json({msg:'No existe un gato con el id'});
    }


    //Limpiar imágenes previas
    if ( modelo.img ){
        //Extraer el array de cloudinary
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const [ public_id ] = nombre.split('.');

        //Borrar imagenes de Cloudinary
        cloudinary.uploader.destroy(public_id);
    }

    const { tempFilePath } = req.files.archivo
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);


    modelo.img = secure_url;

    await modelo.save();

    res.json(modelo);
}

const mostrarImagen = async (req, res = response) => {

    const { id } = req.params;

    let modelo;

    modelo = await Cat.findById(id);

    try {
        if(!modelo) {
            return res.status(400).json({
                msg: `No existe un gato con el id ${id}`
            });
        }
    } catch (error) {
        return res.status(400).json({msg:'No existe un gato con el id'});
    }


    //Limpiar imágenes previas
    if ( modelo.img ){
        //Hay que borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', 'imgs', modelo.img);
        if( fs.existsSync(pathImagen)){
            return res.sendFile(pathImagen);
        }
    } 

    const pathImagenNotFound = path.join(__dirname, '../assets/no-image.jpg');
    
    res.sendFile(pathImagenNotFound);
}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary
}