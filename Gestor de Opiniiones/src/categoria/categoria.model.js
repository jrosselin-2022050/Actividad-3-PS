import mongoose from "mongoose";

const categoriaSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    descripcion:{
        type: String,
        required: true
    }

})

export default mongoose.model('categoria', categoriaSchema)