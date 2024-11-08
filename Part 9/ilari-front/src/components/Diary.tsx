import { DiaryEntry } from "../types"


const Diary = (props: {diary:DiaryEntry}) => {
	return (
		<div>
			<p><b>{props.diary.date}</b></p>
			<p>visibility: {props.diary.visibility}</p>
			<p>weather: {props.diary.weather}</p>
			<p>{props.diary.comment}</p>
		</div>
	)
}

export default Diary