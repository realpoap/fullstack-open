const User = ({ users }) => {
	console.log('users in <User/> :', users)

	return (
		<div>
			<table>
				<thead>
					<th>Name</th>
					<th>Blogs created</th>
				</thead>
				<tbody>
					{[...users].map(u =>
						<tr key={u.id}>
							<td>{u.name}</td>
							<td>{u.blogs}</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}

export default User