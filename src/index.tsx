import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ErrorBoundary } from 'react-error-boundary';
import Error from './screens/Error/Error';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<BrowserRouter>
		<Provider store={store}>
			<ErrorBoundary  fallback={<Error />}>
				<App />
			</ErrorBoundary>
		</Provider>
	</BrowserRouter>
);
