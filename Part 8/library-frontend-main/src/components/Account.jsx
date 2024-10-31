import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { CHANGE_GENRE, CURRENT_USER } from "../queries";

const Account = ({ show, books, user, favoriteGenre, setFavoriteGenre, notify }) => {

	const [list, setList] = useState([])
	const [genre, setGenre] = useState('')



	//SET LIST OF GENRES AND FAVORITEGENRE
	useEffect(() => {
		const genreList = []
		books.map((b) => {
			b.genres.map((g) => {
				genreList.indexOf(g) === -1 ? genreList.push(g) : null
			})
		})
		setList(genreList)
	}, [])

	//CHANGE GENRE IN DB
	useEffect(() => {
		if (user) {

			console.log('genre changed', favoriteGenre);
			const username = user.username
			const changeUserFavGenre = async () => {
				console.log('in async query')
				await changeGenre({ variables: { username, favoriteGenre } })
			}
			changeUserFavGenre()
				.catch(console.error);
		}

	}, [favoriteGenre])

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

	return (
		<div>
			<h2>Welcome {user.username} !</h2>
			<div>Your favorite genre is : {favoriteGenre}</div>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{books.map((b) => {
						if (b.genres.includes(favoriteGenre) || user.favoriteGenre === '') {
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
				<button key={`btn-${g}`} onClick={() => setFavoriteGenre(g)}>{g}</button>
			))}
		</div>
	);
};

export default Account;