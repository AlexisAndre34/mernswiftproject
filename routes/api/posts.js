const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require('../middleware/auth');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');


// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post('/',
[auth,
    check('title', 'title required').not().isEmpty(),
    check('text', 'text required').not().isEmpty()
    
], 
async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { tags } = req.body;
    const tagsparse = {};
    if (tags) {
        tagsparse.tags = tags.split(',').map(tag => tag.trim());
    }

    try {
        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post({
                title: req.body.title,
                text: req.body.text,
                tags: tagsparse.tags,
                location: req.body.location,
                pseudo: user.pseudo,
                user: req.user.id
            });

        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1});
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    
});

// @route   GET api/posts/:id
// @desc    Get post by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post) {
            return res.status(404).json({ msg: 'Post not found'});
        }
        res.json(post);
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId'){
            return res.status(404).json({ msg: 'Post not found'});
        }
        res.status(500).send('Server Error');
    }
    
});

// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post){
            return res.status(400).json({ msg: 'Post not found'})
        }

        //check user
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'user not authorized'})
        }

        await post.remove();

        res.json('post removed sucessfully');
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId'){
            return res.status(404).json({ msg: 'Post not found'});
        }
        res.status(500).send('Server Error');
    }
    
});

// @route   PUT api/posts/like/:id
// @desc    Like a post
// @access  Private
router.put('/like/:id', auth, async (req, res)=>{
    try {
        const post = await Post.findById(req.params.id);

        //check if user already like post
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'Post already liked'});
        }

        post.likes.unshift({ user: req.user.id });

        await post.save();

        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/posts/unlike/:id
// @desc    Unlike a post
// @access  Private
router.put('/unlike/:id', auth, async (req, res)=>{
    try {
        const post = await Post.findById(req.params.id);

        //check if user already like post
        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: 'Post has not yet been liked yet'});
        }

        //Get remove index
        const removeIndex = post.likes
            .map(like => like.user.toString())
            .indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);

        await post.save();

        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/posts/report/:id
// @desc    Report a post
// @access  Private
router.put('/report/:id', auth, async (req, res)=>{
    try {
        const post = await Post.findById(req.params.id);

        //check if user already like post
        if(post.reports.filter(report => report.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'Post already reported'});
        }

        post.reports.unshift({ user: req.user.id });

        await post.save();

        res.json(post.reports);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/posts/unreport/:id
// @desc    Unreport a post
// @access  Private
router.put('/unreport/:id', auth, async (req, res)=>{
    try {
        const post = await Post.findById(req.params.id);

        //check if user already like post
        if(post.reports.filter(report => report.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: 'Post has not yet been reported yet'});
        }

        //Get remove index
        const removeIndex = post.reports
            .map(report => report.user.toString())
            .indexOf(req.user.id);

        post.reports.splice(removeIndex, 1);

        await post.save();

        res.json(post.reports);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/posts/comment/:id
// @desc    Comment a post
// @access  Private
router.post('/comment/:id',
[auth,
    check('text', 'text required').not().isEmpty()
], 
async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);

        const newComment = {
            text: req.body.text,
            pseudo: user.pseudo,
            user: req.user.id
        };

        post.comments.unshift(newComment);

        await post.save();
        
        res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete a comment
// @access  Private
router.delete('/comment/:id/:comment_id', auth, async (req, res)=> {
    try {
        const post = await Post.findById(req.params.id);
        
        const comment = await post.comments.find(comment => comment.id === req.params.comment_id);

        if(!comment) {
            return res.status(404).json({ msg: 'comment not found'});
        }

        if(comment.user.toString() !== req.user.id) {
            res.status(401).json({ msg: 'user not authorized'});
        }

        //Get remove index
        const removeIndex = post.comments
            .map(comment => comment.user.toString())
            .indexOf(req.user.id);

        post.comments.splice(removeIndex, 1);

        await post.save();

        res.json(post.comments);




    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/posts/comment/like/:id/:comment_id
// @desc    Like a comment
// @access  Private
router.put('/comment/like/:id/:comment_id', auth, async (req, res)=>{
    try {
        const post = await Post.findById(req.params.id);
        const comment = await post.comments.find(comment => comment.id === req.params.comment_id);

        //check if user already like post
        if(comment.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'Comment already liked'});
        }

        comment.likes.unshift({ user: req.user.id });

        await post.save();

        res.json(comment.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/posts/comment/unlike/:id/:comment_id
// @desc    Unlike a comment
// @access  Private
router.put('/comment/unlike/:id/:comment_id', auth, async (req, res)=>{
    try {
        const post = await Post.findById(req.params.id);
        const comment = await post.comments.find(comment => comment.id === req.params.comment_id);

        //check if user already like post
        if(comment.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: 'Comment has not been liked yet'});
        }

        //Get remove index
        const removeIndex = comment.likes
            .map(like => like.user.toString())
            .indexOf(req.user.id);

        comment.likes.splice(removeIndex, 1);

        await post.save();

        res.json(comment.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/posts/comment/report/:id/:comment_id
// @desc    Report a comment
// @access  Private
router.put('/comment/report/:id/:comment_id', auth, async (req, res)=>{
    try {
        const post = await Post.findById(req.params.id);
        const comment = await post.comments.find(comment => comment.id === req.params.comment_id);

        //check if user already like post
        if(comment.reports.filter(report => report.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'Comment already reported'});
        }

        comment.reports.unshift({ user: req.user.id });

        await post.save();

        res.json(comment.reports);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/posts/comment/unreport/:id/:comment_id
// @desc    Unreport a comment
// @access  Private
router.put('/comment/unreport/:id/:comment_id', auth, async (req, res)=>{
    try {
        const post = await Post.findById(req.params.id);
        const comment = await post.comments.find(comment => comment.id === req.params.comment_id);

        //check if user already like post
        if(comment.reports.filter(report => report.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: 'Comment has not been reported yet'});
        }

        //Get remove index
        const removeIndex = comment.reports
            .map(report => report.user.toString())
            .indexOf(req.user.id);

        comment.reports.splice(removeIndex, 1);

        await post.save();

        res.json(comment.reports);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//update functionnality
//admin user

module.exports = router;