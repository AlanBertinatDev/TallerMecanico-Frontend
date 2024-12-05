import React from "react";
import { IPresupuesto } from "../../types/presupuesto";

interface PresupuestoRowProps {
  presupuesto: IPresupuesto;
  onEdit: (presupuesto: IPresupuesto) => void;
  onDelete: (id: number) => void;
}

const PresupuestoRow: React.FC<PresupuestoRowProps> = ({
  presupuesto,
  onEdit,
  onDelete,
}) => {
  return (
    <tr>
      <td className="px-6 py-3 border-b">{presupuesto.total_estimado}</td>
      <td className="px-6 py-3 border-b">
        {presupuesto.cliente?.nombre || "No asignado"}
      </td>
      <td className="px-6 py-3 border-b">
        {presupuesto.vehiculo?.matricula || "No asignado"}
      </td>
      <td className="px-6 py-3 border-b">{presupuesto.estado}</td>
      <td className="px-6 py-3 border-b">{presupuesto.fecha_creacion}</td>
      <td className="px-6 py-3 border-b">
        {presupuesto.fecha_realizado || "No realizado"}
      </td>
      <td className="px-6 py-3 border-b">
        {presupuesto.productos
          .map((producto) => `${producto.nombre} (x${producto.cantidad})`)
          .join(", ") || "Sin productos"}
      </td>
      <td className="px-6 py-3 border-b">
        <button className="text-blue-500" onClick={() => onEdit(presupuesto)}>
          Editar
        </button>
        <button
          className="text-red-500 ml-2"
          onClick={() => onDelete(presupuesto.id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default PresupuestoRow;
