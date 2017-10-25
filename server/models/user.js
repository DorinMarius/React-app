// import bookshelf from '../bookshelf'
//
// export default bookshelf.Model.extend({
//   tableName: 'users'
// });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//user schema
 const UserSchema = mongoose.Schema({
   name:{
     type:String
   },
   email:{
     type:String,
     required: true
   },
   username:{
     type:String,
     required:true
   },
   password:{
     type:String,
     required:true
   },
   role:{
     type:String,
     default:"user"
   },
   records:[
     {
       startTime: { type: String},
       endTime: { type: String},
       distance: {type: Number, min:0, default: 0}
      }]
 }
 );

 const User = module.exports = mongoose.model('User',UserSchema);

 module.exports.getUserById = function(id, callback){
   User.findById(id, callback);
 }
 module.exports.getUserByUsername = function(username, callback){
   const query = {username: username};
   User.findOne(query, callback);
 }
 module.exports.addUser = function(newuser, callback){
   bcrypt.genSalt(10,(err, salt)=>{
     bcrypt.hash(newuser.password, salt,(err, hash)=>{
       if(err) throw err;
      newuser.password = hash;
      newuser.save(callback);
     });
   });
 }

 module.exports.comparePassword = function(candidatePassword, hash, callback){
   bcrypt.compare(candidatePassword, hash, (err, isMatch)=>{
     if(err) throw err;
     callback(null, isMatch);
   });
 }
