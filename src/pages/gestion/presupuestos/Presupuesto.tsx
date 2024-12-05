import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../slices/store"; // Ajusta el path según tu estructura
import {
  addPresupuesto,
  updatePresupuesto,
  deletePresupuesto,
  setPresupuestos,
} from "../../../slices/presupuestosSlice";
import {
  PresupuestoDTO,
  IPresupuesto,
  IPresupuestoForm,
} from "../../../types/presupuesto";
import PresupuestoRow from "../../../components/presupuestos/PresupuestoRow";
import { Button } from "../../../components/ui/Button";
import axios from "../../../lib/axios"; // Configuración centralizada de Axios

const Presupuesto: React.FC = () => {
  const dispatch = useDispatch();
  const presupuestos = useSelector(
    (state: RootState) => state.presupuestos.presupuestos
  );

  useEffect(() => {
    const fetchPresupuestos = async () => {
      try {
        // Fetch inicial al backend
        const response = await axios.get<PresupuestoDTO>("/presupuestos/data");

        console.log(response.data);

        // Mapear presupuestos con datos relacionados
        const presupuestosConRelaciones = response.data.presupuestos.map(
          (presupuesto) => ({
            ...presupuesto,
            cliente: response.data.clientes.find(
              (cliente) => cliente.id === presupuesto.cliente_id
            ),
            vehiculo: response.data.vehiculos.find(
              (vehiculo) => vehiculo.id === presupuesto.vehiculo_id
            ),
            productos: presupuesto.productos.map((p) => ({
              ...p,
              nombre: response.data.productos.find(
                (prod) => prod.id === p.producto_id
              )?.nombre,
              categoria: response.data.productos.find(
                (prod) => prod.id === p.producto_id
              )?.categoria,
            })),
          })
        );

        // Guardar en Redux
        dispatch(setPresupuestos(presupuestosConRelaciones));
      } catch (error) {
        console.error("Error al cargar los datos de presupuestos", error);
      }
    };

    fetchPresupuestos();
  }, [dispatch]);

  const handleAddPresupuesto = async () => {
    const newPresupuesto: IPresupuestoForm = {
      cliente_id: 1, // Asigna un cliente por defecto o usa un formulario para elegirlo
      vehiculo_id: 1, // Similar para el vehículo
      productos: [
        { producto_id: 1, cantidad: 2 }, // Datos seleccionados en el formulario
      ],
      total_estimado: 0,
    };

    try {
      const response = await axios.post<IPresupuesto>(
        "/api/presupuestos",
        newPresupuesto
      );
      dispatch(addPresupuesto(response.data));
    } catch (error) {
      console.error("Error al agregar presupuesto", error);
    }
  };
  const handleEditPresupuesto = async (updatedPresupuesto: IPresupuesto) => {
    try {
      const response = await axios.put<IPresupuesto>(
        `/api/presupuestos/${updatedPresupuesto.id}`,
        updatedPresupuesto
      );
      dispatch(updatePresupuesto(response.data));
    } catch (error) {
      console.error("Error al actualizar presupuesto", error);
    }
  };

  const handleDeletePresupuesto = async (id: number) => {
    try {
      await axios.delete(`/api/presupuestos/${id}`);
      dispatch(deletePresupuesto(id));
    } catch (error) {
      console.error("Error al eliminar presupuesto", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestión de Presupuestos</h1>
        <Button variant="primary" onClick={handleAddPresupuesto}>
          Nuevo Presupuesto
        </Button>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b">Total Estimado</th>
            <th className="px-6 py-3 border-b">Cliente</th>
            <th className="px-6 py-3 border-b">Vehículo</th>
            <th className="px-6 py-3 border-b">Estado</th>
            <th className="px-6 py-3 border-b">Fecha Creación</th>
            <th className="px-6 py-3 border-b">Fecha Realizado</th>
            <th className="px-6 py-3 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {presupuestos.map((presupuesto) => (
            <PresupuestoRow
              key={presupuesto.id}
              presupuesto={presupuesto}
              onEdit={handleEditPresupuesto}
              onDelete={handleDeletePresupuesto}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Presupuesto;
