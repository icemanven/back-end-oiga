const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    type: {type: String, enum: ['admin', 'company']},
    password: {type: String, required: true}
});

module.exports = mongoose.model('User', UserSchema);
