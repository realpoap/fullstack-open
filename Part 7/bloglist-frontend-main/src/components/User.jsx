const User = ({ users }) => {

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
							<td>{u.name}</td>
							<td>{u.blogs.length}</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}

export default User