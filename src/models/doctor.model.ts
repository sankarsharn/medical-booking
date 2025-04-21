import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    degree:{
        type:String,
        required:true
    },
    specialization:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    experience:{
        type:Number,
        required:true
    },
    license:{
        type:String,
        required:true
    },
    category:{
        type:Number,
        default: 0,
    }
} , {timestamps:true});

export default mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema);