import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from "redux";
import { Provider } from "react-redux";
import allReducers from './reducers'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = createStore(allReducers);
const queryClient = new QueryClient()

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
      
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
