'use strict'
import jwt from 'jsonwebtoken'
import Usuario from '../Usuario/ususario.model.js'

export const ValidarJWT = async (req, res, next) => {
    try {
        let secreteKey = process.env.SECRET_KEY
        let { token } = req.headers
        if (!token) return res.status(401).send({ message: 'No Autorizado' })
        let { uid } = jwt.verify(token, secreteKey)
        let user = await Usuario.findOne({ _id: uid })
        if (!user) return res.status(404).send({ message: 'Usuario no encontrado' })
        req.user = user
        req.user.uid = uid
        next()
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'a' })
    }
}

