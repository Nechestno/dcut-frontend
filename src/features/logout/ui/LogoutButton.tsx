import { Button } from '@mantine/core';
import { useLogout } from '../model/useLogout';

export const LogoutButton = () => {
  const { handleLogout } = useLogout();
  return (
    <Button variant="outline" color="red" onClick={handleLogout}>
      Выйти
    </Button>
  );
};