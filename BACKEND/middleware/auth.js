const jwt = require('jsonwebtoken');
const config = require('config')

module.exports = function(req, res, next) {
    //get token from header ('x-auth-token' is the header with the token)
    const token = req.header('x-auth-token')

    //check if token exists
    if(!token) {
        // if not, status 401 which means not authorized
        return res.status(401).json({ msg: 'No token, authorization denied' })
    }

    try {
        // verify that the token is a match
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        // we add user prop to the request and the value of the payload (the user's id)
        req.user = decoded.user
    } catch (err) {
        res.status(401).json({ msg: 'Token not valid' })
    }

}