// types/index.ts

export interface Presupuesto {
  id: number;
  cliente: Cliente | null; // Puede ser null
  vehiculo: Vehiculo | null; // Puede ser null
  servicios: Servicio[];
  totalEstimado: number;
  fechaCreacion: string; // Cambiar de 'fecha' a 'fechaCreacion' si es necesario
  estado: "activo" | "inactivo" | "completado"; // Asegúrate de que coincida con los valores de la API
}

export interface Cliente {
  id: number;
  nombre: string;
  contacto: string;
}

export interface Vehiculo {
  id: number;
  tipo: string;
  color: string;
  marca: string;
  modelo: string;
  kilometraje: number;
  matricula: string;
  cliente_id: Cliente | null;
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
