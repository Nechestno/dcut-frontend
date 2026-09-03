import { Group, ActionIcon } from '@mantine/core';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';

interface Props {
  onPrev: () => void;
  onNext: () => void;
}

export const CarouselNavigation = ({ onPrev, onNext }: Props) => (
  <Group justify="center" mt="md" gap="lg">
    <ActionIcon onClick={onPrev} size="lg" variant="outline">
      <IconArrowLeft />
    </ActionIcon>
    <ActionIcon onClick={onNext} size="lg" variant="outline">
      <IconArrowRight />
    </ActionIcon>
  </Group>
);