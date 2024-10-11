import { create } from "zustand";

const useStore = create((set) => ({
  user: null,
  isAnonymous: true,
  hasDisease: false,
  disease: "",
  stomachStatus: "",
  ingredients: [],
  setUser: (newUser) => set({ user: newUser }),
  setIsAnonymous: (changedAnonStatus) =>
    set({ isAnonymous: changedAnonStatus }),
  setHasDisease: (newDiseaseStatus) => set({ hasDisease: newDiseaseStatus }),
  setDisease: (newDisease) => set({ disease: newDisease }),
  setStomachStatus: (newStomachStatus) =>
    set({ stomachStatus: newStomachStatus }),
  setIngredients: (newIngredients) => set({ ingredients: newIngredients }),
  resetForm: () => set({ disease: "", stomachStatus: "", ingredients: [] }),
}));

export default useStore;
