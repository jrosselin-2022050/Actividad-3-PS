import express from 'express'
import {eliminar, listar, nueva } from './categoria.controller.js'

const api = express.Router()

api.post('/nuevaCategoria', nueva)
api.get('/verCategorias', listar)
api.delete('/eliminarCategoria/:id', eliminar)

export default api