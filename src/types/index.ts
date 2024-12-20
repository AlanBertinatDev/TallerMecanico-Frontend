export interface Cliente {
  id: number;
  nombre: string;
  contacto: string;
  vehiculos: Vehiculo[];
}

export interface Vehiculo {
  id: number;
  tipo: string;
  color: string;
  marca: string;
  modelo: string;
  matricula: string;
  kilometros: number;
  cliente: Cliente | null; // Cambiar a cliente en lugar de cliente_id
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface Servicio {
  id: number;
  descripcion: string;
  costoManoDeObra: number;
  fechaServicio: string;
  ordenId: number | null;
  repuestosUsados: Producto[];
}

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio_compra: number;
  precio_venta: number;
  stock: number;
}
