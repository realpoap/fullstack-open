import UserList from './UserList'

const Users = ({ users }) => {

	return (
		<div>

			<h1>Users</h1>
			<UserList users={users} />
		</div>
	)
}

export default Users