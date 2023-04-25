export interface Usuario {
  id?: number;
  cedula?: number;
  nombre?: string;
  apellido?: string;
  celular?: number;
  correo?: string;
  contrasena?: string;
  created_at?: Date;
  idtipousuario?: number;
}

export interface tipousuario {
  id?: number;
  tipo?: string;
}