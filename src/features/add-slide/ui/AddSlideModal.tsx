import { Modal, TextInput, Textarea, Button, Group, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useSlideStore } from '@/entities/slide';

interface Props {
  opened: boolean;
  onClose: () => void;
}

export const AddSlideModal = ({ opened, onClose } : Props) => {
  const addSlide = useSlideStore((state) => state.addSlide);

  const form = useForm({
    initialValues: {
      title: '',
      annotation: '',
    },
    validate: {
      title: (value) => (value.trim().length > 0 ? null : 'Название обязательно'),
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    addSlide(values.title, values.annotation);
    form.reset();
    onClose();
  });

  return (
    <Modal opened={opened} onClose={onClose} title="Добавить слайд">
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput
            label="Название"
            placeholder="Введите название"
            {...form.getInputProps('title')}
          />
          <Textarea
            label="Аннотация"
            placeholder="Введите описание"
            {...form.getInputProps('annotation')}
          />
          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={onClose}>Отмена</Button>
            <Button type="submit">Добавить</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};