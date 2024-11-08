type Course = {
	name: string,
	exerciseCount: number,
}

type Props = {
	courses: Course[]
}

const Content = (props: Props) => {
	return(
		<div>
			{props.courses.map(c => (
					<p key={c.name}>
						{c.name} {c.exerciseCount}
					</p>
					)
				)	
			}
		</div>
	)	
}

export default Content