import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/entities/user';
import { useSlideStore } from '@/entities/slide';
import { storage } from '@shared/lib/localStorage';

const SLIDES_STORAGE_KEY = 'slides-storage';

export const useLogout = () => {
  const navigate = useNavigate();
  const logout = useUserStore((state) => state.logout);
  const clearSlides = useSlideStore((state) => state.resetSlides);

  const handleLogout = () => {
    logout();
    clearSlides();
    storage.remove(SLIDES_STORAGE_KEY);
    navigate('/login');
  };

  return { handleLogout };
};