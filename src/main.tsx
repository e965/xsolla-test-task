import React from 'react';
import ReactDOM from 'react-dom';

import { Provider as ReduxProvider } from 'react-redux';
import ReduxStore from './redux/store';

import App from './components/App/App';

import './main.scss';

ReactDOM.render(
    <React.StrictMode>
        <ReduxProvider store={ReduxStore}>
            <App />
        </ReduxProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
