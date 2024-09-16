import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MantineProvider } from '@mantine/core'
import { UserContextProvider } from './userContext'
import App from './App'
import '@mantine/core/styles.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
	<UserContextProvider>
		<QueryClientProvider client={queryClient}>
			<MantineProvider>

				<App />
			</MantineProvider>
		</QueryClientProvider>
	</UserContextProvider>
)