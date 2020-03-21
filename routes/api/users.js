const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');


const User = require('../../models/User');

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/', [
    check('pseudo', 'pseudonyme required')
        .not()
        .isEmpty(),
    check('email', 'Please includ a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters')
        .isLength({ min: 6})
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const  {pseudo, email, password, avatar} = req.body;

        try {
            let user = await User.findOne({ email });

            if(user){
                return res.status(400).json({ errors: [ { msg: 'L\'utilisateur existe déjà'}] });

            }
            const isAdmin = false;
            
            user = new User({
                pseudo,
                email,
                password,
                avatar,
                isAdmin
            });

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user:{
                    id: user.id
                }
            }

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000 },
                (err, token) =>{
                    if (err) throw err;
                    res.json({ token });
                }
            );
            
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server error');
        }

        
        
});

// @route   GET api/users
// @desc    Get all users
// @access  Public
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/users/user/:id
// @desc    Get  user by Id
// @access  Public
router.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id ).populate('user', ['pseudo']);
        if(!user) {
            return res.status(400).json({msg: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



module.exports = router;

