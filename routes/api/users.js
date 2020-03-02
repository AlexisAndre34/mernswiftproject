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
        
        const  {pseudo, email, password} = req.body;

        try {
            let user = await User.findOne({ email });

            if(user){
                return res.status(400).json({ errors: [ { msg: 'L\'utilisateur existe déjà'}] });

            }
            /*
            //need to add image for profil pictures later
            const file = req.files.file;

            if(!req.file.mimetype.startsWith('image')) {
                res.status(400).json({ errors: [ { msg: 'images seulement'}] });
            }

            file.name = `photo_${user.pseudo}${path.parse(file.name).ext}`;

            var Blob = req.files.file.data;

            const S3_BUCKET = config.get('S3_BUCKET');
            const AWS_ACCESS_KEY_ID = config.get('AWS_ACCESS_KEY_ID');
            const AWS_SECRET_ACCESS_KEY = config.get('AWS_SECRET_ACCESS_KEY');

            AWS.config.update({
                accessKeyId: AWS_ACCESS_KEY_ID,
                secretAccessKey: AWS_SECRET_ACCESS_KEY
            })

            const s3 = new AWS.S3();

            const params= {
                Bucket: S3_BUCKET,
                Key: file.name,
                Body: Blob
            };

            s3.upload(params, (err, data)=> {
                console.log(err, data);
            })
            */
            
            user = new User({
                pseudo,
                email,
                password
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

module.exports = router;
