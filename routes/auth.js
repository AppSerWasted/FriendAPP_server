const router = require('express').Router();
const User = require('../model/users');
const bcrypt = require('bcryptjs');
const {registerValidationUser, loginValidation } = require('../validation');
const jwt = require('jsonwebtoken');
// const randtoken = require('rand-token')

router.post('/loginUser',async (req, res) => {
    console.log(req.body)
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Driver Log in
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(401).send('Email or password inccorect!');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(401).send('Email or password inccorect!');

    const dateOfLastEnter = await User.findOneAndUpdate(
        {email: req.body.email},
        {dateOfLastEnter: new Date},
        {new: true, useFindAndModify: false});

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send({_id: user._id, token: token});
});

router.post('/registerUser', async (req, res)=>{
    console.log(req.body)
    const { error } = registerValidationUser(req.body);
    if (error) return res.status(403).send({error: error.details[0].message});

    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(401).send('This email alredy exist');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        nickName: req.body.nickName,
        email: req.body.email,
        phone: req.body.phone,
        password: hashedPassword,
    });

    try{
        const savedUser = await user.save();
        console.log(savedUser._id +"-----------")
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        // const renewalToken = randtoken.uid()
        
        res.send({_id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email,
            phone: savedUser.phone,
            type: null,
            token: token,
            renewalToken: token
        })

    } catch(err){
        res.status(400).send({error: err});
        console.log(err)
    }

});


router.post('/forgot-password', async (req, res)=>{
// seriy pls finish this
});

module.exports = router;
