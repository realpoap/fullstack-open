import { useContext } from "react"
import NotifContext from "../NotificationContext"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const [notif, notifDispatch] = useContext(NotifContext)

  return (
    <div style={style}>
      {notif}
    </div>
  )
}

export default Notification
