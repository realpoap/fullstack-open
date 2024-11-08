
interface PartProps {
	name: string,
	exerciseCount: number,
	kind: string,
	groupProjectCount?: number,
	backgroundMaterial?: string,
	description?: string,
	requirements?: string[]
}

const Part = (props: PartProps) => {
	return (
	<div>
		<h4>{props.name} - {props.exerciseCount}</h4>
			<i>{props.description}</i>
			{props.groupProjectCount && <p>project exercises : {props.groupProjectCount}</p>}
			{props.backgroundMaterial && <p>submit to :{props.backgroundMaterial}</p>}
			{props.requirements && <p>skills needed: {props.requirements.map(r => <span>{r} </span>)}</p>}
	</div>
	)
}


export default Part