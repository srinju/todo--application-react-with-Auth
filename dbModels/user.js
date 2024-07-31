const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


/*
Pre-save Hook: Hashes the user's password before saving it to the database.
Compare Password Method: Compares a provided password with the hashed password stored in the database.
Generate Token Method: Generates a JWT that can be used for authentication and session management.
*/

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

UserSchema.pre('save' , async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
});

UserSchema.methods.comparePassword = function(password){
    return bcrypt.compare(password , this.password);
};

UserSchema.methods.generateToken = function(){
    return jwt.sign({id : this._id} , 'MY_JWT_SECRET' , {expiresIn: '1h'});
};

const UserModel = mongoose.model('User' , UserSchema);

module.exports = UserModel;
