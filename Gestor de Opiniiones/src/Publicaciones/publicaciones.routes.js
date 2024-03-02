'use strict'

import express  from 'express'
import { listar, nuevaPublicacion,  editarPubli, eliminarPublicacion } from './publicaciones.controller.js'
import { ValidarJWT } from '../middlewates/validar-jwt.js'

const api = express.Router()

api.post('/NuevaPublicacion/:id', [ValidarJWT],  nuevaPublicacion)

api.get('/VerPublicaviones', listar)

api.put('/editarPublicacion/:id', [ValidarJWT], editarPubli)

api.delete('/eliminarPublicacion/:id',[ValidarJWT],eliminarPublicacion)

export default api

