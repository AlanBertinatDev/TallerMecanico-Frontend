export interface Presupuesto {
  id: number;
  cliente_id: number;
  vehiculo_id: number;
  total_estimado: number;
  estado: "PENDIENTE" | "CANCELADO" | "REALIZADO";
  fecha_creacion: string;
  fecha_realizado: string | null;
}
