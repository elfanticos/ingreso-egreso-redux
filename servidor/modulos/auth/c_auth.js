'use strict'

const m_auth = require('./m_auth');

async function login(req,res) {
    try {
        let data_req = req.query;
        let data = await m_auth.login(data_req);
        if (!data)
            throw {status : 400, msj : 'Usuario o clave incorrecta'};
            res.status(200).send(data);
    } catch (err) {
        if(err.status) {
            res.status(err.status).send(err);
        } else {
            console.log(err);
            res.status(500).send({msj : 'Hubo un error'});
        }
    }
}

module.exports = {
    login
};