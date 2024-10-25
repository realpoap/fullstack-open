const mongoose = require('mongoose')

const schema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		minlength: 5
	},
	favoriteGenre: {
		type: String,
		required: false,
	}
})
module.exports = mongoose.model('User', schema)
