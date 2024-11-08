import CoursePart from "../types"
import Part from "./Part"
import { assertNever } from "../helper"

interface ContentProps {
	courses: CoursePart[]
}

const Content = (props: ContentProps) => {
	return props.courses.map(part => {
		switch (part.kind) {
			case 'basic':
				return <Part
									key={part.name} 
									kind={part.kind} 
									name={part.name} 
									exerciseCount={part.exerciseCount} 
									description={part.description}
								/>
			case 'group':
				return <Part
									key={part.name}
									kind={part.kind} 
									name={part.name} 
									exerciseCount={part.exerciseCount} 
									groupProjectCount={part.groupProjectCount}
								/>
			case 'background':
				return <Part 
									key={part.name}
									kind={part.kind} 
									name={part.name} 
									exerciseCount={part.exerciseCount} 
									description={part.description} 
									backgroundMaterial={part.backgroundMaterial}
								/>
			case 'special':
				return <Part 
									key={part.name}
									kind={part.kind} 
									name={part.name} 
									exerciseCount={part.exerciseCount} 
									description={part.description} 
									requirements={part.requirements}
								/>
			default:
				return assertNever(part)
		}
	})
}

export default Content