const mongoose = require('mongoose')
// mongoose.Promise = global.Promise;


const Schema = mongoose.Schema

const BillSchema = new Schema({
  name: String,
  amount: Number, 
  billtype: String,
  datecycle: String,
  duedate: String,
  paid: Boolean,
  notes: String,
  created: {type: Date, default: Date.now},
  userId: {type: Schema.Types.ObjectId, ref:'User'}
})

const Bills = mongoose.model('bills', BillSchema)

module.exports = Bills;