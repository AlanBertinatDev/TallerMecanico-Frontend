import { useState, useEffect } from "react";
import api from "../lib/axios";
import { Presupuesto } from "../types/presupuesto";

const usePresupuestos = () => {
  // Estado para almacenar los presupuestos y el estado de carga
  const [presupuestos, setPresupuestos] = useState<Presupuesto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para obtener los presupuestos
  const fetchPresupuestos = async () => {
    setLoading(true);
    try {
      const response = await api.get("/presupuestos");
      setPresupuestos(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Llamamos a fetchPresupuestos cuando el hook se monta
  useEffect(() => {
    fetchPresupuestos();
  }, []);

  // Función para crear un presupuesto
  const createPresupuesto = async (
    nuevoPresupuesto: Presupuesto
  ): Promise<void> => {
    try {
      await api.post("/presupuestos", nuevoPresupuesto);
      fetchPresupuestos();
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Función para actualizar un presupuesto
  const updatePresupuesto = async (
    id: number,
    presupuestoActualizado: Presupuesto
  ) => {
    try {
      await api.put(`/presupuestos/${id}`, presupuestoActualizado);
      fetchPresupuestos();
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Función para eliminar un presupuesto
  const deletePresupuesto = async (id: number) => {
    try {
      await api.delete(`/presupuestos/${id}`);
      fetchPresupuestos();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return {
    presupuestos,
    loading,
    error,
    createPresupuesto,
    updatePresupuesto,
    deletePresupuesto,
  };
};

export default usePresupuestos;
