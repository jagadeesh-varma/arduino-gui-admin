var mongoose = require('mongoose');
var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;
var Statistics = new Schema({
rotary_psi :Number,    
carriage_psi :Number,
mud_psi :Number,
vice_psi :Number,
fuel_level: Number,
battery_level: Number,
carriage_position: Number,
rotary_rpm: Number,
date  :  { type: Date, default: Date.now } 
});
module.exports = mongoose.model('Statistics', Statistics);