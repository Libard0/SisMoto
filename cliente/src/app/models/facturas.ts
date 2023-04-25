export interface Factura {
  id?: number;
  codigo?: string;
  cedula?: number;
  descripcion?: string;
  total?: number;
  id_pago?: number;
  id_tiposervicio?: number;
  fecha?: string;
}

export interface Pago {
  id_pago?: number;
  tipo_pago?: string;
}

export interface DetalleFactura{
  id_dtfact?: number;
  id_produc?: number;
  cant_produc?: number;
  factura_id?: number;
  valor?: number;
  fecha?: string;
}