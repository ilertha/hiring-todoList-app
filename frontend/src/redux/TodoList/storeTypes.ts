// storeTypes.ts
import todoReducer from "./todoReducer";

// Type representing the overall Redux state
export type RootState = ReturnType<typeof todoReducer>;
