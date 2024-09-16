import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { UserContextProvider } from './userContext'
import App from './App'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
	<UserContextProvider>
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	</UserContextProvider>
)