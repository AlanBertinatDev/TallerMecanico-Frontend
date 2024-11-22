export interface ProductoType {
  id: number;
  nombre: string;
  descripcion: string;
  precioCompra: number;
  precioVenta: number;
  stock: number;
  orden_id: number | null;
}
