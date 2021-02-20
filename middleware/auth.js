const jwt = require('jsonwebtoken');
const config = require ('config');

// function middleware that has acces to the request and response 
module.exports = function (req,res,next){
// get token from header
const token = req.header('x-auth-token'); 
// check if there is no token
if(!token){
    return res.status(401).json({ msg :'No token, autorization denied '});

        }   
  // verify token 
  //decode the token
  try {
      const decoded = jwt.verify(token,config.get('jwtSecret'));
      req.user = decoded.user;
      next();

      
  } catch (err) {
      return res.status(401).json({ msg : 'Token is not valid '});
      
  }      
}