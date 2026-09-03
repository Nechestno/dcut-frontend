import { Container, Paper, Title, Stack, Flex } from '@mantine/core';
import { LoginForm } from '@widgets/LoginForm';

export const LoginPage = () => {
  return (
    <Flex h="100vh" align="center" justify="center" flex={1}>
      <Container size="xs" w="100%">
        <Paper withBorder shadow="md" p="xl" radius="md" w="100%">
          <Stack gap="lg">
            <Title order={1}>Авторизация</Title>
            <LoginForm />
          </Stack>
        </Paper>
      </Container>
    </Flex>
  );
};