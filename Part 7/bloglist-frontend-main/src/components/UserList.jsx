import { Link } from 'react-router-dom'

const UserList = ({ users }) => {
	console.log('users', users)


	return (
		<div>
			<table>
				<thead>
					<tr>

						<th>Name</th>
						<th>Blogs created</th>
					</tr>
				</thead>
				<tbody>
					{[...users].map(u =>
						<tr key={u.id}>
							<td><Link to={`/users/${u.id}`}>{u.name}</Link></td>
							<td>{u.blogs.length}</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}

export default UserList