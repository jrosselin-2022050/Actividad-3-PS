import Comentario from './comentario.model.js'


export const nuevoComentario = async (req, res) => {
    try {
        let data = req.body
        let { id } = req.params
        data.publicacion = id
        let { uid } = req.user
        data.usuario = uid

        let coment = new Comentario(data)
        await coment.save()
        return res.send({ message: 'Comentario subido' })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error en el servidor' })
    }
}

export const editarComentario = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let { uid } = req.user
        data.usuario = uid
        let comentario = Comentario.findOne({ _id: id })
        if (comentario.usuario != uid) return res.status(401).send({ message: 'No puedes editar el comentario porque non es tuyo' })
        let editar = await Comentario.findOneAndUpdate({ _id: id }, data, { new: true })
        if (!editar) return res.status(408).send({ message: 'No se pudo actualizar correctamente' })
        return res.send({ message: 'editado correctamente' })
    } catch (err) {
        console.error(err);
    }
}

export const eliminarComentario = async (req, res) => {
    try {
        const { id } = req.params;
        const { uid } = req.user;
        const comentario = await Comentario.findOne({ _id: id });
        if (!comentario) {
            return res.status(404).send({ message: 'Comentario no encontrado' });
        }
        if (comentario.usuario.toString() !== uid) {
            return res.status(401).send({ message: 'No puedes eliminar el comentario porque no es tuyo' });
        }
        await Comentario.findByIdAndDelete(id);
        return res.send({ message: 'Eliminado Correctamente' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error en el servidor' });
    }
}

export const listarComent = async(req, res)=>{
    try{
        try {
            let coments = await Comentario.find()
            return res.send({ message: `Miremos que dicen tus amigos:`, coments })
        } catch (err) {
            console.error(err);
        }
    }catch(err){
        console.error(err);
    }
}