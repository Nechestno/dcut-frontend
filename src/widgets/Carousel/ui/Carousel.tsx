import { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Container, Paper, Group, Badge, Text, ActionIcon, Checkbox } from '@mantine/core';
import { CarouselNavigation } from './CarouselNavigation';
import { CarouselPagination } from './CarouselPagination';
import { useSlideStore } from '@/entities/slide';
import { IconTrash } from '@tabler/icons-react';
import styles from './Carousel.module.css';

interface CarouselProps {
  onDeleteSlide?: (id: string) => void;
}

export const Carousel = ({ onDeleteSlide }: CarouselProps) => {
  const slides = useSlideStore((state) => state.slides);
  const toggleCheck = useSlideStore((state) => state.toggleCheck);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: slides.length > 1,
    align: 'center',
    containScroll: 'keepSnaps',
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = () => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  };

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
    setScrollSnaps(emblaApi.scrollSnapList());
    setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
  }, [slides, emblaApi]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <Container mx={0} style={{ position: 'relative' }} maw={'100%'}>
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.container} style={{justifyContent: slides.length === 1 ? 'center' : 'normal'}}>
          {slides.map((slide) => (
            <div className={styles.slide} key={slide.id}>
              <Paper shadow="sm" p="lg" withBorder h="100%" style={{ display: 'flex', flexDirection: 'column' }}>
                <Group justify="space-between" mb="md">
                  <Text fw={700} size="lg">{slide.title}</Text>
                  <Checkbox
                    checked={slide.isChecked}
                    onChange={() => toggleCheck(slide.id)}
                    label="Отмечено"
                  />
                </Group>

                <Text size="sm" c="dimmed" style={{ flex: 1 }}>
                  {slide.annotation}
                </Text>

                <Group justify="space-between" mt="md">
                  <Badge color={slide.isChecked ? 'green' : 'gray'} variant="light">
                    {slide.isChecked ? 'Активен' : 'Неактивен'}
                  </Badge>
                  <ActionIcon
                    size="lg"
                    color="red"
                    variant="outline"
                    onClick={() => onDeleteSlide?.(slide.id)}
                  >
                    <IconTrash />
                  </ActionIcon>
                </Group>
              </Paper>
            </div>
          ))}
        </div>
      </div>

      <CarouselNavigation onPrev={scrollPrev} onNext={scrollNext} />
      <CarouselPagination
        total={scrollSnaps.length}
        selected={selectedIndex}
        onDotClick={(index) => emblaApi?.scrollTo(index)}
      />
    </Container>
  );
};