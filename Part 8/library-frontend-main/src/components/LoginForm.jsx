import { useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';
import { LOGIN } from '../queries';

const LoginForm = ({ show, setError, setToken }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const [login, result] = useMutation(LOGIN, {
		onError: (error) => {
			setError(error.graphQLErrors[0].message)
		}
	})

	useEffect(() => {
		if (result.data) {
			const token = result.data.login.value
			setToken(token)
			localStorage.setItem('user-token', token)
		}
	}, [result.data])

	const submit = async (event) => {
		event.preventDefault()
		login({ variables: { username, password } })
	}

	if (!show) {
		return null
	}

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={submit}>
				<div>
					username <input
						value={username}
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password <input
						value={password}
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type='submit'>login</button>
			</form>
		</div>
	);
};

export default LoginForm;