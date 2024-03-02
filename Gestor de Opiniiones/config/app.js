import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { config } from "dotenv"
import usuarioRoutes from '../src/Usuario/usuario.routes.js'
import publicacionesRoutes from '../src/Publicaciones/publicaciones.routes.js'
import categoriasRoutes from '../src/categoria/categoria.routes.js'
import comentariosRoutes from '../src/Comentarios/comentario.routes.js'

const app = express()
config()
const port = process.env.PORT || 3200

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))


app.use(usuarioRoutes)
app.use(publicacionesRoutes)
app.use(categoriasRoutes)
app.use(comentariosRoutes)

export const initServer = () => {
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}