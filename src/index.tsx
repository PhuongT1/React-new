import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from "redux";
import { Provider } from "react-redux";
import allReducers from './reducers'
const store = createStore(allReducers);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

import { QueryClientProvider, QueryClient } from 'react-query'
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
