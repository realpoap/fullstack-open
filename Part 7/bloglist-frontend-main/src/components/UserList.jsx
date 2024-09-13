import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Link } from 'react-router-dom'

const UserList = ({ users }) => {
	console.log('users', users)


	return (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell>Blogs created</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{[...users].map(u =>
						<TableRow key={u.id}>
							<TableCell><Link to={`/users/${u.id}`}>{u.name}</Link></TableCell>
							<TableCell>{u.blogs.length}</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export default UserList