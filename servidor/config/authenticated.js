'use strict'
const jwt    = require('jwt-simple'),
      moment = require('moment');


global.ensureAuth = function(req, res, next) {
    console.log(req.headers);
        if(!req.headers.authorization) {
          return res
            .status(403)
            .send({message: "Tu petición no tiene cabecera de autorización"});
        }
        
        var token = req.headers.authorization.split(" ")[1];
        var payload = jwt.decode(token, global.JWT_KEY);
        
        if(payload.exp <= moment().unix()) {
           return res
               .status(401)
              .send({message: "El token ha expirado"});
        }
        
        req.user = payload.sub;
        next();
      }
      