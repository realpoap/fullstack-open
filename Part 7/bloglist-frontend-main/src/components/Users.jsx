import User from './User'

const Users = ({ users }) => {
	return (
		<div>

			<h1>Users</h1>
			<User users={users} />
		</div>
	)
}

export default Users