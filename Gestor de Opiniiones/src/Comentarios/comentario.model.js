import mongoose from "mongoose";

const comentarioSchema = mongoose.Schema({
    usuario:{
        type: mongoose.Schema.ObjectId,
        required: true
    },
    publicacion:{
        type: mongoose.Schema.ObjectId,
        required: true
    },
    comentario:{
        type: String,
        required: true
    }
})

export default mongoose.model('comentario', comentarioSchema)