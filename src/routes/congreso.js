const Query = require('../models/Qcongreso')

module.exports = function (app) {

    app.get('/', (req, res) => {
        res.send("CONGRESO")
    })

    //usuarios

    app.get('/usuarios', (req, res) => {

        Query.getUsuarios((err, data) => {
            res.status(200).json(data)
        })
    })

    //usuario:id
    app.get('/usuario/:id', (req, res) => {
        const id = req.params.id
        Query.getUsuarioDni(id, (err, data) => {
            if (data.length == 0) {
                res.status(200).json({
                    msg: "El usuario no existe"
                })
            } else {
                res.status(200).json(data)
            }
        })
    })

    //usuario nuevo
    app.post('/usuario', (req, res) => {
        const usuario = {
            dni_usuario: req.body.dni,
            apellido_usuario: req.body.apellido,
            nombre_usuario: req.body.nombre,
            perfil_usuario: req.body.perfil,
            telefono_usuario: req.body.telefono,
            trabajo_usuario: req.body.trabajo,
            correo_usuario: req.body.correo            
        }

        Query.insertUsuario(usuario, (err, data) => {
            if (data) {
                console.log(data)
                res.status(200).json({
                    success: true,                    
                    msg: 'Usuario registrado con el DNI:' + data.dni,
                })
            } else {
                res.status(500).json({
                    success: false,
                    msg: "ERROR! No se pudo registrar al usuario" + data
                })
            }
        })

    })

    //asistencia
    d = new Date();
    h = d.getHours();
    m = d.getMinutes();
    s = d.getSeconds();
    dia = new Date().getDate();

    app.post('/asistencia', (req, res) => {
        const usuario = {
            dni_usuario: req.body.dni,
            hora: req.body.hora,
        }

        Query.insertAsistencia(usuario, (err, data) => {
            if (data) {
                console.log(data)
                res.status(200).json({
                    success: true,
                    msg: 'Asistencia registrada del usuario con DNI:' + data.dni + ' a las '+ h + ':' + m + " del " + dia + '/06/19',
                })
            } else {
                res.status(500).json({
                    success: false,
                    msg: "ERROR! No se pudo registrar la asistencia"
                })
            }
        })

    })

    //update usuario
    app.put('/usuario/:id',(req,res)=>{
        const user = {
            dni_usuario: req.body.dni,
            apellido_usuario: req.body.apellido,
            nombre_usuario: req.body.nombre,
            perfil_usuario: req.body.perfil,
            telefono_usuario: req.body.telefono,
            trabajo_usuario: req.body.trabajo,
            correo_usuario: req.body.correo   
        }
    
        Query.updateUsuario(user,(err,data)=>{
            if(data && data.msg){
                res.status(200).json({data}),
                console.log(data)
            }else{
                res.status(500).json({
                    success:false,
                    msg:"Error"
                })
            }
        })
    })

    //delete usuario
    app.delete('/usuario/:id', (req, res) => {
        const id = req.params.id
        Query.deleteUsuario(id, (err, data) => {
            if (data) {
                res.status(200).json({
                    success: 'true',
                    data
                })
            } else {
                res.status(500).json({
                    msg: 'error'
                })
            }
        })
    })

}

