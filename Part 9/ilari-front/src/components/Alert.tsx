

type Props = {
	message: string,
	style: React.CSSProperties
}

const Alert = (props: Props) => {
	return (
		<div>{props.message}</div>
	)
}

export default Alert