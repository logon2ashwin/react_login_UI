const { Schema, model } = require('mongoose');

// Hence there is no specifications for agency ID
// considering _id as agencyID
const agencySchema = new Schema({
    name: {
      type: String,
      required: true
    },
    address1: {
        type: String,
        required: true
    },
    address2: {
      type: String
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true,
    }
});


module.exports = model('ajency', agencySchema);