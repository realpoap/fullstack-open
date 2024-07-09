import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../request"

import { useContext } from "react"
import NotifContext from "../NotificationContext"


const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const [notif, notifDispatch] = useContext(NotifContext)

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries(['anecdotes'])
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote', content)
    newAnecdoteMutation.mutate({ content, votes: 0 })
    notifDispatch({ type: 'SET', payload: `${content} was created` })
    setTimeout(() => {
      notifDispatch({ type: 'RESET' })
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
