export interface Silabo {
  id: number;
  codigo: string;
  nombre: string;
  creditos: number;
  ciclo: number;
  descripcion?: string;
  profesor: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateSilaboRequest {
  codigo: string;
  nombre: string;
  creditos: number;
  ciclo: number;
  descripcion?: string;
  profesor: string;
}

export interface UpdateSilaboRequest extends Partial<CreateSilaboRequest> {}
