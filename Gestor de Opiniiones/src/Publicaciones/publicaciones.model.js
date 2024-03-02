import mongoose from "mongoose";

const publicacionsSchema = mongoose.Schema({
    usuario:{
        type: mongoose.Schema.ObjectId,
        required: true
    },
    titulo:{
        type: String,
        required: true
    },
    categoria:{
        type:mongoose.Schema.ObjectId,
        required: false
    },
    descripcion:{
        type: String,
        required:true
    }

})

export default mongoose.model('publicacion', publicacionsSchema)