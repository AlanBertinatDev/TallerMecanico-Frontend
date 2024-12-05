export interface IPresupuesto {
  id: number;
  total_estimado: number;
  estado: "PENDIENTE" | "CANCELADO" | "REALIZADO";
  fecha_creacion: string;
  fecha_realizado: string | null;
  cliente?: {
    id: number;
    nombre: string;
  };
  vehiculo?: {
    id: number;
    matricula: string;
  };
  productos: {
    producto_id: number;
    cantidad: number;
    nombre?: string; // Asociado en el frontend
    categoria?: string; // Asociado en el frontend
  }[];
}

export interface IPresupuestoGrid {
  id: number;
  total_estimado: number;
  estado: "PENDIENTE" | "CANCELADO" | "REALIZADO";
  fecha_creacion: string;
  fecha_realizado: string | null;
  cliente_id?: number; // Opcional en esta vista
  vehiculo_id?: number; // Opcional en esta vista
  cliente: {
    id: number;
    nombre: string;
  };
  vehiculo: {
    id: number;
    matricula: string;
  };
}

export interface IPresupuestoForm {
  cliente_id: number;
  vehiculo_id: number;
  productos: {
    producto_id: number;
    cantidad: number;
  }[];
  total_estimado: number;
}

export interface PresupuestoDTO {
  presupuestos: {
    id: number;
    cliente_id: number;
    vehiculo_id: number;
    total_estimado: number;
    estado: "PENDIENTE" | "CANCELADO" | "REALIZADO";
    fecha_creacion: string;
    fecha_realizado: string | null;
    productos: {
      producto_id: number;
      cantidad: number;
    }[];
  }[];
  clientes: {
    id: number;
    nombre: string;
  }[];
  vehiculos: {
    id: number;
    matricula: string;
  }[];
  productos: {
    id: number;
    nombre: string;
    categoria: string;
  }[];
}
