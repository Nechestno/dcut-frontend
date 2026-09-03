import type { Slide, SlideState } from "./types";
import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'slides-storage';

const INITIAL_SLIDES: Slide[] = [
    { id: uuidv4(), title: 'Первый слайд', annotation: 'Описание первого', isChecked: false },
    { id: uuidv4(), title: 'Второй слайд', annotation: 'Описание второго', isChecked: true },
    { id: uuidv4(), title: 'Третий слайд', annotation: 'Описание третьего', isChecked: false },
    { id: uuidv4(), title: 'Четвёртый слайд', annotation: 'Описание четвёртого', isChecked: true },
  ];

export const useSlideStore = create<SlideState>()(
    persist(
      (set) => ({
        slides: INITIAL_SLIDES,
        addSlide: (title, annotation) =>
          set((state) => ({
            slides: [...state.slides, { id: uuidv4(), title, annotation, isChecked: false }],
          })),
        deleteSlide: (id) =>
          set((state) => ({
            slides: state.slides.filter((slide) => slide.id !== id),
          })),
        toggleCheck: (id) =>
          set((state) => ({
            slides: state.slides.map((slide) =>
              slide.id === id ? { ...slide, isChecked: !slide.isChecked } : slide
            ),
          })),
        setSlides: (slides) => set({ slides }),
        resetSlides: () => set({ slides: INITIAL_SLIDES }),
        clearSlides: () => set({slides: []}),
      }),
      {
        name: STORAGE_KEY,
        storage: createJSONStorage(() => localStorage),
      }
    )
  );