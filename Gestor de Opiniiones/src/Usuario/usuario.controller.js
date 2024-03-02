'use strict'

import Usuario from './ususario.model.js'
import { encriptar, verContra, verActualizacion } from '../util/validaciones.js'
import { generarJWT } from '../util/jwt.js'



export const registro = async (req, res)=>{
    try{
        let data = req.body
        data.password = await encriptar(data.password)
        let registro = new Usuario(data)
        await registro.save()
        return res.status(200).send({message:'Registrado correctamente'})
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error en el servidor'})
    }
}

export const login = async(req, res)=>{
    try{
        let {usuario, correo, password} = req.body
        let login = await Usuario.findOne( {$or: [{ usuario: usuario}, {correo: correo }]}  )
        if(login && await verContra(password, login.password)){
            let ingreso = {
                uid: login._id,
                usuario: login.usuario,
                correo: login.correo,
                nombre: login.nombre,
               
            }
            let token = await generarJWT(ingreso)

            return res.send({message:`Bienvenido a KinalBook ${login.usuario}`, ingreso, token})
        }
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error en el servidor'})
    }
}

export const editarPerfil = async (req,res)=>{
    try{
        let {id} = req.params
        let data = req.body
        let {uid} = req.user
        if(id != uid) return res.status(401).send({message:'no puedes editar este perfil porque no es tuyo'})
        let editar = verActualizacion(data, id)
        if(!editar) return res.status(400).send({message: 'Haz colocado algunos datos que no se pueden actualizar'})

        let editarUsuario = await Usuario.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )

        if(!editarUsuario) return res.status(401).send({message:'El perfil no se puede editar correctamente'})
        return res.send({message: 'Perfil actualizado', editarUsuario})


    }catch(err){
        console.error(err);
        if (err.keyValue.username) return res.status(400).send({ message: `El nombre de usuario:  ${err.keyValue.usuario} Ya esta tomado` })
        return res.status(500).send({ message: 'Error al actualizar' })
  
    }
}

