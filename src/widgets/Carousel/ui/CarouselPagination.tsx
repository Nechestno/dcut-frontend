import { Group, Button } from '@mantine/core';

interface Props {
  total: number;
  selected: number;
  onDotClick: (index: number) => void;
}

export const CarouselPagination = ({ total, selected, onDotClick }: Props) => (
  <Group justify="center" gap="xs" mt="md">
    {Array.from({ length: total }).map((_, index) => (
      <Button
        key={index}
        variant={index === selected ? 'filled' : 'outline'}
        size="xs"
        radius="xl"
        style={{ width: 10, height: 10, padding: 0 }}
        onClick={() => onDotClick(index)}
      />
    ))}
  </Group>
);