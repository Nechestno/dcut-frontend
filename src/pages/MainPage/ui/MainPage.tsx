import { AppShell, Burger, Group, Title, Text, Button, Container, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useUserStore } from '@entities/user';
import { AddSlideModal } from '@/features/add-slide';
import { DeleteSlideModal } from '@/features/delete-slide';
import { useState } from 'react';
import { LogoutButton } from '@/features/logout';
import { Carousel } from '@/widgets/Carousel';

export const MainPage = () => {
  const [opened, { toggle }] = useDisclosure();
  const { user } = useUserStore();
  const [addOpened, setAddOpened] = useState(false);
  const [deleteOpened, setDeleteOpened] = useState(false);
  const [selectedSlideId, setSelectedSlideId] = useState<string | null>(null);

  const handleDeleteSlide = (id: string) => {
    setSelectedSlideId(id);
    setDeleteOpened(true);
  };

  return (
    <AppShell
      header={{ height: 60 }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Title order={3}>Тестовое DCUT</Title>
          </Group>
          <Group>
            {user && <Text size="sm">{user.email}</Text>}
            <LogoutButton/>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Container size='xl' style={{ marginTop: '2rem', overflow: 'hidden' }}>
          <Stack gap="lg">
            <Title order={1} ta='center'>Карусель</Title>
            <Group justify="center" mt="xl">
                <Button onClick={() => setAddOpened(true)}>Добавить слайд</Button>
            </Group>
            <Carousel onDeleteSlide={handleDeleteSlide} />
          </Stack>
        </Container>
      </AppShell.Main>
      <AddSlideModal opened={addOpened} onClose={() => setAddOpened(false)} />
      <DeleteSlideModal
        opened={deleteOpened}
        onClose={() => setDeleteOpened(false)}
        slideId={selectedSlideId}
      />
    </AppShell>
  );
};