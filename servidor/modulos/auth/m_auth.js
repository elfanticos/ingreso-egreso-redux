'use strict'
var db = require('../../index');
function login(data) {
    return new Promise((resolve,reject) => {
        let sql = `SELECT id_persona,
                          nom_persona,
                          ape_pate_pers,
                          ape_mate_pers,
                          nro_documento,
                          foto_persona
                     FROM persona
                    WHERE usuario = UNACCENT(LOWER($1))
                      AND clave   = $2`;
        sql = db.pgpromise.as.format(sql,[data.usuario, data.clave]);
        db.conection.any(sql).then(result => {
            resolve(result[0]);
        }).catch(err => {
            reject(err);
        });
    });
}

module.exports = {
    login
}