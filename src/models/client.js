const { Schema, model } = require('mongoose');

// Hence there is no specifications for client ID
// considering _id as agencyID
const clientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  agencyId: { ref: 'ajency', type: Schema.ObjectId },
  email: {
    type: String,
    required: true
  },
  totalBill: {
    type: Number,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
  }
});


module.exports = model('client', clientSchema);