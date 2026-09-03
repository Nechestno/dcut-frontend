import { MantineProvider } from './providers/MantineProvider';
import { AppRouter } from './routes/AppRouter';
import '@mantine/core/styles.css';

export const App = () => {
  return (
    <MantineProvider>
      <AppRouter />
    </MantineProvider>
  );
};