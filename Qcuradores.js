const mysql = require('promise-mysql')


//Connexion a la base de datos
//---------------------------------------------


var connection = mysql.createPool({
   host: '172.41.59.8',
   user: 'heroe',
   password: '123456',
   database: 'curador',
   connectionLimit: 990
})


let dataModel = {}

//mostrar todos los curadores
dataModel.getCuradores = (cb) => {
    connection.query('SELECT * FROM curador ORDER BY id_curador DESC')
        .then(result => {
            cb(null, result)
        }).catch(err => {
            console.log(`Error generado: ${err}`)
        })
}

dataModel.getJuzgado = (cb) => {
    connection.query(
        `  SELECT * from juzgado
            ORDER BY id_juzgado
             `)
        .then(r1 => {
            cb(null, r1)
        }).catch(err => {
            console.log(`Error generado: ${err}`)
        })
}


dataModel.getJuzgadoLaboral = (cb) => {
    connection.query(
        `  SELECT * from juzgado WHERE esp_juzgado=3
            ORDER BY id_juzgado            
             `)
        .then(r1 => {
            cb(null, r1)
        }).catch(err => {
            console.log(`Error generado: ${err}`)
        })
}

dataModel.getJuzgadoID = (id, cb) => {
    connection.query('SELECT * from juzgado WHERE id_juzgado=?', [id])
        .then( result => {
            cb(null, result)
        }).catch(err => {
            console.log(`Error generado: ${err}`)
        })
}
//mostrar  curadores disponibles
dataModel.getCuradoresDisponibles = (cb) => {
    connection.query("SELECT * FROM curador WHERE estado = 'D' && actividad='A'")
        .then(result => {
            cb(null, result)
        }).catch(err => {
            console.log(`Error generado: ${err}`)
        })
}

//insert Curador
dataModel.insertCurador = (dataCurador, cb) => {
    connection.query("INSERT INTO curador SET ?", [dataCurador])
        .then(result => {
            cb(null, { insertId: result.insertId })
        }).catch(err => {
            console.log(`Error generado: ${err}`)
        })
}


//UPDATE STATE CURADOR
dataModel.updateCurador = (curador, cb) => {
    connection.query(`
    UPDATE curador SET
    estado = ?
    WHERE id_curador = ?
    `, [curador.estado,
        curador.id
        ])
        .then(result => {
            cb(null, {
                "msg": "success estado"
            })
        }).catch(err => {
            console.log(`Error generado: ${err}`)
        })
}

dataModel.updateCuradorT = (user, cb) => {
    connection.query(`
    UPDATE curador SET
    nombre = ?,
    apellido = ?,
    dni = ?,
    direccion = ?,
    email = ?,
    codigo_cal = ?,
    actividad = ?,
    conadis = ?
    WHERE id_curador = ?
    `, [user.nombre,
        user.apellido,
        user.dni,
        user.direccion,
        user.email,
        user.codigo_cal,
        user.actividad,
        user.conadis,
        user.id_curador])
        .then(result => {
            cb(null, {
                "msg": "success"
            })
        }).catch(err => {
            console.log(`Error generado: ${err}`)
        })
}

dataModel.getCurador = (id, cb) => {
    connection.query(`SELECT * FROM curador WHERE id_curador = ?`, [id])
        .then(result => {
            cb(null, result)
        }).catch(err => {
            console.log(`Error generado: ${err}`)
        })
}

dataModel.getCuradorEsp = (id, cb) => {
    connection.query(`SELECT * FROM curador_especialidad c INNER JOIN especialidad e  ON c.id_especialidad = e.id_especialidad WHERE id_curador=?`, [id])
        .then(result => {
            cb(null, result)
        }).catch(err => {
            console.log(`Error generado: ${err}`)
        })
}

dataModel.deleteCurador = (id, cb) => {
    connection.query("DELETE FROM curador WHERE id_curador = ?", [id])
        .then(result => {
            cb(null, { msg: "curador eliminado" })
        }).catch(err => {
            console.log(`Error generado: ${err}`)
        })
}

