export interface InspecaoApi {
  inspecaoID: number;
  equipamento: string;
  localizacao: string;
  cliente: string;
  statusInspecao: boolean;
  statusTexto: string;
  dataCriacao: string;
  usuarioID: number;
}