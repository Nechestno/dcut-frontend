export interface Slide {
    id: string;
    title: string;
    annotation?: string;
    isChecked: boolean;
}

export interface SlideState {
    slides: Slide[];
    addSlide: (title: string, annotation?: string) => void;
    deleteSlide: (id: string) => void;
    toggleCheck: (id: string) => void;
    setSlides: (slides: Slide[]) => void;
    resetSlides: () => void;
    clearSlides: () => void;
}