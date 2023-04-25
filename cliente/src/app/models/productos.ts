export interface Producto {
  id?: number;
  marca?: string;
  referencia?: string;
  descripcion?: string;
  precio?: number;
  talla?: string;
  cantidad?: number;
  imagen?: string;
  fecha?: string;
  id_categoria?: number;
  idProveedor?: number;
}

export interface Categoria {
  id?: number;
  nomb_categ?: string;
}

export interface DetalleRepuesto {
  idDetalleRep?: number;
  idMantenimiento?: number;
  idProducto?: number;
  cantidadP?: number;
  fecha?: string;
}
