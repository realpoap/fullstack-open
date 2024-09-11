const User = ({ user }) => {
	if (!user) return null
	return (
		<div>
			<h1>User : {user.name}</h1>
			<h2>Added blogs :</h2>
			<ul>
				{user.blogs.map(b => (
					<li key={b.name}>{b.title}</li>
				))}
			</ul>
		</div>
	)
}

export default User