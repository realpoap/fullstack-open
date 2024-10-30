const mongoose = require('mongoose')

const schema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		minlength: 5
	},
	born: {
		type: Number,
		required: false,
	}
})

module.exports = mongoose.model('Author', schema)