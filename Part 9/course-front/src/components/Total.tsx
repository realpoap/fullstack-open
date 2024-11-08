type Props = {
	total: number,
}

const Total = (props: Props) => {
	return (
		<h2>
        Number of exercises {props.total}
      </h2>
	)
}

export default Total