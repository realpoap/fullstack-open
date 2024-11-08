type Props = {
	title: string,
}

const Header = (props: Props) => {
	return (
		<h1>{props.title}</h1>
	)
}

export default Header