'use strict'

import Categoria from './categoria.model.js'

export const nueva = async(req, res)=>{
    try{
        let data = req.body
        let categoria = new Categoria(data)
        await categoria.save()
        return res.send({message:'Categoria Guardada'})
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error en el servidor'})
    }
}

export const listar = async(req, res) =>{
    try{
        let categorias = await Categoria.find()
        return res.send({message: 'Aqui estan todas las caregorias', categorias})
    }catch(err){
        console.error(err);
        return res.status(500).send({message:'Error en el servidor'})
    }
}

export const  eliminar = async (req, res)=>{
    try{
        let { id } = req.params
        let eliminar = await Categoria.findOneAndDelete({_id: id})
        if(!eliminar) return res.status(404).send({message: 'Categoria no encontrada'})
        return res.send({message: 'Categoria elimimnada correctameente'})
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error en el servidor'})
    }
}