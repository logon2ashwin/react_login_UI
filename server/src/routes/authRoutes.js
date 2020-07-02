const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Models
const User = require('../models/user.js');

// Router functions
let signUp = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()});
    }

    const { firstName, lastName, userName, password, email, gender, country } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            email,
            password: hashedPassword,
            firstName,
            lastName, 
            userName, 
            gender,
            country 
        });
        const result = await user.save();
        res.status(201).json({
            message: 'User created',
            userId: result._id
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

let signIn = async (req, res, next) => {
		const { userName, password } = req.body;
    let loadedUser;
    try {
        const user = await User.findOne({ userName });
        if (!user) {
          return res.status(422).json({ message: 'Entered user name not exist'});
        }
        loadedUser = user;
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            return res.status(422).json({ message: 'Entered Password does not match with the email'});
        }
        const token = jwt.sign(
            {
                email: loadedUser.email,
                userId: loadedUser._id.toString()
            },
            'PrimaryKeyForJWT',
            { expiresIn: '2h' }
        );
        res.status(200).json({ message: 'success', token: token, userId: loadedUser._id.toString() });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

router.post('/signup', [
  body('email')
      .isEmail().withMessage('Please enter a valid email')
      .custom((value, { req }) => {
          return User.findOne({ email: value }).then(userDoc => {
              if (userDoc) {
                  return Promise.reject('Email already exist');
              }
          });
      })
      .normalizeEmail(),
	body('userName')
	.custom((value, { req }) => {
			return User.findOne({ userName: value }).then(userDoc => {
					if (userDoc) {
							return Promise.reject('Username already exist');
					}
			});
	}),
  body('password')
      .trim()
      .isLength({ min: 5 })
], signUp);

router.put('/login', signIn);

module.exports = router;
