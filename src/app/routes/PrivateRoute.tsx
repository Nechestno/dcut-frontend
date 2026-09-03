import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '@entities/user';
import { storage } from '@/shared/lib/localStorage';

export const PrivateRoute = () => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    storage.clear();
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};