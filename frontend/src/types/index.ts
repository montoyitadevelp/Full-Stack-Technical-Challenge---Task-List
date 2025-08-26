import type { UploadFile } from "antd";
import type { UploadChangeParam } from "antd/lib/upload";

export type UploadResponse = UploadChangeParam<UploadFile<Media[]>>;

export interface TaskForm {
  titulo: string;
  descripcion?: string;
  prioridad?: string;
  fechaVencimiento?: string;
  completada?: boolean;
  categoriaId?: string;
  etiquetas?: string[];
}

export interface Task {
  id: string;
  usuarioId: string;
  categoriaId: string | null;
  titulo: string;
  descripcion: string;
  prioridad: "low" | "medium" | "high";
  fechaVencimiento: string | null;
  completada: boolean;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
  categoria: Categoria | null;
  etiquetas: TaskEtiqueta[];
}

export interface Categoria {
  id: string;
  usuarioId: string;
  nombre: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export interface Etiqueta {
  id: string;
  nombre: string;
  color: string;
}

export interface TaskEtiqueta {
  etiquetaId: string;
  etiqueta: Etiqueta;
}

export type Client = {
  id: number;
  name: string;
  owner_name: string;
  owner_email: string;
  country: string;
  address: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  invoices?: Invoice[];

};

export type Invoice = {
  id: number;
  name: string;
  date: string;
  discount: number;
  tax: number;
  custom_id: string;
  services: Service[];
  subTotal: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;

  client: Client;
};

export type Service = {
  title: string;
  unitPrice: number;
  quantity: number;
  discount: number;
  totalPrice: number;
};

export type User = {
  id: number;
  name: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Media = {
  id: number;
  name: string;
  alternativeText: any;
  caption: any;
  width: number;
  height: number;
  formats: any;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: any;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
};
