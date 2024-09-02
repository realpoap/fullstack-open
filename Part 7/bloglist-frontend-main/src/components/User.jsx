const User = ({ user }) => {
	if (!user) return null
	return (
		<div>
			<h1>{user.name}</h1>
			{user.blogs.map(b => (
				<li key={b.id}>{b.title}</li>
			))}
		</div>
	)
}

export default User