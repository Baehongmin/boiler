const mongoose = require('mongoose')

const paperSchema = mongoose.Schema({
    title: {
      type: String,
      maxlength: 50
    },
    value: {
      type: String,
      minlength: 2,
      maxlength: 200
    },
  })

paperSchema.pre('save', function( next ) {
    next()
})

const Paper=mongoose.model('Paper', paperSchema)

module.exports = { Paper }