'use strict'

import Publicacion from './publicaciones.model.js'
import Usuario from '../Usuario/ususario.model.js'

export const nuevaPublicacion = async (req, res) => {
    try {
        let data = req.body
        let { id } = req.params
        data.categoria = id
        let { uid } = req.user
        data.usuario = uid
        let publi = new Publicacion(data)
        await publi.save()
        return res.send({ message: 'Publicacion subida' })

    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error en el servidor' })

    }
}

export const listar = async (req, res) => {
    try {
        let publicaciones = await Publicacion.find()
        return res.send({ message: `Miremos que dicen tus amigos:`, publicaciones })
    } catch (err) {
        console.error(err);
    }
}

export const editarPubli = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const { uid } = req.user;
        data.usuario = uid;
        const publicacion = await Publicacion.findOne({ _id: id });
        if (!publicacion) {
            return res.status(404).send({ message: 'Publicación no encontrada' });
        }
        if (publicacion.usuario.toString() !== uid) {
            return res.status(401).send({ message: 'No puedes editar la publicación porque no es tuya' });
        }
        const actualizar = await Publicacion.findOneAndUpdate({ _id: id }, data, { new: true });
        if (!actualizar) {
            return res.status(400).send({ message: 'La publicación no se actualizó' });
        }
        return res.send({ message: 'Actualizado correctamente' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error en el servidor' });
    }
}

export const eliminarPublicacion = async (req, res) => {
    try {
        const { id } = req.params;
        const { uid } = req.user;
        const publicacion = await Publicacion.findOne({ _id: id });
        if (!publicacion) {
            return res.status(404).send({ message: 'Publicacion no encontrado' });
        }
        if (publicacion.usuario.toString() !== uid) {
            return res.status(401).send({ message: 'No puedes eliminar La publicacion porque no es tuya' });
        }
        await Publicacion.findByIdAndDelete(id);
        return res.send({ message: 'Eliminado Correctamente' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error del servidor' });
    }
}