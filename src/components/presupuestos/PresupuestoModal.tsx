import React, { useState } from "react";
import { Presupuesto } from "../../types/presupuesto";

interface PresupuestoModalProps {
  onClose: () => void;
  createPresupuesto: (presupuesto: Presupuesto) => Promise<void>; // Espera una función asincrónica
}

const PresupuestoModal: React.FC<PresupuestoModalProps> = ({
  onClose,
  createPresupuesto,
}) => {
  const [nuevoPresupuesto, setNuevoPresupuesto] = useState<Presupuesto>({
    id: 0,
    cliente_id: 0, // Inicializa los valores según corresponda
    vehiculo_id: 0,
    total_estimado: 0,
    estado: "PENDIENTE",
    fecha_creacion: "",
    fecha_realizado: null, // Si es necesario
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNuevoPresupuesto((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const { id, ...presupuestoSinId } = nuevoPresupuesto; // Excluye `id`
      await createPresupuesto(presupuestoSinId as Presupuesto); // Forza el tipo a `Presupuesto`
      onClose(); // Cierra el modal después de guardar
    } catch (error) {
      console.error("Error al guardar el presupuesto", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Agregar Presupuesto</h2>
        {/* Aquí puedes agregar los campos del formulario */}
        <input
          type="text"
          name="cliente_id"
          value={nuevoPresupuesto.cliente_id}
          onChange={handleChange}
        />
        <input
          type="text"
          name="vehiculo_id"
          value={nuevoPresupuesto.vehiculo_id}
          onChange={handleChange}
        />
        {/* Añade los demás campos aquí */}
        <button onClick={handleSave}>Guardar</button>
      </div>
    </div>
  );
};

export default PresupuestoModal;
