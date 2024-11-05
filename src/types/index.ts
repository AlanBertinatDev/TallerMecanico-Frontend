// types/index.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  createdAt: string;
}

export interface Budget {
  id: string;
  title: string;
  amount: number;
  category: string;
  startDate: string;
  endDate: string;
  status: "active" | "completed" | "draft";
}

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
  direccion: string;
  telefono: string;
}

export interface Vehiculo {
  id: number;
  marca: string;
  modelo: string;
  anio: number;
  patente: string;
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
