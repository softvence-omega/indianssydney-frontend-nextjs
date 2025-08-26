// store/slices/languageSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LanguageState {
  selectedLang: string; // e.g., "en-AU", "en-US", "en-GB"
}

const initialState: LanguageState = {
  selectedLang:
    typeof window !== "undefined" ? navigator.language || "en-AU" : "en-AU",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.selectedLang = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
