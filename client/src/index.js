import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import 'react-md/dist/react-md.brown-deep_orange.min.css'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
