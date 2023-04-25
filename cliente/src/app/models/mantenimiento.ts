export interface Mantenimiento{
    id_mantenimiento?:number;
    placa?:string;
    fecha_mantenimiento?: string; //Date;
    seguimiento?:string;
    descripcion?:string;
    horas_empleadas?:number;
    repuestos?:string;
    manoobra?:number;
    idCliente?:number;
    estadoMantenimiento?:string;
}

export interface Tipo_servicio {
  id_tiposervicio?: number;
  nombre_tipo_servicio?: string;
}
