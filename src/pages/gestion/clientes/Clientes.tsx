import React, { useState, useEffect } from "react";
import {
  Plus,
  Pencil,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import api from "../../../lib/axios";
import type { Cliente, Cliente as ClienteType } from "../../../types";
import AgregarClienteModal from "./AgregarClienteModal";

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

  // Calcular el total de páginas basado en el número de clientes filtrados
  const totalPages = Math.ceil(filteredClientes.length / clientesPerPage);

  // Determinar los clientes a mostrar en la página actual
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

  const handleSaveCliente = (cliente: Cliente) => {
    // Lógica para guardar el cliente
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
        {/* Modal donde se agregan clientes y vehiculos nuevos */}
        <Button className="mt-4 sm:mt-0" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" /> Agregar Cliente
        </Button>

        {isModalOpen && (
          <AgregarClienteModal
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveCliente}
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
                    <Button variant="secondary" className="mr-2">
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

      {/* Paginación con números de página */}
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
    </div>
  );
};

// Componente para mostrar o editar vehículos
const VehiculosList: React.FC<{ cliente: Cliente }> = ({ cliente }) => {
  const vehiculos = cliente.vehiculos;

  return (
    <div className="p-4">
      {vehiculos.length > 0 ? (
        vehiculos.map((vehiculo) => (
          <div
            key={vehiculo.id}
            className="p-2 bg-white border rounded-md mb-2"
          >
            <p>Marca: {vehiculo.marca}</p>
            <p>Modelo: {vehiculo.modelo}</p>
            <Button variant="secondary" className="mt-2">
              Editar Vehículo
            </Button>
          </div>
        ))
      ) : (
        <p className="text-gray-500">
          Este cliente no tiene vehículos registrados.
        </p>
      )}
    </div>
  );
};

export default Clientes;
