import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import Routes from './routes';

function App() {
  return (
    <BrowserRouter>
      <Suspense>
        <Routes />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
