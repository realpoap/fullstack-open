import { Typography } from '@mui/material'
import UserList from './UserList'

const Users = ({ users }) => {

	return (
		<div>

			<Typography variant='h4'>Users</Typography>
			<UserList users={users} />
		</div>
	)
}

export default Users