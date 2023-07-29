
const jwt = require('jsonwebtoken')
const authorization = (request,response,next) =>{

    const token = request.cookies.access_token;
    if(!token){
        return response.sendStatus(403);
    }

    try {

        const data = jwt.verify(token,"secreteCode");
        return next();
        
    } catch (error) {
        response.sendStatus(403);
        
    }



}


module.exports = authorization;