import { CargosEnum } from 'src/enums/CargosEnum';

export const GESTION_ROUTES_AUTH: { [key: string]: CargosEnum[]; } = {
  resumen: [CargosEnum.Administrador, CargosEnum.Encargado, CargosEnum.Vendedor],
  clientes: [CargosEnum.Administrador],
  empleados: [CargosEnum.Administrador],
  productos: [CargosEnum.Administrador, CargosEnum.Encargado],
  proveedores: [CargosEnum.Administrador, CargosEnum.Encargado],
  ventas: [CargosEnum.Administrador, CargosEnum.Vendedor],
  ordenes_compra: [CargosEnum.Administrador, CargosEnum.Encargado],
  usuarios: [CargosEnum.Administrador]
};
