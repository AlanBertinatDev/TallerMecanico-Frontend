import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPresupuesto } from "../types/presupuesto";

interface PresupuestosState {
  presupuestos: IPresupuesto[];
}

const initialState: PresupuestosState = {
  presupuestos: [],
};

const presupuestosSlice = createSlice({
  name: "presupuestos",
  initialState,
  reducers: {
    setPresupuestos(state, action: PayloadAction<IPresupuesto[]>) {
      state.presupuestos = action.payload;
    },
    addPresupuesto(state, action: PayloadAction<IPresupuesto>) {
      state.presupuestos.push(action.payload);
    },
    updatePresupuesto(state, action: PayloadAction<IPresupuesto>) {
      const index = state.presupuestos.findIndex(
        (p) => p.id === action.payload.id
      );
      if (index !== -1) {
        state.presupuestos[index] = action.payload;
      }
    },
    deletePresupuesto(state, action: PayloadAction<number>) {
      state.presupuestos = state.presupuestos.filter(
        (p) => p.id !== action.payload
      );
    },
  },
});

export const {
  setPresupuestos,
  addPresupuesto,
  updatePresupuesto,
  deletePresupuesto,
} = presupuestosSlice.actions;

export default presupuestosSlice.reducer;
