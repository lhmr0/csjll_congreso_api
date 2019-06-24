const mysql = require('promise-mysql')
var connection = mysql.createPool({
    host: '172.16.30.99',
    user: 'heroe',
    password: '123456',
    database: 'congreso',
    connectionLimit: 990
})
let dataModel = {}

//gets

dataModel.getUsuarios = (cb) => {
    connection.query('SELECT * FROM usuarios ORDER BY dni_usuario')
        .then(result => {
            cb(null, result)
        }).catch(err => {
            console.log(`Error generado: ${err}`)
        })
}

dataModel.getUsuarioDni = (id, cb) => {
    connection.query('SELECT * FROM usuarios WHERE dni_usuario = ?', [id])
        .then(result => {
            cb(null, result)
        }).catch(err => {
            console.log(`Error generado: ${err}`)
        })
}

//inserts

dataModel.insertUsuario = (dataUsuario, cb) => {
    connection.query("INSERT INTO usuarios SET ?", [dataUsuario])
        .then(result => {
            cb(null, {dni: dataUsuario.dni_usuario})
        }).catch(err => {
            console.log(`Error generado: ${err}`)
        })
}

hora = new Date().getDate();

dataModel.insertAsistencia = (usuario, cb) => {
    connection.query("INSERT INTO asistencias SET dni_usuario = ?, hora = ?", [usuario.dni_usuario, usuario.hora])
        .then(result => {
            cb(null, { dni: usuario.dni_usuario +' '+usuario.hora  })
        }).catch(err => {
            console.log(`Error generado: ${err}`)
        })
}

//updates

dataModel.updateUsuario = (usuario, cb) => {
    connection.query(`
    UPDATE usuarios SET
    apellido_usuario = ?,
    nombre_usuario = ?,
    perfil_usuario = ?,
    telefono_usuario = ?,
    trabajo_usuario = ?,
    correo_usuario = ?
    WHERE dni_usuario = ?
    `, [usuario.apellido_usuario,
        usuario.nombre_usuario,
        usuario.perfil_usuario,
        usuario.telefono_usuario,
        usuario.trabajo_usuario,
        usuario.correo_usuario,
        usuario.dni_usuario,
        ])
        .then(result => {
            cb(null, {
                "msg": "success estado"
            })
        }).catch(err => {
            console.log(`Error generado: ${err}`)
        })
}

//deletes

dataModel.deleteUsuario = (id, cb) => {
    connection.query("DELETE FROM usuarios WHERE dni_usuario = ?", [id])
        .then(result => {
            cb(null, { msg: "Usuario eliminado!" })
        }).catch(err => {
            console.log(`Error generado: ${err}`)
        })
}

module.exports = dataModel