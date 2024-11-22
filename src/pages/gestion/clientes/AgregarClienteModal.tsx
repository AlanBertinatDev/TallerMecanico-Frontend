import React, { useState } from "react";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Cliente, Vehiculo } from "../../../types";
import { X } from "lucide-react";
import api from "../../../lib/axios";

interface AgregarClienteModalProps {
  onClose: () => void;
  onSave: (cliente: Cliente) => void;
}

type VehiculoNuevo = Omit<Vehiculo, "id"> & { id?: number };

const AgregarClienteModal: React.FC<AgregarClienteModalProps> = ({
  onClose,
  onSave,
}) => {
  const [nombre, setNombre] = useState("");
  const [contacto, setContacto] = useState("");
  const [vehiculos, setVehiculos] = useState<VehiculoNuevo[]>([]);

  const handleAgregarVehiculo = () => {
    setVehiculos([
      ...vehiculos,
      {
        tipo: "",
        color: "",
        marca: "",
        modelo: "",
        matricula: "",
        kilometros: 0,
        cliente: null,
      },
    ]);
  };

  const handleEliminarVehiculo = (index: number) => {
    setVehiculos(vehiculos.filter((_, i) => i !== index));
  };

  const handleChangeVehiculo = (
    index: number,
    field: keyof VehiculoNuevo,
    value: string | number
  ) => {
    const updatedVehiculos = vehiculos.map((vehiculo, i) =>
      i === index ? { ...vehiculo, [field]: value } : vehiculo
    );
    setVehiculos(updatedVehiculos);
  };

  const handleGuardarCliente = async () => {
    // Crear los vehículos sin ID antes de enviar al backend
    const vehiculosSinId: Omit<Vehiculo, "id">[] = vehiculos.map(
      ({ tipo, color, marca, modelo, matricula, kilometros, cliente }) => ({
        tipo,
        color,
        marca,
        modelo,
        matricula,
        kilometros,
        cliente,
      })
    );

    const nuevoCliente = {
      nombre,
      contacto,
      vehiculos: vehiculosSinId,
    };

    try {
      const response = await api.post<Cliente>("/clientes", nuevoCliente);
      console.log("Se dió de alta nuevo cliente " + response.data);
      onSave(response.data);
    } catch (error) {
      console.error("Error al guardar el cliente:", error);
    }
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
        <h2 className="text-xl font-bold text-center">Nuevo Cliente</h2>
        <Input
          placeholder="Nombre del cliente"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="my-2"
        />
        <Input
          placeholder="Celular de contacto"
          value={contacto}
          onChange={(e) => setContacto(e.target.value)}
          className="my-2"
        />

        {vehiculos.map((vehiculo, index) => (
          <div key={index} className="mt-4 border p-4 rounded relative">
            <h3 className="text-xl font-bold text-center text-color">
              Vehículo {index + 1}
            </h3>
            <button
              onClick={() => handleEliminarVehiculo(index)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              <X />
            </button>
            <Input
              placeholder="Tipo de vehículo"
              value={vehiculo.tipo}
              onChange={(e) =>
                handleChangeVehiculo(index, "tipo", e.target.value)
              }
              className="my-2"
            />
            <Input
              placeholder="Color principal"
              value={vehiculo.color}
              onChange={(e) =>
                handleChangeVehiculo(index, "color", e.target.value)
              }
              className="my-2"
            />
            <Input
              placeholder="Marca"
              value={vehiculo.marca}
              onChange={(e) =>
                handleChangeVehiculo(index, "marca", e.target.value)
              }
              className="my-2"
            />
            <Input
              placeholder="Modelo"
              value={vehiculo.modelo}
              onChange={(e) =>
                handleChangeVehiculo(index, "modelo", e.target.value)
              }
              className="my-2"
            />
            <Input
              placeholder="Matrícula"
              value={vehiculo.matricula}
              onChange={(e) =>
                handleChangeVehiculo(index, "matricula", e.target.value)
              }
              className="my-2"
            />
            <Input
              type="number"
              placeholder="Kilómetros"
              value={vehiculo.kilometros}
              onChange={(e) =>
                handleChangeVehiculo(
                  index,
                  "kilometros",
                  Number(e.target.value)
                )
              }
              className="my-2"
            />
          </div>
        ))}
        <div className="mt-4 flex justify-center space-x-4">
          <Button
            onClick={handleAgregarVehiculo}
            className="w-2/5 bg-blue-500 mt-2 hover:bg-blue-700"
          >
            Agregar Vehículo
          </Button>

          <Button
            onClick={handleGuardarCliente}
            className="w-2/5 bg-blue-500 mt-2 hover:bg-blue-700"
          >
            Guardar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AgregarClienteModal;
