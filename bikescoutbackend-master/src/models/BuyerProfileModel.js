const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Users', required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    
}, { timestamps: true });

module.exports = mongoose.model('BuyerProfile', ProfileSchema);
