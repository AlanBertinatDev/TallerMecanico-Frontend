import React, { useState } from "react";
import { Presupuesto } from "../../types/presupuesto";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { Button } from "../ui/Button";
import { Pencil, Trash2, Check, X } from "lucide-react";

interface PresupuestoRowProps {
  presupuesto: Presupuesto;
  onEdit: (id: number) => void; // Debe aceptar un ID para editar
  onDelete: (id: number) => void; // Debe aceptar un ID para eliminar
}

export const PresupuestoRow: React.FC<PresupuestoRowProps> = ({
  presupuesto,
  onEdit,
  onDelete,
}) => {
  const [editedPresupuesto, setEditedPresupuesto] = useState(presupuesto);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmitRow = (updatePresupuesto: Presupuesto) => {
    onUpdate(updatePresupuesto);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // recarga valor del formulario si el usuario lo edito y cancela.
    reset();
    // oculta el modo edición.
    setIsEditing(false);
  };

  // useForm a modo de validaciones
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      estado: editedPresupuesto.estado,
      fecha_creacion: editedPresupuesto.fecha_creacion,
      fecha_realizado: editedPresupuesto.fecha_realizado,
      total_estimado: editedPresupuesto.total_estimado,
      cliente_id: editedPresupuesto.cliente_id,
      vehiculo_id: editedPresupuesto.vehiculo_id,
    },
  });

  if (isEditing) {
    const dataNow = new Date().getDate;
    return (
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap">
          <input
            type="text"
            {...register("total_estimado", {
              required: "El precio es obligatorio.",
              min: {
                value: 1,
                message: "El precio debe ser mayor a 0",
              },
            })}
            defaultValue={editedPresupuesto.total_estimado}
            className={`w-full px-2 py-1 border rounded ${
              errors.total_estimado ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.total_estimado && (
            <p className="text-red-500 text-sm mt-1">
              {errors.total_estimado.message}
            </p>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <input
            type="text"
            {...register("cliente_id", {
              required: "El cliente es obligatorio",
            })}
            defaultValue={editedPresupuesto.cliente_id}
            className={`w-full px-2 py-1 border rounded ${
              errors.cliente_id ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.cliente_id && (
            <p className="text-red-500 text-sm mt-1">
              {errors.cliente_id.message}
            </p>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <input
            type="number"
            {...register("vehiculo_id", {
              required: "Debe tener vehiculo asociado.",
            })}
            defaultValue={editedPresupuesto.vehiculo_id}
            className={`w-full px-2 py-1 border rounded ${
              errors.vehiculo_id ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.vehiculo_id && (
            <p className="text-red-500 text-sm mt-1">
              {errors.vehiculo_id.message}
            </p>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <input
            type="string"
            {...register("estado", {
              required: "Estado es obligatorio.",
            })}
            defaultValue={editedPresupuesto.estado}
            className={`w-full px-2 py-1 border rounded ${
              errors.estado ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.estado && (
            <p className="text-red-500 text-sm mt-1">{errors.estado.message}</p>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <input
            type="date"
            {...register("fecha_realizado", {})}
            defaultValue={
              editedPresupuesto.fecha_realizado
                ? new Date(editedPresupuesto.fecha_realizado)
                    .toISOString()
                    .split("T")[0]
                : new Date().toISOString().split("T")[0]
            }
            className={`w-full px-2 py-1 border rounded ${
              errors.fecha_realizado ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.fecha_realizado && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fecha_realizado.message}
            </p>
          )}
        </td>

        <td className="px-6 py-4 whitespace-nowrap">
          <input
            disabled={true}
            type="boolean"
            defaultValue={editedPresupuesto.fecha_creacion}
            {...register("fecha_creacion", {})}
          />
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right">
          <Button
            variant="secondary"
            className="mr-2"
            onClick={handleSubmit((data) => {
              const updatePresupuesto = {
                ...editedPresupuesto,
                estado: data.estado,
                cliente_id: data.cliente_id,
                fecha_creacion: data.fecha_creacion,
                fecha_realizado: data.fecha_realizado,
                total_estimado: data.total_estimado,
                vehiculo_id: data.vehiculo_id,
              };

              setEditedPresupuesto(updatePresupuesto);
              handleSubmitRow(updatePresupuesto);
            })}
          >
            <Check className="w-4 h-4" />
          </Button>
          <Button variant="danger" onClick={handleCancel}>
            <X className="w-4 h-4" />
          </Button>
        </td>
      </tr>
    );
  }

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          $
          {presupuesto.total_estimado
            ? presupuesto.total_estimado.toFixed(2)
            : 0.0}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div
          className={clsx(
            "text-sm font-medium text-gray-900 rounded-full",
            presupuesto.cliente_id == null ? "bg-red-200 text-red-600" : ""
          )}
        >
          {/* Aquí debes cargar el nombre del cliente */}
          {presupuesto.cliente_id ?? "Sin asignar"}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div
          className={clsx(
            "text-sm font-medium text-gray-900 rounded-full",
            presupuesto.vehiculo_id == null ? "bg-red-200 text-red-600 " : ""
          )}
        >
          {/* Aquí debes cargar el nombre del vehículo */}
          {presupuesto.vehiculo_id ?? "Sin asignar"}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={clsx(
            "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
            presupuesto.estado === "PENDIENTE"
              ? "bg-green-800 text-zinc-100"
              : "bg-red-500 text-zinc-100"
          )}
        >
          {presupuesto.estado}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {new Date(presupuesto.fecha_creacion).toLocaleDateString()}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {presupuesto.fecha_realizado
            ? new Date(presupuesto.fecha_realizado).toLocaleDateString()
            : "No realizado"}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Button
          variant="secondary"
          className="mr-2"
          onClick={() => setIsEditing(true)}
        >
          <Pencil className="w-4 h-4" />
        </Button>
        <Button variant="danger" onClick={() => onDelete(presupuesto.id)}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </td>
    </tr>
  );
};

export default PresupuestoRow;
