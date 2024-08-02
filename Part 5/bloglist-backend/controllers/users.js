const usersRouter = require('express').Router()
const User = require('../models/user')

const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
	const users = await User.find({})
	return response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
	const user = await User.findById(request.params.id)
	return response.json(user)
})

usersRouter.post('/', async (request, response) => {
	const { username, name, password } = request.body

	if (username.length > 2 && password.length > 2) {
		const saltRounds = 10
		const passwordHash = await bcrypt.hash(password, saltRounds)

		const user = new User({
			username,
			name,
			passwordHash,
		})
		const savedUser = await user.save()

		response.status(201).json(savedUser)
	}
	else {
		response.status(400).json({ error: 'username or password invalid' })
	}

})


module.exports = usersRouter