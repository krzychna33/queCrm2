const { User } = require('../models/User');

const authenticate = (req, res, next) => {
    const token = req.header('x-auth');

    User.findByToken(token).then((user) =>{
        if(!user){
            return Promise.reject('User not found!');
        }
    
        req.user = user;
        req.token = token;
        next();
    }).catch((e) =>{
        res.status(401).send({
            message: e
        });
    })
}

module.exports = {
    authenticate
}