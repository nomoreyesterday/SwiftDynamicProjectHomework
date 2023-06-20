import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'

import { ConfigProvider } from "antd"
import "antd/dist/reset.css"
// import { store } from './redux/store.ts'
import { Provider } from 'react-redux'
import store from './redux/store.ts'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<ConfigProvider theme={{
				token: {
				colorPrimary : "#ffa200 "
				}
			}}>
				<App />
			</ConfigProvider>
		</Provider>
	</React.StrictMode>,
)