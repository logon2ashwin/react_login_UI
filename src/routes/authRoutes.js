const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const isAuth = require('../middleware/auth');
// Models
const User = require('../models/user.js');
const Agency = require('../models/agency.js');
const client = require('../models/client.js');
const mongoose = require('mongoose');

// Router functions
let signUp = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()});
    }

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            email: email,
            password: hashedPassword,
            name: name
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
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
          return res.status(422).json({ message: 'Entered email not exist'});
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
            'codifyIndyPrimaryKeyForJWT',
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

let createAgency = async (req, res) => {
  // Considering agency details and client detail will come in seperate objects
  // Considering only one clientdetails will be there
  // We can also use insertmany if we need multiple clientdetails insertions
  let { agencyDetails, clientDetails } = req.body;

  let newAgency = new Agency(agencyDetails);
  newAgency.save((err, agencyResults) => {
    if(err) res.status(500).json({ status: 'error', message: err.message }); 
    else {
      clientDetails.agencyId = agencyResults.id;
      let newClient = new client(clientDetails);
      newClient.save((err, clientResults) => {
        if(err) res.status(500).json({ status: 'error', message: err.message }); 
        else res.status(200).json({ status: 'success', message: "Agency and client creation success" }); 
      });
    }
  });
}

let updateClient = async (req, res) => {
  let id = mongoose.Types.ObjectId(req.body._id);
  let clientdata = req.body;
  clientdata._id = id;
  // Considering user should not change agency ID
  if (clientdata.agencyId) delete clientdata.agencyId;
  let updateFields = {
    ...clientdata
  }
  client.updateOne({_id: id}, updateFields, (err, results)=> {
    if(err) res.status(500).json({ status: 'error', message: err.message });
    else res.status(200).json({ status: 'success', message: "client update success" });
  });
}

let getMaxBill = async (req, res) => {
  let agencyId = mongoose.Types.ObjectId(req.body.agencyId); 
  client.findOne({ agencyId: agencyId })
    .sort({ totalBill: -1 })
    .select({ agencyId: 1,  name: 1, totalBill: 1, _id:0 })
    .exec((err, results) => {
    if(err) res.status(500).json({ status: 'error', message: err.message });
    else {
      res.status(200).json({ status: 'success', results });
    }
  });
}


router.put('/signup', [
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
  body('password')
      .trim()
      .isLength({ min: 5 }),
  body('name')
      .trim()
      .not()
      .isEmpty()
], signUp);

router.post('/login', signIn);
router.post('/createAgency', isAuth, createAgency);
router.put('/updateClient', isAuth, updateClient);
router.get('/getMaxBill', isAuth, getMaxBill);


module.exports = router;
