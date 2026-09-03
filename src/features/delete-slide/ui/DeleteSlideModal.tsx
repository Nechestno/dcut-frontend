import { Modal, Text, Button, Group } from '@mantine/core';
import { useSlideStore } from '@/entities/slide';

interface Props {
  opened: boolean;
  onClose: () => void;
  slideId: string | null;
}

export const DeleteSlideModal = ({ opened, onClose, slideId }: Props) => {
  const deleteSlide = useSlideStore((state) => state.deleteSlide);

  const handleDelete = () => {
    if (slideId) {
      deleteSlide(slideId);
    }
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Удалить слайд?">
      <Text size="sm" mb="md">Вы уверены, что хотите удалить этот слайд? Это действие нельзя отменить.</Text>
      <Group justify="flex-end">
        <Button variant="default" onClick={onClose}>Отмена</Button>
        <Button color="red" onClick={handleDelete}>Удалить</Button>
      </Group>
    </Modal>
  );
};