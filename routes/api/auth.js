const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

//

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: config.get("SENDGRID_API"),
    },
  })
);

// route api/auth
// descr test route
// access public
// to use a middle ware and let the router more secure we passe the midlleware into the params of function
router.get("/", auth, async (req, res) => {
  // we want the route to return user without password
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// route api/auth
// descr login user
// access public
router.post(
  "/",
  [
    check("email", "veuillez entrer un valid email").isEmail(),
    check("password", "mot de passe requis").notEmpty().exists(),
  ],

  async (req, res) => {
    // to work well we should initialise the middleware in server.js
    //console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      // see if user exist
      // chercher if user already exist using findone()
      let user = await User.findOne({ email });
      // case user exists
      if (!user) {
        return res
          .status(500)
          .json({
            errors: [{ msg: "informations d’identification invalides" }],
          });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(500)
          .json({
            errors: [{ msg: "informations d’identification invalides" }],
          });
      }

      // return JSONWEBTOKEN
      //create aour payload which is a user
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },

        (err, token) => {
          if (err) throw err;
          // show the token
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);
router.get("/", auth, async (req, res) => {
  // we want the route to return user without password
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});
///////////////////////////////////////////////////////////////////////////////////

//reset Password
router.post(
  "/reset-password",
  [check("email", "veuillez entrer un valid email").isEmail()],

  async (req, res) => {
    // to work well we should initialise the middleware in server.js
    //console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;
    try {
      // see if user exist
      // chercher if user already exist using findone()
      let user = await User.findOne({ email });
      // case user exists
      if (!user) {
        return res
          .status(500)
          .json({ errors: [{ msg: "email introuvable " }] });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },

        (err, token) => {
          if (err) throw err;
          // show the token
          res.json({ token });
          transporter.sendMail({
            to: user.email,
            from: "rachid98baghrosse@gmail.com",
            subject: "password reset",
            html: `
                      <h1>You requested for password reset</h1>
                      <h3>click in this <a href=http://localhost:3000/new-password/${token}>link</a> to reset password</h3>
                      `,
          });
          res.json(user)
        }
      );
      
     
     
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);
////////////////////////////////////////////////////////////////////////////////////////////////


router.post('/new-password/:token',[

    check('password',' veuillez entrer un mot de passe avec 6 caractères ou plus').isLength({ min : 6 })
    
    ], 

async (req, res)=>{
// to work well we should initialise the middleware in server.js
//console.log(req.body);
const errors = validationResult(req);
if(!errors.isEmpty()){

return res.status(400).json({errors : errors.array()});
}

const {token,password } = req.body;
try {
 // see if user exist 
// chercher if user already exist using findone()
 let user = await User.findOne(req.params.token);
// case user exists
 if (!user){

     return res.status(500).json({errors :[{msg : 'utilisateur introuvable'}]});

 }


  

// encrypte the password
  const salt = await bcrypt.genSalt(10);
  // so let's hash the password
  password = await bcrypt.hash(password, salt);

  user.password=password;

  await user.save()
  

}catch(err){
console.log(err.message);
res.status(500).send('Server error');
}
 });


module.exports = router;