//------------------------------
//registrar usuario
dataModel.insertUser = (dataUser, cb) => {
    connection.query("INSERT INTO usuario SET ?", [dataUser])
        .then(result => {
            cb(null, { insertId: result.insertId })
        }).catch(err => {
            console.log(`Error generado: ${err}`)
        })
}

//mostrar usuarios
dataModel.getUsers = (cb) => {
    connection.query('SELECT * FROM usuario  ORDER BY id_usuario DESC')
        .then(result => {
            cb(null, result)
        }).catch(err => {
            console.log(`Error generado: ${err}`)
        })
}

dataModel.verifica = (user, cb) => {
    connection.query(
        `SELECT id_usuario,nombre,apellido,estado,privilegio,juzgado,especialidad FROM usuario 
        WHERE usuario=? AND password=?`
        , [user.usuario, user.password])
        .then(result => {
            if (result.length == 0) {
                cb(null, {
                    success: false,
                })
            } else {
                cb(null, {
                    success: true,
                    result
                })
            }

        }).catch(err => {
            console.log(`Error generado: ${err}`)
        })

}

//---------------
//Update Usuarios
dataModel.updateUser = (user, cb) => {
    connection.query(`
    UPDATE usuario SET
    usuario = ?,
    password = ?,
    nombre = ?,
    apellido = ?,
    privilegio = ?,
    estado = ?,
    juzgado = ?,
    especialidad = ?
    WHERE id_usuario = ?
    `, [user.usuario,
        user.password,
        user.nombre,
        user.apellido,
        user.privilegio,
        user.estado,
        user.juzgado,
        user.especialidad,
        user.id])
        .then(result => {
            cb(null, {
                "msg": "success"
            })
        }).catch(err => {
            console.log(`Error generado: ${err}`)
        })
}

//get one usuario 

dataModel.getUser = (id, cb) => {
    connection.query(`SELECT * FROM usuario WHERE id_usuario = ? `, [id])
        .then(result => {
            cb(null, result)
        }).catch(err => {
            console.log(`Error generado: ${err}`)
        })
}

//get Especialidades

dataModel.getEspecialidades = (cb) => {
    connection.query('SELECT * FROM especialidad')
        .then( result => {
            cb(null, result)
        }).catch(err => {
            console.log(`Error generado: ${err}`)
        })
}

//-------------------------------------------
//ASIGNACION DE CURADOR


dataModel.getAsignaciones = (cb) => {
    connection.query('SELECT id_asignacion, desc_juzgado, numExpediente, desc_especialidad, especialidad_id, nombre, apellido, direccion, dni, email, codigo_cal, iteracion, secretario FROM asignacion_curador a INNER JOIN juzgado j ON a.juzgado_id = j.id_juzgado INNER JOIN curador r ON a.curador_id = r.id_curador INNER JOIN especialidad e ON a.especialidad_id = e.id_especialidad ORDER BY id_asignacion DESC')
        .then( result => {
            cb(null, result)
        }).catch(err => {
            console.log(`Error generado: ${err}`)
        })
}

dataModel.getAsignacionesJuz = (id, cb) => {
    connection.query('SELECT id_asignacion, desc_juzgado, numExpediente, desc_especialidad, nombre, apellido, direccion, dni,  email, codigo_cal, iteracion, secretario FROM asignacion_curador a INNER JOIN juzgado j ON a.juzgado_id = j.id_juzgado INNER JOIN curador r ON a.curador_id = r.id_curador INNER JOIN especialidad e ON a.especialidad_id = e.id_especialidad WHERE id_juzgado=? ORDER BY id_asignacion DESC',[id])
        .then( result => {
            cb(null, result)
        }).catch(err => {
            console.log(`Error generado: ${err}`)
        })
}

dataModel.getAsignacionesLab = (id, cb) => {
    connection.query('SELECT id_asignacion, desc_juzgado, numExpediente, desc_especialidad, nombre, apellido, direccion, dni,  email, codigo_cal, iteracion, secretario FROM asignacion_curador a INNER JOIN juzgado j ON a.juzgado_id = j.id_juzgado INNER JOIN curador r ON a.curador_id = r.id_curador INNER JOIN especialidad e ON a.especialidad_id = e.id_especialidad WHERE esp_juzgado=3 ORDER BY id_asignacion DESC',[id])
        .then( result => {
            cb(null, result)
        }).catch(err => {
            console.log(`Error generado: ${err}`)
        })
}

