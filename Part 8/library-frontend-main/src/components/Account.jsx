import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { CHANGE_GENRE, CURRENT_USER } from "../queries";

const Account = ({ show, books, user, notify }) => {

	const [list, setList] = useState([])
	const [chosenGenre, setChosenGenre] = useState('')


	//SET LIST OF GENRES AND FAVORITEGENRE
	useEffect(() => {
		const genreList = []
		books.map((b) => {
			b.genres.map((g) => {
				genreList.indexOf(g) === -1 ? genreList.push(g) : null
			})
		})
		setList(genreList)
	}, [books])

	//CHANGE GENRE IN DB
	const handleClick = async (event) => {
		event.preventDefault()
		const username = user.username
		const favoriteGenre = event.target.value
		console.log('change request', username, favoriteGenre);
		await changeGenre({ variables: { username, favoriteGenre } })

	}

	const [changeGenre] = useMutation(CHANGE_GENRE, {
		refetchQueries: [{ query: CURRENT_USER }],
		onError: (error) => {
			const messages = error.graphQLErrors.map(e => e.message).join('\n')
			notify(messages)
		}
	})


	if (!show) {
		return null
	}

	console.log(`user favorite genre is ${user.favoriteGenre}`)


	return (
		<div>
			<h2>Welcome {user.username} !</h2>
			<div>Your favorite genre is : {user.favoriteGenre}</div>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{books.map((b) => {
						if (b.genres.includes(user.favoriteGenre) || user.favoriteGenre === '') {
							return (
								<tr key={b.title}>
									<td>{b.title}</td>
									<td>{b.author.name}</td>
									<td>{b.published}</td>
								</tr>
							)
						}
					})}
				</tbody>
			</table>
			<h4>Set your favorite genre as :</h4>
			{list.map((g) => (
				<button key={`btn-${g}`} value={g} onClick={(e) => handleClick(e)}>{g}</button>
			))}
		</div>
	);
};

export default Account;