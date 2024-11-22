import React, { useState, useEffect } from "react";
import { Plus, AlertTriangle, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { ProductRow } from "../../../components/products/ProductRow";
import AddProductModal from "../../../components/products/AddProductModal";
import api from "../../../lib/axios";
import { ProductoType } from "../../../types/productoType.ts";
import toast from "react-hot-toast";

const MINIMO_STOCK = 3;

const Productos: React.FC = () => {
  const [products, setProducts] = useState<ProductoType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [clientesPerPage] = useState(6);

  {
    /* Esto es un hook de react para cuando se carga la pagina*/
  }
  useEffect(() => {
    fetchProducts();
  }, []);

  {
    /*Cargamos toda la grilla con un select en productos.*/
  }
  const fetchProducts = async () => {
    try {
      const response = await api.get("/productos");
      setProducts(response.data);
    } catch (error) {
      console.error("Error cargando lista de productos:", error);
      toast.error("Error cargando lista de productos");
    } finally {
      setIsLoading(false);
    }
  };

  {
    /* Agregamos nuevos productos, con datos que llegan del AddProductModal*/
  }
  const handleAdd = async (product: Omit<ProductoType, "id">) => {
    try {
      const response = await api.post("/productos", product);
      // Modifico el producto en el array de productos
      setProducts([...products, response.data]);
      // Oculto el formulario.
      setShowAddForm(false);
      toast.success("Producto agregado correctamente!");
    } catch (error) {
      console.error("Error agregando pruducto:", error);
      toast.error("Error al agregar producto.");
    }
  };

  {
    /* Modificamos datos de productos, con datos que vienen del ProductRow */
  }
  const handleUpdate = async (updatedProduct: ProductoType) => {
    try {
      await api.put(`/productos/${updatedProduct.id}`, updatedProduct);
      setProducts(
        products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      );
      toast.success("Producto modificado correctamente");
    } catch (error) {
      console.error("Error al modificar producto:", error);
      toast.error("Error modificando producto");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Seguro que desea eliminar el producto?")) return;

    try {
      await api.delete(`/productos/${id}`);
      setProducts(products.filter((p) => p.id !== id));
      toast.success("Producto eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar un producto:", error);
      toast.error("Error al eliminar producto");
    }
  };

  {
    /* Aca buscamos cuantos produtos están bajos de stock */
  }
  const lowStockProducts = products.filter(
    (product) => product.stock <= MINIMO_STOCK
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  // Array filtrado de los productos
  const filteredProducts = products.filter((product) =>
    product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / clientesPerPage);
  const indexOfLastCliente = currentPage * clientesPerPage;
  const indexOfFirstCliente = indexOfLastCliente - clientesPerPage;

  {
    /* Acá esta el array de los productos a mostrar */
  }
  const currentProductos = filteredProducts.slice(
    indexOfFirstCliente,
    indexOfLastCliente
  );
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Productos</h1>
          <p className="mt-1 text-sm text-gray-500">INVENTARIO DE PRODUCTOS</p>
        </div>
        <Button
          className="mt-4 sm:mt-0"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Agregar producto
        </Button>
      </div>

      {/*Sección de alerta de productos bajos de stockk!!*/}
      {lowStockProducts.length > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            <div className="ml-3">
              <h2 className="text-sm text-yellow-700">
                PRODUCTOS BAJOS DE STOCK!{" "}
              </h2>
              <span className="text-sm text-yellow-700">
                {lowStockProducts.length} producto por debajo del minimo.
              </span>
            </div>
          </div>
        </div>
      )}

      {/*Sección para mostrar el formulario modal de nuevo producto*/}
      {showAddForm && (
        <div className="bg-white shadow sm:rounded-lg p-6">
          <AddProductModal
            onClose={() => setShowAddForm(false)}
            onSave={handleAdd}
          />
        </div>
      )}

      {/** Sección donde aplicamos filtro por producto */}
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <Input
            placeholder="Buscar productos por nombre..."
            value={searchTerm}
            onChange={(e) => {
              setCurrentPage(1);
              setSearchTerm(e.target.value);
            }}
            className="max-w-md"
          />
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NOMBRE
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  DESCRIPCION
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PRECIO DE COMPRA
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PRECIO DE VENTA
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  STOCK
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ACCIONES
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentProductos.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                  lowStockThreshold={MINIMO_STOCK}
                />
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    NO SE ENCONTRARON PRODUCTOS PARA LISTAR
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Div de Paginación */}
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

export default Productos;
