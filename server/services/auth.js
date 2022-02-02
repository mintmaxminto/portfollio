const jwt = require('express-jwt');
const jwkRsa = require('jwks-rsa');


exports.checkJWT = jwt({
    secret: jwkRsa.expressJwtSecret({
        cache: true, // Default Value
        rateLimit: true,
        jwksRequestsPerMinute: 50,
        jwksUri: 'https://dev--gh71iy0.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'Y1PBvfKZKgRIngUdfa0HLzSWxhZ9bJwj',
    issuer: 'https://dev--gh71iy0.us.auth0.com/',
    algorithms: ['RS256']
})

exports.checkRole = function(role) {
    return function(req, res, next) {
        const user = req.user;
        
        if(user && user[process.env.NAMESPACE + '/role'] == role) {
            next();
        } else {
            return res.status(401).send({
                title: 'Unauthorized',
                description: 'You cant access this page'
            })
        }
    }
}