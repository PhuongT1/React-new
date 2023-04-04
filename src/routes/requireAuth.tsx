import { Navigate, Outlet } from 'react-router-dom';
import TokenServiceNew from '../services/token.service';
import { LayoutBasic, LayoutDefault } from 'layouts';
import { useLocation } from 'react-router-dom';

const RequireAuth = ({ children }: { children?: boolean | undefined }) => {
  const location = useLocation();
  console.log('location', location);
  const user = TokenServiceNew.getAuth();

  if (!user?.access_token) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }
  const layout = children ? <LayoutBasic /> : <LayoutDefault />;
  return layout;
};

export default RequireAuth;
