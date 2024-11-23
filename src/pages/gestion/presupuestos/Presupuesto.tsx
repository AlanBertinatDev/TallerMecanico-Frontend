import React, { useState } from "react";
import usePresupuestos from "../../../hooks/usePresupuestos"; // Asegúrate de que el hook esté configurado correctamente
import PresupuestoRow from "../../../components/presupuestos/PresupuestoRow";
import PresupuestoModal from "../../../components/presupuestos/PresupuestoModal";
import { Button } from "../../../components/ui/Button";
import { Plus } from "lucide-react";
import PresupuestoFilters from "../../../components/presupuestos/PresupuestoFilters";

const PresupuestoPage = () => {
  const {
    presupuestos,
    loading,
    error,
    createPresupuesto,
    updatePresupuesto,
    deletePresupuesto,
  } = usePresupuestos();

  // Estado para manejar la visibilidad del modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para abrir el modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Estas funciones usan los métodos del hook para interactuar con la API
  const handleEdit = (id: number) => {
    // Aquí puedes usar updatePresupuesto para editar un presupuesto
    console.log(`Editar presupuesto con ID: ${id}`);
    // Llama a updatePresupuesto(id) si lo necesitas
  };

  const handleDelete = (id: number) => {
    // Aquí puedes usar deletePresupuesto para eliminar un presupuesto
    console.log(`Eliminar presupuesto con ID: ${id}`);
    // Llama a deletePresupuesto(id) si lo necesitas
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6">
      {/* Encabezado de la página */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Presupuestos</h1>
          <p className="mt-1 text-sm text-gray-500">GESTIÓN DE PRESUPUESTOS</p>
        </div>
        <Button
          className="mt-4 sm:mt-0"
          onClick={handleOpenModal} // Al hacer click, se abre el modal
        >
          <Plus className="w-4 h-4 mr-2" />
          Agregar presupuesto
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <PresupuestoFilters />
      </div>

      {/* Modal de creación de presupuesto */}
      {isModalOpen && (
        <PresupuestoModal
          onClose={handleCloseModal}
          createPresupuesto={createPresupuesto}
        />
      )}

      {/* Tabla de presupuestos */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2">PRECIO ESTIMADO</th>
                <th className="px-4 py-2">CLIENTE</th>
                <th className="px-4 py-2">VEHICULO</th>
                <th className="px-4 py-2">ESTADO</th>
                <th className="px-4 py-2">FECHA CREACION</th>
                <th className="px-4 py-2">FECHA REALIZADO</th>
                <th className="px-4 py-2">ACCIONES</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-center">
              {presupuestos.map((presupuesto) => (
                <PresupuestoRow
                  key={presupuesto.id}
                  presupuesto={presupuesto}
                  onEdit={() => handleEdit(presupuesto.id)} // Aquí se pasa la función de editar
                  onDelete={() => handleDelete(presupuesto.id)} // Aquí se pasa la función de eliminar
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PresupuestoPage;
