const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

const listarUsuariosActivos = async(req,res) => {    
    try{
        let usuarios = await Usuario.find({estado:true})
                        .select({nombre:1,email:1})
    
        return res.status(200).json({
            success:true,
            valor:usuarios
        });

    }catch(error){
        return res.status(500).json({
            success:false,
            error:'Error interno del servidor'
        });
    }
}

const listarUsuarioPorEmail = async(req,res) => {

    
    try{

        const { email } = req.params;
        
        const usuario = await Usuario.findOne({email});

        if(!usuario){

            return res.status(404).json({
                success:false,
                msg:'No hay un usuario con ese email'
            });
        }
        return res.status(200).json({
             success:true,
             valor: {
                 _id:usuario._id,
                 nombre:usuario.nombre,
                 email:usuario.email,
                 estado:usuario.estado
             }
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            error:'Error interno del servidor'
        })
    }
}

const crearUsuario = async(req,res) => {
    let body = req.body;
    try{

        let usuario = new Usuario({
            email:body.email,
            nombre:body.nombre,
            password:bcrypt.hashSync(body.password,10)
        });

        const usuarioGuardado = await usuario.save();

        return res.status(200).json({
            success:true,
            usuario:usuarioGuardado.nombre,
            email:usuarioGuardado.email
        });

    }catch(error){
        return res.status(500).json({
            success:false,
            error:'Error interno del servidor'
        });
    }
}



module.exports = {
    listarUsuariosActivos,
    crearUsuario,
    listarUsuarioPorEmail,
}