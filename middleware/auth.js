const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authToken = req.get('Authorization');

    if(!authToken){
        const error = new Error('Não autenticado');
        error.statusCode = 401;
        throw error;
    }

    const token = authToken.split(' ')[1];

    let decodificaToken;

    try{

        decodificaToken  = jwt.verify(token, 'secretfortoken');

    }catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }

    if(!decodificaToken){
        const error = new Error('Não autenticado');
        error.statusCode = 401;
        throw error;
    }

    res.logado = true;
    res.userId = decodificaToken.userId;
    res.cpf = decodificaToken.cpf;

    next();

}