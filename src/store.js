import { create } from "zustand";

const useStore = create((set) => ({
  // local data
  user: null,
  diseases: [],

  // session data
  isAnonymous: true,

  // getting started form data
  name: "",
  disease: "",

  // tracker form data
  stomachStatus: "",
  ingredients: [],

  // setting funcs
  setUser: (newUser) => set({ user: newUser }),
  setDiseases: (newDiseases) => set({ disease: newDiseases }),
  setIsAnonymous: (changedAnonStatus) =>
    set({ isAnonymous: changedAnonStatus }),
  setName: (name) => set({ name: name }),
  setDisease: (newDisease) => set({ disease: newDisease }),
  setStomachStatus: (newStomachStatus) =>
    set({ stomachStatus: newStomachStatus }),
  setIngredients: (newIngredients) => set({ ingredients: newIngredients }),
  resetForm: () => set({ stomachStatus: "", ingredients: [] }),
  resetNonForm: () => set({ disease: "", name: "", isAnonymous: true }),
}));

export default useStore;
