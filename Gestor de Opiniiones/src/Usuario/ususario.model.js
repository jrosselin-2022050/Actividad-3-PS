import mongoose from "mongoose";

const usuarioSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    apellido:{
        type: String,
        required: true
    },
    usuario:{
        type: String,
        required: true
    },
    correo:{
        type:String,
        required: true
    },
    password:{
        type: String,
        minLength: [8,'La contraseña debe ser de 8 o mas caracteres'],
        required: true
    },

})

export default mongoose.model('usuario', usuarioSchema)