dataModel.getAsignacionesID = (id, cb) => {
    connection.query('SELECT desc_juzgado, numExpediente, desc_especialidad, nombre, apellido, direccion, dni, email, codigo_cal, iteracion, secretario FROM asignacion_curador a INNER JOIN juzgado j ON a.juzgado_id = j.id_juzgado INNER JOIN curador r ON a.curador_id = r.id_curador INNER JOIN especialidad e ON a.especialidad_id = e.id_especialidad WHERE id_asignacion=?', [id])
        .then( result => {
            cb(null, result)
        }).catch(err => {
            console.log(`Error generado: ${err}`)
        })
}
//POST ASIGNACION DE CURADOR
dataModel.insertAsignacion = (dataCurador, cb) => {
    connection.query("INSERT INTO asignacion_curador SET ?", [dataCurador])
        .then(result => {
            cb(null, { insertId: result.insertId })
        }).catch(err => {
            console.log(`Error generado: ${err}`)
        })
}

dataModel.insertEspecialidad = (data, cb) => {
    connection.query("INSERT INTO curador_especialidad SET ?", [data])
        .then(result => {
            cb(null, { insertId: result.insertId })
        }).catch(err => {
            console.log(`Error generado: ${err}`)
        })
}

//delete especialidad
dataModel.deleteEspecialidad = (id, cb) => {
    connection.query("DELETE FROM curador_especialidad WHERE idcurador_especialidad = ?", [id])
        .then(result => {
            cb(null, { msg: "curador eliminado" })
        }).catch(err => {
            console.log(`Error generado: ${err}`)
        })
}

//PUT ASIGNACION DE CURADOR
dataModel.updateAsignacion = (data, cb) => {
    connection.query(`
    UPDATE asignacion_curador SET
    juzgado_id = ?
    numExpediente = ?
    WHERE id_asignacion = ?
    `, [data.juzgado_id,
        data.numExpediente,
        data.id
        ])
        .then(result => {
            cb(null, {
                "msg": "success"
            })
        }).catch(err => {
            console.log(`Error generado: ${err}`)
        })
}


//delete asignacion

dataModel.deleteAsignacion = (id, cb) => {
    connection.query("DELETE FROM asignacion_curador WHERE id_asignacion=?", [id])
        .then(result => {
            cb(null, { msg: "asignacion eliminada" })
        }).catch(err => {
            console.log(`Error generado: ${err}`)
        })
}
dataModel.getCuradoresDisponiblesExpecialidad = (esp,cb) => {
    connection.query("SELECT cu.id_curador, nombre, apellido FROM curador c INNER JOIN curador_especialidad cu ON c.id_curador = cu.id_curador WHERE cu.id_especialidad = ?  && c.estado ='D' && c.actividad='S' && c.conadis='N'",[esp])
        .then( result => {
            cb(null, result)
        }).catch(err => {
            console.log(`Error generado: ${err}`)
        })
}

dataModel.getCuradoresDisponiblesEspecialidadConadis = (esp,cb) => {
    connection.query("SELECT cu.id_curador, nombre, apellido FROM curador c INNER JOIN curador_especialidad cu ON c.id_curador = cu.id_curador WHERE cu.id_especialidad = ?  && c.estado ='D' && c.actividad='S' && c.conadis='S'",[esp])
        .then( result => {
            cb(null, result)
        }).catch(err => {
            console.log(`Error generado: ${err}`)
        })
}

dataModel.getCuradoresExpecialidad = (esp,cb) => {
    connection.query("SELECT cu.id_curador, nombre, apellido FROM curador c INNER JOIN curador_especialidad cu ON c.id_curador = cu.id_curador WHERE cu.id_especialidad = ? && c.actividad='S'",[esp])
        .then( result => {
            cb(null, result)
        }).catch(err => {
            console.log(`Error generado: ${err}`)
        })
}

module.exports = dataModel