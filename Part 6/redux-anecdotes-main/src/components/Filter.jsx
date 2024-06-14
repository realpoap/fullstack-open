import { changeFilter } from "../reducers/filterReducer"
import { useDispatch } from "react-redux"

const Filter = () => {

	const dispatch = useDispatch()

	const style = {
		marginBottom: 10
	}
	return (
		<div style={style}>Filter
			<input name="filter" onChange={() => dispatch(changeFilter(event.target.value))}></input>
		</div>
	)
}

export default Filter