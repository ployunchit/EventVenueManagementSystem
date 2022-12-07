var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

UserSchema = new Schema( {
	firstName: String,
	lastName: String,
	username: String,
	password: String,
	newMessages: {
		type: Object,
		default: {}
	},
	status: {
		type: String,
		default: 'Online'
	} 
}, {minimize: false});

UserSchema.pre('save', function(next){
	const user = this;
	if(!user.isModified('password')) return next();
  
	bcrypt.genSalt(10, function(err, salt){
	  if(err) return next(err);
  
	  bcrypt.hash(user.password, salt, function(err, hash){
		if(err) return next(err);
  
		user.password = hash
		next();
	  })
  
	})
  
  })

UserSchema.methods.toJSON = function(){
	const user = this;
	const userObject = user.toObject();
	delete userObject.password;
	return userObject;
  }

UserSchema.statics.findByCredentials = async function(username, password) {
	const user = await user.findOne({username});
	if(!user) throw new Error('invalid username or password');
  
	const isMatch = await bcrypt.compare(password, user.password);
	if(!isMatch) throw new Error('invalid username or password')
	return user
  }

user = mongoose.model('user', UserSchema);

module.exports = user;







