'use strict'
import express from 'express'
import { editarPerfil, login, registro } from './usuario.controller.js'
import {ValidarJWT} from '../middlewates/validar-jwt.js'

const api  = express.Router()

api.post('/registro', registro)
api.post('/login',login)
api.put('/EditarPerfil/:id', [ValidarJWT], editarPerfil)

export default api