import express from 'express'
import { nuevoComentario,editarComentario, eliminarComentario, listarComent } from './comentario.controller.js'
import {ValidarJWT} from '../middlewates/validar-jwt.js'

const api = express.Router()

api.post('/NuevoComentario/:id', [ValidarJWT] ,nuevoComentario)
api.put('/EditarComentario/:id',  [ValidarJWT],editarComentario)
api.delete('/eliminarComentario/:id', [ValidarJWT], eliminarComentario)
api.get('/listarComentarios', listarComent)


export default api