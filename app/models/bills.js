const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BillSchema = new Schema({
  name:       String,
  amount: Number, 
  datecycle: Number,
  created: {type: Date, default: Date.now}
})

const Bills = mongoose.model('bills', BillSchema)

module.exports = Bills;