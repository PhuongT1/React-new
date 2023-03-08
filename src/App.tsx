import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import Routes from './routes';
import { QueryClientProvider, QueryClient } from 'react-query'
const queryClient = new QueryClient()

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
