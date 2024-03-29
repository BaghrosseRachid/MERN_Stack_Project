const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const request = require('request');
const config= require('config');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');
const auth = require('../../middleware/auth');
const { check, validationResult} = require('express-validator');
const { countDocuments } = require('../../models/User');

// route api/profile/me
// descr get current user profile
// access private we need token to access
router.get('/me',auth,  async (req, res)=>
{
 try {
     //this next user is going to pertain to our profile model user feild
     const profile = await Profile.findOne({ user : req.user.id/*token information */}).populate('user',['name','avatar']);
     if(!profile){
         return res.status(400).json({ msg: 'there is no profile for this user'});
     }
     res.json(profile);

 } catch (err) {
     console.error(err.message);
     res.status(500).send('Server error')
     
 }


});
// route api/profile
// descr get all profiles
// access public
 router.get('/',  async (req, res)=>
{
 try {
     //get all profiles
     const profiles = await (Profile.find().populate('user',['name','avatar']));
     if(!profiles){
         return res.status(400).json({ msg: 'there in no profiles'});
     }
     res.json(profiles);

 } catch (err) {
     console.error(err.message);
     res.status(500).send('Server error')
     
 }


});


// route api/profile/user/:user_id
// descr get some user  profile by id passing in params of header
// access public
router.get('/user/:user_id',  async (req, res)=>
{
 try {
     //get all profiles
     const profile = await (Profile.findOne({ user : req.params.user_id }).populate('user',['name','avatar']));
     if(!profile){
         return res.status(400).json({ msg: 'Profile not found'});
     }
     res.json(profile);

 } catch (err) {
     console.error(err.message);
     //check for error in case that the id is not the same object
     if(err.kind =='ObjectId'){

        return res.status(400).json({ msg: 'Profile not found'});  
     }
     res.status(500).send('Server error')
     
 }
});
// route api/profile
// descr delete profil and user
// access public
router.delete('/',auth,  async (req, res)=>
{
 try {
     //delete posts
     await Post.deleteMany({user:req.user.id});
     //delete profile
     await Profile.findOneAndRemove({ user : req.user.id});
     //delete user
     await Profile.findOneAndRemove({_id: req.user.id});
     res.json({msg : 'profile & user deleted'});

 } catch (err) {
     console.error(err.message);
     res.status(500).send('Server error')
     
 }
});


// route api/profile
// descr create or update profile
// access private we need token to access
router.post('/',[auth , [ 
 check('status', 'Status is required').not().isEmpty(),
 check('skills', 'Skills is required').not().isEmpty()

  ]
],
  async (req,res)=> {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
          return res.status(400).json({errors : errors.array()});
      }
      const {
          company,
          website,
          location,
          bio,
          status,
          githubusername,
          skills,
          youtube,
          facebook,
          twitter,
          instagram,
          linkedin  
      }=req.body;

      //build profile object 
      const profileFields ={};
      profileFields.user= req.user.id;
      if(company) profileFields.company = company;
      if(website) profileFields.website = website;
      if(location) profileFields.location = location;
      if(bio) profileFields.bio = bio;
      if(status) profileFields.status = status;
      if(githubusername) profileFields.githubusername = githubusername;
      if(skills) {
          profileFields.skills = skills.split(',').map(skill=> skill.trim());
      }

      // build social array field
      profileFields.social = {};
      if(youtube) profileFields.social.youtube = youtube ;
      if(twitter) profileFields.social.twitter = twitter ;
      if(facebook) profileFields.social.facebook = facebook ;
      if(instagram) profileFields.social.instagram = instagram ;
      

      try {
          // get user in dababase
          let profile = await Profile.findOne({user : req.user.id});
          if(profile){
              //update
              profile= await Profile.findOneAndUpdate({ user: req.user.id}, 
                {$set : profileFields},
                {new : true}, 
                );
                console.log('updated');
              res.json(profile);
          }
        else{
          // create profile
          profile = new Profile (profileFields);
           await profile.save();
           console.log('created');
          res.json(profile);
        }
          
      } catch (err) {
          console.log(err.message);
          res.status(500).send('Server error');
          
      }
  }
);

// route  Put api/profile/experience
// descr  add profile experience
// access private

router.put('/experience',[auth, [
check('title','title is required').not().isEmpty(),
check('company','company is required').not().isEmpty(),
check('from','from is required').not().isEmpty(),


]], async (req, res)=> {
const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({ errors : errors.array()});
}
const {
    title,
    company,
    location,
    from,
    to,
    current,
    description
} = req.body;
const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description
}
try {
    const profile = await Profile.findOne({ user : req.user.id});
    profile.experience.unshift(newExp);
    await profile.save();
    res.json(profile);
} catch (err) {
    console.error(err.message);
    return res.status(500).send('server error')
    
}

});
// route  DELETE api/profile/experience/:exp_id
// descr  remove eprerience from profile
// access private
router.delete('/experience/:exp_id', auth, async (req, res)=> {
    try {
        const profile = await Profile.findOne({user : req.user.id});
        
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
        if(removeIndex == -1){
            return res.status(400).json({ msg: 'exp not found'});
        }
        profile.experience.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if(err.kind =='ObjectId'){
            return res.status(400).json({ msg: 'eprerience not found'});  
         }
    return res.status(500).send('server error')
    }

});

// route  Put api/education
// descr  add profile/education
// access private

router.put('/education',[auth, [
    check('school','school is required').not().isEmpty(),
    check('degree','degree is required').not().isEmpty(),
    check('fieldofstudy','fieldofstudy is required').not().isEmpty(),
    check('from','from is required').not().isEmpty(),
    
    
    ]], async (req, res)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors : errors.array()});
    }
    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;
    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }
    try {
        const profile = await Profile.findOne({ user : req.user.id});
        profile.education.unshift(newEdu);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('server error')
        
    }
    
    });
    // route  DELETE api/profile/education/:edu_id
    // descr  remove education from profile
    // access private
    router.delete('/education/:edu_id', auth, async (req, res)=> {
        try {
            const profile = await Profile.findOne({user : req.user.id});
            
            const removeIndex = (profile.education.map(item => item.id)).indexOf(req.params.edu_id);
            
            profile.education.splice(removeIndex, 1);
            await profile.save();
            res.json(profile);
        } catch (err) {
            console.error(err.message);
        return res.status(500).send('server error')
        }
    
    });

 // route  GET api/profile/github/:username
    // descr  get repository from github
    // access private
router.get('/github/:username',(req, res)=>{
    try {
       const options = {
        uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&
        client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
        method :'GET',
        headers : {'user-agent': 'node.js'}
       
       }
       request(options,(error,response,body)=>{
           if(error) console.error(error);
           if(response.statusCode !== 200){
            return res.status(404).json({msg : "No git hub profile found"});
           }
           // analyser le contenu de body
           res.json(JSON.parse(body));
       })
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

module.exports = router; 