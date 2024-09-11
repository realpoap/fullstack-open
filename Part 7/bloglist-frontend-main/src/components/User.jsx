import { Link } from 'react-router-dom'

const User = ({ user }) => {
	if (!user) return null
	return (
		<div>
			<h1>User : {user.name}</h1>
			<h2>Added blogs :</h2>
			<ul>
				{user.blogs.map(b => (
					<li key={b.name}><Link to={`/blogs/${b.id}`}>{b.title}</Link></li>
				))}
			</ul>
		</div>
	)
}

export default User