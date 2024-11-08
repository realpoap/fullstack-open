type Props = {
	total: number,
}

const Total = (props: Props) => {
	return (
		<p>
        Number of exercises {props.total}
      </p>
	)
}

export default Total