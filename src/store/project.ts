import type { Project } from "@/types/project.types";
import { create } from "zustand";

type ProjectStore = {
  project: Project | null;
  setProject: (project: Project) => void;
  updateProject: (fields: Partial<Project>) => void;
  clearProject: () => void;
  error: string | null;
  setError: (error: string | null) => void;
};

export const useProjectStore = create<ProjectStore>((set) => ({
  project: null,
  setProject: (project) => set({ project }),
  updateProject: (fields) =>
    set((state) => ({
      project: state.project ? { ...state.project, ...fields } : null,
    })),

  clearProject: () => set({ project: null }),
  error: null,
  setError: (error) => set({ error }),
}));
