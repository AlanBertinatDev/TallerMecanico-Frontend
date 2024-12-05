import { configureStore } from "@reduxjs/toolkit";
import presupuestosReducer from "./presupuestosSlice";

// Aca es donde contiene la información.
const store = configureStore({
  reducer: {
    presupuestos: presupuestosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
