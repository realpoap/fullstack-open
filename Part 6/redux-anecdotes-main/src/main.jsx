import ReactDOM from 'react-dom/client'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'

import anecdoteReducer from './reducers/anecdoteReducer'
import filtereducer, { changeFilter } from './reducers/filterReducer'


const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filtereducer
})

const store = createStore(reducer)

store.subscribe(() => console.log(store.getState()))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)