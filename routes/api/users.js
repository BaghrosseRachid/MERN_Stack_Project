const express = require('express');
const router = express.Router();
const { check, validationResult} = require('express-validator');
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require ('bcryptjs');
const jwt = require('jsonWebtoken');
const config = require('config');
// route api/users
// descr register users
// access public
router.post('/',[

            check('name','nom requis').not().isEmpty(),
            check('email','veuillez entrer un valid email').isEmail(),
            check('password',' veuillez entrer un mot de passe avec 6 caractères ou plus').isLength({ min : 6 })
            
            ], 

async (req, res)=>{
// to work well we should initialise the middleware in server.js
//console.log(req.body);
const errors = validationResult(req);
if(!errors.isEmpty()){

    return res.status(400).json({errors : errors.array()});
}

    const { name, email,password } = req.body;
    try {
         // see if user exist 
        // chercher if user already exist using findone()
         let user = await User.findOne({email});
        // case user exists
         if (user){

             return res.status(500).json({errors :[{msg : 'L’utilisateur existe déjà'}]});

         }

          // get users gravatar 
           // get the image of user email profil  
          const avatar = gravatar.url(email,{
              // size
              s: '200',
              // reading 
              r: 'pg',
              //default value
              d: 'mm'
          });

          user = new User({
              name,
              email,
              avatar,
              password
          })

        // encrypte the password
          const salt = await bcrypt.genSalt(10);
          // so let's hash the password
          user.password = await bcrypt.hash(password, salt);
          //save the user in database
          // give a promisse so we can get the id of user
          await user.save();

        // return JSONWEBTOKEN
        //create aour payload which is a user
          const payload  = {
              user : {
                  id: user.id 
              }
          }
          jwt.sign(payload , config.get('jwtSecret'),
                { expiresIn :360000 },

                (err, token )=> {
                    if(err) throw err;
                    res.json({token}) ;
                }
                );

    }catch(err){
        console.log(err.message);
        res.status(500).send('Server error');
    }
         });

module.exports = router; 