import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import './index.css';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<div>
		<BrowserRouter>
			<App />
		</BrowserRouter>
		<ToastContainer />
	</div>,
);
