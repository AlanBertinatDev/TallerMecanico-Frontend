import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import type { ProductoType as Producto } from "../../types/productoType";
import { X } from "lucide-react";

interface AddProductModalProps {
  onClose: () => void;
  onSave: (product: Omit<Producto, "id">) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  onClose,
  onSave,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<Producto, "id">>();

  const onFormSubmit = (data: Omit<Producto, "id">) => {
    onSave(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-4 text-red-300 hover:text-red-500"
        >
          <X />
        </button>
        <h2 className="text-xl font-bold text-center">Nuevo Producto</h2>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
            <Input
              placeholder="Agregue nombre del producto..."
              label="Nombre"
              {...register("nombre", { required: "El nombre es obligatorio" })}
              error={errors.nombre?.message}
            />
            <Input
              placeholder="Agregue descripción del producto... "
              label="Descripción"
              {...register("descripcion", {
                required: "La descripción es obligatoria",
              })}
              error={errors.descripcion?.message}
            />
            <Input
              placeholder="Agregue precio de compra del producto... "
              label="Precio Compra"
              type="number"
              step="0.01"
              {...register("precioCompra", {
                required: "El precio de compra es obligatorio",
                min: {
                  value: 0,
                  message: "El precio de compra no puede ser negativo",
                },
              })}
              error={errors.precioCompra?.message}
            />
            <Input
              placeholder="Agregue precio de venta del producto... "
              label="Precio Venta"
              type="number"
              step="0.01"
              {...register("precioVenta", {
                required: "El precio de venta es obligatorio",
                min: {
                  value: 1,
                  message: "El precio de venta debe ser mayor a 0",
                },
              })}
              error={errors.precioVenta?.message}
            />
            <Input
              placeholder="Agregue stock del producto... "
              label="Stock"
              type="number"
              {...register("stock", {
                required: "El stock es obligatorio",
                min: {
                  value: 0,
                  message: "El stock no puede ser negativo",
                },
              })}
              error={errors.stock?.message}
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Agregar Producto</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
