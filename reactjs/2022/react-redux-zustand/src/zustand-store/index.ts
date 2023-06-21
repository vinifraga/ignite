import { create } from "zustand";

interface Course {
  id: number;
  modules: {
    id: number;
    title: string;
    lessons: {
      id: string;
      title: string;
      duration: string;
    }[]
  }[]
}

export interface PlayerState {
  currentModuleIndex: number;
  currentLessonIndex: number;
  course: Course | null;
  isLoading: boolean;

  play: (moduleAndLessonIndex: [number, number]) => void
  next: () => void
}

export const useStore = create<PlayerState>((set, get) => {
  return {
    course: null,
    currentModuleIndex: 0,
    currentLessonIndex: 0,
    isLoading: true,

    play: (moduleAndLessonIndex: [number, number]) => {
      const [moduleIndex, lessonIndex] = moduleAndLessonIndex;

      set({
        currentLessonIndex: lessonIndex,
        currentModuleIndex: moduleIndex
      })
    },
    next: () => {
      const { currentLessonIndex, currentModuleIndex, course } = get()
      const nextLessonIndex = currentLessonIndex + 1
      const nextLesson = course?.modules[currentModuleIndex].lessons[nextLessonIndex]

      if (nextLesson) {
        set({ currentLessonIndex: nextLessonIndex })
      } else {
        const nextModuleIndex = currentModuleIndex + 1
        const nextModule = course?.modules[nextModuleIndex]
  
        if (nextModule) {
          set({
            currentLessonIndex: 0,
            currentModuleIndex: nextModuleIndex
          })
        }
      }
    }
  }
})