const express = require('express');
const router = express.Router();
// Post model
const Post = require('../../models/Post');
// Profile model
const Profile = require('../../models/Profile');
// Validation
const {check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/User');

// route  POST api/posts
// descr create post
// access private
router.post('/',[auth,[
    check('text','text is required ').not().isEmpty()
]] ,
async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }
    try {
    const user = await User.findById(req.user.id).select('-password');
    const newPost = new Post ({
    text : req.body.text,
    name : user.name,
    avatar : user.avatar,
    user : req.user.id
    });
    const post = await newPost.save();
    res.json(post);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
        
    }
    
});

// route api/posts
// descr get all posts
// access private
router.get('/',auth,  async (req, res)=>
{
 try {
     //get all posts
     const posts = await (Post.find().sort({ date : -1}));
     if(!posts){
         return res.status(400).json({ msg: 'there is no posts'});
     }
     res.json(posts);

 } catch (err) {
     console.error(err.message);
     res.status(500).send('Server error')
     
 }

});

// route api/posts/:id
// descr get post by id
// access private
router.get('/:id',auth,  async (req, res)=>
{
 try {
     
     const post = await Post.findById(req.params.id);
     if(!post){
         return res.status(400).json({ msg: 'Post not found'});
     }
     res.json(post);

 } catch (err) {
     console.error(err.message);
     //check for error in case that the id is not the same object
     if(err.kind =='ObjectId'){

        return res.status(400).json({ msg: 'Post not found'});  
     }
     res.status(500).send('Server error')
     
 }
});
// route DELETE api/posts/:id
// descr delete post by id
// access private
router.delete('/:id',auth,  async (req, res)=>
{
 try {
     
     const post = await Post.findById(req.params.id);
     if(!post){
         return res.status(400).json({ msg: 'Post not found'});
     }
     //check for user
     if(post.user.toString() !== req.user.id){
        return res.status(401).json({ msg: 'user not authorized'});
     }
     await post.remove();
     res.json({msg : 'post removed'});

 } catch (err) {
     console.error(err.message);
     //check for error in case that the id is not the same object
     if(err.kind =='ObjectId'){

        return res.status(400).json({ msg: 'Post not found'});  
     }
     res.status(500).send('Server error')
     
 }
});

// route PUTE api/posts/like/:id
// descr like a post
// access private
router.put('/like/:id',auth , async (req, res)=> {
try {
    //check for the post
const post = await Post.findById(req.params.id);
//check for the post if has already been liked
console.log(post.likes);
console.log(req.user.id);
if(post.likes.filter(like=> like.user.toString()=== req.user.id).length > 0){
    return res.status(401).json({msg :'post already liked'});
}
 post.likes.unshift({user : req.user.id});
 await post.save();
 //res.send('liked successfully');
 res.json(post.likes);

} catch (err) {
    console.error(err.message);
     res.status(500).Send('Server error');
}

});

// route PUTE api/posts/unlike/:id
// descr unlike a post
// access private
router.put('/unlike/:id',auth , async (req, res)=> {
    try {
        //check for the post
    const post = await Post.findById(req.params.id);
    //check for the post if has already been liked
    if(post.likes.filter(like=> like.user.toString()=== req.user.id).length == 0){
        res.status(401).json({msg :'post has not liked yet'});
    }
    const removeIndex = post.likes.map(like=> like.user.toString()).indexOf(req.user.id);
    post.likes.splice(removeIndex,1);
     await post.save();
     //res.send('unliked successfully');
     res.json(post.likes);
    
    } catch (err) {
        console.error(err.message);
         res.status(500).Send('Server error')
    }
    
    });
    
    
// route  POST api/posts/comment/:id
// descr add comment on a post
// access private
router.post('/comment/:id',[auth,[
    check('text','text is required ').not().isEmpty()
]] ,
async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }
    try {
    const user = await User.findById(req.user.id).select('-password');
    const post = await Post.findById(req.params.id);

    const newComment = {
    text : req.body.text,
    name : user.name,
    avatar : user.avatar,
    user : req.user.id
    };
    post.comments.unshift(newComment);
    await post.save();
    res.json(post.comments);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
        
    }
    
});


// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete(
    '/comment/:id/:comment_id',
    auth,
    async (req, res) => {
      const post = await Post.findById(req.params.id)
      //pull out the comment 
      const comment = post.comments.find(comment => comment.id === req.params.comment_id);
      //make sure comment exist
      if(!comment){
          return   res.status(404).json({msg :'comment does not exist'});
      }
      // check for user
      if(comment.user.toString() !== req.user.id){
        return   res.status(401).json({msg :'user not authorized'});

      }
      // get remove index
    const removeIndex = post.comments.map(comment=> comment.user.toString()).indexOf(req.user.id);
    post.comments.splice(removeIndex,1);
     await post.save();
     //res.send('unliked successfully');
     res.json(post.comments);



    }) ;
module.exports = router; 