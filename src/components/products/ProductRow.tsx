import React, { useState } from "react";
import { Pencil, Trash2, Check, X } from "lucide-react";
import { Button } from "../ui/Button";
import clsx from "clsx";

import type {
  ProductoType as Producto,
  ProductoType,
} from "../../types/productoType";
import { useForm } from "react-hook-form";

interface ProductRowProps {
  product: Producto;
  onUpdate: (product: Producto) => void;
  onDelete: (id: number) => void;
  lowStockThreshold: number;
}

export const ProductRow: React.FC<ProductRowProps> = ({
  product,
  onUpdate,
  onDelete,
  lowStockThreshold,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);

  const handleSubmit = (updatedProduct: ProductoType) => {
    console.log("LLega a subir el update");
    onUpdate(updatedProduct);
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
    handleSubmit: handleFormSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: editedProduct.nombre,
      descripcion: editedProduct.descripcion,
      precio_compra: editedProduct.precioCompra,
      precio_venta: editedProduct.precioVenta,
      stock: editedProduct.stock,
    },
  });

  if (isEditing) {
    return (
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap">
          <input
            type="text"
            {...register("nombre", {
              required: "El nombre es obligatorio.",
              maxLength: {
                value: 30,
                message: "El nombre no puede superar los 30 caracteres.",
              },
            })}
            defaultValue={editedProduct.nombre}
            className={`w-full px-2 py-1 border rounded ${
              errors.nombre ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.nombre && (
            <p className="text-red-500 text-sm mt-1">{errors.nombre.message}</p>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <input
            type="text"
            {...register("descripcion", {
              required: "La descripción es obligatoria",
              maxLength: {
                value: 100,
                message: "La descripción no puede superar los 100 caracteres.",
              },
            })}
            defaultValue={editedProduct.descripcion}
            className={`w-full px-2 py-1 border rounded ${
              errors.descripcion ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.descripcion && (
            <p className="text-red-500 text-sm mt-1">
              {errors.descripcion.message}
            </p>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <input
            type="number"
            {...register("precio_compra", {
              required: "Precio de compra es obligatorio.",
              min: {
                value: 1,
                message: "El precio de compra debe ser mayor a 0",
              },
            })}
            defaultValue={editedProduct.precioCompra}
            className={`w-full px-2 py-1 border rounded ${
              errors.precio_compra ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.precio_compra && (
            <p className="text-red-500 text-sm mt-1">
              {errors.precio_compra.message}
            </p>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <input
            type="number"
            {...register("precio_venta", {
              required: "Precio de venta es obligatorio.",
              min: {
                value: 1,
                message: "Precio de venta debe ser mayor a 0.",
              },
            })}
            className={`w-full px-2 py-1 border rounded ${
              errors.precio_venta ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.precio_venta && (
            <p className="text-red-500 text-sm mt-1">
              {errors.precio_venta.message}
            </p>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <input
            type="number"
            {...register("stock", {
              required: "Stock es obligatorio.",
              min: {
                value: 1,
                message: "El stock debe ser mayor a 0",
              },
            })}
            className={`w-full px-2 py-1 border rounded ${
              errors.stock ? "border-red-500" : "border-gray-300"
            }`}
          />

          {errors.stock && (
            <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right">
          <Button
            variant="secondary"
            className="mr-2"
            onClick={handleFormSubmit((data) => {
              const updatedProduct = {
                ...editedProduct,
                nombre: data.nombre,
                descripcion: data.descripcion,
                stock: data.stock,
                precioCompra: data.precio_compra,
                precioVenta: data.precio_venta,
              };

              setEditedProduct(updatedProduct);
              handleSubmit(updatedProduct);
              console.log("Datos válidos:", updatedProduct);
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
          {product.nombre}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{product.descripcion}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        ${product.precioCompra ? product.precioCompra.toFixed(2) : 0.0}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        ${product.precioVenta ? product.precioVenta.toFixed(2) : 0.0}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={clsx(
            "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
            product.stock <= lowStockThreshold
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          )}
        >
          {product.stock}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Button
          variant="secondary"
          className="mr-2"
          onClick={() => setIsEditing(true)}
        >
          <Pencil className="w-4 h-4" />
        </Button>
        <Button variant="danger" onClick={() => onDelete(product.id)}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </td>
    </tr>
  );
};
