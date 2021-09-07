import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'antd/dist/antd.css'
import TranslationProvider from './components/TranslationProvider'



ReactDOM.render(
  <React.StrictMode>
    <TranslationProvider>
      <App />
    </TranslationProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

