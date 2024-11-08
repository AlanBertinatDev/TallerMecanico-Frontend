import React, { useState, useEffect } from "react";
import {
  Plus,
  Pencil,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  Save,
  XCircle,
  PlusCircle,
  Edit,
} from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import api from "../../../lib/axios";
import type { Cliente, Cliente as ClienteType, Vehiculo } from "../../../types";
import AgregarClienteModal from "./AgregarClienteModal"; // Este sigue siendo el modal de agregar clientes.

const Clientes: React.FC = () => {
  const [clientes, setClientes] = useState<ClienteType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedClienteId, setExpandedClienteId] = useState<number | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [clientesPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Estado para el modal de edición
  const [clienteToEdit, setClienteToEdit] = useState<ClienteType | null>(null); // Cliente a editar

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await api.get("/clientes");
      console.log("Datos de clientes recibidos:", response.data);
      setClientes(response.data);
    } catch (error) {
      console.error("Error al obtener los clientes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleExpandCliente = (clienteId: number) => {
    setExpandedClienteId(expandedClienteId === clienteId ? null : clienteId);
  };

  // Filtrar clientes por término de búsqueda antes de la paginación
  const filteredClientes = clientes.filter(
    (cliente) =>
      cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.contacto.includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredClientes.length / clientesPerPage);
  const indexOfLastCliente = currentPage * clientesPerPage;
  const indexOfFirstCliente = indexOfLastCliente - clientesPerPage;
  const currentClientes = filteredClientes.slice(
    indexOfFirstCliente,
    indexOfLastCliente
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  // Modificacion de cliente
  const handleSaveCliente = async (cliente: Cliente) => {
    try {
      await api.put(`/clientes/${cliente.id}`, cliente); // Enviamos los cambios al backend
      fetchClientes(); // Actualizamos la lista de clientes después de guardar los cambios
      setIsEditModalOpen(false); // Cerramos el modal de edición
    } catch (error) {
      console.error("Error al actualizar el cliente:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Gestión de Clientes
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Administra tus clientes y sus vehículos
          </p>
        </div>

        {/* Botón para agregar clientes */}
        <Button className="mt-4 sm:mt-0" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" /> Agregar Cliente
        </Button>

        {isModalOpen && (
          <AgregarClienteModal
            onClose={() => setIsModalOpen(false)}
            onSave={(cliente) => {
              handleSaveCliente(cliente);
              setIsModalOpen(false);
            }}
          />
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Input
          placeholder="Buscar clientes por nombre"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="min-w-[150px] sm:min-w-[200px] md:min-w-[300px] lg:min-w-[400px] max-w-full"
        />
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contacto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vehículos
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Modificar
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentClientes.map((cliente) => (
              <React.Fragment key={cliente.id}>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {cliente.nombre}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {cliente.contacto}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Button onClick={() => toggleExpandCliente(cliente.id)}>
                      {expandedClienteId === cliente.id ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </Button>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                    <Button
                      variant="secondary"
                      className="mr-2"
                      onClick={() => {
                        setClienteToEdit(cliente); // Asignamos el cliente a editar
                        setIsEditModalOpen(true); // Abrimos el modal de edición
                      }}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
                {expandedClienteId === cliente.id && (
                  <tr>
                    <td colSpan={4} className="bg-gray-100">
                      <VehiculosList cliente={cliente} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            {filteredClientes.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No se encontraron clientes
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-gray-600">Total de páginas: {totalPages}</p>
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ArrowLeft />
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <Button
              key={number}
              variant={number === currentPage ? "primary" : "secondary"}
              onClick={() => paginate(number)}
            >
              {number}
            </Button>
          ))}
          <Button
            variant="secondary"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ArrowRight />
          </Button>
        </div>
      </div>

      {/* Modal de edición del cliente */}
      {isEditModalOpen && clienteToEdit && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Editar Cliente</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveCliente(clienteToEdit);
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <Input
                  type="text"
                  value={clienteToEdit.nombre}
                  onChange={(e) =>
                    setClienteToEdit({
                      ...clienteToEdit,
                      nombre: e.target.value,
                    })
                  }
                  className="mt-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Celular
                </label>
                <Input
                  type="number"
                  value={clienteToEdit.contacto}
                  onChange={(e) =>
                    setClienteToEdit({
                      ...clienteToEdit,
                      contacto: e.target.value,
                    })
                  }
                  className="mt-2"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  <XCircle className="w-4 h-4 mr-2" /> Cancelar
                </Button>
                <Button type="submit" variant="primary">
                  <Save className="w-4 h-4 mr-2" /> Guardar Cambios
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Componente para mostrar o editar vehículos
const VehiculosList: React.FC<{ cliente: Cliente }> = ({ cliente }) => {
  const [vehiculos, setVehiculos] = useState(cliente.vehiculos);
  const [editableVehiculoId, setEditableVehiculoId] = useState<number | null>(
    null
  );
  const [newVehiculo, setNewVehiculo] = useState<Vehiculo | null>(null);

  const handleEditVehiculo = (vehiculoId: number) => {
    setEditableVehiculoId(vehiculoId);
  };

  const handleSaveVehiculo = async (vehiculo: Vehiculo) => {
    try {
      await api.put(`/vehiculos/${vehiculo.id}`, vehiculo);
      setVehiculos((prevVehiculos) =>
        prevVehiculos.map((v) => (v.id === vehiculo.id ? vehiculo : v))
      );
      setEditableVehiculoId(null);
    } catch (error) {
      console.error("Error al guardar el vehículo:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditableVehiculoId(null);
  };

  const handleAddNewVehiculo = async (clienteId: number) => {
    if (newVehiculo) {
      try {
        const response = await api.post(
          `/clientes/${clienteId}/vehiculos`,
          newVehiculo
        );
        setVehiculos([...vehiculos, response.data]);
        setNewVehiculo(null);
      } catch (error) {
        console.error("Error al agregar vehículo:", error);
      }
    }
  };

  return (
    <div className="p-4">
      <table className="min-w-full divide-y divide-gray-200 table-auto">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Color</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Matrícula</th>
            <th>Kilómetros</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {vehiculos.map((vehiculo) => (
            <tr key={vehiculo.id} className="hover:bg-gray-50 text-center">
              {editableVehiculoId === vehiculo.id ? (
                <>
                  <td className="text-center">
                    <Input
                      value={vehiculo.tipo}
                      onChange={(e) =>
                        setVehiculos((prev) =>
                          prev.map((v) =>
                            v.id === vehiculo.id
                              ? { ...v, tipo: e.target.value }
                              : v
                          )
                        )
                      }
                    />
                  </td>
                  <td>
                    <Input
                      value={vehiculo.color}
                      onChange={(e) =>
                        setVehiculos((prev) =>
                          prev.map((v) =>
                            v.id === vehiculo.id
                              ? { ...v, color: e.target.value }
                              : v
                          )
                        )
                      }
                    />
                  </td>
                  <td>
                    <Input
                      value={vehiculo.marca}
                      onChange={(e) =>
                        setVehiculos((prev) =>
                          prev.map((v) =>
                            v.id === vehiculo.id
                              ? { ...v, marca: e.target.value }
                              : v
                          )
                        )
                      }
                    />
                  </td>
                  <td>
                    <Input
                      value={vehiculo.modelo}
                      onChange={(e) =>
                        setVehiculos((prev) =>
                          prev.map((v) =>
                            v.id === vehiculo.id
                              ? { ...v, modelo: e.target.value }
                              : v
                          )
                        )
                      }
                    />
                  </td>
                  <td>
                    <Input
                      value={vehiculo.matricula}
                      onChange={(e) =>
                        setVehiculos((prev) =>
                          prev.map((v) =>
                            v.id === vehiculo.id
                              ? { ...v, matricula: e.target.value }
                              : v
                          )
                        )
                      }
                    />
                  </td>
                  <td>
                    <Input
                      type="number"
                      value={vehiculo.kilometros.toString()}
                      onChange={(e) =>
                        setVehiculos((prev) =>
                          prev.map((v) =>
                            v.id === vehiculo.id
                              ? { ...v, kilometros: parseInt(e.target.value) }
                              : v
                          )
                        )
                      }
                    />
                  </td>
                  <td className="flex space-x-2">
                    <Button onClick={() => handleSaveVehiculo(vehiculo)}>
                      <Save className="w-4 h-4" />
                    </Button>
                    <Button onClick={handleCancelEdit}>
                      <XCircle className="w-4 h-4" />
                    </Button>
                  </td>
                </>
              ) : (
                <>
                  <td>{vehiculo.tipo}</td>
                  <td>{vehiculo.color}</td>
                  <td>{vehiculo.marca}</td>
                  <td>{vehiculo.modelo}</td>
                  <td>{vehiculo.matricula}</td>
                  <td>{vehiculo.kilometros}</td>
                  <td className="flex space-x-2">
                    <Button onClick={() => handleEditVehiculo(vehiculo.id)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                  </td>
                </>
              )}
            </tr>
          ))}
          <tr>
            <td>
              <Input
                placeholder="Tipo"
                value={newVehiculo?.tipo || ""}
                onChange={(e) =>
                  setNewVehiculo({
                    ...newVehiculo,
                    tipo: e.target.value,
                  } as Vehiculo)
                }
              />
            </td>
            <td>
              <Input
                placeholder="Color"
                value={newVehiculo?.color || ""}
                onChange={(e) =>
                  setNewVehiculo({
                    ...newVehiculo,
                    color: e.target.value,
                  } as Vehiculo)
                }
              />
            </td>
            <td>
              <Input
                placeholder="Marca"
                value={newVehiculo?.marca || ""}
                onChange={(e) =>
                  setNewVehiculo({
                    ...newVehiculo,
                    marca: e.target.value,
                  } as Vehiculo)
                }
              />
            </td>
            <td>
              <Input
                placeholder="Modelo"
                value={newVehiculo?.modelo || ""}
                onChange={(e) =>
                  setNewVehiculo({
                    ...newVehiculo,
                    modelo: e.target.value,
                  } as Vehiculo)
                }
              />
            </td>
            <td>
              <Input
                placeholder="Matrícula"
                value={newVehiculo?.matricula || ""}
                onChange={(e) =>
                  setNewVehiculo({
                    ...newVehiculo,
                    matricula: e.target.value,
                  } as Vehiculo)
                }
              />
            </td>
            <td>
              <Input
                type="number"
                placeholder="Kilómetros"
                value={newVehiculo?.kilometros?.toString() || ""}
                onChange={(e) =>
                  setNewVehiculo({
                    ...newVehiculo,
                    kilometros: parseInt(e.target.value),
                  } as Vehiculo)
                }
              />
            </td>
            <td>
              <Button
                onClick={() => handleAddNewVehiculo(cliente.id)}
                variant="primary"
                className="flex items-center"
              >
                <PlusCircle className="w-4 h-4 mr-1" /> Agregar
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Clientes;
