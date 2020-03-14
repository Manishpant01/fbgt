const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: { type: String },
    email: { type: String, unique: true },
    _id: { type: Number },
    url: { type: String },
    is_deleted:{type:Boolean,default:false},
})
module.exports = mongoose.model('social',UserSchema);