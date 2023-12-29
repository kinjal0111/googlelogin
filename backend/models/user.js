const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

let UserSchema = new Schema({ 
name: { 
	type: String 
}, 
email: { 
	type: String 
}, 
picture: { 
	type: String 
} 
}, { 
	collection: 'userDetails'
}) 

module.exports = mongoose.model('user', UserSchema)
