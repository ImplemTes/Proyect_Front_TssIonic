export interface UserModel {
  idpersona: number;
  apellidos: string;
  nombres: string;
  dni: string;
  celular: number;
  estado: boolean;
}

export interface UsuarioAcceso {
  idusuario:number;
  idrol: number;
  estado:boolean;
}
