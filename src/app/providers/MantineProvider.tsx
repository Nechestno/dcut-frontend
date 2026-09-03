import { MantineProvider as Mantine } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';

interface Props {
  children: React.ReactNode;
}

export const MantineProvider = ({ children }: Props) => {
  return (
    <Mantine defaultColorScheme="auto">
      <ModalsProvider>{children}</ModalsProvider>
    </Mantine>
  );
};